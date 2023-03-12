using System.Text.Json;
using ASP.NETCoreWebApplication5.Models;
using Azure.Core;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using System.IO;

namespace ASP.NETCoreWebApplication5.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DbController : ControllerBase
{
    private readonly palazzoContext _dbContext;
    private readonly ILogger<DbController> _logger;
    private readonly IWebHostEnvironment _webHostEnvironment;
    private readonly string _localesPath;

    public DbController(IWebHostEnvironment hostingEnvironment, palazzoContext dbContext)
    {
        _webHostEnvironment = hostingEnvironment;
        _dbContext = dbContext;
        _localesPath = GetLocalesPath();
    }

    [HttpGet]
    [Route("langall")]
    public async Task<dynamic> langall()
    {
        var result = GetLangList();
        return result;
    }

    private List<lang> GetLangList()
    {
        // Load the data from the two JSON files
        JObject enJson = JObject.Parse(System.IO.File.ReadAllText(Path.Combine(_localesPath, "en.json")));
        JObject itJson = JObject.Parse(System.IO.File.ReadAllText(Path.Combine(_localesPath, "it.json")));

        // Combine the data from the two JSON files into a list of objects
        List<lang> result = itJson.Properties().Select(p =>
            new lang
            {
                key = p.Name,
                it = (string)p.Value,
                en = (string)enJson[p.Name]
            }).ToList();
        return result;
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

    [HttpPost]
    [Route("deleteadminlang")]
    public async Task deleteadminlang([FromBody] lang dataToDelete)
    {
        // Load the data from the two JSON files
        JObject enJson = JObject.Parse(System.IO.File.ReadAllText(Path.Combine(_localesPath, "en.json")));
        JObject itJson = JObject.Parse(System.IO.File.ReadAllText(Path.Combine(_localesPath, "it.json")));

        // Update the values in the JSON files based on the new language object
        enJson.Remove(dataToDelete.key);
        itJson.Remove(dataToDelete.key);

        // Write the updated JSON data back to the files
        System.IO.File.WriteAllText(Path.Combine(_localesPath, "en.json"), enJson.ToString());
        System.IO.File.WriteAllText(Path.Combine(_localesPath, "it.json"), itJson.ToString());
    }

    [HttpPost]
    [Route("saveadminlang")]
    public async Task saveadminlang([FromBody] lang newData)
    {
        // Load the data from the two JSON files
        JObject enJson = JObject.Parse(System.IO.File.ReadAllText(Path.Combine(_localesPath, "en.json")));
        JObject itJson = JObject.Parse(System.IO.File.ReadAllText(Path.Combine(_localesPath, "it.json")));

        // Add or update the key-value pair in each JSON file
        enJson[newData.key] = newData.en;
        itJson[newData.key] = newData.it;

        // Write the updated JSON data back to
        System.IO.File.WriteAllText(Path.Combine(_localesPath, "en.json"), enJson.ToString());
        System.IO.File.WriteAllText(Path.Combine(_localesPath, "it.json"), itJson.ToString());
    }

    [HttpPost]
    [Route("deleteimage")]
    public async Task<IActionResult> deleteimage(string imageToDelete)
    {
        var imagePath = GetImagePath(imageToDelete);

        if (System.IO.File.Exists(imagePath))
        {
            System.IO.File.Delete(imagePath);
        }

        ImageLib.Sync(_webHostEnvironment);
        return Ok();
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

        var uploadsPath = GetUploadsPath(parentTitle);

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

    private string GetLocalesPath()
    {
#if DEBUG
        return Path.Combine(_webHostEnvironment.ContentRootPath, "ClientApp", "public", "locales");
#else
return Path.Combine(_webHostEnvironment.ContentRootPath, "wwwroot", "locales");
#endif
    }

    private string GetImagePath(string imageName)
    {
#if DEBUG
        return Path.Combine(_webHostEnvironment.ContentRootPath, "ClientApp", "public", "assets", imageName);
#else
return Path.Combine(_webHostEnvironment.ContentRootPath, "wwwroot", "assets", imageName);
#endif
    }

    private string GetUploadsPath(string parentTitle)
    {
#if DEBUG
        return Path.Combine(_webHostEnvironment.ContentRootPath, "ClientApp", "public", "assets", parentTitle);
#else
return Path.Combine(_webHostEnvironment.ContentRootPath, "wwwroot", parentTitle);
#endif
    }
}