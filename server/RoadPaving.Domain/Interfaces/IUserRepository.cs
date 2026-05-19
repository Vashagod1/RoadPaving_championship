using FluentResults;
using RoadPaving.Domain.Models;

namespace RoadPaving.Domain.Interfaces;

public interface IUserRepository
{
    Task<Result<List<User>>> GetByEmail(string email, CancellationToken ct);
    Task<Result<List<User>>> GetAll(CancellationToken ct);
    Task<Result> Add(User user, CancellationToken ct);
    Task<Result> Update(Guid id, string password,  CancellationToken ct);
    Task<Result> Delete(Guid id, CancellationToken ct);
}