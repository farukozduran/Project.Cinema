using Microsoft.AspNetCore.Mvc;
using Project.Cinema.Data;
using Project.Cinema.Models;

namespace Project.Cinema.Controllers
{
    public class SessionsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public SessionsController(ApplicationDbContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            return View();
        }

        public JsonResult SessionList()
        {
            var sessionList = _context.Sessions.ToList();
            return new JsonResult(sessionList);
        }

        [HttpPost]
        public JsonResult AddSession(Session session)
        {
            Session newSession = new Session()
            {
                MovieTitle = session.MovieTitle,
                HallName = session.HallName,
                SessionDate = session.SessionDate,
                SessionTime = session.SessionTime,
                TicketPrice = session.TicketPrice,
                EmptySeatCount = session.EmptySeatCount
            };

            _context.Sessions.Add(newSession);
            _context.SaveChanges();

            return new JsonResult("Seans başarıyla eklendi.");
        }

        public JsonResult EditSession(int id)
        {
            var session = _context.Sessions.Find(id);

            if(session is null)
            {
                return new JsonResult(null);
            }

            return new JsonResult(session);
        }

        public JsonResult UpdateSession(Session session)
        {
            var existingSession = _context.Sessions.Find(session.SessionId);

            if(existingSession is null)
            {
                return new JsonResult(null);
            }

            existingSession.MovieTitle = session.MovieTitle;
            existingSession.HallName = session.HallName;
            existingSession.SessionDate = session.SessionDate;
            existingSession.SessionTime = session.SessionTime;
            existingSession.TicketPrice = session.TicketPrice;
            existingSession.EmptySeatCount = session.EmptySeatCount;

            _context.Sessions.Update(existingSession);
            _context.SaveChanges();

            return new JsonResult("Seans başarıyla güncellendi.");
        }

        public JsonResult DeleteSession(int id)
        {
            var session = _context.Sessions.Find(id);

            if(session is null)
            {
                return new JsonResult(null);
            }

            _context.Sessions.Remove(session);
            _context.SaveChanges();

            return new JsonResult("Seans başarıyla silindi.");
        }
    }
}
