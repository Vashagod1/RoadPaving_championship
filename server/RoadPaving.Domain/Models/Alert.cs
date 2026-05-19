using System.Text.Json;

namespace RoadPaving.Domain.Models;

public class Alert
{
    public Alert(Guid id, AlertLevel level, AlertCode code, string message, JsonDocument? payload)
    {
        Id = id;
        Level = level;
        Code = code;
        Message = message;
        Payload = payload;
        IsRead = false;
        CreatedAt = DateTimeOffset.UtcNow;
    }
    
    public Guid Id { get; init; }
    public Guid? SiteId { get; init; }
    public AlertLevel Level { get; private set; }
    public AlertCode Code { get; private set; }
    public string Message { get; private set; }
    public JsonDocument? Payload { get; private set; }
    public bool IsRead { get; private set; }
    public DateTimeOffset CreatedAt { get; private set; }

    public Site? Site { get; private set; }

    public static Alert Create(Guid id, AlertLevel level, AlertCode code, string message, JsonDocument? payload)
    {
        var alert = new Alert(
            id, level, code, message, payload
        );

        return alert;
    }
}