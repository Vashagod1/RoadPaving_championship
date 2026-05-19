using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RoadPaving.Infrastructure.Persistence.DbModels;

namespace RoadPaving.Infrastructure.Persistence.Configurations;

public class GreenWindowConfig : IEntityTypeConfiguration<GreenWindowDbContext>
{
    public void Configure(EntityTypeBuilder<GreenWindowDbContext> builder)
    {
        builder.ToTable("GreenWindows");
        
        builder.HasKey(e => e.Id);

        builder.Property(e => e.RiskLevel).IsRequired();
        builder.Property(e => e.CalcAt).IsRequired();
        builder.Property(e => e.ConfidencePct).IsRequired();
        builder.Property(e => e.DurationMin).IsRequired();
        builder.Property(e => e.IsCurrent).IsRequired();
        builder.Property(e => e.MaxTonnageT).IsRequired();
        builder.Property(e => e.WindowEnd).IsRequired();
        builder.Property(e => e.WindowStart).IsRequired();
        
        builder.HasOne(gw => gw.Site)
            .WithMany(s => s.GreenWindows)
            .HasForeignKey(gw => gw.SiteId);
    }
}