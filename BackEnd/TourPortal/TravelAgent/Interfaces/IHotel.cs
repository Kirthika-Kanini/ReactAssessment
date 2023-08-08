using Microsoft.AspNetCore.Mvc;
using TravelAgent.Models;

namespace TravelAgent.Interfaces
{
    public interface IHotel
    {
        public IEnumerable<Hotel> GetHotel();
        public Hotel GetHotelsById(int id);
        Task<Hotel> PostHotel([FromForm] Hotel hotel, IFormFile imageFile);

        Task<Hotel> PutHotel(int id, [FromForm] Hotel hotel, IFormFile imageFile);
        public Hotel DeleteHotel(int id);
    }
}
