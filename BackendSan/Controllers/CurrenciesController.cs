using BackendSan.Models.Requests;
using BackendSan.Models.Responses;
using BackendSan.Services;
using Microsoft.AspNetCore.Mvc;

namespace BackendSan.Controllers;


[ApiController]
[Route("api/")]
public class CurrenciesController : BaseApiController
{
    public CurrenciesController(RelayService relayService) : base(relayService) { }

    [HttpPost("getcurrencies")]
    public async Task<IActionResult> GetCurrencies()
    {
        var emptyRequest = new CurrenciesRequestDto(); // empty {}
        var result = await Forward<CurrenciesResponseDto>("lookupservice/getcurrencies", emptyRequest);

        return result;
    }
}