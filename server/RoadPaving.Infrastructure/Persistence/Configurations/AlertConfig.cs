using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RoadPaving.Infrastructure.Persistence.DbModels;

namespace RoadPaving.Infrastructure.Persistence.Configurations;

public class AlertConfig : IEntityTypeConfiguration<AlertDbContext>
{
    public void Configure(EntityTypeBuilder<AlertDbContext> builder)
    {
        builder.ToTable("Alerts");
        
        builder.HasKey(a => a.Id);
        
        builder.Property(a => a.IsRead).IsRequired();
        builder.Property(a => a.Code).IsRequired();
        builder.Property(a => a.CreatedAt).IsRequired();
        builder.Property(a => a.Level).IsRequired();
        builder.Property(a => a.Message).IsRequired();
        builder.Property(a => a.Payload).IsRequired();

        builder.HasOne(a => a.Site)
            .WithMany(s => s.Alerts)
            .HasForeignKey(a => a.SiteId);
    }
}