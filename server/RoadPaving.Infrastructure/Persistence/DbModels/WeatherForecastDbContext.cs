using System.Text.Json;
using RoadPaving.Domain.Models;

namespace RoadPaving.Infrastructure.Persistence.DbModels;

public class WeatherForecastDbContext
{
    public Guid Id { get; set; }
    public Guid SiteId { get; set; }
    public WeatherForecastProvider Provider { get; set; }
    public DateTimeOffset ForecastTime { get; set; }
    public DateTimeOffset FetchedAt { get; set; }
    public decimal? TemperatureCelsius { get; set; }
    public decimal? PrecipProbPct { get; set; }
    public decimal? PrecipMm { get; set; }
    public decimal? WindSpeedMs { get; set; }
    public string? ConditionCode { get; set; }
    public JsonDocument? RawJson { get; set; }
    
    public SiteDbContext Site { get; set; }
}