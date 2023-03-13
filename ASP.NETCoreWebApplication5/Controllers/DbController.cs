using System.IO;
using ASP.NETCoreWebApplication5.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;

namespace ASP.NETCoreWebApplication5.Controllers
{
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
            _localesPath = GetPath("locales");
        }

        [HttpGet("langall")]
        public async Task<IEnumerable<lang>> GetLangList()
        {
            var enJson = JObject.Parse(await System.IO.File.ReadAllTextAsync(Path.Combine(_localesPath, "en.json")));
            var itJson = JObject.Parse(await System.IO.File.ReadAllTextAsync(Path.Combine(_localesPath, "it.json")));

            var result = new List<lang>();
            foreach (var key in enJson.Properties().Select(p => p.Name).Union(itJson.Properties().Select(p => p.Name))
                         .Distinct())
            {
                result.Add(new lang
                {
                    key = key,
                    en = enJson.ContainsKey(key) ? enJson[key].ToString() : "",
                    it = itJson.ContainsKey(key) ? itJson[key].ToString() : ""
                });
            }

            return result.OrderBy(x => x.key);
        }

        [HttpGet("locales/{lang}")]
        public async Task<IDictionary<string, string>> GetLanguage(string lang)
        {
            var dictionary = (await _dbContext.lang.ToListAsync())
                .ToDictionary(c => c.key, c => c.GetType().GetProperty(lang)!.GetValue(c).ToString());
            if (!_webHostEnvironment.IsDevelopment()) Response.Headers.Add("Cache-Control", $"public, max-age=60");
            return dictionary;
        }


        [HttpPost("deleteadminlang")]
        public async Task DeleteAdminLang([FromBody] lang dataToDelete)
        {
            var enJson = JObject.Parse(await System.IO.File.ReadAllTextAsync(Path.Combine(_localesPath, "en.json")));
            var itJson = JObject.Parse(await System.IO.File.ReadAllTextAsync(Path.Combine(_localesPath, "it.json")));

            enJson.Remove(dataToDelete.key);
            itJson.Remove(dataToDelete.key);

            await System.IO.File.WriteAllTextAsync(Path.Combine(_localesPath, "en.json"), enJson.ToString());
            await System.IO.File.WriteAllTextAsync(Path.Combine(_localesPath, "it.json"), itJson.ToString());
        }

        [HttpPost("saveadminlang")]
        public async Task SaveAdminLang([FromBody] lang newData)
        {
            var enJson = JObject.Parse(await System.IO.File.ReadAllTextAsync(Path.Combine(_localesPath, "en.json")));
            var itJson = JObject.Parse(await System.IO.File.ReadAllTextAsync(Path.Combine(_localesPath, "it.json")));

            enJson[newData.key] = newData.en;
            itJson[newData.key] = newData.it;

            await System.IO.File.WriteAllTextAsync(Path.Combine(_localesPath, "en.json"), enJson.ToString());
            await System.IO.File.WriteAllTextAsync(Path.Combine(_localesPath, "it.json"), itJson.ToString());
        }

        [HttpPost("deleteimage")]
        public async Task<IActionResult> DeleteImage(string imageToDelete)
        {
            var imagePath = Path.Combine(GetPath(), "assets",
                imageToDelete.Trim('/').Replace("/", "\\"));

            var lowImagePath = imagePath.Replace(".jpg", "_low.jpg");

            if (System.IO.File.Exists(imagePath))
            {
                System.IO.File.Delete(imagePath);
            }

            if (System.IO.File.Exists(lowImagePath))
            {
                System.IO.File.Delete(lowImagePath);
            }

            ImageLib.Sync(_webHostEnvironment);

            return Ok();
        }


        [HttpPost("changedirname")]
        public async Task<IActionResult> changedirname(string oldValue, string newValue)
        {
            var path = Path.Combine(GetPath(), "assets");
            var oldDirPath = Path.Combine(path, oldValue);
            var newDirPath = Path.Combine(path, newValue);

            if (!Directory.Exists(oldDirPath))
            {
                return BadRequest($"Directory '{oldValue}' does not exist.");
            }

            if (Directory.Exists(newDirPath))
            {
                return BadRequest($"Directory '{newValue}' already exists.");
            }

            Directory.Move(oldDirPath, newDirPath);
            ImageLib.Sync(_webHostEnvironment);
            return Ok();
        }

        [HttpPost("adddir")]
        public async Task<IActionResult> adddir(string dirName)
        {
            var dirPath = GetPath("assets");
            var fullPath = Path.Combine(dirPath, dirName);

            if (!Directory.Exists(fullPath))
            {
                Directory.CreateDirectory(fullPath);
            }

            ImageLib.Sync(_webHostEnvironment);
            return Ok();
        }

        [HttpPost("deletedir")]
        public async Task<IActionResult> DeleteDir(string dirToDelete)
        {
            var dirPath = GetPath("assets");
            var fullPath = Path.Combine(dirPath, dirToDelete);

            if (Directory.Exists(fullPath))
            {
                Directory.Delete(fullPath, true);
            }

            ImageLib.Sync(_webHostEnvironment);
            return Ok();
        }


        [HttpPost("uploadimage")]
        public async Task<IActionResult> UploadImage(string parentTitle)
        {
            /*Thread.Sleep(5000);
            return Ok();*/
            var form = await Request.ReadFormAsync();
            var file = form.Files.FirstOrDefault();
            if (file == null || file.Length == 0)
            {
                return BadRequest("No file uploaded");
            }

            var uploadsPath = GetPath("assets", parentTitle);
            Directory.CreateDirectory(uploadsPath);

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

        private string GetPath(params string[] paths)
        {
            string[] combinedPaths = paths.Prepend("wwwroot").ToArray();
            if (_webHostEnvironment.IsDevelopment())
            {
                combinedPaths = paths.Prepend("public").Prepend("ClientApp").ToArray();
            }

            return Path.Combine(_webHostEnvironment.ContentRootPath, Path.Combine(combinedPaths));
        }
    }
}