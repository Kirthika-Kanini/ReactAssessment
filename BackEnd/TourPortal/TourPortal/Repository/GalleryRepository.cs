using Microsoft.AspNetCore.Mvc;
using TourPortal.Data;
using TourPortal.Interfaces;
using TourPortal.Models;

namespace TourPortal.Repository
{
    public class GalleryRepository:IGallery
    {
        private readonly TravelPortalContext _context;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public GalleryRepository(TravelPortalContext context, IWebHostEnvironment webHostEnvironment)
        {
            _context = context;
            _webHostEnvironment = webHostEnvironment;
        }

        public IEnumerable<Gallery> GetGallery()
        {
            return _context.Gallerys.ToList();
        }

        public Gallery GetGallerysById(int id)
        {
            return _context.Gallerys.FirstOrDefault(x => x.galleryId == id);
        }

        public async Task<Gallery> PostGallery([FromForm] Gallery gallery, IFormFile imageFile)
        {
            if (imageFile == null || imageFile.Length == 0)
            {
                throw new ArgumentException("Invalid file");
            }

            var uploadsFolder = Path.Combine(_webHostEnvironment.WebRootPath, "uploads");
            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(imageFile.FileName);
            var filePath = Path.Combine(uploadsFolder, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(stream);
            }

            gallery.galleryImage = fileName;

            _context.Gallerys.Add(gallery);
            _context.SaveChanges();

            return gallery;
        }

        public async Task<Gallery> PutGallery(int id, [FromForm] Gallery gallery, IFormFile imageFile)
        {
            var existingGallery = await _context.Gallerys.FindAsync(id);

            if (existingGallery == null)
            {
                return null;
            }

            if (imageFile != null && imageFile.Length > 0)
            {
                var uploadsFolder = Path.Combine(_webHostEnvironment.WebRootPath, "uploads");

                if (!string.IsNullOrEmpty(existingGallery.galleryImage))
                {
                    var existingFilePath = Path.Combine(uploadsFolder, existingGallery.galleryImage);
                    if (File.Exists(existingFilePath))
                    {
                        File.Delete(existingFilePath);
                    }
                }

                var fileName = Guid.NewGuid().ToString() + Path.GetExtension(imageFile.FileName);
                var filePath = Path.Combine(uploadsFolder, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await imageFile.CopyToAsync(stream);
                }

                gallery.galleryImage = fileName;
            }
            else
            {
                gallery.galleryImage = existingGallery.galleryImage;
            }


            existingGallery.galleryImage = gallery.galleryImage;

            await _context.SaveChangesAsync();

            return existingGallery;
        }

        public Gallery DeleteGallery(int id)
        {
            var gallery = _context.Gallerys.Find(id);
            if (gallery == null)
            {
                return null;
            }

            _context.Gallerys.Remove(gallery);
            _context.SaveChanges();
            return gallery;
        }
    }
}
