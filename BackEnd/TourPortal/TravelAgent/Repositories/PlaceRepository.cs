using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.EntityFrameworkCore;
using TravelAgent.Data;
using TravelAgent.Interfaces;
using TravelAgent.Models;

namespace TravelAgent.Repositories
{
    public class PlaceRepository:IPlace
    {
        private readonly AgentContext _context;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public PlaceRepository(AgentContext context, IWebHostEnvironment webHostEnvironment)
        {
            _context = context;
            _webHostEnvironment = webHostEnvironment;
        }

        public IEnumerable<Place> GetPlace()
        {
            return _context.Places.Include(x => x.Hotels).Include(x => x.Restaurants).Include(x => x.Agent).ToList();
        }

        public Place GetPlacesById(int id)
        {
            return _context.Places.Include(p => p.Agent)
        .FirstOrDefault(x => x.PlaceId == id);
        }

        public async Task<Place> PostPlace([FromForm] Place place, IFormFile imageFile)
        {
            if (imageFile == null || imageFile.Length == 0)
            {
                throw new ArgumentException("Invalid file");
            }

            var uploadsFolder = Path.Combine(_webHostEnvironment.WebRootPath, "uploads/place");
            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(imageFile.FileName);
            var filePath = Path.Combine(uploadsFolder, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(stream);
            }

            place.PlaceImage = fileName;
            var p = _context.Agents.Find(place.Agent.TravelAgentId);
            place.Agent = p;
            _context.Places.Add(place);
            _context.SaveChanges();

            return place;
        }

        public async Task<Place> PutPlace(int id, [FromForm] Place place, IFormFile imageFile)
        {
            var existingPlace = await _context.Places.FindAsync(id);

            if (existingPlace == null)
            {
                return null;
            }

            if (imageFile != null && imageFile.Length > 0)
            {
                var uploadsFolder = Path.Combine(_webHostEnvironment.WebRootPath, "uploads/place");

                if (!string.IsNullOrEmpty(existingPlace.PlaceImage))
                {
                    var existingFilePath = Path.Combine(uploadsFolder, existingPlace.PlaceImage);
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

                place.PlaceImage = fileName;
            }
            else
            {
                place.PlaceImage = existingPlace.PlaceImage;
            }

          existingPlace.PlaceName = place.PlaceName;
            existingPlace.PlaceDescription = place.PlaceDescription;
            existingPlace.Latitude = place.Latitude;
            existingPlace.Longitude = place.Longitude;
            existingPlace.DayCost = place.DayCost;
            existingPlace.TourCost = place.TourCost;
            existingPlace.MaxDistance = place.MaxDistance;
            existingPlace.Route = place.Route;
            existingPlace.RouteImage = place.RouteImage;
            existingPlace.TotalDays = place.TotalDays;
            existingPlace.Spots = place.Spots;
            existingPlace.SpotsImage = place.SpotsImage;
            existingPlace.PlaceImage = place.PlaceImage;
            var p = _context.Agents.Find(place.Agent.TravelAgentId);
            existingPlace.Agent = p; // <--- Set the Agent of existingPlace
            await _context.SaveChangesAsync();

            return existingPlace;

        }

        public Place DeletePlace(int id)
        {
            var place = _context.Places.Find(id);
            if (place == null)
            {
                return null;
            }

            _context.Places.Remove(place);
            _context.SaveChanges();
            return place;
        }
        public IEnumerable<Place> GetFilter(string placeName, int tourCost, string spots)
        {
            IQueryable<Place> query = _context.Places.Include(x => x.Hotels)
                                                    .Include(x => x.Restaurants)
                                                    .Include(x => x.Agent);

            if (!string.IsNullOrEmpty(placeName))
            {
                query = query.Where(p => p.PlaceName.ToLower().Contains(placeName.ToLower()));
            }

            if (tourCost > 0)
            {
                query = query.Where(p => p.TourCost == tourCost);
            }

            if (!string.IsNullOrEmpty(spots))
            {
                query = query.Where(p => p.Spots == spots);
            }

            return query.ToList();
        }

    }
}
