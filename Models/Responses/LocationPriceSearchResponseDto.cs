namespace BackendSan.Models.Responses
{
    public class LocationPriceSearchResponseDto
    {
        public LocationPriceSearchResponseBody? Body { get; set; }
        public HeaderDto? Header { get; set; } 
    }

    public class LocationPriceSearchResponseBody
    {
        public string searchId { get; set; }
        public DateTime expiresOn { get; set; }
        public List<HotelDTO> hotels { get; set; } 


    }

    public class HotelDTO
    {
        public double stars { get; set; }
        public double rating { get; set; } // hotel rating
        public List<FacilitiesDTO> facilities { get; set; }
        public List<Themes> themes { get; set; }
        public GeoLocation geoLocation { get; set; }
        public LocationDTO location { get; set; }
        public CountryDTO country { get; set; }
        public CityDTO city { get; set; }
        public GiataInfo giataInfo { get; set; } // giata hotel id and destination id
        public List<OfferDTO> offers { get; set; } 
        public string address { get; set; }
        public List<BoardDTO> boardGroups { get; set; }
        public List<BadgeDTO> badges { get; set; }
        public HotelCategory hotelCategory { get; set; }
        public int orderNumber { get; set; }
        public string originalName { get; set; }
        public bool hasThirdPartyOwnOffer { get; set; } // true if the hotel has an own offer from a third party channel manager

        public bool hasChannelManagerOffer { get; set; }
        public string code { get; set; }
        public int provider { get; set; }
        public string id { get; set; } // hotel id
        public string name { get; set; } // hotel name
        public string thumbnail { get; set; } // hotel thumbnail
        public string thumbnailFull { get; set; } // hotel thumbnail full
        public DescriptionDTO? description { get; set; } = new DescriptionDTO(); // hotel description

    }
    public class DescriptionDTO
    {
        public string text { get; set; } = " ";
    }
    public class BadgeDTO
    {
        public string id { get; set; }
        public string name { get; set; }
    }
    public class GiataInfo      
    {
        public string hotelId { get; set; } // giata hotel id
        public string destinationId { get; set; } // giata destination id
    }
    public class GeoLocation
            {
        public string latitude { get; set; }
        public string longitude { get; set; }
    }
    public class Themes
    {
        public string id { get; set; }
        public string name { get; set; }
    }

    public class FacilitiesDTO
    {
        public bool isPriced { get; set; }
        public string id { get; set; }
        public string name { get; set; }
    }
    public class HotelCategory
    {
        public string id { get; set; }
        public string name { get; set; }
        public string code { get; set; }
    }
    public class  LocationDTO
    {
        public string name { get; set; }
        public string latitude { get; set; }
        public string longitude { get; set; }
        public string countryId { get; set; }
        public int provider { get; set; }
        public bool isTopRegion { get; set; }
        public bool ownLocation { get; set; }
        public string id  { get; set; }
    }

    public class CountryDTO
    {
        public string internationalCode { get; set; }
        public string name { get; set; }
        public int provider { get; set; }
        public bool isTopRegion { get; set; }
        public bool ownLocation { get; set; }
    }
    public class CityDTO
    {
        public string name { get; set; }
        public string latitude { get; set; }
        public string longitude { get; set; }
        public int provider { get; set; }
        public bool isTopRegion { get; set; }
        public bool ownLocation { get; set; }
        public string id  { get; set; }
    }

    public class  OfferDTO
    {
        public int night { get; set; }
        public bool isAvailable { get; set; }
        public int availability { get; set; }
        public List<RoomDTO> rooms { get; set; }
        public bool isRefundable { get; set; }
        public bool isChannelManager { get; set; }
        public DateTime expiresOn { get; set; }
        public string offerId { get; set; }
        public DateTime checkIn { get; set; }
        public Price price { get; set; }
        public bool ownOffer { get; set; } 
        public int provider { get; set; } // 1 for backend, 2 for channel manager
        public bool availabilityChecked { get; set; }
        public List<CancellationPoliciesDTO> cancellationPolicies { get; set; }
        public bool thirdPartyOwnOffer { get; set; } // true if the offer is from a third party channel manager


    }
    public class CancellationPoliciesDTO
    {
        public string roomNumber { get; set; }
        public DateTime dueDate { get; set; }
        public Price price { get; set; }
        public int provider { get; set; } // 1 for backend, 2 for channel manager

    }
    public class  RoomDTO
    {
        public int partNo { get; set; }
        public string roomId { get; set; }

        public string roomName { get; set; }
        public List<object>? roomGroups { get; set; } // list of room groups
        public string accomId { get; set; }
        public string accomName { get; set; }
        public string boardId { get; set; }
        public string boardName { get; set; }
        public List<BoardDTO> boardGroups { get; set; }
        public int allotment { get; set; }
        public int stopSaleGuaranteed { get; set; }
        public int stopSaleStandart { get; set; }
        public Spo spo { get; set; }
        public Price price { get; set; }
        public List<Traveller> travellers { get; set; }
        public bool visiblePL { get; set; } // visible in price list


    }
    public class  BoardDTO
    {
        public string id { get; set; }
        public string name { get; set; }

    }

    public class  Spo  // indirim
    {
        public Price price { get; set; }
        public List<Items> items { get; set; }

    }
    public class Items
    {
        public int productType { get; set; } // 1 for hotel, 2 for flight
        public Price price { get; set; }
    }
    public class Price
    {
        public double oldAmount { get; set; }
        public double percent { get; set; }
        public double amount { get; set; }
        public string currency { get; set; }

    }
    public class Traveller
    {
        public int type { get; set; } 
        public int age { get; set; } 
        public string nationality { get; set; } 
    }
}
