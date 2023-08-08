using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TravelAgent.Interfaces;
using TravelAgent.Models;

namespace TravelAgent.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class AgentsController : ControllerBase
    {
        private readonly IAgent _agentRepository;

        public AgentsController(IAgent agentRepository)
        {
            _agentRepository = agentRepository;
        }

        // GET: api/Agents
        [HttpGet]
        public ActionResult<IEnumerable<Agent>> GetAgents()
        {
            var myAgent = _agentRepository.GetAgent();
            if (myAgent != null)
                return Ok(myAgent);
            return BadRequest((new { ErrorMessage = "No Agents are Existing" }));
        }
        // GET: api/Agents/5
        [HttpGet("{id}")]
        public ActionResult<Agent> GetAgentById(int id)
        {
            var agent = _agentRepository.GetAgentsById(id);
            if (agent != null)
                return Ok(agent);
            return NotFound((new { ErrorMessage = "Agent not found" }));
        }

        // POST: api/Agents
        [HttpPost]
        public ActionResult PostAgent(Agent agent)
        {
            if (agent == null)
                return BadRequest((new { ErrorMessage = "Invalid Agent data" }));

            var createdAdmin = _agentRepository.PostAgents(agent);
            if (createdAdmin != null)
                return Ok(createdAdmin);
            return StatusCode(500, (new { ErrorMessage = "Agent creation failed" }));
        }

        // PUT: api/Agents/5
        [HttpPut("{id}")]

        public ActionResult PutAgent(int id, Agent agent)
        {
            try
            {
                if (agent == null)
                    return BadRequest((new { ErrorMessage = "Invalid Agent data" }));

                var updatedAgent = _agentRepository.PutAgent(id, agent);
                if (updatedAgent != null)
                    return Ok(updatedAgent);
                return NotFound((new { ErrorMessage = "Agent not found" }));
            }
            catch (ArgumentException ex)
            {
                ModelState.AddModelError("", ex.Message);
                return BadRequest(ModelState);
            }
        }


        // DELETE: api/Agents/5
        [HttpDelete("{id}")]
        public ActionResult DeleteAgent(int id)
        {
            var agent = _agentRepository.DeleteAgent(id);
            if (agent != null)
                return Ok(agent);
            return NotFound((new { ErrorMessage = "Agent not found" }));
        }
    }
}
