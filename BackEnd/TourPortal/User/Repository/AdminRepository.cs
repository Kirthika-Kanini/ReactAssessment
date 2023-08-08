using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.CodeAnalysis;
using Microsoft.EntityFrameworkCore;
using User.Data;
using User.Interfaces;
using User.Models;

namespace User.Repository
{
    public class AdminRepository : IAdmin
    {
        private readonly UserContext _context;

        public AdminRepository(UserContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Admin>> GetAllAdmins()
        {
            return await _context.Admins.ToListAsync();
        }
        public async Task<Admin> GetAdminById(int id)
        {
            return await _context.Admins.FindAsync(id);
        }
        public async Task<Admin> AddAdmin(Admin admin)
        {
            _context.Admins.Add(admin);
            await _context.SaveChangesAsync();
            return admin;
        }

        public async Task<Admin> UpdateAdmin(int id, Admin admin)
        {
            if (id != admin.Id)
            {
                throw new ArgumentException("Course ID mismatch");
            }

            _context.Entry(admin).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return admin;
        }
        public async Task<bool> DeleteAdmin(int id)
        {
            var admin = await _context.Admins.FindAsync(id);
            if (admin == null)
            {
                return false;
            }

            _context.Admins.Remove(admin);
            await _context.SaveChangesAsync();
            return true;
        }

    }
}