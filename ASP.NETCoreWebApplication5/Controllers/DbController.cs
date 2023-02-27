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
    [Route("locales/it")]
    [Route("locales/eng")]
    public async Task<object> GetIt()
    {
        return new
        {
            h_villa = "villa",
            h_gallery = "galleria",
            welcome1 =
                "Benvenuti32 nel sito web degli Eventi Villa a Como, il luogo perfetto per celebrare i momenti più importanti della vostra vita. Situata in una posizione panoramica sulla riva del Lago di Como, la nostra villa storica offre un'atmosfera unica e suggestiva per matrimoni, cerimonie e feste private. Il nostro team altamente professionale e competente si dedica con passione all'organizzazione di eventi personalizzati e di alta qualità, garantendo un'esperienza indimenticabile per voi e i vostri ospiti. Sfogliate le nostre gallerie fotografiche per scoprire le meraviglie della villa e del panorama circostante, e contattateci per richiedere maggiori informazioni e prenotare la vostra occasione speciale presso gli Eventi Villa a Como."
        };
    }
}