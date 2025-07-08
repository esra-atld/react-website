using BackendSan.Models;
using System.Text;
using Microsoft.Extensions.Configuration;
using System;
using System.Net.Http;
using System.Net.Http.Json; 
using System.Threading.Tasks;
using BackendSan.Services; 

namespace BackendSan.Services
{
    public class RelayService
    {
        private readonly HttpClient _httpClient;
        private readonly TokenStore _tokenStore;
        private readonly IConfiguration _config;

        public RelayService(IHttpClientFactory httpClientFactory, TokenStore tokenStore, IConfiguration config)
        {
            _httpClient = httpClientFactory.CreateClient();
            _tokenStore = tokenStore;
            _config = config;
        }

        public async Task InitializeTokenAsync()
        {
            await LoginAndStoreTokenAsync();
        }

        public async Task<HttpResponseMessage> ForwardRequestAsync(string endpoint, string jsonBody)
        {
            if (!_tokenStore.HasValidToken())
                await LoginAndStoreTokenAsync();

            var url = $"{_config["TargetApi:BaseUrl"]}{endpoint}";
            var request = new HttpRequestMessage(HttpMethod.Post, url)
            {
                Content = new StringContent(jsonBody, Encoding.UTF8, "application/json")
            };
            request.Headers.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", _tokenStore.GetToken());

            return await _httpClient.SendAsync(request);
        }

        private async Task LoginAndStoreTokenAsync()
        {
            var loginPayload = new
            {
                Agency = _config["TargetApi:Agency"],
                User = _config["TargetApi:User"],
                Password = _config["TargetApi:Password"]
            };

            var response = await _httpClient.PostAsJsonAsync($"{_config["TargetApi:BaseUrl"]}authenticationservice/login", loginPayload);

            if (!response.IsSuccessStatusCode)
                throw new Exception($"Login failed: {await response.Content.ReadAsStringAsync()}");

            
            var authApiResponse = await response.Content.ReadFromJsonAsync<AuthApiResponse>();

            if (authApiResponse?.Body == null) 
            {
                throw new Exception("Authentication response body is null or malformed.");
            }

            string accessToken = authApiResponse.Body.Token;
            string expiresOnString = authApiResponse.Body.ExpiresOn;

            if (!DateTime.TryParse(expiresOnString, out DateTime expiresOnDateTime))
            {
                throw new Exception($"Failed to parse 'expiresOn' date: {expiresOnString}");
            }

            _tokenStore.StoreToken(accessToken, expiresOnDateTime);
        }
    }
}
