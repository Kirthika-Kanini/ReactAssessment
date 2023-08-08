using Microsoft.AspNetCore.Mvc;
using TourPortal.Models;

namespace TourPortal.Interfaces
{
    public interface IGallery
    {
        public IEnumerable<Gallery> GetGallery();
        public Gallery GetGallerysById(int id);
        Task<Gallery> PostGallery([FromForm] Gallery gallery, IFormFile imageFile);

        Task<Gallery> PutGallery(int id, [FromForm] Gallery Gallery, IFormFile imageFile);
        public Gallery DeleteGallery(int id);
    }
}
