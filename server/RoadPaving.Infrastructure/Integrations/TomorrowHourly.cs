namespace RoadPaving.Infrastructure.Integrations;

public class TomorrowHourly
{
    public DateTimeOffset Time { get; set; }
    public TomorrowValues Values { get; set; } = null!;
}