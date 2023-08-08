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
    public class PlaceController : ControllerBase
    {
        private readonly IPlace _placeRepository;

        public PlaceController(IPlace placeRepository)
        {
            _placeRepository = placeRepository;
        }

        // GET: api/Place
        [HttpGet]
    
        public ActionResult<IEnumerable<Place>> Get()
        {
            var myPlace = _placeRepository.GetPlace();
            if (myPlace != null)
                return Ok(myPlace);
            return BadRequest((new { ErrorMessage = "No Places are Existing" }));
        }

        // GET: api/Place/5
        [HttpGet("{id}")]
        public ActionResult<Place> Get(int id)
        {

            var place = _placeRepository.GetPlacesById(id);
            if (place != null)
                return Ok(place);
            return NotFound((new { ErrorMessage = "Place not found" }));
            
        }

        // POST: api/Place
        [Authorize(Roles = "Agent")]
        [HttpPost]
        public async Task<ActionResult<Place>> Post([FromForm] Place place, IFormFile imageFile)
        {
            if (place == null)
                return BadRequest((new { ErrorMessage = "Invalid Place data" }));

            var createdPlace = await _placeRepository.PostPlace(place, imageFile);
            if (createdPlace != null)
                return Ok(createdPlace);
            return StatusCode(500, (new { ErrorMessage = "Place creation failed" }));
        }

        // PUT: api/Place/5
        [Authorize(Roles = "Agent")]
        [HttpPut("{id}")]
        public async Task<ActionResult<Place>> Put(int id, [FromForm] Place place, IFormFile imageFile)
        {
            try
            {
                if (place == null)
                    return BadRequest((new { ErrorMessage = "Invalid place data" }));

                var updatedPlace = await _placeRepository.PutPlace(id, place, imageFile);
                if (updatedPlace != null)
                    return Ok(updatedPlace);
                return NotFound((new { ErrorMessage = "Place not found" }));
            }
            catch (ArgumentException ex)
            {
                ModelState.AddModelError("", ex.Message);
                return BadRequest(ModelState);
            }
        }

        // DELETE: api/Place/5
        [Authorize(Roles = "Agent")]
        [HttpDelete("{id}")]
        public ActionResult<Place> Delete(int id)
        {
            var place = _placeRepository.DeletePlace(id);
            if (place != null)
                return Ok(place);
            return NotFound((new { ErrorMessage = "Place not found" }));
        }

        [HttpGet("filter")]
        public ActionResult<IEnumerable<Place>> GetFilteredPlaces([FromQuery] string placeName, [FromQuery] int tourCost, [FromQuery] string spots)
        {
            var filteredPlaces = _placeRepository.GetFilter(placeName, tourCost, spots);
            return Ok(filteredPlaces);
        }
    }
}
