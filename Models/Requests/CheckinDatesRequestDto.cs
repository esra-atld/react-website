using System;
using BackendSan.Models;

namespace BackendSan.Models.Request
{
    public class ArrivalLocationDto
    {
        public string Id { get; set; }
        public int Type { get; set; }
    }

    public class CheckinDatesRequestDto
    {
        public int ProductType { get; set; }
        public bool IncludeSubLocations { get; set; }
        public string? Product { get; set; }  // Nullable, could also be string?
        public List<ArrivalLocationDto> ArrivalLocations { get; set; }
    }
}
