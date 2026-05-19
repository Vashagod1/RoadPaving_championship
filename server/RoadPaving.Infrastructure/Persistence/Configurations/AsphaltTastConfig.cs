using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RoadPaving.Infrastructure.Persistence.DbModels;

namespace RoadPaving.Infrastructure.Persistence.Configurations;

public class AsphaltTastConfig : IEntityTypeConfiguration<AsphaltTaskDbContext>
{
    public void Configure(EntityTypeBuilder<AsphaltTaskDbContext> builder)
    {
        builder.ToTable("Tasks");
        
        builder.HasKey(at => at.Id);
        
        builder.Property(at => at.Status).IsRequired();
        builder.Property(at => at.CreatedAt).IsRequired();
        builder.Property(at => at.UpdatedAt).IsRequired();
        builder.Property(at => at.Title).HasMaxLength(255).IsRequired();
        builder.Property(at => at.Description).HasMaxLength(1000).IsRequired();
        builder.Property(at => at.DueAt).IsRequired();
        builder.Property(at => at.Priority).IsRequired();
        builder.Property(at => at.TriggerReason).IsRequired();
        builder.Property(at => at.Type).IsRequired();

        builder.HasOne(at => at.Equipment)
            .WithMany(e => e.Tasks)
            .HasForeignKey(at => at.EquipmentId);
    }
}