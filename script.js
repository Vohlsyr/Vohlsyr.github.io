function changeQuantity(action, product) {
    var input = document.getElementById('quantity-' + product);
    var currentValue = parseInt(input.value, 10);
  
    if (action === 'plus') {
        currentValue++;
    } else if (action === 'minus' && currentValue > 1) {
        currentValue--;
    }
  
    input.value = currentValue;
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('Le DOM est entièrement chargé et analysé');

    const timeSlotSelect = document.getElementById('time-slot');
    console.log('timeSlotSelect:', timeSlotSelect); // Devrait montrer l'élément select dans la console

    const openingHour = 11;
    const closingHour = 18;

    // Vérifier que l'élément timeSlotSelect est bien récupéré
    if (timeSlotSelect) {
        // Génération des options de tranche horaire
        for (let hour = openingHour; hour < closingHour; hour++) {
            for (let minutes = 0; minutes < 60; minutes += 30) {
                const time = `${hour}:${minutes === 0 ? '00' : minutes}`;
                const option = document.createElement('option');
                option.value = time;
                option.textContent = time;
                timeSlotSelect.appendChild(option);
            }
        }
    } else {
        console.log("Erreur: l'élément time-slot n'a pas été trouvé.");
    }
});

// L'écouteur de soumission du formulaire devrait être attaché en dehors de l'événement DOMContentLoaded
const reservationForm = document.querySelector('form');
if (reservationForm) {
    reservationForm.addEventListener('submit', function(event) {
        console.log('Formulaire soumis');
        event.preventDefault();

        const date = document.getElementById('reservation-date').value;
        const timeSlot = document.getElementById('time-slot').value;
        console.log('Date:', date, 'Time Slot:', timeSlot);

        const reservationDetails = {
            date: date,
            timeSlot: timeSlot
        };

        localStorage.setItem('reservation', JSON.stringify(reservationDetails));
        window.location.href = 'recapitulatif.html';
    });
} else {
    console.log("Erreur: le formulaire n'a pas été trouvé.");
}








// recap.js

document.addEventListener('DOMContentLoaded', () => {
    // Récupération des données du panier et de la réservation depuis localStorage
    const basket = JSON.parse(localStorage.getItem('basket') || '[]');
    const reservation = JSON.parse(localStorage.getItem('reservation') || '{}');

    // Sélection des sections où afficher les récapitulatifs
    const basketSummary = document.querySelector('.basket-summary');
    const reservationSummary = document.querySelector('.reservation-summary');

    // Génération du récapitulatif du panier
    if (basket.length > 0) {
        basket.forEach(item => {
            const itemElement = document.createElement('p');
            itemElement.textContent = `${item.name}: ${item.quantity}`;
            basketSummary.appendChild(itemElement);
        });
    } else {
        basketSummary.textContent = 'Votre panier est vide.';   
    }

    // Génération du récapitulatif de la réservation
    if (reservation.date && reservation.timeSlot) {
        const dateElement = document.createElement('p');
        dateElement.textContent = `Date de récupération: ${reservation.date}`;
        reservationSummary.appendChild(dateElement);

        const timeSlotElement = document.createElement('p');
        timeSlotElement.textContent = `Créneau horaire: ${reservation.timeSlot}`;
        reservationSummary.appendChild(timeSlotElement);
    } else {
        reservationSummary.textContent = 'Aucun créneau de réservation sélectionné.';
    }

    // Gestion de la confirmation de la commande
    document.getElementById('confirm-order').addEventListener('click', () => {
        // Traitement de confirmation ici
        // Par exemple, envoi des données au serveur ou redirection
        console.log('Commande confirmée:', basket, reservation);
        // Effacer les données du localStorage après confirmation
        localStorage.removeItem('basket');
        localStorage.removeItem('reservation');
        // Redirection vers une page de confirmation, par exemple
        // window.location.href = 'confirmation.html';
    });
});
