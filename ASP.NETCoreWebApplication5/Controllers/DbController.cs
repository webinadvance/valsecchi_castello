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
    [Route("langall")]
    public async Task<List<lang>> langall()
    {
        return await _dbContext.lang
            .OrderBy(x => x.key)
            .ToListAsync();
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
            res.ToList().ToDictionary(c => c.key, c => c.GetType().GetProperty(lang)!.GetValue(c).ToString());
        return dictionary;
    }

    [HttpGet]
    [Route("synclocales")]
    public async Task synclocales()
    {
        var res = await _dbContext.lang.ToListAsync();

        foreach (var s in new[] { "it", "en" })
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

    [HttpPost]
    [Route("deleteadminlang")]
    public async Task deleteadminlang([FromBody] lang dataToDelete)
    {
        var oldData = await _dbContext.lang.SingleOrDefaultAsync(x => x.key == dataToDelete.key);
        if (oldData != null)
        {
            _dbContext.lang.Remove(oldData);
            await _dbContext.SaveChangesAsync();
            await synclocales();
        }
    }

    [HttpPost]
    [Route("saveadminlang")]
    public async Task saveadminlang([FromBody] lang newData)
    {
        var oldData = await _dbContext.lang.SingleOrDefaultAsync(x => x.key == newData.key);
        if (oldData == null)
            if (oldData == null)
                _dbContext.lang.Add(newData);
            else
                _dbContext.Entry(oldData).CurrentValues.SetValues(newData);
        await _dbContext.SaveChangesAsync();
        await synclocales();
    }

    [HttpPost]
    [Route("uploadimage")]
    public async Task<IActionResult> uploadimage(string parentTitle)
    {
        var form = await Request.ReadFormAsync();
        var file = form.Files.FirstOrDefault();
        if (file == null || file.Length == 0)
        {
            return BadRequest("No file uploaded");
        }

#if DEBUG
        var uploadsPath = _webHostEnvironment.ContentRootPath + "\\ClientApp\\public\\assets\\" + parentTitle;
#else
        var uploadsPath = _webHostEnvironment.ContentRootPath + "\\wwwroot\\" + parentTitle;
#endif

        if (!Directory.Exists(uploadsPath))
        {
            Directory.CreateDirectory(uploadsPath);
        }

        var fileName = file.FileName;
        var timeStamp = DateTime.Now.ToString("yyyyMMddHHmmss");
        var extension = Path.GetExtension(fileName);
        var fileNameWithoutExtension = Path.GetFileNameWithoutExtension(fileName);
        var truncatedFileName = fileNameWithoutExtension.Length > 20
            ? fileNameWithoutExtension.Substring(0, 20)
            : fileNameWithoutExtension;
        var newFileName = $"{truncatedFileName}_{timeStamp}{extension}";

        var filePath = Path.Combine(uploadsPath, newFileName);
        using (var stream = new FileStream(filePath, FileMode.Create))
        {
            await file.CopyToAsync(stream);
        }

        ImageLib.Sync(_webHostEnvironment);
        return Ok(new { fileName });
    }
}