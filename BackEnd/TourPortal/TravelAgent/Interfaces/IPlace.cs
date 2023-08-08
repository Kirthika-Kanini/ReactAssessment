using Microsoft.AspNetCore.Mvc;
using TravelAgent.Models;

namespace TravelAgent.Interfaces
{
    public interface IPlace
    {
        public IEnumerable<Place> GetPlace();
        public Place GetPlacesById(int id);
        Task<Place> PostPlace([FromForm] Place place, IFormFile imageFile);

        Task<Place> PutPlace(int id, [FromForm] Place place, IFormFile imageFile);
        public Place DeletePlace(int id);
        public IEnumerable<Place> GetFilter(string placeName, int tourCost, string spots);
    }
}
