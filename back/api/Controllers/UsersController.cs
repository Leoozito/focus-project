using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Core.Dtos.Users;
using api.Data;
using Microsoft.AspNetCore.Mvc;
using api.Core.AutoMappers;
using api.Services;
using BCrypt.Net;
using api.Core.Models.Users;

namespace api.Controllers
{
    [Route("api/users/")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        public static Users user = new Users();

        public UsersController(ApplicationDBContext context )
        {
            _context = context;
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
        public ActionResult<UsersDto> Register(UsersDto request)
        {
            string passwordHash = BCrypt.Net.BCrypt.HashPassword(
                request.PasswordHash
            );
            
            user.UserName = request.UserName;
            user.PasswordHash = passwordHash;

            return Ok(user);
        }

        [HttpPost("Login")]
        public ActionResult<UsersDto> Login(UsersDto request)
        {
            if (user.UserName != request.UserName)
            {
                return BadRequest("Usuario não encontrado");
            }

            if(!BCrypt.Net.BCrypt.Verify(request.PasswordHash, user.PasswordHash))
            {
                return BadRequest("Senha incorreta");
            }

            return Ok(user);
        }
    }
}