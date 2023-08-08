using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TravelAgent.Migrations
{
    /// <inheritdoc />
    public partial class init : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Admins",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    Password = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Admins", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Agents",
                columns: table => new
                {
                    TravelAgentId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TravelAgentName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    TravelAgentPassword = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    TravelAgentStatus = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TravelAgentContact = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: true),
                    TravelAgentEmail = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TravelAgentCompany = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TravelAgentCompanyAddress = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Agents", x => x.TravelAgentId);
                });

            migrationBuilder.CreateTable(
                name: "Places",
                columns: table => new
                {
                    PlaceId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PlaceName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PlaceDescription = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Latitude = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Longitude = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DayCost = table.Column<int>(type: "int", nullable: true),
                    TourCost = table.Column<int>(type: "int", nullable: true),
                    MaxDistance = table.Column<int>(type: "int", nullable: true),
                    Route = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RouteImage = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TotalDays = table.Column<int>(type: "int", nullable: true),
                    Spots = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SpotsImage = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PlaceImage = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AgentTravelAgentId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Places", x => x.PlaceId);
                    table.ForeignKey(
                        name: "FK_Places_Agents_AgentTravelAgentId",
                        column: x => x.AgentTravelAgentId,
                        principalTable: "Agents",
                        principalColumn: "TravelAgentId");
                });

            migrationBuilder.CreateTable(
                name: "Hotels",
                columns: table => new
                {
                    HotelId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    HotelName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    HotelLocation = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    HotelSubLocation = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    HotelPincode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    HotelImage = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    HotelContact = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PlaceId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Hotels", x => x.HotelId);
                    table.ForeignKey(
                        name: "FK_Hotels_Places_PlaceId",
                        column: x => x.PlaceId,
                        principalTable: "Places",
                        principalColumn: "PlaceId");
                });

            migrationBuilder.CreateTable(
                name: "Restaurants",
                columns: table => new
                {
                    RestaurantId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RestaurantName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RestaurantLocation = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RestaurantSubLocation = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RestaurantPincode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RestaurantImage = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RestaurantContact = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PlaceId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Restaurants", x => x.RestaurantId);
                    table.ForeignKey(
                        name: "FK_Restaurants_Places_PlaceId",
                        column: x => x.PlaceId,
                        principalTable: "Places",
                        principalColumn: "PlaceId");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Hotels_PlaceId",
                table: "Hotels",
                column: "PlaceId");

            migrationBuilder.CreateIndex(
                name: "IX_Places_AgentTravelAgentId",
                table: "Places",
                column: "AgentTravelAgentId");

            migrationBuilder.CreateIndex(
                name: "IX_Restaurants_PlaceId",
                table: "Restaurants",
                column: "PlaceId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Admins");

            migrationBuilder.DropTable(
                name: "Hotels");

            migrationBuilder.DropTable(
                name: "Restaurants");

            migrationBuilder.DropTable(
                name: "Places");

            migrationBuilder.DropTable(
                name: "Agents");
        }
    }
}
