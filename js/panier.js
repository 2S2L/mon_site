// Equipment list
const equipmentList = [
    { 
        id: 1, 
        name: 'Enceinte', 
        description: 'Enceinte sonore professionnelle haute puissance',
        image: 'images/enceinte.jpg',
        prices: { seul: 50, paire: 90, bonus: 130 }
    },
    { 
        id: 2, 
        name: 'Micro', 
        description: 'Microphone sans fil haute qualité',
        image: 'images/micro.jpg',
        prices: { seul: 10, paire: 18, bonus: 25 }
    }
];

// Form submission
document.addEventListener('DOMContentLoaded', function() {
    const locationForm = document.getElementById('location-form');
    if (locationForm) {
        locationForm.addEventListener('submit', handleLocationSubmit);
        renderEquipment();
    }
});

function renderEquipment() {
    const equipmentContainer = document.getElementById('equipment-list');
    if (!equipmentContainer) return;

    equipmentContainer.innerHTML = '';
    equipmentList.forEach(equipment => {
        const div = document.createElement('div');
        div.className = 'equipment-card';
        div.innerHTML = `
            <img src="${equipment.image}" alt="${equipment.name}" class="equipment-image">
            <h3>${equipment.name}</h3>
            <p class="equipment-description">${equipment.description}</p>
            
            <div class="equipment-options">
                <label class="option-label">
                    <input type="checkbox" class="equipment-checkbox" data-equipment-id="${equipment.id}" data-option="seul" data-price="${equipment.prices.seul}">
                    Seul - ${equipment.prices.seul}€
                </label>
                
                <label class="option-label">
                    <input type="checkbox" class="equipment-checkbox" data-equipment-id="${equipment.id}" data-option="paire" data-price="${equipment.prices.paire}">
                    Paire - ${equipment.prices.paire}€
                </label>
                
                <label class="option-label">
                    <input type="checkbox" class="equipment-checkbox" data-equipment-id="${equipment.id}" data-option="bonus" data-price="${equipment.prices.bonus}">
                    Bonus - ${equipment.prices.bonus}€
                </label>
            </div>
        `;
        equipmentContainer.appendChild(div);
    });

    // Add event listeners to checkboxes
    document.querySelectorAll('.equipment-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', updateTotal);
    });
}

function updateTotal() {
    const checkboxes = document.querySelectorAll('.equipment-checkbox:checked');
    let total = 0;

    checkboxes.forEach(checkbox => {
        total += parseFloat(checkbox.getAttribute('data-price'));
    });

    document.getElementById('total-price').textContent = total.toFixed(2);
}

function handleLocationSubmit(e) {
    e.preventDefault();

    const checkboxes = document.querySelectorAll('.equipment-checkbox:checked');
    const email = document.getElementById('customer-email').value;

    if (!email) {
        alert('Veuillez entrer votre adresse email');
        return;
    }

    if (checkboxes.length === 0) {
        alert('Veuillez sélectionner au moins un équipement');
        return;
    }

    // Build the equipment list
    let equipmentText = 'Équipements sélectionnés:\n\n';
    let total = 0;

    checkboxes.forEach(checkbox => {
        const equipmentId = checkbox.getAttribute('data-equipment-id');
        const option = checkbox.getAttribute('data-option');
        const price = parseFloat(checkbox.getAttribute('data-price'));
        const equipment = equipmentList.find(e => e.id == equipmentId);
        
        equipmentText += `- ${equipment.name} (${option}): ${price}€\n`;
        total += price;
    });

    equipmentText += `\n━━━━━━━━━━━━━━━━\nTotal: ${total}€`;

    // Create mailto link
    const subject = encodeURIComponent('Nouvelle demande de devis 2S2L');
    const body = encodeURIComponent(
        `Bonjour 2S2L,\n\nJ'aimerais un devis pour les équipements suivants:\n\n${equipmentText}\n\nEmail client: ${email}\n\nCordialement`
    );

    const mailtoLink = `mailto:2s2l.events@gmx.fr?subject=${subject}&body=${body}`;

    window.location.href = mailtoLink;
}
