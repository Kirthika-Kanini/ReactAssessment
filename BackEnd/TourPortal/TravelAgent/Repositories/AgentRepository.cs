using Microsoft.EntityFrameworkCore;
using TravelAgent.Data;
using TravelAgent.Interfaces;
using TravelAgent.Models;

namespace TravelAgent.Repositories
{
    public class AgentRepository:IAgent
    {
        private readonly AgentContext _Context;
        public AgentRepository(AgentContext con)
        {
            _Context = con;
        }
        public IEnumerable<Agent> GetAgent()
        {
            return _Context.Agents.Include(x=>x.Place).ToList();
        }
        public Agent GetAgentsById(int id)
        {
            return _Context.Agents.Include(p => p.Place).FirstOrDefault(x => x.TravelAgentId == id);
 
        }
        public Agent PostAgents(Agent agent)
        {
            _Context.Add(agent);
            _Context.SaveChanges();
            return agent;
        }
        public Agent PutAgent(int id, Agent agent)
        {
            _Context.Entry(agent).State = EntityState.Modified;
            _Context.SaveChanges();
            return agent;
        }

        public Agent DeleteAgent(int id)
        {

            var agent = _Context.Agents.Find(id);

            _Context.Agents.Remove(agent);
            _Context.SaveChanges();

            return agent;
        }
    }
}
