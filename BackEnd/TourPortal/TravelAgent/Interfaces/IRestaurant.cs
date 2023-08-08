using Microsoft.AspNetCore.Mvc;
using TravelAgent.Models;

namespace TravelAgent.Interfaces
{
    public interface IRestaurant
    {
        public IEnumerable<Restaurant> GetRestaurant();
        public Restaurant GetRestaurantsById(int id);
        Task<Restaurant> PostRestaurant([FromForm] Restaurant restaurant, IFormFile imageFile);

        Task<Restaurant> PutRestaurant(int id, [FromForm] Restaurant restaurant, IFormFile imageFile);
        public Restaurant DeleteRestaurant(int id);
    }
}
