$(document).ready(function () {
    if ($('#sessionTableBody').length) {
        loadSessions();
    }
});




function loadSessions() {
    $.ajax({
        url: '/Sessions/SessionList',
        type: 'GET',
        success: function (data) {
            let rows = '';

            $.each(data, function (index, session) {
                let date = session.sessionDate ? session.sessionDate.split('T')[0] : '';

                rows += `
                    <tr>
                        <td>
                        <strong>${session.movieTitle}</strong>
                        </td>
                        <td>${session.hallName}</td>
                        <td>${date}</td>
                        <td>${session.sessionTime}</td>
                        <td>${session.ticketPrice}</td>
                        <td>${session.emptySeatCount}</td>
                        <td class="text-end">
                            <button class="btn btn-sm btn-warning" onclick="editSession(${session.sessionId})">
                                Düzenle
                            </button>
                            <button class="btn btn-sm btn-danger" onclick="deleteSession(${session.sessionId})">
                                Sil
                            </button>
                        </td>
                    </tr>
                `;
            });

            $('#sessionTableBody').html(rows);
        },
        error: function () {
            alert('Seanslar listelenirken hata olustu.');
        }
    });
}

function openAddSessionModal() {
    clearSessionForm();

    $('#sessionModalLabel').text('Yeni Seans Ekle');

    $('#btnAddSession').show();
    $('#btnUpdateSession').hide();
}

function addSession() {
    var session = {
        MovieTitle: $('#sessionMovieTitle').val(),
        HallName: $('#hallName').val(),
        SessionDate: $('#sessionDate').val(),
        SessionTime: $('#sessionTime').val(),
        TicketPrice: parseFloat($('#ticketPrice').val()),
        EmptySeatCount: parseInt($('#emptySeatCount').val())
    };

    $.ajax({
        url: '/Sessions/AddSession',
        type: 'POST',
        data: session,
        success: function (response) {
            alert(response);

            clearSessionForm();

            $('#sessionModal').modal('hide');

            loadSessions();
        },
        error: function () {
            alert('Seans eklenirken hata olustu.');
        }
    });
}

function editSession(id) {
    $.ajax({
        url: '/Sessions/EditSession',
        type: 'GET',
        data: { id: id },
        success: function (session) {
            if (session == null) {
                alert('Seans bulunamadi.');
                return;
            }

            let date = session.sessionDate ? session.sessionDate.split('T')[0] : '';

            $('#sessionId').val(session.sessionId);
            $('#sessionMovieTitle').val(session.movieTitle);
            $('#hallName').val(session.hallName);
            $('#sessionDate').val(date);
            $('#sessionTime').val(session.sessionTime);
            $('#ticketPrice').val(session.ticketPrice);
            $('#emptySeatCount').val(session.emptySeatCount);

            $('#sessionModalLabel').text('Seans duzenle');

            $('#btnAddSession').hide();
            $('#btnUpdateSession').show();

            $('#sessionModal').modal('show');
        },
        error: function () {
            alert('Seans bilgileri getirilirken hata olustu.');
        }
    });
}

function updateSession() {
    var session = {
        SessionId: $('#sessionId').val(),
        MovieTitle: $('#sessionMovieTitle').val(),
        HallName: $('#hallName').val(),
        SessionDate: $('#sessionDate').val(),
        SessionTime: $('#sessionTime').val(),
        TicketPrice: parseFloat($('#ticketPrice').val()),
        EmptySeatCount: parseInt($('#emptySeatCount').val())
    };

    $.ajax({
        url: '/Sessions/UpdateSession',
        type: 'POST',
        data: session,
        success: function (response) {
            alert(response);
            clearSessionForm();
            $('#sessionModal').modal('hide');

            loadSessions();
        },
        error: function () {
            alert('Seans guncellenirken hata olustu.');
        }
    });
}

function deleteSession(id) {
    var confirmDelete = confirm("Bu seansi silmek istediginize emin misiniz?");

    if (!confirmDelete) {
        return;
    }

    $.ajax({
        url: '/Sessions/DeleteSession',
        type: 'POST',
        data: { id: id },
        success: function (response) {
            alert(response);
            loadSessions();
        },
        error: function () {
            alert('Seans silinirken hata olustu.');
        }
    });
}

function clearSessionForm() {
    $('#sessionId').val('');
    $('#sessionMovieTitle').val('');
    $('#hallName').val('');
    $('#sessionDate').val('');
    $('#sessionTime').val('');
    $('#ticketPrice').val('');
    $('#emptySeatCount').val('');
}
