using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Client;
using Project.Cinema.Data;
using Project.Cinema.Models;

namespace Project.Cinema.Controllers
{
    public class AnnouncementsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public AnnouncementsController(ApplicationDbContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            return View();
        }

        public JsonResult AnnouncementList()
        {
            var announcements = _context.Announcements.ToList();
            return new JsonResult(announcements);
        }

        [HttpPost]
        public JsonResult AddAnnouncement(Announcement announcement)
        {
            Announcement newAnnouncement = new Announcement()
            {
                Title = announcement.Title,
                Content = announcement.Content,
                IsActive = announcement.IsActive
            };

            _context.Announcements.Add(newAnnouncement);
            _context.SaveChanges();
            return new JsonResult("Duyuru basariyla eklendi.");
        }

        public JsonResult EditAnnouncement(int id)
        {
            var announcement = _context.Announcements.Find(id);

            if(announcement is null)
            {
                return new JsonResult(null);
            }

            return new JsonResult(announcement);
        }

        [HttpPost]
        public JsonResult UpdateAnnouncement(Announcement announcement)
        {
            var exAnnouncement = _context.Announcements.Find(announcement.AnnouncementId);
            
            if (exAnnouncement is null)
            {
                return new JsonResult(null);
            }

            exAnnouncement.Title = announcement.Title;
            exAnnouncement.Content = announcement.Content;
            exAnnouncement.IsActive = announcement.IsActive;

            _context.Announcements.Update(exAnnouncement);
            _context.SaveChanges();

            return new JsonResult("Duyuru basariyla degistirildi.");
        }

        [HttpPost]
        public JsonResult DeleteAnnouncement(int id)
        {
            var announcement = _context.Announcements.Find(id);

            if(announcement is null)
            {
                return new JsonResult(null);
            }

            _context.Announcements.Remove(announcement);
            _context.SaveChanges();

            return new JsonResult("Duyuru kaydi basariyla silindi.");
        }
    }
}
