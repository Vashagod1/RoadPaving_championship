using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RoadPaving.Infrastructure.Persistence.DbModels;

namespace RoadPaving.Infrastructure.Persistence.Configurations;

public class TruckConfig : IEntityTypeConfiguration<TruckDbContext>
{
    public void Configure(EntityTypeBuilder<TruckDbContext> builder)
    {
        builder.ToTable("Trucks");
        
        builder.HasKey(t => t.Id);
        
        builder.Property(t => t.Status).IsRequired();
        builder.Property(t => t.CapacityTon).IsRequired();
        builder.Property(t => t.CurrentLocation).IsRequired();
        builder.Property(t => t.PlateNumber).IsRequired();
        builder.Property(t => t.UpdatedAt).IsRequired();

        builder.HasOne(t => t.CurrentSite)
            .WithMany(s => s.Trucks)
            .HasForeignKey(t => t.CurrentSiteId);
    }
}