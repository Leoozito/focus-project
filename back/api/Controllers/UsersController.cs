using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Core.Dtos.Users;
using api.Data;
using Microsoft.AspNetCore.Mvc;
using api.Core.AutoMappers;

namespace api.Controllers
{
    [Route("api/users/")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
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

        [HttpPost]
        public IActonResult Create([FromBody] CreateUserRequestDto usersDto)
        {
            var usersModel = usersDto.ToUsersFromCreateDTO();
            _context.Users.Add(usersModel);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetById), new { id = usersModel.id })
        }
    }
}