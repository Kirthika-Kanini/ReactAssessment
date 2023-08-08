using Microsoft.EntityFrameworkCore;
using User.Models;
namespace User.Data
{
    public class UserContext:DbContext
    {
        public DbSet<Booking> Bookings { get; set; }
        public DbSet<UserDetail> UserDetails { get; set; }
        public DbSet<Feedback> Feedbacks { get; set; }
        public DbSet<Admin> Admins { get; set; }
        public UserContext(DbContextOptions<UserContext> options) : base(options)
        {
        }

    }
}
