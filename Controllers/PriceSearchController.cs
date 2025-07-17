using BackendSan.Models.Request;
using BackendSan.Models.Requests;
using BackendSan.Models.Responses;
using BackendSan.Services;
using Microsoft.AspNetCore.Mvc;
using System.Text.RegularExpressions;

namespace BackendSan.Controllers
{
    [ApiController]
    [Route("api")]
    public class PriceSearchController : BaseApiController
    {
        public PriceSearchController(RelayService relayService) : base(relayService)
        {

        }
        [HttpPost("hotelPriceSearch")]
        public async Task<IActionResult> HotelPriceSearch(PriceSearchRequestDto requestDto)
        {
            var result = await Forward<PriceSearchResponseDto>("productservice/pricesearch", requestDto);
            
            if (result is OkObjectResult okResult && okResult.Value is PriceSearchResponseDto dto)
            {
                if (dto.Body?.hotels != null)
                {
                    var hotelsToKeep = new List<HotelDTO>();
                    foreach (var hotel in dto.Body?.hotels ?? new List<HotelDTO>())
                    {
                        if (hotel.provider != 0 && hotel.provider != 1) 
                        {
                            if (hotel.description != null && !string.IsNullOrEmpty(hotel.description.text))
                            {
                                // Remove HTML tags from the hotel description
                                hotel.description.text = RemoveHtmlTags(hotel.description.text);
                                hotel.description.text = hotel.description.text.Trim();
                            }
                            hotelsToKeep.Add(hotel); 
                        }
                    }
                    dto.Body.hotels = hotelsToKeep;
                }
                return Ok(dto);
            }
            return result;
        }

        [HttpPost("locationPriceSearch")]
        public async Task<IActionResult> PriceSearch(PriceSearchRequestDto requestDto)
        {
            var result = await Forward<PriceSearchResponseDto>("productservice/pricesearch", requestDto);

            if (result is OkObjectResult okResult && okResult.Value is PriceSearchResponseDto dto)
            {
                if (dto.Body?.hotels != null)
                {
                    var hotelsToKeep = new List<HotelDTO>();

                    foreach (var hotel in dto.Body?.hotels ?? new List<HotelDTO>())
                    {
                        if (hotel.provider != 0 && hotel.provider != 1) 
                        {
                            if (hotel.description != null && !string.IsNullOrEmpty(hotel.description.text))
                            {
                                // Remove HTML tags from the hotel description
                                hotel.description.text = RemoveHtmlTags(hotel.description.text);
                                hotel.description.text = hotel.description.text.Trim();
                            }
                            hotelsToKeep.Add(hotel); 

                        }
                    }
                    dto.Body.hotels = hotelsToKeep;
                }
                return Ok(dto);
            }

            return result;
        }

        public static string RemoveHtmlTags(string htmlString)
        {
            if (string.IsNullOrEmpty(htmlString))
            {
                return htmlString;
            }
            // This regex replaces all occurrences of HTML tags with an empty string
            return Regex.Replace(htmlString, "<[^>]*>", string.Empty);
        }


    }
}
