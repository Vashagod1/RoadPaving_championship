using NetTopologySuite.Geometries;

namespace RoadPaving.Domain.Models;

public class Site
{
    private Site(Guid id, string name, string? roadName, decimal kmStart, decimal kmEnd, LineString? location,
        decimal? layerThicknessCm, decimal? stripWidthM)
    {
        Id = id;
        Name = name;
        RoadName = roadName;
        KmStart = kmStart;
        KmEnd = kmEnd;
        Location = location;
        LayerThicknessCm = layerThicknessCm;
        StripWidthM = stripWidthM;
        IsThinLayer = false;
        Status = SiteStatus.Active;
        CreatedAt = DateTimeOffset.UtcNow;
    }
    
    public Guid Id { get; init; }
    public string Name { get; init; }
    public string? RoadName { get; private set; }
    public decimal KmStart { get; private set; }
    public decimal KmEnd { get; private set; }
    public LineString? Location { get; private set; }
    public decimal? LayerThicknessCm { get; private set; }
    public decimal? StripWidthM { get; private set; }
    public bool IsThinLayer { get; private set; }
    public SiteStatus Status { get; private set; }
    public DateTimeOffset CreatedAt { get; private set; }
    
    public ICollection<Equipment> Equipment { get; }
    public ICollection<GreenWindow> GreenWindows { get; }
    public ICollection<Alert> Alerts { get; }
    public ICollection<WeatherForecast> WeatherForecasts { get; }

    public static Site Create(Guid id, string name, string? roadName, decimal kmStart, decimal kmEnd,
        LineString? location, decimal? layerThicknessCm, decimal? stripWidthM)
    {
        var site = new Site(
            id, name, roadName, kmStart, kmEnd, location, layerThicknessCm, stripWidthM
        );
        
        return site;
    }
}