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
using api.Core.Models;

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
            
            Users newUser = new Users {
                UserName = request.UserName,
                Name = request.Name,
                Telephone = request.Telephone,
                Email = request.Email,
                Role = request.Role,            
                PasswordHash = passwordHash,

                Cep = request.Cep,            
                City = request.City,            
                District = request.District,            
                LocationAdress = request.LocationAdress,            
                LocationNumber = request.LocationNumber,            
                State = request.State,            
                Complementation = request.Complementation,            

                RegisteredDate = DateTime.Now,
                ImageProfile = request.ImageProfile,            
                DescriptionProfile = request.DescriptionProfile 
            };           
            
            _context.Users.Add(newUser);

            _context.SaveChanges();

            return Ok(newUser);
        }

        [HttpPost("login")]
        public ActionResult<Users> Login(AuthRequest request)
        {
            if (user.Email != request.Email)
            {
                return BadRequest("Usuario ou senha incorreto");
            }

            if(!BCrypt.Net.BCrypt.Verify(request.PasswordHash, user.PasswordHash))
            {
                return BadRequest("Usuario ou senha incorreto");
            }

            string token = CreateToken(user);

            return Ok(token);
        }

        private string CreateToken(Users users)
        {
            List<Claim> claims = new List<Claim> {
                new Claim(ClaimTypes.Name, users.Email)
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