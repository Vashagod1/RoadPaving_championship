using RoadPaving.Domain.Models;
using RoadPaving.Infrastructure.Persistence.DbModels;

namespace RoadPaving.Infrastructure.Persistence.Mappers;

public class UserMapper
{
    public static UserDbContext ToDb(User user)
    {
        return new UserDbContext
        {
            Id = user.Id,
            FirstName = user.FirstName,
            LastName = user.LastName,
            Patronymic = user.Patronymic,
            Email = user.Email,
            PhoneNumber = user.PhoneNumber,
            Role = user.Role,
            PasswordHash = user.PasswordHash,
            CreatedAt = user.CreatedAt
        };
    }

    public static User ToDomain(UserDbContext db)
    {
        var domain = User.Create(
            db.Id, db.FirstName, db.LastName, db.Patronymic, db.Email, db.PhoneNumber, db.PasswordHash
        );

        return domain;
    }
}
