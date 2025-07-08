using Microsoft.Extensions.Caching.Memory;

namespace BackendSan.Services
{
    public class TokenStore
    {
        private readonly IMemoryCache _cache;

        public TokenStore(IMemoryCache cache)
        {
            _cache = cache;
        }

        public void StoreToken(string token, DateTime expiresOn)
        {
            // Calculate the TimeSpan until expiration, subtracting 60 seconds as a buffer
            var timeUntilExpiration = expiresOn - DateTime.UtcNow - TimeSpan.FromSeconds(60);

            // Ensure the expiration is not in the past due to the buffer
            if (timeUntilExpiration < TimeSpan.Zero)
            {
                timeUntilExpiration = TimeSpan.Zero; // Token is effectively expired
            }

            var options = new MemoryCacheEntryOptions()
                .SetAbsoluteExpiration(timeUntilExpiration);
            _cache.Set("BearerToken", token, options);
        }

        public bool HasValidToken()
        {
            return _cache.TryGetValue("BearerToken", out string token) && !string.IsNullOrEmpty(token);
        }

        public string GetToken()
        {
            _cache.TryGetValue("BearerToken", out string token);
            return token;
        }
    }
}
