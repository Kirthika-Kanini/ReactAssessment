using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using User.Data;
using User.Interfaces;
using User.Models;

namespace User.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingsController : ControllerBase
    {
        private readonly IBooking _bookingRepository;

        public BookingsController(IBooking bookingRepository)
        {
            _bookingRepository = bookingRepository;
        }

        // GET: api/Feedback
        [HttpGet]
        public IEnumerable<Booking> Get()
        {
            return _bookingRepository.GetBooking();
        }

        // GET: api/Feedback/5
        [HttpGet("{id}")]
        public ActionResult<Booking> GetById(int id)
        {
            var booking = _bookingRepository.GetBookingsById(id);

            if (booking == null)
            {
                return NotFound();
            }

            return booking;
        }

        // POST: api/Feedback
        [HttpPost]
        public ActionResult<Booking> Post(Booking booking)
        {
            var p = _bookingRepository.PostBooking(booking);
            return CreatedAtAction(nameof(GetById), new { id = p.BookingId }, p);
        }

        // PUT: api/Feedback/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, Booking booking)
        {
            var updatedFeedback = _bookingRepository.PutBooking(id, booking);
            return Ok(updatedFeedback);
        }

        // DELETE: api/Feedback/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var feedback = _bookingRepository.DeleteBooking(id);

            if (feedback == null)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
