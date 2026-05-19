namespace RoadPaving.Domain.Models;

public class AsphaltTask
{
    private AsphaltTask(Guid id, AsphaltTaskType type, string title, string description, AsphaltTaskTriggerReason triggerReason,
        AsphaltTaskPriority priority, DateTimeOffset dueAt)
    {
        Id = id;
        Type = type;
        Title = title;
        Description = description;
        TriggerReason = triggerReason;
        Priority = priority;
        DueAt = dueAt;
        CreatedAt = DateTimeOffset.UtcNow;
        UpdatedAt = DateTimeOffset.UtcNow;
        Status = AsphaltTaskStatus.Pending;
    }
    
    public Guid Id { get; init; }
    public Guid SiteId { get; init; }
    public Guid EquipmentId { get; init; }
    public AsphaltTaskType Type { get; private set; }
    public string Title { get; private set; }
    public string Description { get; private set; }
    public AsphaltTaskTriggerReason TriggerReason { get; private set; }
    public AsphaltTaskPriority Priority { get; private set; }
    public AsphaltTaskStatus Status { get; private set; }
    public DateTimeOffset DueAt { get; private set; }
    public DateTimeOffset CreatedAt { get; init; }
    public DateTimeOffset UpdatedAt { get; private set; }
    
    public Site Site { get; private set; }
    public Equipment Equipment { get; private set; }

    public static AsphaltTask Create(Guid id, AsphaltTaskType type, string title, string description,
        AsphaltTaskTriggerReason triggerReason, AsphaltTaskPriority priority, DateTimeOffset dueAt)
    {
        var asphaltTask = new AsphaltTask(
            id, type, title, description, triggerReason, priority, dueAt
            );
        
        return asphaltTask;
    }
}