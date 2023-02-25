using ASP.NETCoreWebApplication5.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ASP.NETCoreWebApplication5.Controllers;

[ApiController]
[Route("api/[controller]")]
public class WeatherForecastController : ControllerBase
{
    private static readonly string[] Summaries = new[]
    {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

    private readonly ILogger<WeatherForecastController> _logger;

    public WeatherForecastController(ILogger<WeatherForecastController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    public IEnumerable<WeatherForecast> Get()
    {
        return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
                TemperatureC = Random.Shared.Next(-20, 55),
                Summary = Summaries[Random.Shared.Next(Summaries.Length)]
            })
            .ToArray();
    }
}


[ApiController]
[Route("api/[controller]")]
public class DbController : ControllerBase
{
    private readonly ILogger<WeatherForecastController> _logger;

    private readonly palazzoContext _dbContext;
    
    public DbController(palazzoContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet]
    public async Task<List<lang>> Get()
    {
        return await _dbContext.lang.ToListAsync();
    }
}