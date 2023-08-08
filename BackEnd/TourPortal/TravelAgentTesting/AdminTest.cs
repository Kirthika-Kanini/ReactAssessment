using Microsoft.AspNetCore.Mvc;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TravelAgent.Controllers;
using TravelAgent.Interfaces;
using TravelAgent.Models;

namespace TravelAgentTesting
{
    public class AdminTest
    {
        [Fact]
        public void Get_ReturnsListOfAdmins()
        {
            // Arrange
            var mockRepository = new Mock<IAdmin>();
            var expectedAdmins = new List<Admin>
            {
            new Admin { Id = 1, Name = "Kiki", Password = "Kiki@123", Email = "kiki@gmail.com" },
            new Admin { Id = 2, Name = "Shree", Password = "Shree@123", Email = "shree@gmail.com" }
            };
            mockRepository.Setup(repo => repo.GetAdmin()).Returns(expectedAdmins);
            var controller = new AdminsController(mockRepository.Object);

            // Act
            var result = controller.GetAdmins();

            // Assert
            var actionResult = Assert.IsType<ActionResult<IEnumerable<Admin>>>(result);
            var okResult = Assert.IsType<OkObjectResult>(actionResult.Result);
            var actualAdmins = Assert.IsAssignableFrom<IEnumerable<Admin>>(okResult.Value);
            Assert.Equal(expectedAdmins, actualAdmins);
        }
        [Fact]
        public void GetById_ExistingId_ReturnsAdmin()
        {
            // Arrange
            var mockRepository = new Mock<IAdmin>();
            var expectedAdmin = new Admin { Id = 1, Name = "Kiki", Password = "Kiki@123", Email = "kiki@gmail.com" };
            mockRepository.Setup(repo => repo.GetAdminsById(1)).Returns(expectedAdmin);
            var controller = new AdminsController(mockRepository.Object);

            // Act
            var result = controller.GetAdminById(1);

            // Assert
               var actionResult = Assert.IsType<ActionResult<Admin>>(result);
            var okResult = Assert.IsType<OkObjectResult>(actionResult.Result);
            Assert.IsAssignableFrom<Admin>(okResult.Value);
            Assert.Equal(expectedAdmin, okResult.Value);
        }
        [Fact]
        public void PostAdmin_ValidData_ReturnsOkResult()
        {
            // Arrange
            var mockRepository = new Mock<IAdmin>();
            var controller = new AdminsController(mockRepository.Object);
            var adminData = new Admin { Id = 1, Name = "Kiki", Password = "Kiki@123", Email = "kiki@gmail.com" };
            mockRepository.Setup(repo => repo.PostAdmins(It.IsAny<Admin>())).Returns(adminData);

            // Act
            var result = controller.PostAdmin(adminData);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnedAdmin = Assert.IsType<Admin>(okResult.Value);
            Assert.Equal(adminData, returnedAdmin);
        }

      
        [Fact]
        public void PostAdmin_RepositoryReturnsNull_ReturnsServerError()
        {
            // Arrange
            var mockRepository = new Mock<IAdmin>();
            var controller = new AdminsController(mockRepository.Object);
            var adminData = new Admin { Id = 1, Name = "Kiki", Password = "Kiki@123", Email = "kiki@gmail.com" };
            mockRepository.Setup(repo => repo.PostAdmins(It.IsAny<Admin>())).Returns((Admin)null);

            // Act
            var result = controller.PostAdmin(adminData);

            // Assert
            var statusResult = Assert.IsType<ObjectResult>(result);
            Assert.Equal(500, statusResult.StatusCode);
        }
        [Fact]
        public void Put_ValidData_ReturnsOkResult()
        {
            // Arrange
            var mockRepository = new Mock<IAdmin>();
            var controller = new AdminsController(mockRepository.Object);
            var adminId = 1;
            var adminData = new Admin { Id = adminId, Name = "UpdatedName", Password = "UpdatedPass", Email = "updated@example.com" };
            mockRepository.Setup(repo => repo.PutAdmin(adminId, adminData)).Returns(adminData);

            // Act
            var result = controller.Put(adminId, adminData);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var updatedAdmin = Assert.IsType<Admin>(okResult.Value);
            Assert.Equal(adminData, updatedAdmin);
        }
        [Fact]
        public void DeleteAdmin_ExistingId_ShouldReturnOkResult()
        {
            // Arrange
            int existingAdminId = 1;
            var mockRepository = new Mock<IAdmin>();
            mockRepository.Setup(repo => repo.DeleteAdmin(existingAdminId)).Returns(new Admin { Id = existingAdminId });

            var controller = new AdminsController(mockRepository.Object);

            // Act
            var result = controller.DeleteAdmin(existingAdminId);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var admin = Assert.IsType<Admin>(okResult.Value);
            Assert.Equal(existingAdminId, admin.Id);
        }

      
    }
}




        

