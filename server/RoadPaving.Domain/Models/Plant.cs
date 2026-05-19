using NetTopologySuite.Geometries;

namespace RoadPaving.Domain.Models;

public class Plant
{
    private Plant(Guid id, string name, Point location, decimal capacityTonH, decimal mixDensity, decimal orderLeadH)
    {
        Id = id;
        Name = name;
        Location = location;
        CapacityTonH = capacityTonH;
        MixDensity = mixDensity;
        OrderLeadH = orderLeadH;
        IsActive = true;
        CreatedAt = DateTimeOffset.Now;
    }
    
    public Guid Id { get; init; }
    public string Name { get; init; }
    public Point Location { get; private set; }
    public decimal CapacityTonH { get; private set; }
    public decimal MixDensity { get; private set; }
    public decimal OrderLeadH { get; private set; }
    public bool IsActive { get; private set; }
    public DateTimeOffset CreatedAt { get; private set; }

    public ICollection<Truck> Trucks { get; } 

    public static Plant Create(Guid id, string name, Point location, decimal capacityTonH, decimal mixDensity,
        decimal orderLeadH)
    {
        var plant = new Plant(
            id, name, location, capacityTonH, mixDensity, orderLeadH
        );

        return plant;
    }
}