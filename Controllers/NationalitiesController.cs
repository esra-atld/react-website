using BackendSan.Models.Requests;
using BackendSan.Models.Responses;
using BackendSan.Services;
using Microsoft.AspNetCore.Mvc;

namespace BackendSan.Controllers;

[ApiController]
[Route("api/")]
public class NationalitiesController : BaseApiController
{
    public NationalitiesController(RelayService relayService) : base(relayService) { }

    [HttpPost("getnationalities")]
    public async Task<IActionResult> GetNationalities()
    {
        var emptyRequest = new NationalitiesRequestDto(); // empty {}
        var result = await Forward<NationalitiesResponseDto>("lookupservice/getnationalities", emptyRequest);

        return result;
    }
}