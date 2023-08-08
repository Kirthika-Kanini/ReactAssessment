using Microsoft.EntityFrameworkCore;
using TourPortal.Data;
using TourPortal.Interfaces;
using TourPortal.Models;
using TourPortal.Repository;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<TravelPortalContext>(op => op.UseSqlServer(builder.Configuration.GetConnectionString("ConnectionString")));
// Add BlobOptions as a configuration section
builder.Services.Configure<BlobOptions>(builder.Configuration.GetSection("BlobOptions"));
builder.Services.AddControllers().AddNewtonsoftJson(options =>
{
    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("MyCorsPolicy", builder =>
    {
        builder.AllowAnyOrigin();
        builder.AllowAnyMethod();
        builder.AllowAnyHeader();
    });
});
builder.Services.AddScoped<IAdmin, AdminRepository>();
builder.Services.AddScoped<IGallery, GalleryRepository>();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("MyCorsPolicy");
app.UseAuthorization();
app.UseStaticFiles();
app.MapControllers();

app.Run();
