using Microsoft.EntityFrameworkCore;
using User.Data;
using User.Interfaces;
using User.Models;

namespace User.Repository
{
    public class BookingRepository:IBooking
    {
        private readonly UserContext _Context;
        public BookingRepository(UserContext con)
        {
            _Context = con;
        }
        public IEnumerable<Booking> GetBooking()
        {
            return _Context.Bookings.Include(x=>x.Users).ToList();
        }
        public Booking GetBookingsById(int id)
        {
            return _Context.Bookings.FirstOrDefault(x => x.BookingId == id);
        }
        public Booking PostBooking(Booking booking)
        {
            var p = _Context.UserDetails.Find(booking.Users.Id);
            booking.Users = p;

            _Context.Add(booking);
            _Context.SaveChanges();
            return booking;
        }
        public Booking PutBooking(int id, Booking booking)
        {
            var p = _Context.UserDetails.Find(booking.Users.Id);
            booking.Users = p;
            _Context.Entry(booking).State = EntityState.Modified;
            _Context.SaveChanges();
            return booking;
        }

        public Booking DeleteBooking(int id)
        {

            var booking = _Context.Bookings.Find(id);


            _Context.Bookings.Remove(booking);
            _Context.SaveChanges();

            return booking;
        }
    }
}
