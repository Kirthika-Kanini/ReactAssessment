using Microsoft.EntityFrameworkCore;
using User.Data;
using User.Interfaces;
using User.Models;

namespace User.Repository
{
    public class FeedbackRepository:IFeedback
    {
        private readonly UserContext _Context;
        public FeedbackRepository(UserContext con)
        {
            _Context = con;
        }
        public IEnumerable<Feedback> GetFeedback()
        {
            return _Context.Feedbacks.Include(x=>x.booking).Include(x=>x.user).Include(x=>x.booking).ToList();
        }
        public Feedback GetFeedbacksById(int id)
        {
            return _Context.Feedbacks.FirstOrDefault(x => x.feedbackId == id);
        }
        public Feedback PostFeedback(Feedback feedback)
        {
            var p = _Context.UserDetails.Find(feedback.user.Id);
            feedback.user = p;
            var b = _Context.Bookings.Find(feedback.booking.BookingId);
            feedback.booking = b;
            _Context.Add(feedback);
            _Context.SaveChanges();
            return feedback;
        }
        public Feedback PutFeedback(int id, Feedback feedback)
        {
            var p = _Context.UserDetails.Find(feedback.user.Id);
            feedback.user = p;
            var b = _Context.Bookings.Find(feedback.booking.BookingId);
            feedback.booking = b;
            _Context.Entry(feedback).State = EntityState.Modified;
            _Context.SaveChanges();
            return feedback;
        }

        public Feedback DeleteFeedback(int id)
        {

            var feedback = _Context.Feedbacks.Find(id);


            _Context.Feedbacks.Remove(feedback);
            _Context.SaveChanges();

            return feedback;
        }
    }
}
