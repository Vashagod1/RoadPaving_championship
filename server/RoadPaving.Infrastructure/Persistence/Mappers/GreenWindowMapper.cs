using RoadPaving.Domain.Models;
using RoadPaving.Infrastructure.Persistence.DbModels;

namespace RoadPaving.Infrastructure.Persistence.Mappers;

public class GreenWindowMapper
{
    public static GreenWindowDbContext ToDb(GreenWindow greenWindow)
    {
        return new GreenWindowDbContext
        {
            Id = greenWindow.Id,
            SiteId = greenWindow.SiteId,
            WindowStart = greenWindow.WindowStart,
            WindowEnd = greenWindow.WindowEnd,
            DurationMin = greenWindow.DurationMin,
            ConfidencePct = greenWindow.ConfidencePct,
            MaxTonnageT = greenWindow.MaxTonnageT,
            RiskLevel = greenWindow.RiskLevel,
            CalcAt = greenWindow.CalcAt,
            IsCurrent = greenWindow.IsCurrent
        };
    }

    public static GreenWindow ToDomain(GreenWindowDbContext db)
    {
        var domain = GreenWindow.Create(
            db.Id, db.WindowStart, db.WindowEnd, db.DurationMin, db.ConfidencePct, db.MaxTonnageT, db.RiskLevel
        );

        return domain;
    }
}
