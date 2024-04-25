document.addEventListener('DOMContentLoaded', function() {
    console.log('Le DOM est entièrement chargé et analysé');

    const timeSlotSelect = document.getElementById('time-slot');
    console.log('timeSlotSelect:', timeSlotSelect); // Devrait montrer l'élément select dans la console

    const openingHour = 11;
    const closingHour = 18;

    if (timeSlotSelect) {
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
    
    document.getElementById('reservation-form').addEventListener('submit', function(event) {
        event.preventDefault();
        
        const reservationDate = document.getElementById('reservation-date').value;
        const timeSlot = document.getElementById('time-slot').value;
        const wrapDetails = localStorage.getItem('wrapDetails');
        
        let emailBody = `Date de réservation: ${reservationDate}%0D%0A`;
        emailBody += `Créneau horaire: ${timeSlot}%0D%0A`;
        emailBody += `Détails de la pré-commande: ${wrapDetails}`;

        window.location.href = `mailto:pidowrap@gmail.com?subject=Réservation%20Wrapido&body=${emailBody}`;
    });
});


function changeQuantity(action, product) {
    var input = document.getElementById('quantity-' + product);
    var currentValue = parseInt(input.value, 10);
    if (action === 'plus') {
        currentValue++;
    } else if (action === 'minus' && currentValue > 0) {
        currentValue--;
    }
    input.value = currentValue;
    saveWrapDetails();
}

function saveWrapDetails() {
    const wraps = ['thon', 'falafel', 'vegetarien', 'saumon'];
    let wrapDetails = {};

    wraps.forEach(wrap => {
        const quantity = document.getElementById('quantity-' + wrap).value;
        if (quantity > 0) {
            wrapDetails[wrap] = quantity;
        }
    });

    localStorage.setItem('wrapDetails', JSON.stringify(wrapDetails));
}
function showWrapDetailsPopup() {
    // Retrieve the wrap details from localStorage
    const wrapDetails = localStorage.getItem('wrapDetails');
    
    // Show the popup with details
    alert(`Current Wrap Details:\n${wrapDetails}`);
}

document.addEventListener('DOMContentLoaded', function() {
    const preorderButton = document.querySelector('.preorder-btn');
    preorderButton.addEventListener('click', saveWrapDetails);
});


