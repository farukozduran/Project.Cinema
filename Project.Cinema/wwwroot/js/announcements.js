$(document).ready(function () {
    if ($('#announcementTableBody').length) {
        loadAnnouncements();
    }
});

function loadAnnouncements() {
    $.ajax({
        url: '/Announcements/AnnouncementList',
        type: 'GET',
        success: function (data) {
            let rows = '';

            $.each(data, function (index, announcement) {
                let date = announcement.publishDate ? announcement.publishDate.split('T')[0] : '';
                let statusBadge = announcement.isActive
                    ? '<span class="badge bg-success">Aktif</span>'
                    : '<span class="badge bg-secondary">Pasif</span>';

                rows += `
                    <tr>
                        <td>
                            <strong>${announcement.title}</strong>
                            </td>
                            <td>${announcement.content}</td>
                            <td>${date}</td>
                            <td>${statusBadge}</td>
                            <td class="text-end">
                                <button class="btn btn-sm btn-warning" onclick="editAnnouncement(${announcement.announcementId})">
                                Düzenle
                            </button>
                            <button class="btn btn-sm btn-danger onclick="deleteAnnouncement(${announcement.announcementId})">
                                Sil
                            </button>
                        </td>
                    </tr>
                    `;
            });

            $('#announcementTableBody').html(rows);
        },
        error: function () {
            alert('Duyurular listelenirken hata olustu.');
        }
    });
}

function openAddAnnouncementModal() {
    clearAnnouncementForm();

    $('#announcementModalLabel').text('Yeni Duyuru Ekle');

    $('#btnAddAnnouncement').show();
    $('#btnUpdateAnnouncement').hide();
}
function addAnnouncement() {
    var announcement = {
        Title: $('#announcementTitle').val(),
        Content: $('#announcementContent').val(),
        PublishDate: $('#publishDate').val(),
        IsActive: $('#isActive').val() === 'true'
    };

    $.ajax({
        url: '/Announcements/AddAnnouncement',
        type: 'POST',
        data: announcement,
        success: function (response) {
            alert(response);

            clearAnnouncementForm();

            $('#announcementModal').modal('hide');

            loadAnnouncements();
        },
        error: function () {
            alert('Duyuru eklenirken bir hata olustu.');
        }
    });
}

function editAnnouncement(id) {
    $.ajax({
        url: '/Announcements/EditAnnouncement',
        type: 'GET',
        data: { id: id },
        success: function (announcement) {
            if (announcement == null) {
                alert('Duyuru bulunamadi.');
                return;
            }

            let date = announcement.publishDate ? announcement.publishDate.split('T')[0] : '';

            $('#announcementId').val(announcement.announcementId);
            $('#announcementTitle').val(announcement.title);
            $('#announcementContent').val(announcement.content);
            $('#publishDate').val(date);
            $('#isActive').val(announcement.isActive.toString());

            $('#announcementModalLabel').text('Duyuru Duzenle');

            $('#btnAddAnnouncement').hide();
            $('#btnUpdateAnnouncement').show();

            $('#announcementModal').modal('show');
        },
        error: function () {
            alert('Duyuru bilgileri getirilirken hata olustu.');
        }
    });
}
function updateAnnouncement() {
    var announcement = {
        AnnouncementId: $('#announcementId').val(),
        Title: $('#announcementTitle').val(),
        Content: $('#announcementContent').val(),
        PublishDate: $('#publishDate').val(),
        IsActive: $('#isActive').val() === 'true'
    };

    $.ajax({
        url: '/Announcements/UpdateAnnouncement',
        type: 'POST',
        data: announcement,
        success: function (response) {
            alert(response);

            clearAnnouncementForm();

            $('#announcementModal').modal('hide');

            loadAnnouncements();
        },
        error: function () {
            alert('Duyuru guncellenirken hata olustu.');
        }
    });
}

function deleteAnnouncement(id) {
    var confirmDelete = confirm("Bu duyuruyu silmek istediginize emin misiniz?");

    if (!confirmDelete) {
        return;
    }

    $.ajax({
        url: '/Announcements/DeleteAnnouncements',
        type: 'POST',
        data: { id: id },
        success: function (response) {
            alert(response);
            loadAnnouncements();
        },
        error: function () {
            alert("Duyuru silinirken hata olustu.");
        }
    });
}

function clearAnnouncementForm() {
    $('#announcementId').val('');
    $('#announcementTitle').val('');
    $('#announcementContent').val('');
    $('#publishDate').val('');
    $('#isActive').val('true');
}