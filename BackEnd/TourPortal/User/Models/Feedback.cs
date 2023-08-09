using System.ComponentModel.DataAnnotations;

namespace User.Models
{
    public class Feedback
    {
        [Key]
        public int FeedbackId { get; set; }
        [StringLength(100, ErrorMessage = "FeedbackContent must not exceed 200 characters.")]
        public string? FeedbackContent { get; set; }
        public string? CreatedAt { get; set; }
        public Booking? Booking { get; set; }
        public UserDetail? User { get; set; }
    }
}
