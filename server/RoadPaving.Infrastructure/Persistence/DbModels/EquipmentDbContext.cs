using RoadPaving.Domain.Models;

namespace RoadPaving.Infrastructure.Persistence.DbModels;

public class EquipmentDbContext
{
    public Guid Id { get; set; }
    public Guid SiteId { get; set; }
    public EquipmentType Type { get; set; }
    public string? Model { get; set; }
    public EquipmentStatus Status { get; set; }
    public DateTimeOffset? LastToAt { get; set; }
    public DateTimeOffset CreatedAt { get; set; }

    public SiteDbContext Site { get; set; }
    public ICollection<AsphaltTaskDbContext> Tasks { get; }
}