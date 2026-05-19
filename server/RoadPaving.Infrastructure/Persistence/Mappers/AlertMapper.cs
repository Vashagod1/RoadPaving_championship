using RoadPaving.Domain.Models;
using RoadPaving.Infrastructure.Persistence.DbModels;

namespace RoadPaving.Infrastructure.Persistence.Mappers;

public class AlertMapper
{
    public static AlertDbContext ToDb(Alert alert)
    {
        return new AlertDbContext
        {
            Id = alert.Id,
            Code = alert.Code,
            CreatedAt = alert.CreatedAt,
            IsRead = alert.IsRead,
            Level = alert.Level,
            Message = alert.Message,
            Payload = alert.Payload
        };
    }

    public static Alert ToDomain(AlertDbContext db)
    {
        var domain = Alert.Create(
            db.Id, db.Level, db.Code, db.Message, db.Payload
        );

        return domain;
    }
}