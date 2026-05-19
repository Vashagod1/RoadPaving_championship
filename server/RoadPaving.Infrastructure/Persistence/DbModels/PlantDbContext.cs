using NetTopologySuite.Geometries;

namespace RoadPaving.Infrastructure.Persistence.DbModels;

public class PlantDbContext
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public Point Location { get; set; }
    public decimal CapacityTonH { get; set; }
    public decimal MixDensity { get; set; }
    public decimal OrderLeadH { get; set; }
    public bool IsActive { get; set; }
    public DateTimeOffset CreatedAt { get; set; }

    public ICollection<TruckDbContext> Trucks { get; } 
}