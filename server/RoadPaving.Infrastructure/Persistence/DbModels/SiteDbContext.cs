using NetTopologySuite.Geometries;
using RoadPaving.Domain.Models;

namespace RoadPaving.Infrastructure.Persistence.DbModels;

public class SiteDbContext
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string? RoadName { get; set; }
    public decimal KmStart { get; set; }
    public decimal KmEnd { get; set; }
    public LineString? Location { get; set; }
    public decimal? LayerThicknessCm { get; set; }
    public decimal? StripWidthM { get; set; }
    public bool IsThinLayer { get; set; }
    public SiteStatus Status { get; set; }
    public DateTimeOffset CreatedAt { get; set; }
    
    public ICollection<TruckDbContext> Trucks { get; }
    public ICollection<EquipmentDbContext> Equipment { get; }
    public ICollection<GreenWindowDbContext> GreenWindows { get; }
    public ICollection<AlertDbContext> Alerts { get; }
    public ICollection<WeatherForecastDbContext> WeatherForecasts { get; }
}