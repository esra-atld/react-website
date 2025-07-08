using System;
using BackendSan.Models;

namespace BackendSan.Models.Responses
{
    public class CheckinDatesResponseDto
    {
        public CheckinDatesBody Body { get; set; }
    }   

    public class CheckinDatesBody
    {
       public List<string> dates { get; set; }
    }
}
