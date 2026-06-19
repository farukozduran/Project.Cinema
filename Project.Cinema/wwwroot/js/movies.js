$(document).ready(function () {
    loadMovies();
});


function loadMovies() {
    $.ajax({
        url: '/Movies/MovieList',
        type: 'GET',
        success: function (data) {
            let rows = '';

            $.each(data, function (index, movie) {
                rows += `
                    <tr>
                        <td>
                            <div class="d-flex align-items-center gap-3">
                                <img src="${movie.imageUrl}" 
                                     style="width:60px; height:80px; object-fit:cover; border-radius:8px;" />
                                <strong>${movie.movieTitle}</strong>
                            </div>
                        </td>
                        <td>${movie.genre}</td>
                        <td>${movie.director}</td>
                        <td>${movie.duration} dk</td>
                        <td>${movie.description}</td>
                        <td class="text-end">
                            <button class="btn btn-sm btn-warning" onclick="editMovie(${movie.movieId})">Düzenle</button>
                            <button class="btn btn-sm btn-danger" onclick="deleteMovie(${movie.movieId})">Sil</button>
                        </td>
                    </tr>
                `;
            });

            $('#movieTableBody').html(rows);
        },
        error: function () {
            alert('Filmler listelenirken hata oluştu.');
        }
    });
}

function addMovie() {
    var movie = {
        MovieTitle: $('#movieTitle').val(),
        Genre: $('#genre').val(),
        Director: $('#director').val(),
        Duration: $('#duration').val(),
        Description: $('#description').val(),
        ImageUrl: $('#imageUrl').val()
    };

    $.ajax({
        url: '/Movies/AddMovie',
        type: 'POST',
        data: movie,
        success: function (response) {
            alert(response);

            clearMovieForm();

            $('#movieModal').modal('hide');

            loadMovies();
        },
        error: function () {
            alert('Film eklenirken hata oluştu.');
        }
    });
}

function deleteMovie(id) {
    var confirmDelete = confirm("Bu filmi silmek istediğinize emin misiniz?");

    if (!confirmDelete) {
        return;
    }

    $.ajax({
        url: '/Movies/DeleteMovie',
        type: 'POST',
        data: { id: id },
        success: function (response) {
            alert(response);
            loadMovies();
        },
        error: function () {
            alert('Film silinirken hata oluştu.');
        }
    });
}

function openAddMovieModal() {
    clearMovieForm();

    $('#movieModalLabel').text('Yeni Film Ekle');

    $('#btnAddMovie').show();
    $('#btnUpdateMovie').hide();
}

function editMovie(id) {
    $.ajax({
        url: '/Movies/EditMovie',
        type: 'GET',
        data: { id: id },
        success: function (movie) {
            if (movie == null) {
                alert('Film bulunamadı.');
                return;
            }

            $('#movieId').val(movie.movieId);
            $('#movieTitle').val(movie.movieTitle);
            $('#genre').val(movie.genre);
            $('#director').val(movie.director);
            $('#duration').val(movie.duration);
            $('#description').val(movie.description);
            $('#imageUrl').val(movie.imageUrl);

            $('#movieModalLabel').text('Film Düzenle');

            $('#btnAddMovie').hide();
            $('#btnUpdateMovie').show();

            $('#movieModal').modal('show');
        },
        error: function () {
            alert('Film bilgileri getirilirken hata oluştu.');
        }
    });
}

function updateMovie() {
    var movie = {
        MovieId: $('#movieId').val(),
        MovieTitle: $('#movieTitle').val(),
        Genre: $('#genre').val(),
        Director: $('#director').val(),
        Duration: parseInt($('#duration').val()),
        Description: $('#description').val(),
        ImageUrl: $('#imageUrl').val()
    };

    $.ajax({
        url: '/Movies/UpdateMovie',
        type: 'POST',
        data: movie,
        success: function (response) {
            alert(response);

            clearMovieForm();

            $('#movieModal').modal('hide');

            loadMovies();
        },
        error: function () {
            alert('Film güncellenirken hata oluştu.');
        }
    });
}

function clearMovieForm() {
    $('#movieId').val('');
    $('#movieTitle').val('');
    $('#genre').val('');
    $('#director').val('');
    $('#duration').val('');
    $('#description').val('');
    $('#imageUrl').val('');
}