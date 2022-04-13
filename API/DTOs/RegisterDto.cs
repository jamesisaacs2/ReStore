using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;

namespace API.Controllers
{
   public class RegisterDto : LoginDto
   {
      public string Email { get; set; }
   }
}