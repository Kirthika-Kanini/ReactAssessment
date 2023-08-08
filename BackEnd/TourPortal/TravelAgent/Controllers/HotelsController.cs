using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using TravelAgent.Interfaces;
using TravelAgent.Models;
using TravelAgent.Repositories;

namespace TravelAgent.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HotelController : ControllerBase
    {
        
        private readonly IHotel _hotelRepository; 

        public HotelController(IHotel hotelRepository) 
        {
            _hotelRepository = hotelRepository;
        }
        // GET: api/Hotel
        [HttpGet]
        public ActionResult<IEnumerable<Hotel>> GetHotel()
        {
            var myHotel = _hotelRepository.GetHotel();
            if (myHotel != null)
                return Ok(myHotel);
            return BadRequest((new { ErrorMessage = "No Hotels are Existing" }));
        }

        // GET: api/Hotel/5
        [HttpGet("{id}")]
        public ActionResult<Hotel> GetById(int id)
        {
            var hotel = _hotelRepository.GetHotelsById(id);
            if (hotel != null)
            return Ok(hotel);
            return NotFound((new { ErrorMessage = "Hotel not found" }));
           
            
        }

        // POST: api/Hotel
        [Authorize(Roles="Agent")]
        [HttpPost]
        public async Task<ActionResult<Hotel>> Post([FromForm] Hotel hotel, IFormFile imageFile)
        {
            if (hotel == null)
                return BadRequest((new { ErrorMessage = "Invalid Hotel data" }));

            var createdHotel = await _hotelRepository.PostHotel(hotel, imageFile);
            if (createdHotel != null)
                return Ok(createdHotel);
            return StatusCode(500, (new { ErrorMessage = "Hotel creation failed" }));
        }

        // PUT: api/Hotel/5
        [Authorize(Roles = "Agent")]
        [HttpPut("{id}")]
        public async Task<ActionResult<Hotel>> Put(int id, [FromForm] Hotel hotel, IFormFile imageFile)
        {

            try
            {
                if (hotel == null)
                    return BadRequest((new { ErrorMessage = "Invalid hotel data" }));

                var updatedHotel = await _hotelRepository.PutHotel(id, hotel, imageFile);
                if (updatedHotel != null)
                    return Ok(updatedHotel);
                return NotFound((new { ErrorMessage = "Hotel not found" }));
            }
            catch (ArgumentException ex)
            {
                ModelState.AddModelError("", ex.Message);
                return BadRequest(ModelState);
            }
        }

        // DELETE: api/Hotel/5
        [Authorize(Roles = "Agent")]
        [HttpDelete("{id}")]
        public ActionResult<Hotel> Delete(int id)
        {
            var hotel = _hotelRepository.DeleteHotel(id);
            if (hotel != null)
            return Ok(hotel);
            return NotFound((new { ErrorMessage = "Hotel not found" }));

        }
    }
}
