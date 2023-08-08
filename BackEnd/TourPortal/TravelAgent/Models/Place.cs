using System.ComponentModel.DataAnnotations;

namespace TravelAgent.Models
{
    public class Place
    {
        [Key]
        public int PlaceId { get; set; }

        public string? PlaceName { get; set; }

        public string? PlaceDescription { get; set; }

        public string? Latitude { get; set; }

        public string? Longitude { get; set; }

        [Range(2000, 40000, ErrorMessage = "Day cost must be between 2000 and 40000.")]
        [RegularExpression(@"^[1-9]\d*$", ErrorMessage = "Day cost must be a positive integer.")]
        public int? DayCost { get; set; }


        [Range(2000, 400000, ErrorMessage = "Tour cost must be between 2000 and 400000.")]
        [RegularExpression(@"^[1-9]\d*$", ErrorMessage = "Tour cost must be a positive integer.")]
        public int? TourCost { get; set; }


        [Range(100, 10000, ErrorMessage = "Max distance must be between 100 and 10000.")]
        [RegularExpression(@"^[1-9]\d*$", ErrorMessage = "Max distance must be a positive integer.")]
        public int? MaxDistance { get; set; }


        public string? Route { get; set; }

        public string? RouteImage { get; set; }

        [Range(1, 20, ErrorMessage = "Total days must be between 1 and 20.")]
        [RegularExpression(@"^[1-9]\d*$", ErrorMessage = "Total days must be a positive integer.")]
        public int? TotalDays { get; set; }


        public string? Spots { get; set; }

        public string? SpotsImage { get; set; }

        public string? PlaceImage { get; set; }

        public ICollection<Hotel>? Hotels { get; set; }

        public ICollection<Restaurant>? Restaurants { get; set; }

        public Agent? Agent { get; set; }
    }
}
