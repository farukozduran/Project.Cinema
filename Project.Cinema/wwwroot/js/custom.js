$(document).ready(function () {
    if ($('#movieTableBody').length) {
        loadMovies();
    }
});


$(document).ready(function () {
    loadMovies();
});


$(document).ready(function () {
    if ($('#movieTableBody').length) {
        loadMovies();
    }
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
                            <button class="btn btn-sm btn-warning">Düzenle</button>
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

function clearMovieForm() {
    $('#movieTitle').val('');
    $('#genre').val('');
    $('#director').val('');
    $('#duration').val('');
    $('#description').val('');
    $('#imageUrl').val('');
}