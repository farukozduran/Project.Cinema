using Microsoft.AspNetCore.Mvc;
using Project.Cinema.Data;
using Project.Cinema.Models;

namespace Project.Cinema.Controllers
{
    public class MoviesController : Controller
    {
        private readonly ApplicationDbContext _context;

        public MoviesController(ApplicationDbContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            return View();
        }

        public JsonResult MovieList()
        {
            var movies = _context.Movies.ToList();
            return new JsonResult(movies);
        }

        [HttpPost]
        public JsonResult AddMovie(Movie movie)
        {
            Movie newMovie = new Movie()
            {
                MovieTitle = movie.MovieTitle,
                Genre = movie.Genre,
                Director = movie.Director,
                Duration = movie.Duration,
                Description = movie.Description,
                ImageUrl = movie.ImageUrl
            };

            _context.Movies.Add(newMovie);
            _context.SaveChanges();

            return new JsonResult("Film basariyla eklendi.");
        }

        [HttpPost]
        public JsonResult DeleteMovie(int id)
        {
            var movie = _context.Movies.Find(id);
            if(movie == null)
            {
                return new JsonResult("Film bulunamadi.");
            }

            _context.Movies.Remove(movie);
            _context.SaveChanges();

            return new JsonResult("Film basariyla silindi.");
        }
    }
}
