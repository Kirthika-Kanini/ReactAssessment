using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis;
using Microsoft.EntityFrameworkCore;
using TravelAgent.Data;
using TravelAgent.Interfaces;
using TravelAgent.Models;

namespace TravelAgent.Repositories
{

        public class PlaceRepo : IPlaceRepo
        {
            private readonly AgentContext _context;
            private readonly IWebHostEnvironment _webHostEnvironment;

            public PlaceRepo(AgentContext context, IWebHostEnvironment webHostEnvironment)
            {
                _context = context;
                _webHostEnvironment = webHostEnvironment;
            }

            public async Task<List<Place>> GetPlace()
            {
                return await _context.Places.ToListAsync();
            }

            public async Task<List<Place>> GetPlaceById(int Id)
            {
                try
                {
                    return await _context.Places.Where(x => x.PlaceId == Id).ToListAsync();
                }
                catch (Exception)
                {
                    return null;
                }
            }

            public async Task<Place> CreatePlace([FromForm] Place place, IFormFile imageFile)
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
                await _context.SaveChangesAsync();

                return place;
            }
            public async Task<Place> UpdatePlace(int Id, Place place, IFormFile imageFile)
            {
            var existingPlace = await _context.Places.FindAsync(Id);

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
        public async Task<Place> DeletePlace(int Id)
            {
                try
                {
                    Place place = await _context.Places.FirstOrDefaultAsync(x => x.PlaceId == Id);
                    if (place != null)
                    {
                        _context.Places.Remove(place);
                        _context.SaveChangesAsync();
                        return place;
                    }
                    return null;
                }
                catch (Exception)
                {
                    return null;
                }
            }

    }
}
