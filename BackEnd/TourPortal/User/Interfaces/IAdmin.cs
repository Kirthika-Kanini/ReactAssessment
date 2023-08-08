using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis;
using User.Models;

namespace User.Interfaces
{
    public interface IAdmin
    {
        Task<IEnumerable<Admin>> GetAllAdmins();
        Task<Admin> GetAdminById(int id);
        Task<Admin> AddAdmin(Admin admin);
        Task<Admin> UpdateAdmin(int id, Admin admin);
        Task<bool> DeleteAdmin(int id);




    }
}
