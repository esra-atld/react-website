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
    public class RelayController : BaseApiController
    {
        public RelayController(RelayService relayService) : base(relayService)
        {
            
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

    }
}
