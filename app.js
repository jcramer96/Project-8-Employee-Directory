let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture, email, location, phone, dob &noinfo &nat=US`;
const gridContainer = document.querySelector(".grid-container");
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");
const modalForward = document.querySelector(".modal-forward");
const modalBackward = document.querySelector(".modal-backward")
const filter = document.getElementById("filter");

fetch(urlAPI)
    .then(res => res.json()) 
    .then(res => res.results) 
    .then(displayEmployees) 
    .catch(err => console.log(err))

function displayEmployees(employeeData) {
    employees = employeeData;
    let employeeHTML = '';
    employees.forEach((employee, index) => { 
        let name = employee.name;
        let email = employee.email;
        let city = employee.location.city; 
        let picture = employee.picture;
    employeeHTML += `
        <div class="card" data-index="${index}">
            <img class="avatar" src="${picture.large}" /> 
            <div class="text-container">
                <h2 class="name">${name.first} ${name.last}</h2> 
                <p class="email">${email}</p>
                <p class="address">${city}</p>
            </div>
        </div>
    `
    });
    gridContainer.innerHTML = employeeHTML;
}

function displayModal(index) {
  let { name, dob, phone, email, location: { city, street, state, postcode }, picture } = employees[index];
  let date = new Date(dob.date);
  const modalHTML = `
    <img class="avatar" src="${picture.large}" /> 
    <div class="text-container" data-index=${index}>
        <h2 class="name">${name.first} ${name.last}</h2> 
        <p class="email">${email}</p>
        <p class="address">${city}</p>
        <hr />
        <p class="phone">${phone}</p>
        <p class="address">${street.number} ${street.name} ${city}, ${state} ${postcode}</p> 
        <p>Birthday: ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p> 
    </div>
  `;
  overlay.classList.remove("hidden");
  modalContainer.innerHTML = modalHTML; 
}

gridContainer.addEventListener('click', e => {
    if (e.target !== gridContainer) {
        const card = e.target.closest(".card");
        const index = card.getAttribute('data-index');
        displayModal(index);
    }
});

modalClose.addEventListener('click', () => {
        overlay.classList.add("hidden");
    }
);

// Filter employees by name //
filter.addEventListener('keyup', e => {
    let currentValue = e.target.value.toLowerCase();
    let employees = document.querySelectorAll('h2');
    employees.forEach(employee => {
        if (employee.textContent.toLowerCase().includes(currentValue)) {
            employee.parentNode.parentNode.style.display = 'grid';
        } else {
            employee.parentNode.parentNode.style.display = 'none';
        }
    })
});

//Open next modal window//
modalForward.addEventListener('click', () => {
    let index = parseInt(modalContainer.querySelector('.text-container').dataset.index);
    if (index !== employees.length - 1) {
        index += 1;
        displayModal(index);
    }
});

//Open previous modal window
modalBackward.addEventListener('click', () => {
    let index = parseInt(modalContainer.querySelector('.text-container').dataset.index);
    if (index !== 0) {
        index -= 1;
        displayModal(index);
    }
});