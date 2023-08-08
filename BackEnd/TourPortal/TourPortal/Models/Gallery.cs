using System.ComponentModel.DataAnnotations;

namespace TourPortal.Models
{
    public class Gallery
    {
        [Key]
        public int galleryId { get; set; }
        public string? galleryImage { get; set; }
    }
}
