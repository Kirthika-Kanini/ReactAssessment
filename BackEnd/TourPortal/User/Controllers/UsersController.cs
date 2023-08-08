using Microsoft.AspNetCore.Mvc;
using User.Models;
using User.Interfaces;
using Microsoft.AspNetCore.Authorization;

namespace User.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
    public class UserController : ControllerBase
    {
        private readonly IUser _userRepository;

        public UserController(IUser userRepository)
        {
            _userRepository = userRepository;
        }

        // GET api/user
        [HttpGet]
        public IActionResult GetUser()
        {
            var userDetails = _userRepository.GetUser();
            return Ok(userDetails);
        }

        // GET api/user/5
        [HttpGet("{id}")]
        public IActionResult GetUserDetailsById(int id)
        {
            var userDetails = _userRepository.GetUserDetailsById(id);
            if (userDetails == null)
            {
                return NotFound();
            }
            return Ok(userDetails);
        }

        // POST api/user
        [HttpPost]
        public IActionResult PostUserDetail(UserDetail userDetail)
        {
            var newUserDetail = _userRepository.PostUserDetail(userDetail);
            return CreatedAtAction(nameof(GetUserDetailsById), new { id = newUserDetail.Id }, newUserDetail);
        }

        // PUT api/user/5
        [HttpPut("{id}")]
        public IActionResult PutUserDetail(int id, UserDetail userDetail)
        {
            var updatedUser = _userRepository.PutUserDetail(id, userDetail);
            return Ok(updatedUser);
        }

        // DELETE api/user/5
        [HttpDelete("{id}")]
        public IActionResult DeleteUserDetail(int id)
        {
            var existingUserDetail = _userRepository.GetUserDetailsById(id);
            if (existingUserDetail == null)
            {
                return NotFound();
            }
            var deletedUserDetail = _userRepository.DeleteUserDetail(id);
            return Ok(deletedUserDetail);
        }
    }
}
