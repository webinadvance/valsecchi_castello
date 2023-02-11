using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Authentication.OAuth;
using Microsoft.AspNetCore.DataProtection;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDataProtection()
    .PersistKeysToFileSystem(new DirectoryInfo("\\MyFolder\\keys\\"))
    .SetApplicationName("MyWebsite")
    .SetDefaultKeyLifetime(TimeSpan.FromDays(30));

builder.Services.AddControllersWithViews();

//builder.Services.AddDataProtection().PersistKeysToFileSystem(new DirectoryInfo("\\MyFolder\\keys\\")).SetApplicationName("castello").SetDefaultKeyLifetime(TimeSpan.FromDays(30));

builder.Services.AddAuthentication(options => { options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme; })
    .AddCookie()
    .AddGoogle(options =>
    {
        options.ClientId = "143604866511-58ov9g9nokffvj0bjke3e0up56qgcsuo.apps.googleusercontent.com";
        options.ClientSecret = "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";
    });

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllerRoute(name: "default", pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();