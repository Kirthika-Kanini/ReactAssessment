using User.Models;

namespace User.Interfaces
{
    public interface IBooking
    {
        public IEnumerable<Booking> GetBooking();
        public Booking GetBookingsById(int id);
        public Booking PostBooking(Booking booking);
        public Booking PutBooking(int id, Booking booking);
        public Booking DeleteBooking(int id);
    }
}
