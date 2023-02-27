using ASP.NETCoreWebApplication5.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ASP.NETCoreWebApplication5.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DbController : ControllerBase
{
    private readonly ILogger<DbController> _logger;

    private readonly palazzoContext _dbContext;

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
    [Route("it")]
    public async Task<List<lang>> GetIt()
    {
        return await _dbContext.lang.ToListAsync();
    }
}