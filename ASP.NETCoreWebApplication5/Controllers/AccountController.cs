using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ASP.NETCoreWebApplication5.Controllers;

[ApiController]
[Route("api/[controller]")]
public class GoogleController : ControllerBase
{
    
    [HttpGet("login")]
    public async Task<IActionResult> login()
    {
        var authenticationProperties = new AuthenticationProperties
        {
            RedirectUri = "https://localhost:44424/OK"
        };

        /*var properties = new AuthenticationProperties { RedirectUri = Url.Action("GoogleResponse", new { url = "https://localhost:44424/OK" }) };
        return Challenge(properties, GoogleDefaults.AuthenticationScheme);*/
        
        return Challenge(authenticationProperties, GoogleDefaults.AuthenticationScheme);
    }
    
    [HttpGet("login2")]
    public async Task<IActionResult> login2()
    {
        var authenticationProperties = new AuthenticationProperties
        {
            RedirectUri = "https://localhost:44424/OK"
        };

        /*var properties = new AuthenticationProperties { RedirectUri = Url.Action("GoogleResponse", new { url = "https://localhost:44424/OK" }) };
        return Challenge(properties, GoogleDefaults.AuthenticationScheme);*/
        
        return Challenge(authenticationProperties, GoogleDefaults.AuthenticationScheme);
    }
}