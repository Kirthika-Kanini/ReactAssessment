using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using TravelAgent.Interfaces;
using TravelAgent.Models;
using TravelAgent.Repositories;

namespace TravelAgent.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RestaurantController : ControllerBase
    {
        private readonly IRestaurant _restaurantRepository; // Use the interface IHotel here

        public RestaurantController(IRestaurant restaurantRepository) // Use IHotel in the constructor
        {
            _restaurantRepository = restaurantRepository;
        }

        // GET: api/Restaurant
        [HttpGet]
        public ActionResult<IEnumerable<Restaurant>> Get()
        {
            var myRestaurant = _restaurantRepository.GetRestaurant();
            if (myRestaurant != null)
                return Ok(myRestaurant);
            return BadRequest((new { ErrorMessage = "No Restaurants are Existing" }));
        }

        // GET: api/Restaurant/5
        [HttpGet("{id}")]
        public ActionResult<Restaurant> Get(int id)
        {
            var restaurant = _restaurantRepository.GetRestaurantsById(id);
            if (restaurant != null)
                return Ok(restaurant);
            return NotFound((new { ErrorMessage = "Restaurant not found" }));
        }

        // POST: api/Restaurant
        [Authorize(Roles = "Agent")]
        [HttpPost]
        public async Task<ActionResult<Restaurant>> Post([FromForm] Restaurant restaurant, IFormFile imageFile)
        {
            if (restaurant == null)
                return BadRequest((new { ErrorMessage = "Invalid Restaurant data" }));

            var createdRestaurant = await _restaurantRepository.PostRestaurant(restaurant, imageFile);
            if (createdRestaurant != null)
                return Ok(createdRestaurant);
            return StatusCode(500, (new { ErrorMessage = "Restaurant creation failed" }));
        }

        // PUT: api/Restaurant/5
        [Authorize(Roles = "Agent")]
        [HttpPut("{id}")]
        public async Task<ActionResult<Restaurant>> Put(int id, [FromForm] Restaurant restaurant, IFormFile imageFile)
        {
            try
            {
                if (restaurant == null)
                    return BadRequest((new { ErrorMessage = "Invalid Restaurant data" }));

                var updatedRestaurant = await _restaurantRepository.PutRestaurant(id, restaurant, imageFile);
                if (updatedRestaurant != null)
                    return Ok(updatedRestaurant);
                return NotFound((new { ErrorMessage = "Restaurant not found" }));
            }
            catch (ArgumentException ex)
            {
                ModelState.AddModelError("", ex.Message);
                return BadRequest(ModelState);
            }
        }

        // DELETE: api/Restaurant/5
        [Authorize(Roles = "Agent")]
        [HttpDelete("{id}")]
        public ActionResult<Restaurant> Delete(int id)
        {
            var restaurant = _restaurantRepository.DeleteRestaurant(id);
            if (restaurant != null)
                return Ok(restaurant);
            return NotFound((new { ErrorMessage = "Place not found" }));
        }
    }
}
