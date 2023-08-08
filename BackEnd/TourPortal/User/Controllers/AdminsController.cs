using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis;
using User.Interfaces;
using User.Models;

namespace User.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
    public class AdminsController : ControllerBase
    {
        private readonly IAdmin _AdminRepository;

        public AdminsController(IAdmin adminRepository)
        {
            _AdminRepository = adminRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Admin>>> Get()
        {
            var admins = await _AdminRepository.GetAllAdmins();
            return Ok(admins);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Admin>> GetByID(int id)
        {
            var admin = await _AdminRepository.GetAdminById(id);
            if (admin == null)
            {
                return NotFound();
            }

            return Ok(admin);
        }

        [HttpPost]
        public async Task<ActionResult<Admin>> Post([FromBody] Admin admin)
        {
            if (admin == null)
            {
                return BadRequest();
            }

            var addedadmin = await _AdminRepository.AddAdmin(admin);
            return CreatedAtAction(nameof(GetByID), new { id = addedadmin.Id }, addedadmin);
        }
        [HttpPut("{id}")]
        public async Task<ActionResult<Admin>> Put(int id, Admin admin)
        {
            var updatedAdmin = await _AdminRepository.UpdateAdmin(id, admin);
            return Ok(updatedAdmin);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _AdminRepository.DeleteAdmin(id);
            if (result)
            {
                return NoContent();
            }
            return NotFound();
        }
    }
}
