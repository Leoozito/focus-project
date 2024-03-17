using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Users
{
    public class UsersDto
    {
        public int id { get; set; }
        public string username { get; set; }
        public string name { get; set; }
        public string telephone { get; set; }
        public string email { get; set; }

        public string cep { get; set; }
        public string city { get; set; }
        public string district { get; set; }
        public string locationAdress { get; set; }
        public int locationNumber { get; set; }
        public string state { get; set; }
        public string complementation { get; set; }

        public DateTime registeredDate { get; set; } = DateTime.Now;
    }
}