using ASP.NETCoreWebApplication5.Models;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.Extensions.DependencyInjection.Extensions;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDataProtection()
    .PersistKeysToFileSystem(new DirectoryInfo("\\MyFolder\\keys\\"))
    .SetApplicationName("MyWebsite")
    .SetDefaultKeyLifetime(TimeSpan.FromDays(30));

builder.Services.AddControllersWithViews().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.IgnoreNullValues = true;
});

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.WithOrigins("https://localhost:44424")
            .AllowAnyHeader()
            .AllowCredentials();
    });
});

builder.Services.TryAddSingleton<IHttpContextAccessor, HttpContextAccessor>();

//builder.Services.AddDataProtection().PersistKeysToFileSystem(new DirectoryInfo("\\MyFolder\\keys\\")).SetApplicationName("castello").SetDefaultKeyLifetime(TimeSpan.FromDays(30));

builder.Services.AddAuthentication(options =>
    {
        options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
    })
    .AddCookie(options =>
    {
        options.Cookie.SameSite = SameSiteMode.None;
        options.Cookie.HttpOnly = false;
    })
    .AddGoogle(options =>
    {
        options.ClientId = "143604866511-58ov9g9nokffvj0bjke3e0up56qgcsuo.apps.googleusercontent.com";
        options.ClientSecret = "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";
    });

builder.Services.AddDbContext<palazzoContext>(options =>
{
    // Set the connection string here
    /*options.UseSqlServer("Server=141.94.17.42\\SQLEXPRESS;Database=YourDatabaseName;User Id=YourUsername;Password=YourPassword;");*/
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseCors();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllerRoute("default", "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();