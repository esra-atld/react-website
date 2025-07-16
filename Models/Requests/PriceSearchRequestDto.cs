namespace BackendSan.Models.Requests
{
    public class PriceSearchRequestDto
    {
        public bool checkAllotment { get; set; } = true;
        public bool checkStopSale{ get; set; } = true;
        public bool getOnlyDiscountedPrice { get; set; } = false;
        public bool getOnlyBestOffers { get; set; } = false;
        public int productType { get; set; } = 2; 

        public required List<ArrivalLocationDto>? arrivalLocations { get; set; }
        public List<string>? Products { get; set; }

        public required List<RoomCriteriaDto> roomCriteria { get; set; }
        public string nationality { get; set; } = "TR";
        public DateTime checkIn { get; set; }
        public int night { get; set; }
        public string currency { get; set; } = "EUR";
        public string culture { get; set; } = "tr-TR"; 

    }
    public class RoomCriteriaDto
    {
        public int adult { get; set; }
        public List<int> childAges { get; set; }
    }
    
}
