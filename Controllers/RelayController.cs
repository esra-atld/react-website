using BackendSan.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Text.Json;
using System.Threading.Tasks;

namespace BackendSan.Controllers
{
    [ApiController]
    [Route("relay")]
    public class RelayController : ControllerBase
    {
        private readonly RelayService _relayService;

        public RelayController(RelayService relayService)
        {
            _relayService = relayService;
        }

        [HttpPost("users")]
        public async Task<IActionResult> Users([FromBody] object payload)
            => await Forward("api/users", payload);

        private async Task<IActionResult> Forward(string endpoint, object payload)
        {
            // For simplicity, directly using ToString() for the payload might not be robust for all object types.
            // Consider using a JSON serializer like System.Text.Json.JsonSerializer.Serialize(payload)
            // for more complex objects to ensure correct JSON formatting.
            var json = JsonSerializer.Serialize(payload);

            try
            {
                var response = await _relayService.ForwardRequestAsync(endpoint, json);
                var responseBody = await response.Content.ReadAsStringAsync();
                return StatusCode((int)response.StatusCode, responseBody);
            }
            catch (Exception ex)
            {
                // Log the exception for debugging
                Console.WriteLine($"Error forwarding request: {ex.Message}");
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
