namespace RoadPaving.Domain.Models;

public class GreenWindow
{
    private GreenWindow(Guid id, DateTimeOffset windowStart, DateTimeOffset windowEnd, int durationMin,
        decimal? confidencePct, decimal? maxTonnageT, GreenWindowRiskLevel riskLevel)
    {
        Id = id;
        WindowStart = windowStart;
        WindowEnd = windowEnd;
        DurationMin = durationMin;
        ConfidencePct = confidencePct;
        MaxTonnageT = maxTonnageT;
        RiskLevel = riskLevel;
        CalcAt = DateTimeOffset.UtcNow;
        IsCurrent = false;
    }
    
    public Guid Id { get; init; }
    public Guid SiteId { get; init; }
    public DateTimeOffset WindowStart { get; private set; }
    public DateTimeOffset WindowEnd { get; private set; }
    public int DurationMin { get; private set; }
    public decimal? ConfidencePct { get; private set; }
    public decimal? MaxTonnageT { get; private set; }
    public GreenWindowRiskLevel RiskLevel { get; private set; }
    public DateTimeOffset CalcAt { get; private set; }
    public bool IsCurrent { get; private set; }

    public Site Site { get; private set; }

    public static GreenWindow Create(Guid id, DateTimeOffset windowStart, DateTimeOffset windowEnd, int durationMin,
        decimal? confidencePct, decimal? maxTonnageT, GreenWindowRiskLevel riskLevel)
    {
        var greenWindow = new GreenWindow(
            id, windowStart, windowEnd, durationMin, confidencePct, maxTonnageT, riskLevel
        );
        
        return greenWindow;
    }
}