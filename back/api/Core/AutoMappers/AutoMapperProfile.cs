using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Core.Dtos.Users;
using api.Core.Models.Users;
using AutoMapper;
using api.Core.Dtos.Users;

namespace api.Core.AutoMappers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile() {
            CreateMap<Users, UsersDto>()
            .ReverseMap();
        }
    }
}