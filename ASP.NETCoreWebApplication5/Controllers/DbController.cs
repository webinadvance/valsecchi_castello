using System.Text.Json;
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
    private readonly IWebHostEnvironment _webHostEnvironment;

    public DbController(IWebHostEnvironment hostingEnvironment, palazzoContext dbContext)
    {
        _webHostEnvironment = hostingEnvironment;
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

    [HttpGet]
    [Route("synclocales")]
    public async Task synclocales()
    {
        var res = await _dbContext.lang.ToListAsync();

        foreach (var s in new[] {"it", "en"})
        {
            var dictionary =
                res.ToList().ToDictionary(c => c.key, c => c.GetType().GetProperty(s).GetValue(c).ToString());
            var options = new JsonSerializerOptions();
            var json = JsonSerializer.Serialize(dictionary, options);
            
#if DEBUG
            var rootDirectory = _webHostEnvironment.ContentRootPath + "\\ClientApp\\public\\locales\\" + s + ".json";
#else
        var rootDirectory = _webHostEnvironment.ContentRootPath + "\\wwwroot\\locales\\" + s + ".json";
#endif
            await System.IO.File.WriteAllTextAsync(rootDirectory, json);
        }
    }
}