using System.Text.Json;

namespace RoadPaving.Domain.Models;

public class WeatherForecast
{
    private WeatherForecast(Guid id, WeatherForecastProvider provider, DateTimeOffset forecastTime,
        DateTimeOffset fetchedAt, decimal? temperatureCelsius, decimal? precipProbPct, decimal? precipMm,
        decimal? windSpeedMs, string? conditionCode, JsonDocument? rawJson)
    {
        Id = id;
        Provider = provider;
        ForecastTime = forecastTime;
        FetchedAt = fetchedAt;
        TemperatureCelsius = temperatureCelsius;
        PrecipProbPct = precipProbPct;
        PrecipMm = precipMm;
        WindSpeedMs = windSpeedMs;
        ConditionCode = conditionCode;
        RawJson = rawJson;
    }
    
    public Guid Id { get; init; }
    public Guid SiteId { get; init; }
    public WeatherForecastProvider Provider { get; private set; }
    public DateTimeOffset ForecastTime { get; private set; }
    public DateTimeOffset FetchedAt { get; private set; }
    public decimal? TemperatureCelsius { get; private set; }
    public decimal? PrecipProbPct { get; private set; }
    public decimal? PrecipMm { get; private set; }
    public decimal? WindSpeedMs { get; private set; }
    public string? ConditionCode { get; private set; }
    public JsonDocument? RawJson { get; private set; }

    public Site Site { get; private set; }

    public static WeatherForecast Create(Guid id, WeatherForecastProvider provider, DateTimeOffset forecastTime,
        DateTimeOffset fetchedAt, decimal? temperatureCelsius, decimal? precipProbPct, decimal? precipMm,
        decimal? windSpeedMs, string? conditionCode, JsonDocument? rawJson)
    {
        var weatherForecast = new WeatherForecast(
            id, provider, forecastTime, fetchedAt, temperatureCelsius, precipProbPct, precipMm, windSpeedMs,
            conditionCode, rawJson
        );

        return weatherForecast;
    }
}