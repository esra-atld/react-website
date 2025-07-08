using System;
using BackendSan.Models;

namespace BackendSan.Models
{
    public class AuthApiResponse
    {
        public AuthResponseBody Body { get; set; }
        public AuthResponseHeader Header { get; set; }
    }

    public class AuthResponseBody
    {
        public string Token { get; set; }
        public string ExpiresOn { get; set; }
        public int TokenId { get; set; }
        public UserInfo UserInfo { get; set; } 
        public bool LoggedInWithMasterKey { get; set; }
    }

    public class AuthResponseHeader
    {
        public string RequestId { get; set; }
        public bool Success { get; set; }
        public DateTime ResponseTime { get; set; }
        public AuthResponseMessage[] Messages { get; set; }
    }

    public class AuthResponseMessage
    {
        public int Id { get; set; }
        public string Code { get; set; }
        public int MessageType { get; set; }
        public string Message { get; set; }
    }

   
    public class UserInfo
    {
    }

    public class AuthTokenInfo 
    {
        public string AccessToken { get; set; }
        public string ExpiresOn { get; set; }
    }
}