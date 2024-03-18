using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Core.Dtos.Users;
using api.Core.Models.Users;
using AutoMapper;

namespace api.Services
{
    public static class UserService
    {
        // private readonly IMapper _mapper;
        // public class UserService(
        //     IMapper mapper
        // ) 
        // {
        //     _mapper = mapper;
        // }

        public static Users ToUsersFromCreateDTO(this UsersDto usersDto)
        {
            return new Users
            {
                // username = usersDto.username,
                name = usersDto.name,
                telephone = usersDto.telephone,
                // email = usersDto.email,
                cep = usersDto.cep,
                city = usersDto.city,
                district = usersDto.district,
                locationAdress = usersDto.locationAdress,
                locationNumber = usersDto.locationNumber,
                state = usersDto.state,
                complementation = usersDto.complementation,
                registeredDate = DateTime.Today,
            };
        }
    }
}