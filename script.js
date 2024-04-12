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



document.getElementById('reservation-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const preOrderDetails = JSON.parse(localStorage.getItem('preOrder')); // assuming you've stored it like this
    
    formData.append('preOrder', JSON.stringify(preOrderDetails));
    
    fetch('submit-reservation.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        // Redirect to recapitulatif.html if needed or handle response
    })
    .catch(error => {
        console.error('Error:', error);
    });
});



<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $date = $_POST['reservation_date'];
    $timeSlot = $_POST['time_slot'];
    $preOrderDetails = $_POST['preOrder'];

    // Logic to send email
    $to = 'pidowrap@gmail.com';
    $subject = 'New Pre-Order';
    $message = "Date: " . $date . "\n";
    $message .= "Time Slot: " . $timeSlot . "\n";
    $message .= "Pre-Order Details: " . $preOrderDetails . "\n";
    
    // Headers
    $headers = 'From: webmaster@example.com' . "\r\n" .
    'Reply-To: webmaster@example.com' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

    // Send email
    mail($to, $subject, $message, $headers);

    // Send a response back to JavaScript
    echo json_encode(['success' => true]);
}
?>






