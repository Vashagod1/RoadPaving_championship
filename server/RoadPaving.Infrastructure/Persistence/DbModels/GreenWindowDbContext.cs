using RoadPaving.Domain.Models;

namespace RoadPaving.Infrastructure.Persistence.DbModels;

public class GreenWindowDbContext
{
    public Guid Id { get; set; }
    public Guid SiteId { get; set; }
    public DateTimeOffset WindowStart { get; set; }
    public DateTimeOffset WindowEnd { get; set; }
    public int DurationMin { get; set; }
    public decimal? ConfidencePct { get; set; }
    public decimal? MaxTonnageT { get; set; }
    public GreenWindowRiskLevel RiskLevel { get; set; }
    public DateTimeOffset CalcAt { get; set; }
    public bool IsCurrent { get; set; }

    public SiteDbContext Site { get; set; }
}