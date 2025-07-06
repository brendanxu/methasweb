using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.DependencyInjection;
using Microsoft.Extensions.DependencyInjection;
using Umbraco.Cms.Api.Management.DependencyInjection;
using Umbraco.Cms.Api.Delivery.DependencyInjection;

namespace Umbraco.Cms.Web.UI;

public class SouthPoleComposer : IComposer
{
    public void Compose(IUmbracoBuilder builder)
    {
        // Enable Delivery API
        builder.AddDeliveryApi();
        
        // Enable Management API
        builder.AddManagementApi();
        
        // Configure CORS for frontend integration
        builder.Services.AddCors(options =>
        {
            options.AddDefaultPolicy(policy =>
            {
                policy
                    .WithOrigins("http://localhost:3000", "https://localhost:3000", "https://southpole.com")
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials();
            });
        });
        
        // Add custom services for South Pole integration
        builder.Services.AddScoped<ISouthPoleApiService, SouthPoleApiService>();
    }
}

public interface ISouthPoleApiService
{
    Task<object> GetCaseStudiesAsync();
    Task<object> GetNewsArticlesAsync();
    Task<object> GetServicesAsync();
}

public class SouthPoleApiService : ISouthPoleApiService
{
    public async Task<object> GetCaseStudiesAsync()
    {
        // Implementation will be added when creating Document Types
        await Task.CompletedTask;
        return new { message = "Case studies endpoint ready" };
    }
    
    public async Task<object> GetNewsArticlesAsync()
    {
        // Implementation will be added when creating Document Types
        await Task.CompletedTask;
        return new { message = "News articles endpoint ready" };
    }
    
    public async Task<object> GetServicesAsync()
    {
        // Implementation will be added when creating Document Types
        await Task.CompletedTask;
        return new { message = "Services endpoint ready" };
    }
}