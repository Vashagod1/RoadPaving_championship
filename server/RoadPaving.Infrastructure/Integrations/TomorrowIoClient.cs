using System.Globalization;
using System.Text.Json;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;

namespace RoadPaving.Infrastructure.Integrations;

public class TomorrowIoClient
{
    private readonly HttpClient _httpClient;
    private readonly TomorrowOptions _options;
    
    public TomorrowIoClient(HttpClient httpClient, IOptions<TomorrowOptions> options)
    {
        _httpClient = httpClient;
        _options = options.Value;
    }

    public async Task<TomorrowValues?> GetForecast(double lat, double lon)
    {
        var url = $"weather/forecast?location={lat.ToString(CultureInfo.InvariantCulture)},{lon.ToString(CultureInfo.InvariantCulture)}&apikey={_options.ApiKey}";

        var response = await _httpClient.GetAsync(url);
        response.EnsureSuccessStatusCode();

        var json = await response.Content.ReadAsStringAsync();

        var result = JsonSerializer.Deserialize<TomorrowIoResponse>(json, new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        });

        return result?.Timelines.Hourly[0].Values;
    }
}