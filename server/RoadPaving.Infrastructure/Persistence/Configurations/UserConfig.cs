using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RoadPaving.Infrastructure.Persistence.DbModels;

namespace RoadPaving.Infrastructure.Persistence.Configurations;

public class UserConfig : IEntityTypeConfiguration<UserDbContext>
{
    public void Configure(EntityTypeBuilder<UserDbContext> builder)
    {
        builder.ToTable("Users");
        
        builder.HasKey(u => u.Id);
        
        builder.Property(u => u.CreatedAt).IsRequired();
        builder.Property(u => u.Email).IsRequired();
        builder.Property(u => u.FirstName).IsRequired();
        builder.Property(u => u.LastName).IsRequired();
        builder.Property(u => u.Patronymic).IsRequired();
        builder.Property(u => u.PasswordHash).IsRequired();
        builder.Property(u => u.PhoneNumber).IsRequired();
        builder.Property(u => u.Role).IsRequired();
    }
}