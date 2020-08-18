const printEmployeeCards = (employees) => {
    const gallery = document.getElementById('gallery');

    employees.forEach( employee => {

        const card = document.createElement('div');
        card.innerHTML =   `<div class="card">
                                <div class="card-img-container">
                                    <img class="card-img" src="${employee.picture.large}" alt="profile picture">
                                </div>
                                <div class="card-info-container">
                                    <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
                                    <p class="card-text">${employee.email}</p>
                                    <p class="card-text cap">${employee.location.city}</p>
                                </div>
                            </div>`;
        gallery.appendChild(card);

        card.addEventListener('click', () => {
            showEmployeeModal(employee);
        });

    });
}




const printSearch = () => {
    const container = document.querySelector('.search-container');
    const form = document.createElement('form');
    form.setAttribute('action', '#');
    form.setAttribute('method', 'get');

    form.innerHTML = `<input type="search" id="search-input" class="search-input" placeholder="Search...">
                      <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit"></input>`;

    container.appendChild(form);

}



const showEmployeeModal = (employee) => {
    const body = document.querySelector('body');
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
                                <p class="modal-text">${employee.cell}</p>
                                <p class="modal-text">${employee.location.street.number} ${employee.location.street.name}, ${employee.location.city}, ${employee.location.state} ${employee.location.street.zip}</p>
                                <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
                                <p class="modal-text">Birthday: 10/21/2015</p>
                            </div>
                        </div>`;

    body.appendChild(modal);

    const closeBtn = document.querySelector('.modal-close-btn');
    closeBtn.addEventListener('click', () => {
        modal.remove();
    });
}


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


function generateHTML() {
    getEmployees()
        .then(printEmployeeCards)
        .then(printSearch);
}

generateHTML();


