using RoadPaving.Domain.Models;
using RoadPaving.Infrastructure.Persistence.DbModels;

namespace RoadPaving.Infrastructure.Persistence.Mappers;

public class WeatherForecastMapper
{
    public static WeatherForecastDbContext ToDb(WeatherForecast weatherForecast)
    {
        return new WeatherForecastDbContext
        {
            Id = weatherForecast.Id,
            SiteId = weatherForecast.SiteId,
            Provider = weatherForecast.Provider,
            ForecastTime = weatherForecast.ForecastTime,
            FetchedAt = weatherForecast.FetchedAt,
            TemperatureCelsius = weatherForecast.TemperatureCelsius,
            PrecipProbPct = weatherForecast.PrecipProbPct,
            PrecipMm = weatherForecast.PrecipMm,
            WindSpeedMs = weatherForecast.WindSpeedMs,
            ConditionCode = weatherForecast.ConditionCode,
            RawJson = weatherForecast.RawJson
        };
    }

    public static WeatherForecast ToDomain(WeatherForecastDbContext db)
    {
        var domain = WeatherForecast.Create(
            db.Id, db.Provider, db.ForecastTime, db.FetchedAt, db.TemperatureCelsius, db.PrecipProbPct, 
            db.PrecipMm, db.WindSpeedMs, db.ConditionCode, db.RawJson
        );

        return domain;
    }
}
