using User.Models;

namespace User.Interfaces
{
    public interface IUser
    {
        public IEnumerable<UserDetail> GetUser();
        public UserDetail GetUserDetailsById(int id);
        public UserDetail PostUserDetail(UserDetail userDetail);
        public UserDetail PutUserDetail(int id, UserDetail userDetail);
        public UserDetail DeleteUserDetail(int id);
    }
}
