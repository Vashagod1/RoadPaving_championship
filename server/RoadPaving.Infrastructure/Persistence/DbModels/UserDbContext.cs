using RoadPaving.Domain.Models;

namespace RoadPaving.Infrastructure.Persistence.DbModels;

public class UserDbContext
{
    public Guid Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string? Patronymic { get; set; }
    public string Email { get; set; }
    public int PhoneNumber { get; set; }
    public UserRole Role { get; set; }
    public string PasswordHash { get; set; }
    public DateTime CreatedAt { get; init; }
}