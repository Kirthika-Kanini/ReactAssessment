using Microsoft.EntityFrameworkCore;
using TourPortal.Models;

namespace TourPortal.Data
{
    public class TravelPortalContext : DbContext
    {
        public DbSet<Admin> Admins { get; set; }
     
        public DbSet<Gallery> Gallerys { get; set; }
        public DbSet<GalleryBlob> GalleryBlobs { get; set; } 

       
        
        public TravelPortalContext(DbContextOptions<TravelPortalContext> options) : base(options)
        {
        }
    }
}
