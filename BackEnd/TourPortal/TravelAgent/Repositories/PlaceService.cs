using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis;
using TravelAgent.Interfaces;
using TravelAgent.Models;

namespace TravelAgent.Repositories
{
    public class PlaceService : IPlaceService
    {
        private readonly IPlaceRepo _repo;
        private readonly IWebHostEnvironment _environment;

        public PlaceService(IPlaceRepo repo, IWebHostEnvironment environment)
        {
            _repo = repo;
            _environment = environment;
        }
        public async Task<List<Place>> Get()
        {
            return await _repo.GetPlace();
        }
        public async Task<List<Place>> GetById(int Id)
        {
            return await _repo.GetPlaceById(Id);
        }
        public async Task<Place> Post([FromForm] Place place, IFormFile imageFile)
        {
            return await _repo.CreatePlace(place, imageFile);
        }
        public async Task<Place> Put([FromForm] int Id, Place place, IFormFile imageFile)
        {
            return await _repo.UpdatePlace(Id, place, imageFile);
        }
        public async Task<Place> Delete(int Id)
        {
            return await _repo.DeletePlace(Id);
        }

    }
}




