
// *********************************************
// AJAX Request
// *********************************************

/**
 * Gets a list of 12 employees from random user API.
 * Results count is passed into the URL as an argument.
 * I also added nation just to experiment with adding a second parameter.
 * AJAX response JSON data is parsed and passed in to the resolved state.
 */
function getEmployees() {
    return new Promise( (resolve, reject)  => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://randomuser.me/api/?results=12&nat=us');
        xhr.onload = () => {
            const response = JSON.parse(xhr.responseText);
            const employees = response.results;
            resolve(employees);
        }
        xhr.onerror = () => reject( Error('An error has occurred') );
        xhr.send();
    });
}



// *********************************************
// Chain Functions
// *********************************************

/**
 * Create the employee cards to screen for all the returned employees.
 * Employees will be passed to the function through the resolved Promise.
 * 
 * Loop over each employee in the data set and build markup for card.
 * Append card to gallery.
 * Add event listener for modal click to each card.
 */ 
const createEmployeeCards = (employees) => {
    const gallery = document.getElementById('gallery');

    employees.forEach( employee => {

        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML =   `<div class="card-img-container">
                                <img class="card-img" src="${employee.picture.large}" alt="profile picture">
                            </div>
                            <div class="card-info-container">
                                <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
                                <p class="card-text">${employee.email}</p>
                                <p class="card-text cap">${employee.location.city}</p>
                            </div>`;
                                
        gallery.appendChild(card);

        card.addEventListener('click', () => {
            showEmployeeModal(employee);
        });
    });
}


/**
 * Create the search bar and append to the search container div.
 */ 
const createSearch = () => {
    const container = document.querySelector('.search-container');
    const form = document.createElement('form');
    form.setAttribute('action', '#');
    form.setAttribute('method', 'get');

    form.innerHTML = `<input type="search" id="search-input" class="search-input" placeholder="Search...">
                      <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit"></input>`;

    container.appendChild(form);
}



// *********************************************
// Event callbacks
// *********************************************

/**
 * Show the employee modal.
 */ 

const showEmployeeModal = (employee) => {
    const body = document.querySelector('body');

    // Bindings to format cell number and date of birth
    const cell = employee.cell;
    const formattedCell = cell.replace("-", " ");
    const dob = employee.dob.date;
    const dob_year = dob.substring(0,4);
    const dob_month = dob.substring(5,7);
    const dob_day = dob.substring(8,10);

    // Build modal
    const modal = document.createElement('div');
    modal.classList.add('modal-container');
    modal.innerHTML = ` <div class="modal">
                            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                            <div class="modal-info-container">
                                <img class="modal-img" src="${employee.picture.large}" alt="profile picture">
                                <h3 id="name" class="modal-name cap">${employee.name.first} ${employee.name.last}</h3>
                                <p class="modal-text">${employee.email}</p>
                                <p class="modal-text cap">${employee.location.city}</p>
                                <hr>
                                <p class="modal-text">${formattedCell}</p>
                                <p class="modal-text">${employee.location.street.number} ${employee.location.street.name}, ${employee.location.city}, ${employee.location.state} ${employee.location.postcode}</p>
                                <p class="modal-text">Birthday: ${dob_month}/${dob_day}/${dob_year}</p>
                            </div>
                        </div>`;
    body.appendChild(modal);
    
    // Close modal on click of close button
    const closeBtn = document.querySelector('.modal-close-btn');
    closeBtn.addEventListener('click', () => {
        modal.remove();
    });
}

// *********************************************
// Initialize promise and chain then statements.
// *********************************************

getEmployees()
    .then(createEmployeeCards)
    .then(createSearch);





