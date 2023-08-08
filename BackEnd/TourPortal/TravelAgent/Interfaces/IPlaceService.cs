using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis;
using TravelAgent.Models;

namespace TravelAgent.Interfaces
{
    public interface IPlaceService
    {
        public Task<List<Place>> Get();

        public Task<List<Place>> GetById(int Place_Id);

        public Task<Place> Post([FromForm] Place place, IFormFile imageFile);

        public Task<Place> Put([FromForm] int Id, Place place, IFormFile imageFile);

        public Task<Place> Delete(int Place_Id);
    }
}
