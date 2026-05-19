using NetTopologySuite.Geometries;
using RoadPaving.Domain.Models;

namespace RoadPaving.Infrastructure.Persistence.DbModels;

public class TruckDbContext
{
    public Guid Id { get; set; }
    public string PlateNumber { get; set; }
    public decimal CapacityTon { get; set; }
    public Guid? PlantId { get; set; }
    public Guid? CurrentSiteId { get; set; }
    public TruckStatus Status { get; set; }
    public Point? CurrentLocation { get; set; }
    public DateTimeOffset UpdatedAt { get; set; }

    public PlantDbContext? Plant { get; set; }
    public SiteDbContext? CurrentSite { get; set; }
}