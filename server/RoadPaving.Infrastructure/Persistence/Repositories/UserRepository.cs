using FluentResults;
using Microsoft.EntityFrameworkCore;
using RoadPaving.Domain.Interfaces;
using RoadPaving.Domain.Models;
using RoadPaving.Infrastructure.Persistence.DataBase;
using RoadPaving.Infrastructure.Persistence.Mappers;

namespace RoadPaving.Infrastructure.Persistence.Repositories;

public class UserRepository : IUserRepository
{
    private readonly AppDbContext _dbContext;
    
    public UserRepository(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Result<List<User>>> GetByEmail(string email, CancellationToken ct)
    {
        var response = await _dbContext.Users.Where(u => u.Email.Contains(email))
            .AsNoTracking()
            .ToListAsync(ct);

        if (response.Count is 0)
            return Result.Fail("Users not found");

        return Result.Ok(response.Select(UserMapper.ToDomain).ToList());
    }

    public async Task<Result<List<User>>> GetAll(CancellationToken ct)
    {
        var response = await _dbContext.Users
            .AsNoTracking()
            .ToListAsync(ct);
        
        return Result.Ok(response.Select(UserMapper.ToDomain).ToList());
    }

    public async Task<Result> Add(User user, CancellationToken ct)
    {
        var userDb = UserMapper.ToDb(user);

        await _dbContext.AddAsync(userDb, ct);
        return Result.Ok();
    }

    public async Task<Result> Update(Guid id, string password, CancellationToken ct)
    {
        var resultUpd = await _dbContext.Users
            .Where(u => u.Id == id)
            .ExecuteUpdateAsync(s => s
                .SetProperty(u => u.PasswordHash, password), ct);

        return Result.Ok();
    }

    public async Task<Result> Delete(Guid id, CancellationToken ct)
    {
        var resultDel = await _dbContext.Users
            .Where(u => u.Id == id)
            .ExecuteDeleteAsync(ct);

        return Result.Ok();
    }
}