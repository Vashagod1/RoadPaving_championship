namespace RoadPaving.Infrastructure.Integrations;

public class TomorrowInterval
{
    public DateTimeOffset Time { get; set; }
    public TomorrowValues Values { get; set; } = null!;
}