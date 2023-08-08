using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.EntityFrameworkCore;
using TravelAgent.Data;
using TravelAgent.Interfaces;
using TravelAgent.Models;

namespace TravelAgent.Repositories
{
    public class HotelRepository:IHotel
    {
        private readonly AgentContext _context;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public HotelRepository(AgentContext context, IWebHostEnvironment webHostEnvironment)
        {
            _context = context;
            _webHostEnvironment = webHostEnvironment;
        }

        public IEnumerable<Hotel> GetHotel()
        {
            return _context.Hotels.ToList();
        }

        public Hotel GetHotelsById(int id)
        {
            return _context.Hotels.Include(p => p.Place) 
       .FirstOrDefault(x => x.HotelId == id);
        }
        public async Task<Hotel> PostHotel([FromForm] Hotel hotel, IFormFile imageFile)
        {
            if (imageFile == null || imageFile.Length == 0)
            {
                throw new ArgumentException("Invalid file");
            }

            var uploadsFolder = Path.Combine(_webHostEnvironment.WebRootPath, "uploads/hotel");
            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(imageFile.FileName);
            var filePath = Path.Combine(uploadsFolder, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(stream);
            }

            hotel.HotelImage = fileName;
            var p = _context.Places.Find(hotel.Place.PlaceId);
           hotel.Place = p;

            _context.Hotels.Add(hotel);
            _context.SaveChanges();

            return hotel;
        }

        public async Task<Hotel> PutHotel(int id, [FromForm] Hotel hotel, IFormFile imageFile)
        {
            var existingHotel = await _context.Hotels.FindAsync(id);

            if (existingHotel == null)
            {
                return null;
            }

            if (imageFile != null && imageFile.Length > 0)
            {
                var uploadsFolder = Path.Combine(_webHostEnvironment.WebRootPath, "uploads/hotel");

                if (!string.IsNullOrEmpty(existingHotel.HotelImage))
                {
                    var existingFilePath = Path.Combine(uploadsFolder, existingHotel.HotelImage);
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

                hotel.HotelImage = fileName;
            }
            else
            {
                hotel.HotelImage = existingHotel.HotelImage;
            }

            existingHotel.HotelName = hotel.HotelName;
            existingHotel.HotelLocation = hotel.HotelLocation;
            existingHotel.HotelSubLocation = hotel.HotelSubLocation;
            existingHotel.HotelPincode = hotel.HotelPincode;
            existingHotel.HotelContact = hotel.HotelContact;
            existingHotel.HotelImage = hotel.HotelImage;
            var p = _context.Places.Find(hotel.Place.PlaceId);
            existingHotel.Place = p; // <--- Set the Agent of existingPlace
            await _context.SaveChangesAsync();

            return existingHotel;
        }
       
        public Hotel DeleteHotel(int id)
        {
            var hotel = _context.Hotels.Find(id);
            if (hotel == null)
            {
                return null;
            }

            _context.Hotels.Remove(hotel);
            _context.SaveChanges();
            return hotel;
        }

       
    }
}
