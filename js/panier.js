// Equipment list
const equipmentList = [
    { 
        id: 1, 
        name: 'Enceinte', 
        description: 'Enceinte bluetooth: connectez simplement votre téléphone ou votre ordinateur',
        image: 'images/altoTS.jpg',
        prices: { 
            seul: {label: "1 enceinte jusque 30 personnes", price: 45},
            paire: {label: "2 enceintes jusque 100 personnes",  price: 80},
            bonus: {label: "option: ajout d'un caisson de basse", price: 70 }
        }
    },
    { 
        id: 2, 
        name: 'Micro', 
        description: 'Micro filaire SM58',
        image: 'images/micro.jpg',
        prices: { 
            seul: {label: "micro seul", price: 8},
            bonus: {label: "micro avec pied", price: 12}
                 }
    },
    { 
        id: 3, 
        name: 'Kit lumière', 
        description: 'Kit lumière autonome: il réagit au son de la musique<br>Nous recommandons l\'usage d\'une machine à fumée pour mettre en valeur les faisceaux',
        image: 'images/PackLight1_1.jpg',
        prices: { 
            seul: {label: "1 kit", price: 35},
            paire: {label: "2 kits",  price: 65},
            bonus: {label: "option: ajout machine à fumée", price: 5 }
        }
    },
    { 
        id: 4, 
        name: 'Projecteurs motorisés', 
        description: 'Projecteurs motorisés autonomes: ils réagissent au son de la musique<br>Nous recommandons l\'usage d\'une machine à fumée pour mettre en valeur les faisceaux',
        image: 'images/altoTS.jpg',
        prices: { 
            paire: {label: "la paire",  price: 60},
            bonus: {label: "option: ajout machine à fumée", price: 5 }
        }
    },
    { 
        id: 5, 
        name: 'Machine à fumée', 
        description: 'Accessoire indispensable pour mettre en valeur les faisceaux lumineux<br>Pas d\'inquiétude: la fumée est inoffensiv, inodore et biodégradable',
        image: 'images/altoTS.jpg',
        prices: { 
            seul: {label: "Machine à fumée",  price: 5},
        }
    },
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

        let optionsHTML='';        
        for (const optionName in equipment.prices) {
            const opt = equipment.prices[optionName];
            optionsHTML += `
                <label class="option-label">
                    <input type="checkbox"
                           class="equipment-checkbox"
                           data-equipment-id="${equipment.id}"
                           data-option="${opt.label}"
                           data-price="${opt.price}">
                    ${opt.label} — <strong>${opt.price}€/jour</strong>
                </label>
            `;
        }

        div.innerHTML = `
            <img src="${equipment.image}" alt="${equipment.name}" class="equipment-image">
            <h3>${equipment.name}</h3>
            <p class="equipment-description">${equipment.description}</p>
            
            
            <div class="equipment-options">
                ${optionsHTML}
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
