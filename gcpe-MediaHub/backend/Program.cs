using MediaHubExplore.Backend.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Identity.Web;

var builder = WebApplication.CreateBuilder(args);
var configuration = builder.Configuration; // Get configuration

// Define CORS policy name
const string AllowFrontendPolicy = "_allowFrontendPolicy";

// Add services to the container.

// Configure Azure AD Authentication
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddMicrosoftIdentityWebApi(configuration.GetSection("AzureAd"));
    // TODO: Add '.EnableTokenAcquisitionToCallDownstreamApi()' if calling other APIs
    // TODO: Add '.AddInMemoryTokenCaches()' or other token cache if needed

// Configure CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: AllowFrontendPolicy,
                      policy  =>
                      {
                          // TODO: Replace with your actual frontend origin in production
                          policy.WithOrigins("http://localhost:5173", "http://localhost:5174") // Allow React and Vue dev servers
                                .AllowAnyHeader()
                                .AllowAnyMethod();
                      });
});


builder.Services.AddControllers();

// Register the in-memory contact store as a singleton
builder.Services.AddSingleton<IContactStore, InMemoryContactStore>();
// Register the in-memory outlet store as a singleton
builder.Services.AddSingleton<IOutletStore, InMemoryOutletStore>();
// Add services for authorization policies if needed later
builder.Services.AddAuthorization();

// If using Swagger/OpenAPI (optional, can be added back if desired)
builder.Services.AddEndpointsApiExplorer(); // Re-enabled
builder.Services.AddSwaggerGen(); // Re-enabled

// Configure Kestrel to listen on port 5020
builder.WebHost.ConfigureKestrel(options =>
{
    options.ListenAnyIP(5020); // Configure Kestrel to listen on port 5020
});

var app = builder.Build();

// Configure the HTTP request pipeline.

// If using Swagger/OpenAPI (optional)
if (app.Environment.IsDevelopment()) // Re-enabled block
{
    app.UseSwagger(); // Re-enabled
    app.UseSwaggerUI(); // Re-enabled
}

app.UseHttpsRedirection();

// Apply the CORS policy
app.UseCors(AllowFrontendPolicy);

// Add Authentication and Authorization middleware
// IMPORTANT: UseAuthentication must come before UseAuthorization
app.UseAuthentication();
app.UseAuthorization();


app.MapControllers(); // Map controller endpoints

// Removed WeatherForecast endpoint

app.Run(); // Add the missing app.Run() call
