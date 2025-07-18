namespace BackendSan.Models.Requests;

public class ProductInfoRequestDto
{
    public required int ProductType { get; set; }
    public required int OwnerProvider { get; set; }
    public required string Product { get; set; }
    public required string Culture { get; set; }
}