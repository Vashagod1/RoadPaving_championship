using Microsoft.EntityFrameworkCore;
using Npgsql;
using RoadPaving.Infrastructure.Persistence.DbModels;
using Npgsql.EntityFrameworkCore.PostgreSQL.NetTopologySuite;

namespace RoadPaving.Infrastructure.Persistence.DataBase;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }
    
    public DbSet<AlertDbContext> Alerts => Set<AlertDbContext>();
    public DbSet<AsphaltTaskDbContext> AsphaltTasks => Set<AsphaltTaskDbContext>();
    public DbSet<EquipmentDbContext> Equipments => Set<EquipmentDbContext>();
    public DbSet<GreenWindowDbContext> GreenWindows => Set<GreenWindowDbContext>();
    public DbSet<PlantDbContext> Plants => Set<PlantDbContext>();
    public DbSet<SiteDbContext> Sites => Set<SiteDbContext>();
    public DbSet<TruckDbContext> Trucks => Set<TruckDbContext>();
    public DbSet<UserDbContext> Users => Set<UserDbContext>();
    public DbSet<WeatherForecastDbContext> WeatherForecasts => Set<WeatherForecastDbContext>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.HasPostgresExtension("postgis");
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly); // ←
    }
}