using System;
using BackendSan.Models;

namespace BackendSan.Models.Requests
{
    public class ArrivalLocationDto
    {
        public string id { get; set; }
        public int type { get; set; }
    }

    public class CheckinDatesRequestDto
    {
        public int ProductType { get; set; }
        public bool IncludeSubLocations { get; set; }
        public string? Product { get; set; }  // Nullable, could also be string?
        public List<ArrivalLocationDto> ArrivalLocations { get; set; }
    }
}
