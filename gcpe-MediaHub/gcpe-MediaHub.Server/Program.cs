using gcpe_MediaHub.Server.TestData;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
    var dataContext = new InMemoryDataContext();
    var mediaContacts = DataLoader.LoadMediaContacts();
    var mediaRequests = DataLoader.LoadMediaRequests();
    var mediaOutlets = DataLoader.LoadMediaOutlets();
    var contactOutlets = DataLoader.LoadContactOutlets();
    dataContext.SeedContactData(mediaContacts);
    dataContext.SeedRequestData(mediaRequests);
    dataContext.SeedMediaOutletData(mediaOutlets);
    dataContext.SeedContactOutletData(contactOutlets);

    builder.Services.AddSingleton(dataContext);

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
