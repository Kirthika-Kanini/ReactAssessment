using System.Text;
using System;
using System.ComponentModel.DataAnnotations;

namespace User.Models
{
    public class Booking
    {
        [Key]
        public int BookingId { get; set; }
        public string? startingPoint { get; set; }
        public string? endingPoint { get; set; }//place connecting
        public string? hotel { get; set; }
        public string? Restaurant { get; set; }
        public int headCount { get; set; }
        public int daysCount { get; set; }
        public string? startDate { get; set; }
        public string? endDate { get; set; }
        public string? startTime { get; set; }
        public string? endTime { get; set; }
        public string? billingMail { get; set; }
        public string? billingAddress { get; set; }
        public string? userMail { get; set; }
        public UserDetail? users { get; set; }
        public ICollection<Feedback>? Feedbacks { get; set; }
    }
}
