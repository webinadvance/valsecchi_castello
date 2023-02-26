using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ASP.NETCoreWebApplication5.Controllers;

[ApiController]
[Route("api")]
public class PublicController : ControllerBase
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public PublicController(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    [HttpGet("user")]
    [Authorize]
    public async Task<string> user()
    {
        foreach (Claim claim in _httpContextAccessor?.HttpContext?.User.Claims)
        {
            if (claim.Type.EndsWith("emailaddress"))
            {
                return claim.Value;
            }
        }

        return null;
    }

    [HttpGet("login")]
    public async Task<IActionResult> login()
    {
        var authenticationProperties = new AuthenticationProperties { RedirectUri = "/api/response" };
        return Challenge(authenticationProperties, GoogleDefaults.AuthenticationScheme);
    }

    [HttpGet("response")]
    public async Task<IActionResult> response()
    {
        return Redirect("/");
    }
}