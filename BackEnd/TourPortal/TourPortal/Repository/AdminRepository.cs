using Microsoft.EntityFrameworkCore;
using TourPortal.Data;
using TourPortal.Interfaces;
using TourPortal.Models;

namespace TourPortal.Repository
{
    public class AdminRepository:IAdmin
    {
        private readonly TravelPortalContext _Context;
        public AdminRepository(TravelPortalContext con)
        {
            _Context = con;
        }
        public IEnumerable<Admin> GetAdmin()
        {
            return _Context.Admins.ToList();
        }
        public Admin GetAdminsById(int id)
        {
            return _Context.Admins.FirstOrDefault(x => x.Id == id);
        }
        public Admin PostAdmins(Admin admin)
        {
            _Context.Add(admin);
            _Context.SaveChanges();
            return admin;
        }
        public Admin PutAdmin(int id, Admin admin)
        {
            _Context.Entry(admin).State = EntityState.Modified;
            _Context.SaveChanges();
            return admin;
        }

        public Admin DeleteAdmin(int id)
        {

            var admin = _Context.Admins.Find(id);


            _Context.Admins.Remove(admin);
            _Context.SaveChanges();

            return admin;
        }
    }
}
