namespace RoadPaving.Domain.Models;

public class User
{
    private User(Guid id, string firstName, string lastName, string? patronymic, string email, int phoneNumber,
        string passwordHash)
    {
        Id = id;
        FirstName = firstName;
        LastName = lastName;
        Patronymic = patronymic;
        Email = email;
        PhoneNumber = phoneNumber;
        Role = UserRole.User;
        PasswordHash = passwordHash;
        CreatedAt = DateTime.UtcNow;
    } 
    
    public Guid Id { get; init; }
    public string FirstName { get; private set; }
    public string LastName { get; private set; }
    public string? Patronymic { get; private set; }
    public string Email { get; private set; }
    public int PhoneNumber { get; private set; }
    public UserRole Role { get; private set; }
    public string PasswordHash { get; private set; }
    public DateTime CreatedAt { get; init; }

    public static User Create(Guid id, string firstName, string lastName, string? surname, string email,
        int phoneNumber, string passwordHash)
    {
        var user = new User(
            id, firstName, lastName, surname, email, phoneNumber, passwordHash
            );

        return user;
    }
}