using RoadPaving.Domain.Models;
using RoadPaving.Infrastructure.Persistence.DbModels;

namespace RoadPaving.Infrastructure.Persistence.Mappers;

public class AsphaltTaskMapper
{
    public static AsphaltTaskDbContext ToDb(AsphaltTask asphaltTask)
    {
        return new AsphaltTaskDbContext
        {
            Id = asphaltTask.Id,
            SiteId = asphaltTask.SiteId,
            EquipmentId = asphaltTask.EquipmentId,
            Type = asphaltTask.Type,
            Title = asphaltTask.Title,
            Description = asphaltTask.Description,
            TriggerReason = asphaltTask.TriggerReason,
            Priority = asphaltTask.Priority,
            Status = asphaltTask.Status,
            DueAt = asphaltTask.DueAt,
            CreatedAt = asphaltTask.CreatedAt,
            UpdatedAt = asphaltTask.UpdatedAt
        };
    }

    public static AsphaltTask ToDomain(AsphaltTaskDbContext db)
    {
        var domain = AsphaltTask.Create(
            db.Id, db.Type, db.Title, db.Description, db.TriggerReason, db.Priority, db.DueAt
        );

        return domain;
    }
}
