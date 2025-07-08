using System.Net.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using BackendSan.Models.Request;
using BackendSan.Models.Responses;
using BackendSan.Services;
using System;
using System.Text.Json;
using System.Threading.Tasks;


namespace BackendSan.Controllers
{
    [ApiController]
    [Route("api/v{version:apiVersion}/[controller]")]
    public abstract class BaseApiController : ControllerBase
    {
        protected readonly RelayService _relayService;

        public BaseApiController(RelayService relayService)
        {
            _relayService = relayService ?? throw new ArgumentNullException(nameof(relayService));
        }

        protected async Task<IActionResult> Forward<T>(string endpoint, object payload)
        {
            
            var json = JsonSerializer.Serialize(payload);

            try
            {
                var response = await _relayService.ForwardRequestAsync(endpoint, json);
                var responseBody = await response.Content.ReadAsStringAsync();

                if (!response.IsSuccessStatusCode)
                {
                    
                    return StatusCode((int)response.StatusCode, responseBody);
                }

                var deserialized = JsonSerializer.Deserialize<T>(
                    responseBody,
                    new JsonSerializerOptions
                    {
                        PropertyNameCaseInsensitive = true 
                    });

                
                if (deserialized == null)
                {
                    return StatusCode(500, "Failed to deserialize backend response or response was unexpectedly empty.");
                }

                return Ok(deserialized); 
            }
            catch (JsonException ex) 
            {
                Console.WriteLine($"Error deserializing JSON response from {endpoint}: {ex.Message}");
                return StatusCode(500, new { error = ex.Message });
            }
            catch (Exception ex) 
            {
                Console.WriteLine($"Error forwarding request to {endpoint}: {ex.Message}");
                return StatusCode(500, new { error = ex.Message });
            }
        }
    }
}