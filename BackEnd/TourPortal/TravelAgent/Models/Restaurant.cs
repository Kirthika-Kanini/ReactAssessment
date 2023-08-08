using System.ComponentModel.DataAnnotations;

namespace TravelAgent.Models
{
    public class Restaurant
    {
        [Key]
        public int RestaurantId { get; set; }
        public string? RestaurantName { get; set; }

        public string?RestaurantLocation { get; set; }
        public string? RestaurantSubLocation { get; set; }
        public string? RestaurantPincode { get; set; }

        public string? RestaurantImage { get; set; }
        public string? RestaurantContact { get; set; }
        public Place? Place { get; set; }
    }
}
