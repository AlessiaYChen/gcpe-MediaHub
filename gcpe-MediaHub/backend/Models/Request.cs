using System;

namespace gcpe_MediaHub.backend.Models
{
    public enum RequestStatus
    {
        New,
        Pending,
        Rejected,
        Reviewed,
        Scheduled,
        Unavailable,
        Approved,
        Completed
    }

    public enum RequestResolution
    {
        DeclinedToComment,
        ProvidedBackgrounder,
        ProvidedScrumAudio,
        ProvideStatement,
        ReferredToMediaAvail,
        ReferredToThirdParty,
        ReporterDropped,
        ScheduledInterview,
        Unavailable,
        Other
    }

    public enum LeadMinistry
    {
        ENV,
        FIN,
        FOR,
        HLTH,
        HOUS
    }

    public class Request
    {
        public Guid RequestId { get; set; }
        public RequestStatus Status { get; set; }
        public string RequestTitle { get; set; }
        public bool IsPressGallery { get; set; }
        public string RequestType { get; set; }
        public string RequestedBy { get; set; }
        public DateTime ReceivedOn { get; set; }
        public DateTime Deadline { get; set; }
        public string RequestDetails { get; set; }
        public RequestResolution RequestResolution { get; set; }
        public LeadMinistry LeadMinistry { get; set; }
        public LeadMinistry AdditionalMinistry { get; set; }
        public string AssignedTo { get; set; }
        public string NotifiedRecipients { get; set; }
    }
}