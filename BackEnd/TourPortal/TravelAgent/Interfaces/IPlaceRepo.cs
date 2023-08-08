using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis;
using TravelAgent.Models;

namespace TravelAgent.Interfaces
{
    public interface IPlaceRepo
    {
        public Task<List<Place>> GetPlace();

        public Task<List<Place>> GetPlaceById(int Id);

        public Task<Place> CreatePlace([FromForm] Place place, IFormFile imageFile);

        public Task<Place> UpdatePlace(int Id, Place place, IFormFile imageFile);

        public Task<Place> DeletePlace(int Id);
    }
}
