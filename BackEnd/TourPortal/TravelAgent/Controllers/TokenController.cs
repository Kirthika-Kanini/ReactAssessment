using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using TravelAgent.Data;
using TravelAgent.Models;

namespace TravelAgent.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TokenController : ControllerBase
    {
        public IConfiguration _configuration;
        private readonly AgentContext _context;
        private const string AgentRole = "Agent";
        private const string AdminRole = "Admin";
        public TokenController(IConfiguration config, AgentContext context)
        {
            _configuration = config;
            _context = context;
        }
        [HttpPost("Agent")]
        public async Task<IActionResult> Post(Agent _userData)
        {
            if (_userData != null && _userData.TravelAgentEmail != null && _userData.TravelAgentPassword != null)
            {
                var user = await GetUser(_userData.TravelAgentEmail, _userData.TravelAgentPassword);

                if (user != null)
                {
                    //create claims details based on the user information
                    var claims = new[] {
                        new Claim(JwtRegisteredClaimNames.Sub, _configuration["Jwt:Subject"]),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                        new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                         new Claim("TravelAgentId", user.TravelAgentId.ToString()),
                         new Claim("TravelAgentEmail", user.TravelAgentEmail),
                         new Claim("TravelAgentName", user.TravelAgentName),
                        new Claim("TravelAgentPassword",user.TravelAgentPassword),
                        new Claim("TravelAgentStatus",user.TravelAgentStatus),
                        new Claim(ClaimTypes.Role, AgentRole),
                        new Claim("Role", AgentRole)

                    };

                    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
                    var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                    var token = new JwtSecurityToken(
                        _configuration["Jwt:Issuer"],
                        _configuration["Jwt:Audience"],
                        claims,
                        expires: DateTime.UtcNow.AddMinutes(10),
                        signingCredentials: signIn);

                    return Ok(new JwtSecurityTokenHandler().WriteToken(token));
                }
                else
                {
                    return BadRequest("Invalid credentials");
                }
            }
            else
            {
                return BadRequest();
            }
        }
        private async Task<Agent> GetUser(string email, string password)
        {
            return await _context.Agents.FirstOrDefaultAsync(u => u.TravelAgentEmail == email && u.TravelAgentPassword == password);
        }

        [HttpPost("Admin")]
        public async Task<IActionResult> Post(Admin _userData)
        {
            if (_userData != null && _userData.Email != null && _userData.Password != null)
            {
                var user = await GetAdmins(_userData.Email, _userData.Password);

                if (user != null)
                {
                    //create claims details based on the user information
                    var claims = new[] {
                        new Claim(JwtRegisteredClaimNames.Sub, _configuration["Jwt:Subject"]),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                        new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                         new Claim("Id", user.Id.ToString()),
                         new Claim("Email", user.Email),
                         new Claim("Name", user.Name),
                        new Claim("Password",user.Password),
                        new Claim(ClaimTypes.Role, AdminRole),
                          new Claim("Role", AdminRole)
                    };

                    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
                    var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                    var token = new JwtSecurityToken(
                        _configuration["Jwt:Issuer"],
                        _configuration["Jwt:Audience"],
                        claims,
                        expires: DateTime.UtcNow.AddMinutes(10),
                        signingCredentials: signIn);

                    return Ok(new JwtSecurityTokenHandler().WriteToken(token));
                }
                else
                {
                    return BadRequest("Invalid credentials");
                }
            }
            else
            {
                return BadRequest();
            }
        }

        private async Task<Admin> GetAdmins(string email, string password)
        {
            return await _context.Admins.FirstOrDefaultAsync(x => x.Email == email && x.Password == password);

        }
    }
}
