using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
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
        var authenticationProperties = new AuthenticationProperties { RedirectUri = "/api/google/response" };
        return Challenge(authenticationProperties, GoogleDefaults.AuthenticationScheme);
    }

    [HttpGet("response")]
    public async Task<IActionResult> response()
    {
        /*var result = await HttpContext.AuthenticateAsync(CookieAuthenticationDefaults.AuthenticationScheme);*/
        return Redirect("/");
    }
}