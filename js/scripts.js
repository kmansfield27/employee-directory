const getEmployees = new XMLHttpRequest();

getEmployees.onreadystatechange = function() {
    if (getEmployees.readyState === 4) {
        const response = JSON.parse(getEmployees.responseText);
        const employees = response.results;   

        console.log(response);
        console.log(employees);

        for (let i = 0; i< employees.length; i++) {
            console.log(employees[i].name.first + " " + employees[i].name.last);
            console.log(employees[i].email);
            console.log(employees[i].location.city);
        }
    }
} 


getEmployees.open('GET', 'https://randomuser.me/api/?results=12');

getEmployees.send();