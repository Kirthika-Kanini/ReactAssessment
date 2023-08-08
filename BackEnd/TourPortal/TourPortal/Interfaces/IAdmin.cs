using TourPortal.Models;

namespace TourPortal.Interfaces
{
    public interface IAdmin
    {
        public IEnumerable<Admin> GetAdmin();
        public Admin GetAdminsById(int id);
        public Admin PostAdmins(Admin admin);
        public Admin PutAdmin(int id, Admin admin);
        public Admin DeleteAdmin(int id);
    }
}
