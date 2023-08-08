using User.Models;

namespace User.Interfaces
{
    public interface IFeedback
    {
        public IEnumerable<Feedback> GetFeedback();
        public Feedback GetFeedbacksById(int id);
        public Feedback PostFeedback(Feedback feedback);
        public Feedback PutFeedback(int id, Feedback feedback);
        public Feedback DeleteFeedback(int id);
    }
}
