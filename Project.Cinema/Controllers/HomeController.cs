using Microsoft.AspNetCore.Mvc;
using Project.Cinema.Models;
using System.Diagnostics;

namespace Project.Cinema.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult UserPanel()
        {
            return View();
        }
        public IActionResult AdminPanel()
        {
            return View();
        }

        [HttpPost]
        public IActionResult AdminLogin(string username, string password)
        {
            return RedirectToAction("AdminPanel");
        }

        public IActionResult AdminLogin()
            return View();
        }
    }
}
