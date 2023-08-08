using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis;
using TravelAgent.Interfaces;
using TravelAgent.Models;

namespace TravelAgent.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlaceServicesController : ControllerBase
    {
        private readonly IPlaceService place;

        public PlaceServicesController(IPlaceService place)
        {
            this.place = place;
        }

        [HttpGet]

        public async Task<List<Place>> Get()
        {
            return await place.Get();
        }

        [HttpGet("Id")]
        public async Task<List<Place>> GetById(int Id)
        {
            return await place.GetById(Id);
        }

        [HttpPost]
        public async Task<Place> Post([FromForm] Place Place, IFormFile imageFile)
        {
            return await place.Post(Place, imageFile);
        }

        [HttpPut("Id")]
        public async Task<Place> Put(int Id, Place Place, IFormFile imageFile)
        {
            return await place.Put(Id, Place, imageFile);
        }

        [HttpDelete("Id")]
        public async Task<Place> Delete(int Id)
        {
            return await place.Delete(Id);
        }
    }
}
