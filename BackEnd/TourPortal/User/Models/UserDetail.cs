using System.ComponentModel.DataAnnotations;

namespace User.Models
{
    public class UserDetail
    {
        [Key]
        public int Id { get; set; }
        [StringLength(100, ErrorMessage = "Name must not exceed 100 characters.")]
        public string? Name { get; set; }
        [StringLength(100, MinimumLength = 8, ErrorMessage = "Password must be at least 8 characters long")]
        [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$",
            ErrorMessage = "Password must contain at least one uppercase letter, one lowercase letter, and one special character.")]
        public string? Password { get; set; }

        [EmailAddress(ErrorMessage = "Invalid email format.")]
        public string? Email { get; set; }
        [StringLength(10, MinimumLength = 10, ErrorMessage = "Phone No. must be  10 characters long")]
        public string? Phone { get; set; }
        public ICollection<Feedback>? Feedbacks { get; set; }
        public ICollection<Booking>? Bookings { get; set; }
    }
}
