using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using BackendSan.Models.Request;
using BackendSan.Models.Responses;
using BackendSan.Services; // For RelayService
using System.Text.Json;


namespace BackendSan.Controllers 
{
    [ApiController]
    [Route("api/")]
    public class GetCheckInDates : BaseApiController
    {
        private readonly RelayService _relayService;

        public GetCheckInDates(RelayService relayService) : base(relayService)
        {
            
        }

        /*
        [HttpPost("checkindates")]
        public async Task<IActionResult> GetCheckinDates([FromBody] CheckinDatesRequestDto request)
        {
            try
            {
                List<DateTime> dates = await _relayService.GetCheckinDatesAsync(request);
                return Ok(dates); // Returns 200 OK with the list of check-in dates
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message }); // Returns 500 with error message
            }
        }
        */

        [HttpPost("getcheckindates")]
        public async Task<IActionResult> GetCheckinDates(CheckinDatesRequestDto requestDto)
        {
            var result = await Forward<CheckinDatesResponseDto>("productservice/getcheckindates", requestDto);


            return result;
        }

        
    }

}
