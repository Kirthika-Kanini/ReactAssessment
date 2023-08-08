using Microsoft.EntityFrameworkCore;
using TravelAgent.Data;
using TravelAgent.Interfaces;
using TravelAgent.Models;

namespace TravelAgent.Repositories
{
    public class AdminRepository:IAdmin
    {
        private readonly AgentContext _Context;
        public AdminRepository(AgentContext con)
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
            if (id != admin.Id)
            {
                throw new ArgumentException("Course ID mismatch");
            }
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
