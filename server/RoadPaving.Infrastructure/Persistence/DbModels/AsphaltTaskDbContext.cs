using RoadPaving.Domain.Models;

namespace RoadPaving.Infrastructure.Persistence.DbModels;

public class AsphaltTaskDbContext
{
    public Guid Id { get; set; }
    public Guid SiteId { get; set; }
    public Guid EquipmentId { get; set; }
    public AsphaltTaskType Type { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public AsphaltTaskTriggerReason TriggerReason { get; set; }
    public AsphaltTaskPriority Priority { get; set; }
    public AsphaltTaskStatus Status { get; set; }
    public DateTimeOffset DueAt { get; set; }
    public DateTimeOffset CreatedAt { get; set; }
    public DateTimeOffset UpdatedAt { get; set; }
    
    public SiteDbContext Site { get; set; }
    public EquipmentDbContext Equipment { get; set; }
}