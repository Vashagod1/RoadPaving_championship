using NetTopologySuite.Geometries;

namespace RoadPaving.Domain.Models;

public class Truck
{
    private Truck(Guid id, string plateNumber, decimal capacityTon, Point? currentLocation)
    {
        Id = id;
        PlateNumber = plateNumber;
        CapacityTon = capacityTon;
        CurrentLocation = currentLocation;
        UpdatedAt = DateTimeOffset.Now;
        Status = TruckStatus.Idle;
    }
    
    public Guid Id { get; init; }
    public string PlateNumber { get; private set; }
    public decimal CapacityTon { get; private set; }
    public Guid? PlantId { get; init; }
    public Guid? CurrentSiteId { get; init; }
    public TruckStatus Status { get; private set; }
    public Point? CurrentLocation { get; private set; }
    public DateTimeOffset UpdatedAt { get; private set; }

    public Plant? Plant { get; private set; }
    public Site? CurrentSite { get; private set; }

    public static Truck Create(Guid id, string plateNumber, decimal capacityTon, Point? currentLocation)
    {
        var truck = new Truck(
            id, plateNumber, capacityTon, currentLocation
        );
        
        return truck;
    }
}