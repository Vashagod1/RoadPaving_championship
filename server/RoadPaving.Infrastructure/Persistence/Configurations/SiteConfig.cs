using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RoadPaving.Infrastructure.Persistence.DbModels;

namespace RoadPaving.Infrastructure.Persistence.Configurations;

public class SiteConfig : IEntityTypeConfiguration<SiteDbContext>
{
    public void Configure(EntityTypeBuilder<SiteDbContext> builder)
    {
        builder.ToTable("Sites");

        builder.HasKey(s => s.Id);
        
        builder.Property(s => s.Status).IsRequired();
        builder.Property(s => s.Name).IsRequired();
        builder.Property(s => s.CreatedAt).IsRequired();
        builder.Property(s => s.Location).IsRequired();
        builder.Property(s => s.IsThinLayer).IsRequired();
        builder.Property(s => s.KmEnd).IsRequired();
        builder.Property(s => s.KmStart).IsRequired();
        builder.Property(s => s.LayerThicknessCm).IsRequired();
        builder.Property(s => s.RoadName).IsRequired();
        builder.Property(s => s.StripWidthM).IsRequired();
        
        builder.HasMany(s => s.Equipment)
            .WithOne(s => s.Site)
            .HasForeignKey(s => s.SiteId);
        
        builder.HasMany(s => s.GreenWindows)
            .WithOne(s => s.Site)
            .HasForeignKey(s => s.SiteId);
        
        builder.HasMany(s => s.Alerts)
            .WithOne(s => s.Site)
            .HasForeignKey(s => s.SiteId);
        
        builder.HasMany(s => s.WeatherForecasts)
            .WithOne(s => s.Site)
            .HasForeignKey(w => w.SiteId);
    }
}