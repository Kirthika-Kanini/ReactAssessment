using Microsoft.CodeAnalysis;
using System.ComponentModel.DataAnnotations;

namespace TravelAgent.Models
{
    public class Hotel
    {
        [Key]
        public int HotelId { get; set; }
        public string? HotelName { get; set; }

        public string? HotelLocation { get; set; }
        public string? HotelSubLocation { get; set; }
        public string? HotelPincode { get; set; }

        public string? HotelImage { get; set; }
        public string? HotelContact { get; set; }

        public Place? Place { get; set; }
    }
}
