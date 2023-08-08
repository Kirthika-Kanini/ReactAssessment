using Microsoft.AspNetCore.Mvc;
using TourPortal.Interfaces;
using TourPortal.Models;

namespace TourPortal.Controllers
{
    [ApiController]
    [Route("api/admins")]
    public class AdminController : ControllerBase
    {
        private readonly IAdmin _adminRepository;

        public AdminController(IAdmin adminRepository)
        {
            _adminRepository = adminRepository;
        }

        [HttpGet]
        public IActionResult GetAdmins()
        {
            var admins = _adminRepository.GetAdmin();
            return Ok(admins);
        }

        [HttpGet("{id}")]
        public IActionResult GetAdminById(int id)
        {
            var admin = _adminRepository.GetAdminsById(id);
            if (admin == null)
            {
                return NotFound();
            }
            return Ok(admin);
        }

        [HttpPost]
        public IActionResult CreateAdmin(Admin admin)
        {
            var newAdmin = _adminRepository.PostAdmins(admin);
            return CreatedAtAction(nameof(GetAdminById), new { id = newAdmin.Id }, newAdmin);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateAdmin(int id, Admin admin)
        {
            var existingAdmin = _adminRepository.GetAdminsById(id);
            if (existingAdmin == null)
            {
                return NotFound();
            }
            admin.Id = id; // Ensure the ID is set to the correct value
            _adminRepository.PutAdmin(id, admin);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteAdmin(int id)
        {
            var existingAdmin = _adminRepository.GetAdminsById(id);
            if (existingAdmin == null)
            {
                return NotFound();
            }
            _adminRepository.DeleteAdmin(id);
            return NoContent();
        }
    }
}
