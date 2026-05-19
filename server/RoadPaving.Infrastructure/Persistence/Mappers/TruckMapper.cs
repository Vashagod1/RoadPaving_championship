using RoadPaving.Domain.Models;
using RoadPaving.Infrastructure.Persistence.DbModels;

namespace RoadPaving.Infrastructure.Persistence.Mappers;

public class TruckMapper
{
    public static TruckDbContext ToDb(Truck truck)
    {
        return new TruckDbContext
        {
            Id = truck.Id,
            PlateNumber = truck.PlateNumber,
            CapacityTon = truck.CapacityTon,
            PlantId = truck.PlantId,
            CurrentSiteId = truck.CurrentSiteId,
            Status = truck.Status,
            CurrentLocation = truck.CurrentLocation,
            UpdatedAt = truck.UpdatedAt
        };
    }

    public static Truck ToDomain(TruckDbContext db)
    {
        var domain = Truck.Create(
            db.Id, db.PlateNumber, db.CapacityTon, db.CurrentLocation
        );

        return domain;
    }
}
