using ASP.NETCoreWebApplication5.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ASP.NETCoreWebApplication5.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DbController : ControllerBase
{
    private readonly palazzoContext _dbContext;
    private readonly ILogger<DbController> _logger;

    public DbController(palazzoContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet]
    [Route("all")]
    public async Task<List<lang>> Get()
    {
        return await _dbContext.lang.ToListAsync();
    }

    [HttpGet]
    [Route("locales/{lang}")]
#if DEBUG
#else
        [ResponseCache(Duration = 60)]
#endif
    public async Task<object> language(string lang)
    {
        var res = await _dbContext.lang.ToListAsync();
        var dictionary =
            res.ToList().ToDictionary(c => c.key, c => c.GetType().GetProperty(lang).GetValue(c).ToString());
        return dictionary;
    }
}