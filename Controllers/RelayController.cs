using BackendSan.Models.Request;
using BackendSan.Models.Responses;
using BackendSan.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Text.Json;
using System.Threading.Tasks;

namespace BackendSan.Controllers
{
    [ApiController]
    [Route("api")]
    public class RelayController : ControllerBase
    {
        private readonly RelayService _relayService;

        public RelayController(RelayService relayService)
        {
            _relayService = relayService;
        }

        [HttpPost("getarrivalautocomplete")]
        public async Task<IActionResult> GetArrivalAutocomplete(GetArrivalAutocompleteRequestDto requestDto)
        {
            var result = await Forward<GetArrivalAutocompleteResponseDto>("productservice/getarrivalautocomplete", requestDto);

            if (result is OkObjectResult okResult && okResult.Value is GetArrivalAutocompleteResponseDto dto)
            {
                if (dto.Body?.Items != null)
                {
                    dto.Body.Items = dto.Body.Items.Take(10).ToList();
                }

                return Ok(dto);
            }

            return result;
        }



        [HttpPost("getcheckindates")]
        public async Task<IActionResult> GetCheckinDates([FromBody] object payload)
            => await Forward<object>("productservice/getcheckindates", payload);



        private async Task<IActionResult> Forward<T>(string endpoint, object payload)
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

                return Ok(deserialized);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error forwarding request: {ex.Message}");
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

    }
}
