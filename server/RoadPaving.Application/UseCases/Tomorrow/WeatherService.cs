using RoadPaving.Infrastructure.Integrations;

namespace RoadPaving.Application.UseCases.Tomorrow;

public class WeatherService
{
    private readonly TomorrowIoClient _client;

    public WeatherService(TomorrowIoClient client)
    {
        _client = client;
    }
    
    public async Task<TomorrowValues?> GetWeather(double lat, double lon)
    {
        var forecast = await _client.GetForecast(lat, lon);

        return forecast;
    }
}