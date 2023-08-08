using Microsoft.AspNetCore.Mvc;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TravelAgent.Controllers;
using TravelAgent.Interfaces;
using TravelAgent.Repositories;

namespace TravelAgentTesting
{
    public class AgentTest
    {
        [Fact]
        public void Get_ReturnsListOfAgents()
        {
            // Arrange
            var mockRepository = new Mock<IAgent>();
            var expectedAgents = new List<Agent>
            {
            new Agent { TravelAgentId = 1, TravelAgentName = "Kiki", TravelAgentPassword = "Kiki@123", TravelAgentEmail = "kiki@gmail.com",TravelAgentStatus="Requested",TravelAgentContact="6383145933",TravelAgentCompany="Travelia",TravelAgentCompanyAddress="Coimbatore" },
            new Agent { TravelAgentId = 2, TravelAgentName = "Kiki", TravelAgentPassword = "Kiki@123", TravelAgentEmail = "kiki@gmail.com",TravelAgentStatus="Requested",TravelAgentContact="6383145933",TravelAgentCompany="Travelia",TravelAgentCompanyAddress="Coimbatore" },
            };
            mockRepository.Setup(repo => repo.GetAgent()).Returns(expectedAgents);
            var controller = new AgentsController(mockRepository.Object);

            // Act
            var result = controller.GetAgents();

            // Assert
            var actionResult = Assert.IsType<ActionResult<IEnumerable<Agent>>>(result);
            var okResult = Assert.IsType<OkObjectResult>(actionResult.Result);
            var actualAdmins = Assert.IsAssignableFrom<IEnumerable<Agent>>(okResult.Value);
            Assert.Equal(expectedAgents, actualAdmins);
        }
        [Fact]
        public void GetById_ExistingId_ReturnsAgent()
        {
            // Arrange
            var mockRepository = new Mock<IAgent>();
            var expectedAgent = new Agent { TravelAgentId = 1, TravelAgentName = "Kiki", TravelAgentPassword = "Kiki@123", TravelAgentEmail = "kiki@gmail.com", TravelAgentStatus = "Requested", TravelAgentContact = "6383145933", TravelAgentCompany = "Travelia", TravelAgentCompanyAddress = "Coimbatore" };
            mockRepository.Setup(repo => repo.GetAgentsById(1)).Returns(expectedAgent);
            var controller = new AgentsController(mockRepository.Object);

            // Act
            var result = controller.GetAgentById(1);

            // Assert
            var actionResult = Assert.IsType<ActionResult<Agent>>(result);
            var okResult = Assert.IsType<OkObjectResult>(actionResult.Result);
            Assert.IsAssignableFrom<Agent>(okResult.Value);
            Assert.Equal(expectedAgent, okResult.Value);
        }
        [Fact]
        public void PostAgent_ValidData_ReturnsOkResult()
        {
            // Arrange
            var mockRepository = new Mock<IAgent>();
            var controller = new AgentsController(mockRepository.Object);
            var agentData = new Agent { TravelAgentId = 1, TravelAgentName = "Kiki", TravelAgentPassword = "Kiki@123", TravelAgentEmail = "kiki@gmail.com", TravelAgentStatus = "Requested", TravelAgentContact = "6383145933", TravelAgentCompany = "Travelia", TravelAgentCompanyAddress = "Coimbatore" };
            mockRepository.Setup(repo => repo.PostAgents(It.IsAny<Agent>())).Returns(agentData);

            // Act
            var result = controller.PostAgent(agentData);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnedAgent = Assert.IsType<Agent>(okResult.Value);
            Assert.Equal(agentData, returnedAgent);
        }


        [Fact]
        public void PostAgent_RepositoryReturnsNull_ReturnsServerError()
        {
            // Arrange
            var mockRepository = new Mock<IAgent>();
            var controller = new AgentsController(mockRepository.Object);
            var agentData = new Agent { TravelAgentId = 1, TravelAgentName = "Kiki", TravelAgentPassword = "Kiki@123", TravelAgentEmail = "kiki@gmail.com", TravelAgentStatus = "Requested", TravelAgentContact = "6383145933", TravelAgentCompany = "Travelia", TravelAgentCompanyAddress = "Coimbatore" };
            mockRepository.Setup(repo => repo.PostAgents(It.IsAny<Agent>())).Returns((Agent)null);

            // Act
            var result = controller.PostAgent(agentData);

            // Assert
            var statusResult = Assert.IsType<ObjectResult>(result);
            Assert.Equal(500, statusResult.StatusCode);
        }
        [Fact]
        public void Put_ValidData_ReturnsOkResult()
        {
            // Arrange
            var mockRepository = new Mock<IAgent>();
            var controller = new AgentsController(mockRepository.Object);
            var travelAgentId = 1;
            var agentData = new Agent { TravelAgentId = 1, TravelAgentName = "Kiki", TravelAgentPassword = "Kiki@123", TravelAgentEmail = "kiki@gmail.com", TravelAgentStatus = "Requested", TravelAgentContact = "6383145933", TravelAgentCompany = "Travelia", TravelAgentCompanyAddress = "Coimbatore" };
            mockRepository.Setup(repo => repo.PutAgent(travelAgentId, agentData)).Returns(agentData);

            // Act
            var result = controller.PutAgent(travelAgentId, agentData);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var updatedAgent = Assert.IsType<Agent>(okResult.Value);
            Assert.Equal(agentData, updatedAgent);
        }
        [Fact]
        public void DeleteAgent_ExistingId_ShouldReturnOkResult()
        {
            // Arrange
            int existingAgentId = 1;
            var mockRepository = new Mock<IAgent>();
            mockRepository.Setup(repo => repo.DeleteAgent(existingAgentId)).Returns(new Agent { TravelAgentId = existingAgentId });

            var controller = new AgentsController(mockRepository.Object);

            // Act
            var result = controller.DeleteAgent(existingAgentId);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var agent = Assert.IsType<Agent>(okResult.Value);
            Assert.Equal(existingAgentId, agent.TravelAgentId);
        }
    }
}
