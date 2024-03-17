using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Users;
using api.Core.Models;
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

    public static class UsersMatter {
        public static Users ToUsersFromCreateDTO(this CreateUserRequestDto UsersDto)
        {
            return new Users
            {
                name = UsersDto.name,
                email = UsersDto.email,
                username = UsersDto.username,
                telephone = UsersDto.telephone,
                
                cep = UsersDto.cep,
                city = UsersDto.city,
                district = UsersDto.district,
                locationAdress = UsersDto.locationAdress,
                locationNumber = UsersDto.locationNumber,
                state = UsersDto.state,
                complementation = UsersDto.complementation,

                registeredDate = DateTime.Today,
            };
        }
    }

}