// Equipment list
const equipmentList = [
    { 
        id: 1, 
        name: 'Pack son & lumières', 
        description: 'Enceintes, kits lumières, machine à fumée',
        image: 'images/pack2.jpg',
        prices: { 
            seul: {label: "Jusque 30 personnes: 1 enceinte + 1 kit lumière", price: 80},
            paire: {label: "Jusque 120 personnes: 2 enceintes + 2 kits lumières",  price: 150},
            bonus: {label: "option: ajout d'une machine à fumée", price: 5}
        }
    },
    { 
        id: 2, 
        name: 'Enceinte', 
        description: 'Enceinte 12" avec connection bluetooth: connectez simplement votre téléphone ou votre ordinateur',
        image: 'images/altoTS.jpg',
        prices: { 
            seul: {label: "1 enceinte jusque 30 personnes", price: 45},
            paire: {label: "2 enceintes jusque 100 personnes",  price: 80},
            bonus: {label: "option: ajout d'un caisson de basse", price: 70 }
        }
    },
    { 
        id: 3, 
        name: 'Micro', 
        description: 'Micro filaire SM58',
        image: 'images/SM58.webp',
        prices: { 
            seul: {label: "micro seul", price: 8},
            bonus: {label: "micro avec pied", price: 12}
                 }
    },
    { 
        id: 4, 
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
        id: 5, 
        name: 'Projecteurs motorisés', 
        description: 'Projecteurs motorisés autonomes: ils réagissent au son de la musique<br>Nous recommandons l\'usage d\'une machine à fumée pour mettre en valeur les faisceaux',
        image: 'images/Lyres1.jpg',
        prices: { 
            paire: {label: "la paire",  price: 60},
            bonus: {label: "option: ajout machine à fumée", price: 5 }
        }
    },
    { 
        id: 6, 
        name: 'Machine à fumée', 
        description: 'Accessoire indispensable pour mettre en valeur les faisceaux lumineux<br>Pas d\'inquiétude: la fumée est inoffensive, inodore et biodégradable',
        image: 'images/MAF_1.jpg',
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

  equipmentList.forEach((equipment) => {
    const card = document.createElement('div');
    card.className = 'w3-col l4 m6 w3-margin-bottom';

    // Construction des options avec cases à cocher
    let optionsHTML = '';
    Object.entries(equipment.prices).forEach(([optionName, opt]) => {
      optionsHTML += `
        <label class="w3-block w3-padding-small w3-border-bottom">
          <input
            class="equipment-checkbox w3-check"
            type="checkbox"
            data-equipment-id="${equipment.id}"
            data-option="${opt.label}"
            data-price="${opt.price}"
          >
          <span class="w3-margin-left">
            ${opt.label} — <b>${opt.price}€</b>/jour
          </span>
        </label>
      `;
    });

    // Carte W3.CSS
card.innerHTML = `
  <div class="w3-card w3-round w3-white w3-card-uniform">

    <img src="${equipment.image}" class="card-image">

    <div class="w3-container card-body">
      <h3>${equipment.name}</h3>
      <p class="w3-text-grey">${equipment.description.replace(/\n/g, "<br>")}</p>
    </div>

    <div class="w3-container w3-padding-small card-options">
      ${optionsHTML}
    </div>

  </div>
`;
``

    equipmentContainer.appendChild(card);
  });

  // Ajout des écouteurs de mise à jour du total
  document.querySelectorAll('.equipment-checkbox').forEach((cb) => {
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

  const form = document.getElementById('location-form');
  const checkboxes = document.querySelectorAll('.equipment-checkbox:checked');
  const email = document.getElementById('customer-email').value.trim();
  const eventDate = document.getElementById('event-date').value;
  const commentsEl = document.getElementById('customer-comments');
  const comments = (commentsEl && commentsEl.value ? commentsEl.value : 'Aucun commentaire').trim();

  if (!email) {
    alert("Veuillez entrer votre adresse email");
    return;
  }
  if (checkboxes.length === 0) {
    alert("Veuillez sélectionner au moins un équipement");
    return;
  }

  // Construit le récapitulatif pour l'email + stockage
  let equipmentText = "Équipements sélectionnés :\n\n";
  let total = 0;
  checkboxes.forEach((cb) => {
    const equipmentId = cb.dataset.equipmentId;
    const optionLabel = cb.dataset.option;
    const price = parseFloat(cb.dataset.price);
    const equipment = equipmentList.find((e) => e.id == equipmentId);
    equipmentText += `- ${equipment.name} (${optionLabel}) : ${price}€\n`;
    total += price;
  });
  equipmentText += `\n---------------------\nTotal : ${total}€\n`;
  equipmentText += `\nEmail client : ${email}\nDate de l'événement : ${eventDate}\nCommentaires : ${comments}`;

  // Remplit les champs cachés
  document.getElementById('cart-summary').value = equipmentText;
  document.getElementById('cart-total').value = total.toFixed(2);

  // Envoi classique du formulaire => POST vers FormSubmit
  form.submit();
}
