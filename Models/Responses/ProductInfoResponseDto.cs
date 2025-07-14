namespace BackendSan.Models.Responses;

public class ProductInfoResponseDto
{
    public ProductInfoBodyDto Body { get; set; }
    public HeaderDto Header { get; set; }
}

public class ProductInfoBodyDto
{
    public HotelDto Hotel { get; set; }
}


public class HotelDto
{
    public List<SeasonDto> Seasons { get; set; }
    public AddressDto Address { get; set; }
    public string FaxNumber { get; set; }
    public string PhoneNumber { get; set; }
    public string HomePage { get; set; }
    public int StopSaleGuaranteed { get; set; }
    public int StopSaleStandart { get; set; }
    public List<object> Handicaps { get; set; }
    public GeoLocationDto Geolocation { get; set; }
    public double Stars { get; set; }
    public double Rating { get; set; }
    public List<object> Themes { get; set; }
    public LocationDto Location { get; set; }
    public LocationDto Country { get; set; }
    public LocationDto City { get; set; }
    public HotelCategoryDto HotelCategory { get; set; }
    public bool HasChannelManagerOffer { get; set; }
    public int Provider { get; set; }
    public string Thumbnail { get; set; }
    public string ThumbnailFull { get; set; }
    public DescriptionDto Description { get; set; }
    public string Id { get; set; }
    public string Name { get; set; }
}

public class SeasonDto
{
    public string Name { get; set; }
    public List<TextCategoryDto> TextCategories { get; set; }
    public List<MediaFileDto> MediaFiles { get; set; }
}

public class TextCategoryDto
{
    public string Name { get; set; }
    public List<PresentationDto> Presentations { get; set; }
}

public class PresentationDto
{
    public int TextType { get; set; }
    public string Text { get; set; }
}

public class MediaFileDto
{
    public int FileType { get; set; }
    public string Url { get; set; }
    public string UrlFull { get; set; }
}

public class AddressDto
{
    public CityDto City { get; set; }
    public List<string> AddressLines { get; set; }
    public GeoLocationDto Geolocation { get; set; }
}

public class CityDto
{
    public string Name { get; set; }
    public int Provider { get; set; }
    public bool IsTopRegion { get; set; }
    public bool OwnLocation { get; set; }
}

public class GeoLocationDto
{
    public string Longitude { get; set; }
    public string Latitude { get; set; }
}

public class DescriptionDto
{
    public string Text { get; set; }
}

public class HotelCategoryDto
{
    public string Name { get; set; }
    public string Id { get; set; }
    public string Code { get; set; }
}

public class LocationDto
{
    public string Name { get; set; }
    public string Latitude { get; set; }
    public string Longitude { get; set; }
    public int Provider { get; set; }
    public bool IsTopRegion { get; set; }
    public bool OwnLocation { get; set; }
    public string Id { get; set; }
}
