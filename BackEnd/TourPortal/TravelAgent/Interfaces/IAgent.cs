using TravelAgent.Models;

namespace TravelAgent.Interfaces
{
    public interface IAgent
    {
        public IEnumerable<Agent> GetAgent();
        public Agent GetAgentsById(int id);
        public Agent PostAgents(Agent agent);
        public Agent PutAgent(int id, Agent agent);
        public Agent DeleteAgent(int id);
    }
}
