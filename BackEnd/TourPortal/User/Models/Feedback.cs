using System.ComponentModel.DataAnnotations;

namespace User.Models
{
    public class Feedback
    {
        [Key]
        public int feedbackId { get; set; }
        public string? feedback { get; set; }
        public string? createdAt { get; set; }
        public Booking? booking { get; set; }
        public UserDetail? user { get; set; }
    }
}
