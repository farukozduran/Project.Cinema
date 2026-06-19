$(document).ready(function () {
    loadUserSessions();
    updateCartCount();

    $('#clearCartBtn').click(function () {
        clearCart();
    });
});

function loadUserSessions() {
    $.ajax({
        url: '/Sessions/SessionList',
        type: 'GET',
        success: function (data) {
            let cards = '';

            if (data.length === 0) {
                cards = `
                    <div class="col-12">
                        <div class="cinema-card">
                            <h5>Henüz seans bulunmuyor.</h5>
                            <p class="text-muted mb-0">
                                Admin panelinden seans ekledikten sonra burada görünecek.
                            </p>
                        </div>
                    </div>
                `;

                $('#userSessionList').html(cards);
                return;
            }

            $.each(data, function (index, session) {
                let date = session.sessionDate ? session.sessionDate.split('T')[0] : '';

                cards += `
                    <div class="col-md-6">
                        <div class="cinema-card">
                            <span class="stat-pill mb-3">${session.hallName}</span>

                            <h4>${session.movieTitle}</h4>

                            <p class="text-muted mb-2">
                                Tarih: ${date}
                            </p>

                            <p class="text-muted mb-2">
                                Saat: ${session.sessionTime}
                            </p>

                            <p class="text-muted mb-2">
                                Boş Koltuk: ${session.emptySeatCount}
                            </p>

                            <div class="d-flex justify-content-between align-items-center flex-wrap gap-2 mt-3">
                                <strong>${session.ticketPrice} TL</strong>

                                <button class="btn btn-cinema-primary btn-sm" onclick="addToCart(${session.sessionId})">
                                    Sepete Ekle
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            });

            $('#userSessionList').html(cards);
        },
        error: function () {
            alert('Seanslar yüklenirken hata oluştu.');
        }
    });
}

function addToCart(sessionId) {
    let cartCount = localStorage.getItem('cinemaCartCount');

    if (cartCount == null) {
        cartCount = 0;
    }

    cartCount = parseInt(cartCount) + 1;
    localStorage.setItem('cinemaCartCount', cartCount);
    updateCartCount();
}

function updateCartCount() {
    let cartCount = localStorage.getItem('cinemaCartCount');

    if (cartCount == null) {
        cartCount = 0;
    }

    $('#cartCount').text(cartCount);
    $('#cartInfoText').text(cartCount + ' bilet');
}

function clearCart() {
    localStorage.setItem('cinemaCartCount', 0);
    updateCartCount();
}
