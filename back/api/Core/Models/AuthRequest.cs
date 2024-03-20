using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Core.Models
{
    public class AuthRequest
    {
        public string Email { get; set; }
        public string PasswordHash { get; set; }
    }
}