using System.Text;
using System;
using System.ComponentModel.DataAnnotations;

namespace User.Models
{
    public class Booking
    {
        [Key]
        public int BookingId { get; set; }
        public string? StartingPoint { get; set; }
        public string? EndingPoint { get; set; }//place connecting
        public string? Hotel { get; set; }
        public string? Restaurant { get; set; }
        [RegularExpression(@"^[1-9]\d*$", ErrorMessage = "Tour HeadCount must be a positive integer.")]
        public int HeadCount { get; set; }
        [RegularExpression(@"^[1-9]\d*$", ErrorMessage = "Tour DaysCount must be a positive integer.")]
        public int DaysCount { get; set; }
        public string? StartDate { get; set; }
        public string? EndDate { get; set; }
        public string? StartTime { get; set; }
        public string? EndTime { get; set; }
        public string? BillingMail { get; set; }
        public string? BillingAddress { get; set; }
        public string? UserMail { get; set; }
        public UserDetail? Users { get; set; }
        public ICollection<Feedback>? Feedbacks { get; set; }
    }
}
