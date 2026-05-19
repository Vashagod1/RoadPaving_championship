using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RoadPaving.Infrastructure.Persistence.DbModels;

namespace RoadPaving.Infrastructure.Persistence.Configurations;

public class PlantConfig : IEntityTypeConfiguration<PlantDbContext>
{
    public void Configure(EntityTypeBuilder<PlantDbContext> builder)
    {
        builder.ToTable("Plants");

        builder.HasKey(p => p.Id);
        
        builder.Property(p => p.CreatedAt).IsRequired();
        builder.Property(p => p.CapacityTonH).IsRequired();
        builder.Property(p => p.IsActive).IsRequired();
        builder.Property(p => p.Location).IsRequired();
        builder.Property(p => p.MixDensity).IsRequired();
        builder.Property(p => p.Name).IsRequired();
        builder.Property(p => p.OrderLeadH).IsRequired();
        
        builder.HasMany(p => p.Trucks)
            .WithOne(p => p.Plant)
            .HasForeignKey(p => p.PlantId);
    }
}