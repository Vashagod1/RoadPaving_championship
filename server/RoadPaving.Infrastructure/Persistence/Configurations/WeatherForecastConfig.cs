using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RoadPaving.Infrastructure.Persistence.DbModels;

namespace RoadPaving.Infrastructure.Persistence.Configurations;

public class WeatherForecastConfig : IEntityTypeConfiguration<WeatherForecastDbContext>
{
    public void Configure(EntityTypeBuilder<WeatherForecastDbContext> builder)
    {
        builder.ToTable("WeatherForecasts");
        
        builder.HasKey(wf => wf.Id);
        
        builder.Property(wf => wf.ConditionCode).IsRequired();
        builder.Property(wf => wf.FetchedAt).IsRequired();
        builder.Property(wf => wf.ForecastTime).IsRequired();
        builder.Property(wf => wf.PrecipMm).IsRequired();
        builder.Property(wf => wf.PrecipProbPct).IsRequired();
        builder.Property(wf => wf.Provider).IsRequired();
        builder.Property(wf => wf.RawJson).IsRequired();
        builder.Property(wf => wf.TemperatureCelsius).IsRequired();
        builder.Property(wf => wf.WindSpeedMs).IsRequired();
        
        builder.HasOne(wf => wf.Site)
            .WithMany(wf => wf.WeatherForecasts)
            .HasForeignKey(wf => wf.SiteId);
    }
}