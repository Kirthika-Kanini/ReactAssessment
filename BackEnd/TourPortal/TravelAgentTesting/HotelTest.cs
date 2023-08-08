using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using TravelAgent.Controllers;
using TravelAgent.Interfaces;
using TravelAgent.Models;
using TravelAgent.Repositories;

namespace TravelAgentTesting
{
    public class HotelTest
    {
        [Fact]
        public void Get_ReturnsListOfHotels()
        {
            // Arrange
            var mockRepository = new Mock<IHotel>();
            var expectedHotels = new List<Hotel>
            {
            new Hotel { HotelId = 1, HotelName = "Ibis", HotelLocation = "Chennai", HotelSubLocation = "Shollinganallur", HotelPincode = "600119", HotelImage = "22c99dc5-ef05-45cf-b768-da54e4b16e5e.jpg", HotelContact = "6383145933" },
                new Hotel { HotelId = 2, HotelName = "Holiday Inn", HotelLocation = "Chennai", HotelSubLocation = "Shollinganallur", HotelPincode = "600119", HotelImage = "23c99dc5-ef05-45cf-b768-da54e4b16e5e.jpg", HotelContact = "6383145933" }
            };
            mockRepository.Setup(repo => repo.GetHotel()).Returns(expectedHotels);
            var controller = new HotelController(mockRepository.Object);

            // Act
            var result = controller.GetHotel();

            // Assert
            var actionResult = Assert.IsType<ActionResult<IEnumerable<Hotel>>>(result);
            var okResult = Assert.IsType<OkObjectResult>(actionResult.Result);
            var actualHotels = Assert.IsAssignableFrom<IEnumerable<Hotel>>(okResult.Value);
            Assert.Equal(expectedHotels, actualHotels);
        }
        [Fact]

        public void GetById_ExistingId_ReturnsHotel()
        {
            // Arrange
            var mockRepository = new Mock<IHotel>();
            var expectedHotels = new Hotel { HotelId = 1, HotelName = "Ibis", HotelLocation = "Chennai", HotelSubLocation = "Shollinganallur", HotelPincode = "600119", HotelImage = "22c99dc5-ef05-45cf-b768-da54e4b16e5e.jpg", HotelContact = "6383145933" };
            mockRepository.Setup(repo => repo.GetHotelsById(1)).Returns(expectedHotels);
            var controller = new HotelController(mockRepository.Object);

            // Act
            var result = controller.GetById(1);

            // Assert
            var actionResult = Assert.IsType<ActionResult<Hotel>>(result);
            var okResult = Assert.IsType<OkObjectResult>(actionResult.Result);
            var actualHotels = Assert.IsType<Hotel>(okResult.Value);
            Assert.Equal(expectedHotels, actualHotels);
        }
        [Fact]
        public async Task PostHotel_ValidHotel_ReturnsCreatedHotel()
        {
            // Arrange
            var mockRepository = new Mock<IHotel>();
            var expectedHotel = new Hotel { HotelId = 1, HotelName = "Ibis", HotelLocation = "Chennai", HotelSubLocation = "Shollinganallur", HotelPincode = "600119", HotelImage = "22c99dc5-ef05-45cf-b768-da54e4b16e5e.jpg", HotelContact = "6383145933" };
            var mockFormFile = new Mock<IFormFile>();
            mockRepository.Setup(repo => repo.PostHotel(expectedHotel, mockFormFile.Object)).ReturnsAsync(expectedHotel);
            var controller = new HotelController(mockRepository.Object);

            // Act
            var result = await controller.Post(expectedHotel, mockFormFile.Object);

            // Assert
            var actionResult = Assert.IsType<ActionResult<Hotel>>(result);
            var okResult = Assert.IsType<OkObjectResult>(actionResult.Result);
            var actualCreatedHotel = Assert.IsType<Hotel>(okResult.Value);
            Assert.Equal(expectedHotel, actualCreatedHotel);
        }
        [Fact]
        public async Task PutHotel_ValidHotel_ReturnsUpdatedHotel()
        {
            // Arrange
            var mockRepository = new Mock<IHotel>();
            var existingHotel = new Hotel { HotelId = 1, HotelName = "Ibis", HotelLocation = "Chennai", HotelSubLocation = "Shollinganallur", HotelPincode = "600119", HotelImage = "22c99dc5-ef05-45cf-b768-da54e4b16e5e.jpg", HotelContact = "6383145933" };
            var updatedHotel = new Hotel { HotelId = 1, HotelName = "Radison", HotelLocation = "Chennai", HotelSubLocation = "Shollinganallur", HotelPincode = "600119", HotelImage = "22c99dc5-ef05-45cf-b768-da54e4b16e5e.jpg", HotelContact = "6383145933" };
            var mockFormFile = new Mock<IFormFile>();
            mockRepository.Setup(repo => repo.PutHotel(existingHotel.HotelId, updatedHotel, mockFormFile.Object)).ReturnsAsync(existingHotel);
            var controller = new HotelController(mockRepository.Object);

            // Act
            var result = await controller.Put(existingHotel.HotelId, updatedHotel, mockFormFile.Object);

            // Assert
            var actionResult = Assert.IsType<ActionResult<Hotel>>(result);
            var okResult = Assert.IsType<OkObjectResult>(actionResult.Result);
            var actualUpdatedHotel = Assert.IsType<Hotel>(okResult.Value);
            Assert.Equal(existingHotel, actualUpdatedHotel);
        }

        [Fact]
        public void DeleteHotel_ExistingId_ReturnsDeletedHotel()
        {
            // Arrange
            var mockRepository = new Mock<IHotel>();
            var hotelToDelete = new Hotel { HotelId = 1, HotelName = "Ibis", HotelLocation = "Chennai", HotelSubLocation = "Shollinganallur", HotelPincode = "600119", HotelImage = "22c99dc5-ef05-45cf-b768-da54e4b16e5e.jpg", HotelContact = "6383145933" };
            mockRepository.Setup(repo => repo.DeleteHotel(1)).Returns(hotelToDelete);
            var controller = new HotelController(mockRepository.Object);

            // Act
            var result = controller.Delete(1);

            // Assert
            var actionResult = Assert.IsType<ActionResult<Hotel>>(result);
            var okResult = Assert.IsType<OkObjectResult>(actionResult.Result);
            var actualDeletedHotel = Assert.IsType<Hotel>(okResult.Value);
            Assert.Equal(hotelToDelete, actualDeletedHotel);
        }
    }
}