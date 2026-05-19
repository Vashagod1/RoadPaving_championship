using System.Text.Json;
using RoadPaving.Domain.Models;

namespace RoadPaving.Infrastructure.Persistence.DbModels;

public class AlertDbContext
{
    public Guid Id { get; set; }
    public Guid? SiteId { get; set; }
    public AlertLevel Level { get; set; }
    public AlertCode Code { get; set; }
    public string Message { get; set; }
    public JsonDocument? Payload { get; set; }
    public bool IsRead { get; set; }
    public DateTimeOffset CreatedAt { get; set; }

    public SiteDbContext? Site { get; set; }
}