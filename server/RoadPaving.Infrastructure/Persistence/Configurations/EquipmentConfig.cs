using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RoadPaving.Infrastructure.Persistence.DbModels;

namespace RoadPaving.Infrastructure.Persistence.Configurations;

public class EquipmentConfig : IEntityTypeConfiguration<EquipmentDbContext>
{
    public void Configure(EntityTypeBuilder<EquipmentDbContext> builder)
    {
        builder.ToTable("Equipments");
        
        builder.HasKey(e => e.Id);
        
        builder.Property(e => e.Status).IsRequired();
        builder.Property(e => e.CreatedAt).IsRequired();
        builder.Property(e => e.LastToAt).IsRequired();
        builder.Property(e => e.Model).IsRequired();
        builder.Property(e => e.Type).IsRequired();
        
        builder.HasOne(e => e.Site)
            .WithMany(s => s.Equipment)
            .HasForeignKey(e => e.SiteId);
        
        builder.HasMany(e => e.Tasks)
            .WithOne(e => e.Equipment)
            .HasForeignKey(e => e.EquipmentId);
    }
}