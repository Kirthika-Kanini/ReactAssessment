using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NuGet.Protocol.Core.Types;
using TravelAgent.Interfaces;
using TravelAgent.Models;
using TravelAgent.Repositories;

namespace TravelAgent.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize(Roles ="Admin")]
    public class AdminsController : ControllerBase
    {
        private readonly IAdmin _adminRepository;

        public AdminsController(IAdmin adminRepository)
        {
            _adminRepository = adminRepository;
        }

        // GET: api/admins
        [HttpGet]
        public ActionResult <IEnumerable<Admin>> GetAdmins()
        {
            var myAdmin = _adminRepository.GetAdmin();
            if (myAdmin != null)
                return Ok(myAdmin);
            return BadRequest((new { ErrorMessage = "No Admins are Existing" }));
        }

        // GET: api/admins/{id}
        [HttpGet("{id}")]
        public ActionResult<Admin> GetAdminById(int id)
        {
            var admin = _adminRepository.GetAdminsById(id);
            if (admin != null)
                return Ok(admin);
            return NotFound((new { ErrorMessage = "Admin not found" }));
        }

        

        // POST: api/admins
        [HttpPost]
        public  ActionResult PostAdmin(Admin admin)
        {
            if (admin == null)
                return BadRequest((new { ErrorMessage = "Invalid Admin data" }));

            var createdAdmin = _adminRepository.PostAdmins(admin);
            if (createdAdmin != null)
                return Ok(createdAdmin);
            return StatusCode(500, (new { ErrorMessage = "Admin creation failed" }));
        }

        // PUT: api/admins/{id}
        [HttpPut("{id}")]
        public ActionResult Put(int id, Admin admin)
        {
            try
            {
                if (admin == null)
                    return BadRequest((new { ErrorMessage = "Invalid admin data" }));

                var updatedAdmin = _adminRepository.PutAdmin(id, admin);
                if (updatedAdmin != null)
                    return Ok(updatedAdmin);
                return NotFound((new { ErrorMessage = "Admin not found" }));
            }
            catch (ArgumentException ex)
            {
                ModelState.AddModelError("", ex.Message);
                return BadRequest(ModelState);
            }
        }

        // DELETE: api/admins/{id}
        [HttpDelete("{id}")]
        public ActionResult DeleteAdmin(int id)
        {
            var admin = _adminRepository.DeleteAdmin(id);
            if (admin != null)
                return Ok(admin);
            return NotFound((new { ErrorMessage = "Admin not found" }));
        }
    }
}
