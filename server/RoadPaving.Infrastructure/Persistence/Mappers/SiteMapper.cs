using RoadPaving.Domain.Models;
using RoadPaving.Infrastructure.Persistence.DbModels;

namespace RoadPaving.Infrastructure.Persistence.Mappers;

public class SiteMapper
{
    public static SiteDbContext ToDb(Site site)
    {
        return new SiteDbContext
        {
            Id = site.Id,
            Name = site.Name,
            RoadName = site.RoadName,
            KmStart = site.KmStart,
            KmEnd = site.KmEnd,
            Location = site.Location,
            LayerThicknessCm = site.LayerThicknessCm,
            StripWidthM = site.StripWidthM,
            IsThinLayer = site.IsThinLayer,
            Status = site.Status,
            CreatedAt = site.CreatedAt
        };
    }

    public static Site ToDomain(SiteDbContext db)
    {
        var domain = Site.Create(
            db.Id, db.Name, db.RoadName, db.KmStart, db.KmEnd, db.Location, db.LayerThicknessCm, db.StripWidthM
        );

        return domain;
    }
}
