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
    public class FeedbacksController : ControllerBase
    {
        private readonly IFeedback _feedbackRepository;

        public FeedbacksController(IFeedback feedbackRepository)
        {
            _feedbackRepository = feedbackRepository;
        }

        // GET: api/Feedback
        [HttpGet]
        public IEnumerable<Feedback> Get()
        {
            return _feedbackRepository.GetFeedback();
        }

        // GET: api/Feedback/5
        [HttpGet("{id}")]
        public ActionResult<Feedback> GetById(int id)
        {
            var feedback = _feedbackRepository.GetFeedbacksById(id);

            if (feedback == null)
            {
                return NotFound();
            }

            return feedback;
        }

        // POST: api/Feedback
        [HttpPost]
        public ActionResult<Feedback> Post(Feedback feedback)
        {
            var p = _feedbackRepository.PostFeedback(feedback);
            return CreatedAtAction(nameof(GetById), new { id = p.FeedbackId }, p);
        }

        // PUT: api/Feedback/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, Feedback feedback)
        {
            var updatedFeedback = _feedbackRepository.PutFeedback(id, feedback);
            return Ok(updatedFeedback);
        }

        // DELETE: api/Feedback/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var feedback = _feedbackRepository.DeleteFeedback(id);

            if (feedback == null)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
