using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Core.Dtos.Users;
using api.Data;
using Microsoft.AspNetCore.Mvc;
using api.Core.AutoMappers;
using BCrypt.Net;
using api.Core.Models.Users;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using AutoMapper;

namespace api.Controllers
{
    [Route("api/users/")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        private readonly IConfiguration _configuration;

        public static Users user = new Users();

        public UsersController(ApplicationDBContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var users = _context.Users.ToList();

            return Ok(users);
        }

        [HttpGet("{id}")]
        public IActionResult GetById([FromRoute] int id)
        {
            var user = _context.Users.Find(id);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        [HttpPost("register")]
        public ActionResult<Users> Register(Users request)
        {
            string passwordHash = BCrypt.Net.BCrypt.HashPassword(
                request.PasswordHash
            );
            
            user.UserName = request.UserName;
            user.PasswordHash = passwordHash;

            return Ok(user);
        }

        [HttpPost("login")]
        public ActionResult<Users> Login(Users request)
        {
            if (user.UserName != request.UserName)
            {
                return BadRequest("Usuario não encontrado");
            }

            if(!BCrypt.Net.BCrypt.Verify(request.PasswordHash, user.PasswordHash))
            {
                return BadRequest("Senha incorreta");
            }

            string token = CreateToken(user);

            return Ok(token);
        }

        private string CreateToken(Users users)
        {
            List<Claim> claims = new List<Claim> {
                new Claim(ClaimTypes.Name, users.UserName)
            };

            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(
                    _configuration.GetSection("AppSettings:Token").Value!
                )
            );


            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds
            );

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);
            return jwt;
        }
    }
}