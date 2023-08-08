using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TourPortal.Interfaces;
using TourPortal.Models;

namespace TourPortal.Controllers
{
    [ApiController]
    [Route("api/gallery")]
    public class GalleryController : ControllerBase
    {
        private readonly IGallery _galleryRepository;

        public GalleryController(IGallery galleryRepository)
        {
            _galleryRepository = galleryRepository;
        }

        [HttpGet]
        public IActionResult GetGallery()
        {
            var gallery = _galleryRepository.GetGallery();
            return Ok(gallery);
        }

        [HttpGet("{id}")]
        public IActionResult GetGalleryById(int id)
        {
            var gallery = _galleryRepository.GetGallerysById(id);
            if (gallery == null)
            {
                return NotFound();
            }
            return Ok(gallery);
        }

        [HttpPost]
        public async Task<IActionResult> CreateGallery([FromForm] Gallery gallery, IFormFile imageFile)
        {
            try
            {
                var newGallery = await _galleryRepository.PostGallery(gallery, imageFile);
                return CreatedAtAction(nameof(GetGalleryById), new { id = newGallery.galleryId }, newGallery);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateGallery(int id, [FromForm] Gallery gallery, IFormFile imageFile)
        {
            try
            {
                var updatedPlace = await _galleryRepository.PutGallery(id, gallery, imageFile);
                return Ok(updatedPlace);
            }
            catch (ArgumentException ex)
            {
                ModelState.AddModelError("", ex.Message);
                return BadRequest(ModelState);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteGallery(int id)
        {
            var existingGallery = _galleryRepository.GetGallerysById(id);
            if (existingGallery == null)
            {
                return NotFound();
            }

            _galleryRepository.DeleteGallery(id);
            return NoContent();
        }
    }
}
