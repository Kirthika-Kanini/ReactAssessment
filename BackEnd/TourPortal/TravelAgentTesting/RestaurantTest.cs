using Microsoft.AspNetCore.Http;
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
    public class RestaurantTest
    {

        [Fact]
        public void Get_ReturnsListOfRestaurants()
        {
            // Arrange
            var mockRepository = new Mock<IRestaurant>();
            var expectedRestaurants = new List<Restaurant>
            {
            new Restaurant { RestaurantId = 1, RestaurantName = "Ibis", RestaurantLocation = "Chennai", RestaurantSubLocation = "Shollinganallur", RestaurantPincode = "600119", RestaurantImage = "22c99dc5-ef05-45cf-b768-da54e4b16e5e.jpg", RestaurantContact = "6383145933" },
                new Restaurant { RestaurantId = 2, RestaurantName = "HolidayInn", RestaurantLocation = "Chennai", RestaurantSubLocation = "Shollinganallur", RestaurantPincode = "600119", RestaurantImage = "22c99dc5-ef05-45cf-b768-da54e4b16e5e.jpg", RestaurantContact = "6383145933" }
            };
            mockRepository.Setup(repo => repo.GetRestaurant()).Returns(expectedRestaurants);
            var controller = new RestaurantController(mockRepository.Object);

            // Act
            var result = controller.Get();

            // Assert
            var actionResult = Assert.IsType<ActionResult<IEnumerable<Restaurant>>>(result);
            var okResult = Assert.IsType<OkObjectResult>(actionResult.Result);
            var actualRestaurants = Assert.IsAssignableFrom<IEnumerable<Restaurant>>(okResult.Value);
            Assert.Equal(expectedRestaurants, actualRestaurants);
        }
        [Fact]

        public void GetById_ExistingId_ReturnsRestaurant()
        {
            // Arrange
            var mockRepository = new Mock<IRestaurant>();
            var expectedRestaurants = new Restaurant { RestaurantId = 1, RestaurantName = "Ibis", RestaurantLocation = "Chennai", RestaurantSubLocation = "Shollinganallur", RestaurantPincode = "600119", RestaurantImage = "22c99dc5-ef05-45cf-b768-da54e4b16e5e.jpg", RestaurantContact = "6383145933" };
            mockRepository.Setup(repo => repo.GetRestaurantsById(1)).Returns(expectedRestaurants);
            var controller = new RestaurantController(mockRepository.Object);

            // Act
            var result = controller.Get(1);

            // Assert
            var actionResult = Assert.IsType<ActionResult<Restaurant>>(result);
            var okResult = Assert.IsType<OkObjectResult>(actionResult.Result);
            var actualRestaurants = Assert.IsType<Restaurant>(okResult.Value);
            Assert.Equal(expectedRestaurants, actualRestaurants);
        }
        [Fact]
        public async Task PostRestaurant_ValidHotel_ReturnsCreatedRestaurant()
        {
            // Arrange
            var mockRepository = new Mock<IRestaurant>();
            var expectedRestaurant = new Restaurant { RestaurantId = 1, RestaurantName = "Ibis", RestaurantLocation = "Chennai", RestaurantSubLocation = "Shollinganallur", RestaurantPincode = "600119", RestaurantImage = "22c99dc5-ef05-45cf-b768-da54e4b16e5e.jpg", RestaurantContact = "6383145933" };
            var mockFormFile = new Mock<IFormFile>();
            mockRepository.Setup(repo => repo.PostRestaurant(expectedRestaurant, mockFormFile.Object)).ReturnsAsync(expectedRestaurant);
            var controller = new RestaurantController(mockRepository.Object);

            // Act
            var result = await controller.Post(expectedRestaurant, mockFormFile.Object);

            // Assert
            var actionResult = Assert.IsType<ActionResult<Restaurant>>(result);
            var okResult = Assert.IsType<OkObjectResult>(actionResult.Result);
            var actualCreatedRestaurant = Assert.IsType<Restaurant>(okResult.Value);
            Assert.Equal(expectedRestaurant, actualCreatedRestaurant);
        }
        [Fact]
        public async Task PutHotel_ValidHotel_ReturnsUpdatedHotel()
        {
            // Arrange
            var mockRepository = new Mock<IRestaurant>();
            var existingRestaurant = new Restaurant { RestaurantId = 1, RestaurantName = "Ibis", RestaurantLocation = "Chennai", RestaurantSubLocation = "Shollinganallur", RestaurantPincode = "600119", RestaurantImage = "22c99dc5-ef05-45cf-b768-da54e4b16e5e.jpg", RestaurantContact = "6383145933" };
            var updatedRestaurant = new Restaurant { RestaurantId = 1, RestaurantName = "Radison", RestaurantLocation = "Chennai", RestaurantSubLocation = "Shollinganallur", RestaurantPincode = "600119", RestaurantImage = "22c99dc5-ef05-45cf-b768-da54e4b16e5e.jpg", RestaurantContact = "6383145933" };
            var mockFormFile = new Mock<IFormFile>();
            mockRepository.Setup(repo => repo.PutRestaurant(existingRestaurant.RestaurantId, updatedRestaurant, mockFormFile.Object)).ReturnsAsync(existingRestaurant);
            var controller = new RestaurantController(mockRepository.Object);

            // Act
            var result = await controller.Put(existingRestaurant.RestaurantId, updatedRestaurant, mockFormFile.Object);

            // Assert
            var actionResult = Assert.IsType<ActionResult<Restaurant>>(result);
            var okResult = Assert.IsType<OkObjectResult>(actionResult.Result);
            var actualUpdatedRestaurant = Assert.IsType<Restaurant>(okResult.Value);
            Assert.Equal(existingRestaurant, actualUpdatedRestaurant);
        }

        [Fact]
        public void DeleteHotel_ExistingId_ReturnsDeletedHotel()
        {
            // Arrange
            var mockRepository = new Mock<IRestaurant>();
            var restaurantToDelete = new Restaurant { RestaurantId = 1, RestaurantName = "Ibis", RestaurantLocation = "Chennai", RestaurantSubLocation = "Shollinganallur", RestaurantPincode = "600119", RestaurantImage = "22c99dc5-ef05-45cf-b768-da54e4b16e5e.jpg", RestaurantContact = "6383145933" };
            mockRepository.Setup(repo => repo.DeleteRestaurant(1)).Returns(restaurantToDelete);
            var controller = new RestaurantController(mockRepository.Object);

            // Act
            var result = controller.Delete(1);

            // Assert
            var actionResult = Assert.IsType<ActionResult<Restaurant>>(result);
            var okResult = Assert.IsType<OkObjectResult>(actionResult.Result);
            var actualDeletedRestaurant = Assert.IsType<Restaurant>(okResult.Value);
            Assert.Equal(restaurantToDelete, actualDeletedRestaurant);
        }
    }
}
