using RoadPaving.Domain.Models;

namespace RoadPaving.Domain.Interfaces;

public interface IUnitOfWork : IAsyncDisposable
{
    IRepository<Alert> AlertRepository { get; }
    IRepository<AsphaltTask> AsphaltTaskRepository { get; }
    IRepository<Equipment> EquipmentRepository { get; }
    IRepository<GreenWindow> GreenWindowRepository { get; }
    IRepository<Plant> PlantRepository { get; }
    IRepository<Site> SiteRepository { get; }
    IRepository<Truck> TruckRepository { get; }
    IRepository<User> UserRepository { get; }
    IRepository<WeatherForecast> WeatherForecastRepository { get; }

    Task SaveChangesAsync();
    Task BeginTransactionAsync();
    Task CommitTransactionAsync();
    Task RollbackTransactionAsync();
}
