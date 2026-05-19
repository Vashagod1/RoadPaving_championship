using RoadPaving.Domain.Models;
using RoadPaving.Infrastructure.Persistence.DbModels;

namespace RoadPaving.Infrastructure.Persistence.Mappers;

public class EquipmentMapper
{
    public static EquipmentDbContext ToDb(Equipment equipment)
    {
        return new EquipmentDbContext
        {
            Id = equipment.Id,
            SiteId = equipment.SiteId,
            Type = equipment.Type,
            Model = equipment.Model,
            Status = equipment.Status,
            LastToAt = equipment.LastToAt,
            CreatedAt = equipment.CreatedAt
        };
    }

    public static Equipment ToDomain(EquipmentDbContext db)
    {
        var domain = Equipment.Create(
            db.Id, db.Model, db.Type, db.LastToAt
        );

        return domain;
    }
}
