using System.ComponentModel.DataAnnotations;

namespace TourPortal.Models
{
    public class GalleryBlob
    {
            [Key]
            public int galId { get; set; }
            public string ?galName { get; set; }
            public string ?galImage { get; set; }
        
        public class GalleryCreateViewModel
        {
            public string? Gname { get; set; }

            public IFormFile? GalImage { get; set; } // This property is used for file upload in the controller, not in the entity model
        }
    }

}

