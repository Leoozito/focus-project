using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace api.Core.Models.Users
{
    public class Users : IdentityUser
    {
        // public int id { get; set; }
        public string UserName { get; set; }
        public string Name { get; set; }
        public string Telephone { get; set; }
       
        public string Email { get; set; }
        public string Role { get; set; }
        public string PasswordHash { get; set; }

        public string Cep { get; set; }
        public string City { get; set; }
        public string District { get; set; }
        public string LocationAdress { get; set; }
        public int LocationNumber { get; set; }
        public string State { get; set; }
        public string Complementation { get; set; }

        public DateTime RegisteredDate { get; set; } = DateTime.Now;

        public string ImageProfile { get; set; }
        public string DescriptionProfile { get; set; }
    }
}