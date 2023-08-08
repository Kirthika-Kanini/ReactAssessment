using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TravelAgent.Data;
using TravelAgent.Interfaces;
using TravelAgent.Models;

namespace TravelAgent.Repositories
{
    public class RestaurantRepository:IRestaurant
    {
        private readonly AgentContext _context;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public RestaurantRepository(AgentContext context, IWebHostEnvironment webHostEnvironment)
        {
            _context = context;
            _webHostEnvironment = webHostEnvironment;
        }
        public IEnumerable<Restaurant> GetRestaurant()
        {
            return _context.Restaurants.Include(x=>x.Place).ToList();
        }

        public Restaurant GetRestaurantsById(int id)
        {
            return _context.Restaurants.Include(p => p.Place) // Eager load the Agent relationship
       .FirstOrDefault(x => x.RestaurantId == id);
            
        }
        public async Task<Restaurant> PostRestaurant([FromForm] Restaurant restaurant, IFormFile imageFile)
        {
            if (imageFile == null || imageFile.Length == 0)
            {
                throw new ArgumentException("Invalid file");
            }

            var uploadsFolder = Path.Combine(_webHostEnvironment.WebRootPath, "uploads/restaurant");
            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(imageFile.FileName);
            var filePath = Path.Combine(uploadsFolder, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(stream);
            }

            restaurant.RestaurantImage = fileName;
            var p = _context.Places.Find(restaurant.Place.PlaceId);
            restaurant.Place = p;

            _context.Restaurants.Add(restaurant);
            _context.SaveChanges();

            return restaurant;
        }
        public async Task<Restaurant> PutRestaurant(int id, [FromForm] Restaurant restaurant, IFormFile imageFile)
        {
            var existingRestaurant = await _context.Restaurants.FindAsync(id);

            if (existingRestaurant == null)
            {
                return null;
            }

            if (imageFile != null && imageFile.Length > 0)
            {
                var uploadsFolder = Path.Combine(_webHostEnvironment.WebRootPath, "uploads/restaurant");

                if (!string.IsNullOrEmpty(existingRestaurant.RestaurantImage))
                {
                    var existingFilePath = Path.Combine(uploadsFolder, existingRestaurant.RestaurantImage);
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

                restaurant.RestaurantImage = fileName;
            }
            else
            {
                restaurant.RestaurantImage = existingRestaurant.RestaurantImage;
            }

            existingRestaurant.RestaurantName = restaurant.RestaurantName;
            existingRestaurant.RestaurantLocation = restaurant.RestaurantLocation;
            existingRestaurant.RestaurantSubLocation = restaurant.RestaurantSubLocation;
            existingRestaurant.RestaurantPincode = restaurant.RestaurantPincode;
            existingRestaurant.RestaurantContact = restaurant.RestaurantContact;
            existingRestaurant.RestaurantImage = restaurant.RestaurantImage;

            var p = _context.Places.Find(restaurant.Place.PlaceId);
            existingRestaurant.Place = p;
            await _context.SaveChangesAsync();

            return existingRestaurant;
        }
        
        public Restaurant DeleteRestaurant(int id)
        {
            var restaurant = _context.Restaurants.Find(id);
            if (restaurant == null)
            {
                return null;
            }

            _context.Restaurants.Remove(restaurant);
            _context.SaveChanges();
            return restaurant;
        }

    }
}
