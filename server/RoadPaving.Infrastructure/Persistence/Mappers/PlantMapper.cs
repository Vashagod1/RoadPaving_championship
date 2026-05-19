using RoadPaving.Domain.Models;
using RoadPaving.Infrastructure.Persistence.DbModels;

namespace RoadPaving.Infrastructure.Persistence.Mappers;

public class PlantMapper
{
    public static PlantDbContext ToDb(Plant plant)
    {
        return new PlantDbContext
        {
            Id = plant.Id,
            Name = plant.Name,
            Location = plant.Location,
            CapacityTonH = plant.CapacityTonH,
            MixDensity = plant.MixDensity,
            OrderLeadH = plant.OrderLeadH,
            IsActive = plant.IsActive,
            CreatedAt = plant.CreatedAt
        };
    }

    public static Plant ToDomain(PlantDbContext db)
    {
        var domain = Plant.Create(
            db.Id, db.Name, db.Location, db.CapacityTonH, db.MixDensity, db.OrderLeadH
        );

        return domain;
    }
}
