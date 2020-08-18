const printEmployeeCard = (employee) => {
    const gallery = document.getElementById('gallery');
    const card = document.createElement('div');

    card.innerHTML = `<div class="card">
                        <div class="card-img-container">
                            <img class="card-img" src="${employee.picture.large}" alt="profile picture">
                        </div>
                        <div class="card-info-container">
                            <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
                            <p class="card-text">${employee.email}</p>
                            <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
                        </div>
                    </div>`;

    gallery.appendChild(card);
}



const getEmployees = new XMLHttpRequest();

getEmployees.onreadystatechange = () => {

    if (getEmployees.readyState === 4) {
        const response = JSON.parse(getEmployees.responseText);
        const employees = response.results;

        console.log(response);
        console.log(employees);

        employees.forEach( employee => {
            printEmployeeCard(employee);
        });
    }
}

getEmployees.open('GET', 'https://randomuser.me/api/?results=12&nat=us');

getEmployees.send();




