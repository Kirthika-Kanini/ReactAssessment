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
    public class PlaceTest
    {

        [Fact]
        public void Get_ReturnsListOfPlaces()
        {
            // Arrange
            var mockRepository = new Mock<IPlace>();
            var expectedPlaces = new List<Place>
            {
            new Place { PlaceId = 1, PlaceName = "Manali", PlaceDescription = "Chennai",Latitude="1",Longitude="1",MaxDistance=7,TourCost=3,DayCost=3,TotalDays=9, Route = "Shollinganallur",RouteImage="22c99dc5-ef05-45cf-b768-da54e4b16e5e.jpg" ,Spots = "600119", SpotsImage="22c99dc5-ef05-45cf-b768-da54e4b16e5e.jpg",PlaceImage = "22c99dc5-ef05-45cf-b768-da54e4b16e5e.jpg" },
          new Place { PlaceId = 2, PlaceName = "Paris", PlaceDescription = "Chennai",Latitude="1",Longitude="1",MaxDistance=7,TourCost=3,DayCost=3,TotalDays=9, Route = "Shollinganallur",RouteImage="22c99dc5-ef05-45cf-b768-da54e4b16e5e.jpg" ,Spots = "600119", SpotsImage="22c99dc5-ef05-45cf-b768-da54e4b16e5e.jpg",PlaceImage = "22c99dc5-ef05-45cf-b768-da54e4b16e5e.jpg" },
            }; 
           mockRepository.Setup(repo => repo.GetPlace()).Returns(expectedPlaces);
            var controller = new PlaceController(mockRepository.Object);

            // Act
            var result = controller.Get();

            // Assert
            var actionResult = Assert.IsType<ActionResult<IEnumerable<Place>>>(result);
            var okResult = Assert.IsType<OkObjectResult>(actionResult.Result);
            var actualPlaces = Assert.IsAssignableFrom<IEnumerable<Place>>(okResult.Value);
            Assert.Equal(expectedPlaces, actualPlaces);
        }

        [Fact]

        public void GetById_ExistingId_ReturnsPlace()
        {
            // Arrange
            var mockRepository = new Mock<IPlace>();
            var expectedPlaces = new Place { PlaceId = 1, PlaceName = "Manali", PlaceDescription = "Chennai", Latitude = "1", Longitude = "1", MaxDistance = 7, TourCost = 3, DayCost = 3, TotalDays = 9, Route = "Shollinganallur", RouteImage = "22c99dc5-ef05-45cf-b768-da54e4b16e5e.jpg", Spots = "600119", SpotsImage = "22c99dc5-ef05-45cf-b768-da54e4b16e5e.jpg", PlaceImage = "22c99dc5-ef05-45cf-b768-da54e4b16e5e.jpg" };
            mockRepository.Setup(repo => repo.GetPlacesById(1)).Returns(expectedPlaces);
            var controller = new PlaceController(mockRepository.Object);

            // Act
            var result = controller.Get(1); // Replace '1' with the ID of the existing place you want to retrieve

            // Assert
            var actionResult = Assert.IsType<ActionResult<Place>>(result);
            var okResult = Assert.IsType<OkObjectResult>(actionResult.Result);
            var place = Assert.IsType<Place>(okResult.Value);
            Assert.Equal(expectedPlaces, place); 
        }

        [Fact]
        public async Task PostPlace_ValidPlace_ReturnsCreatedPlace()
        {
            // Arrange
            var mockRepository = new Mock<IPlace>();
            var expectedPlaces = new Place { PlaceId = 1, PlaceName = "Manali", PlaceDescription = "Chennai", Latitude = "1", Longitude = "1", MaxDistance = 7, TourCost = 3, DayCost = 3, TotalDays = 9, Route = "Shollinganallur", RouteImage = "22c99dc5-ef05-45cf-b768-da54e4b16e5e.jpg", Spots = "600119", SpotsImage = "22c99dc5-ef05-45cf-b768-da54e4b16e5e.jpg", PlaceImage = "22c99dc5-ef05-45cf-b768-da54e4b16e5e.jpg" };
            var mockFormFile = new Mock<IFormFile>();
            mockRepository.Setup(repo => repo.PostPlace(expectedPlaces, mockFormFile.Object)).ReturnsAsync(expectedPlaces);
            var controller = new PlaceController(mockRepository.Object);

            // Act
            var result = await controller.Post(expectedPlaces, mockFormFile.Object);

            // Assert
            var actionResult = Assert.IsType<ActionResult<Place>>(result);
            var okResult = Assert.IsType<OkObjectResult>(actionResult.Result);
            var actualCreatedPlace = Assert.IsType<Place>(okResult.Value);
            Assert.Equal(expectedPlaces, actualCreatedPlace);
        }
        [Fact]
        public async Task PutHotel_ValidPlace_ReturnsUpdatedPlace()
        {
            // Arrange
            var mockRepository = new Mock<IPlace>();
            var expectedPlaces = new Place { PlaceId = 1, PlaceName = "Manali", PlaceDescription = "Chennai", Latitude = "1", Longitude = "1", MaxDistance = 7, TourCost = 3, DayCost = 3, TotalDays = 9, Route = "Shollinganallur", RouteImage = "22c99dc5-ef05-45cf-b768-da54e4b16e5e.jpg", Spots = "600119", SpotsImage = "22c99dc5-ef05-45cf-b768-da54e4b16e5e.jpg", PlaceImage = "22c99dc5-ef05-45cf-b768-da54e4b16e5e.jpg" };
            var updatedPlace = new Place { PlaceId = 1, PlaceName = "Paris", PlaceDescription = "City of Love", Latitude = "1", Longitude = "1", MaxDistance = 7, TourCost = 3, DayCost = 3, TotalDays = 9, Route = "Shollinganallur", RouteImage = "22c99dc5-ef05-45cf-b768-da54e4b16e5e.jpg", Spots = "600119", SpotsImage = "22c99dc5-ef05-45cf-b768-da54e4b16e5e.jpg", PlaceImage = "22c99dc5-ef05-45cf-b768-da54e4b16e5e.jpg" };
            var mockFormFile = new Mock<IFormFile>();
            mockRepository.Setup(repo => repo.PutPlace(expectedPlaces.PlaceId, updatedPlace, mockFormFile.Object)).ReturnsAsync(expectedPlaces);
            var controller = new PlaceController(mockRepository.Object);

            // Act
            var result = await controller.Put(expectedPlaces.PlaceId, updatedPlace, mockFormFile.Object);

            // Assert
            var actionResult = Assert.IsType<ActionResult<Place>>(result);
            var okResult = Assert.IsType<OkObjectResult>(actionResult.Result);
            var actualUpdatedPlace = Assert.IsType<Place>(okResult.Value);
            Assert.Equal(expectedPlaces, actualUpdatedPlace);
        }

        [Fact]
        public void DeleteHotel_ExistingId_ReturnsDeletedHotel()
        {
            // Arrange
            var mockRepository = new Mock<IPlace>();
            var placeToDelete =new Place { PlaceId = 1, PlaceName = "Manali", PlaceDescription = "Chennai", Latitude = "1", Longitude = "1", MaxDistance = 7, TourCost = 3, DayCost = 3, TotalDays = 9, Route = "Shollinganallur", RouteImage = "22c99dc5-ef05-45cf-b768-da54e4b16e5e.jpg", Spots = "600119", SpotsImage = "22c99dc5-ef05-45cf-b768-da54e4b16e5e.jpg", PlaceImage = "22c99dc5-ef05-45cf-b768-da54e4b16e5e.jpg" };
            mockRepository.Setup(repo => repo.DeletePlace(1)).Returns(placeToDelete);
            var controller = new PlaceController(mockRepository.Object);

            // Act
            var result = controller.Delete(1);

            // Assert
            var actionResult = Assert.IsType<ActionResult<Place>>(result);
            var okResult = Assert.IsType<OkObjectResult>(actionResult.Result);
            var actualDeletedHotel = Assert.IsType<Place>(okResult.Value);
            Assert.Equal(placeToDelete, actualDeletedHotel);
        }


    }
}
