﻿namespace BackendSan.Models.Responses
{
    public enum SearchSuggestionType
    {
        CityOrDestination = 1,
        Hotel = 2
    }

    public class GetArrivalAutocompleteResponseDto
    {
        public BackendSearchResponseBody? Body { get; set; }
        public HeaderDto? Header { get; set; }



    }
    public class BackendSearchResponseBody
    {
        public List<BackendSearchItem>? Items { get; set; }
    }
    public class BackendSearchItem
    {
        public int Type { get; set; } // 1 for city/destination, 2 for hotel
        public BackendGeoLocation? Geolocation { get; set; } // Optional for frontend, but present in backend
        public BackendLocationInfo? Country { get; set; }
        public BackendLocationInfo? State { get; set; } // Can be null
        public BackendLocationInfo? City { get; set; }
        public BackendHotelInfo? Hotel { get; set; } // Only present for Type 2
        public int Provider { get; set; } 
        public BackendGiataInfo? GiataInfo { get; set; } // Only present for Type 2
    }
    public class BackendGeoLocation
    {
        public string? Longitude { get; set; }
        public string? Latitude { get; set; }
    }

    public class BackendLocationInfo
    {
        public string? Id { get; set; }
        public string? Name { get; set; }
    }
    public class BackendHotelInfo
    {
        public string? InternationalName { get; set; } 
        public string? Id { get; set; }
        public string? Name { get; set; }
    }
    public class BackendGiataInfo
    {
        public string? HotelId { get; set; }
        public string? DestinationId { get; set; }
    }
}
