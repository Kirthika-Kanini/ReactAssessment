using System.ComponentModel.DataAnnotations;

namespace User.Models
{
    public class Admin
    {
        [Key]
        public int Id { get; set; }

        [StringLength(100, ErrorMessage = "Admin_Username must not exceed 100 characters.")]
        public string? Name { get; set; }

        [Required(ErrorMessage = "Password is required.")]
        [StringLength(100, MinimumLength = 8, ErrorMessage = "Password must be at least 8 characters long")]
        [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$",
             ErrorMessage = "Password must contain at least one uppercase letter, one lowercase letter, and one special character.")]
        public string? Password { get; set; }

        [Required(ErrorMessage = "Email is required.")]
        [EmailAddress(ErrorMessage = "Invalid email address.")]
        public string? Email { get; set; }
    }
}
