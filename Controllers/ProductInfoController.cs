using BackendSan.Models.Requests;
using BackendSan.Models.Responses;
using BackendSan.Services;
using Microsoft.AspNetCore.Mvc;

namespace BackendSan.Controllers;

[ApiController]
[Route("api/")]
public class ProductInfoController : BaseApiController
{
    public ProductInfoController(RelayService relayService) : base(relayService) { }
    
    [HttpPost("getproductinfo")]
    public async Task<IActionResult> GetProductInfo([FromBody] ProductInfoRequestDto request)
    {
        var result = await Forward<ProductInfoResponseDto>("productservice/getproductinfo", request);
        return result;
    }

}