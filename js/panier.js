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
    const card = document.createElement('div');
    card.className = 'w3-col l4 m6 w3-margin-bottom';

    let optionsHTML = '';

    for (const optionName in equipment.prices) {
      const opt = equipment.prices[optionName];
      optionsHTML += `
        <label class="w3-block w3-padding-small w3-border-bottom w3-hover-light-grey">
          <input 
            class="equipment-checkbox" 
            type="checkbox" 
            data-equipment-id="${equipment.id}" 
            data-option="${opt.label}" 
            data-price="${opt.price}"
          >
          <span class="w3-margin-left">${opt.label} — <b>${opt.price}€</b>/jour</span>
        </label>
      `;
    }

    card.innerHTML = `
      <div class="w3-card w3-round-large w3-white w3-padding">
        <img src="${equipment.image}" class="w3-image w3-round" style="height:200px;object-fit:cover;">
        <h3 class="w3-margin-top">${equipment.name}</h3>
        <p class="w3-text-grey">${equipment.description.replace(/\n/g, "<br>")}</p>

        <div class="w3-margin-top">
          ${optionsHTML}
        </div>
      </div>
    `;

    equipmentContainer.appendChild(card);
  });

  document.querySelectorAll('.equipment-checkbox').forEach(cb => {
    cb.addEventListener('change', updateTotal);
  });
}

function updateTotal() {
  const checkboxes = document.querySelectorAll('.equipment-checkbox:checked');
  let total = 0;

  checkboxes.forEach(cb => { 
    total += parseFloat(cb.dataset.price);
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

  // Construction du message
  let equipmentText = "Équipements sélectionnés :\n\n";
  let total = 0;

  checkboxes.forEach(cb => {
    const equipmentId = cb.dataset.equipmentId;
    const optionLabel = cb.dataset.option;
    const price = parseFloat(cb.dataset.price);
    const equipment = equipmentList.find(e => e.id == equipmentId);

    equipmentText += `- ${equipment.name} (${optionLabel}) : ${price}€\n`;
    total += price;
  });

  equipmentText += `\n---------------------\nTotal : ${total}€`;

  // Envoi par email (mailto)
  const subject = encodeURIComponent('Nouvelle demande de devis 2S2L');
  const body = encodeURIComponent(
    `Bonjour 2S2L,\n\nJ'aimerais un devis pour les équipements suivants :\n\n${equipmentText}\n\nEmail client : ${email}\n\nCordialement`
  );

  window.location.href = `mailto:2s2l.events@gmx.fr?subject=${subject}&body=${body}`;
}
