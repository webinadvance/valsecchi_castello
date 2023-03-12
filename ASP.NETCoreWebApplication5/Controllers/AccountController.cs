using Microsoft.AspNetCore.Authentication;
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
    /*[Authorize]*/
    public async Task<object> user()
    {
        return null;
        string email = null;
        string name = null;

        foreach (var claim in _httpContextAccessor?.HttpContext?.User.Claims)
            if (claim.Type.EndsWith("emailaddress"))
                email = claim.Value;
            else if (claim.Type.EndsWith("name")) name = claim.Value;

        return new
        {
            email, name
        };
    }

    [HttpGet("login")]
    public async Task<IActionResult> login([FromQuery] string? url)
    {
        var authenticationProperties = new AuthenticationProperties
            { RedirectUri = "/api/response?url=" + url };
        return Challenge(authenticationProperties, GoogleDefaults.AuthenticationScheme);
    }

    [HttpGet("response")]
    public async Task<IActionResult> response([FromQuery] string? url)
    {
        return Redirect(!string.IsNullOrEmpty(url) ? url : "/");
    }
}