WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

// Configure URLs for Railway deployment and local development
var port = Environment.GetEnvironmentVariable("PORT") ?? "5001";
var isProduction = builder.Environment.IsProduction();
if (isProduction)
{
    builder.WebHost.UseUrls($"http://0.0.0.0:{port}");
}
else
{
    builder.WebHost.UseUrls($"http://localhost:{port}", $"https://localhost:44310");
}

builder.CreateUmbracoBuilder()
    .AddBackOffice()
    .AddWebsite()
    .AddComposers()
    .Build();

WebApplication app = builder.Build();

await app.BootUmbracoAsync();

// Add root endpoint for Railway health checks
app.MapGet("/", () => "Umbraco CMS is running! Visit /umbraco for the admin panel.");

app.UseUmbraco()
    .WithMiddleware(u =>
    {
        u.UseBackOffice();
        u.UseWebsite();
    })
    .WithEndpoints(u =>
    {
        u.UseBackOfficeEndpoints();
        u.UseWebsiteEndpoints();
    });

await app.RunAsync();
