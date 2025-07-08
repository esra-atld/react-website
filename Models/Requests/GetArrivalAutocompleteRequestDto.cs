namespace BackendSan.Models.Request
{
    public class GetArrivalAutocompleteRequestDto
    {
        public required int ProductType { get; set; }
        public required string Query { get; set; }
        public required string Culture { get; set; }
    }
}
