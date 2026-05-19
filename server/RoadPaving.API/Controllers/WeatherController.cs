using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using RoadPaving.Application.UseCases.Tomorrow;
using RoadPaving.Infrastructure.Integrations;

namespace RoadPaving.API.Controllers;

[ApiController]
[Route("api/v1/weather")]
public class WeatherController : ControllerBase
{
    private readonly WeatherService _weatherService;
    private readonly TomorrowOptions _options;

    public WeatherController(WeatherService weatherService, IOptions<TomorrowOptions> options)
    {
        _weatherService = weatherService;
        _options = options.Value;
    }

    [HttpGet("{lat}/{lon}")]
    public async Task<IActionResult> GetWeatherAsync(double lat, double lon)
    {
        var values = await _weatherService.GetWeather(lat, lon);
    
        if (values is null)
            return NotFound();
    
        return Ok(values);
    }
}