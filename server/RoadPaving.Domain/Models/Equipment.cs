namespace RoadPaving.Domain.Models;

public class Equipment
{
    public Equipment(Guid id, string? model, EquipmentType type, DateTimeOffset? lastToAt)
    {
        Id = id;
        Model = model;
        Type = type;
        Status = EquipmentStatus.Operational;
        LastToAt = lastToAt;
        CreatedAt = DateTimeOffset.Now;
    }
    
    public Guid Id { get; init; }
    public Guid SiteId { get; init; }
    public EquipmentType Type { get; private set; }
    public string? Model { get; private set; }
    public EquipmentStatus Status { get; private set; }
    public DateTimeOffset? LastToAt { get; private set; }
    public DateTimeOffset CreatedAt { get; private set; }

    public Site Site { get; private set; }
    public ICollection<AsphaltTask> Tasks { get; }

    public static Equipment Create(Guid id, string? model, EquipmentType type, DateTimeOffset? lastToAt)
    {
        var equipment = new Equipment(
            id, model, type, lastToAt
        );
        
        return equipment;
    }
}