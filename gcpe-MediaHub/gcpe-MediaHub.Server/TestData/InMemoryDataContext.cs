using gcpe_MediaHub.Server.Models;
using System.IO;
using Newtonsoft.Json;


namespace gcpe_MediaHub.Server.TestData
{
    public class InMemoryDataContext
    {
        public IEnumerable<MediaContact> MediaContacts { get; set; }
        public List<MediaRequest> MediaRequests { get; set; }
        public List<MediaOutlet> MediaOutlets { get; set; }
        public List<ContactOutlet> ContactOutlets { get; set; }

        public InMemoryDataContext()
        {
            //MediaContacts = IEnumerable<MediaContact>;
            MediaRequests = new List<MediaRequest>();
            MediaOutlets = new List<MediaOutlet>();
            ContactOutlets = new List<ContactOutlet>();
        }

        public void SeedContactData(IEnumerable<MediaContact> contacts)
        {
            MediaContacts = (contacts);
        }
        public void SeedRequestData(List<MediaRequest> requests)
        {
            MediaRequests.AddRange(requests);
        }
        public void SeedMediaOutletData(List<MediaOutlet> outlets)
        {
            MediaOutlets.AddRange(outlets);
        }
        public void SeedContactOutletData(List<ContactOutlet> contactOutlets)
        {
            ContactOutlets.AddRange(contactOutlets);
        }
    }

    public class DataLoader
    {
        public static List<MediaContact> LoadMediaContacts()
        {
            var json = File.ReadAllText("./TestData/MediaContacts.json");
            return JsonConvert.DeserializeObject<List<MediaContact>>(json);
        }
        public static List<MediaRequest> LoadMediaRequests()
        {
            var json = File.ReadAllText("./TestData/MediaRequests.json");
            return JsonConvert.DeserializeObject<List<MediaRequest>>(json);
        }
        public static List<MediaOutlet> LoadMediaOutlets()
        {
            var json = File.ReadAllText("./TestData/MediaOutlets.json");
            return JsonConvert.DeserializeObject<List<MediaOutlet>>(json);
        }
        public static List<ContactOutlet> LoadContactOutlets()
        {
            var json = File.ReadAllText("./TestData/ContactOutlets.json");
            return JsonConvert.DeserializeObject<List<ContactOutlet>>(json);
        }
    }
}
