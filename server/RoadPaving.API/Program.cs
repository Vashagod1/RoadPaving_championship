using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using RoadPaving.Application.UseCases.Tomorrow;
using Scalar.AspNetCore;
using RoadPaving.Infrastructure;
using RoadPaving.Infrastructure.Extensions;
using RoadPaving.Infrastructure.Integrations;
using RoadPaving.Infrastructure.Persistence.DataBase;
using RoadPaving.Infrastructure.Integrations;

var builder = WebApplication.CreateBuilder(args);
var services = builder.Services;

services.AddControllers();
services.AddOpenApi();
services.AddSwaggerGen();
services.AddControllers();

services.AddInfrastructure(builder.Configuration);

services.AddScoped<WeatherService>();

services.Configure<TomorrowOptions>
    (builder.Configuration.GetSection("TomorrowIO"));

builder.Services.AddHttpClient<TomorrowIoClient>(client =>
{
    client.BaseAddress = new Uri("https://api.tomorrow.io/v4/");
});
    
var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    await db.Database.MigrateAsync();
}

app.UseSwagger();
app.UseSwaggerUI();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();