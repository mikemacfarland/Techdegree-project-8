const employeeList = document.querySelector('.employeeSection')
// const card = employeeList.querySelectorAll('.card')
let employeeAPI = 'https://randomuser.me/api/?results=12'
let employeeListHTML = []
let popupListHTML = []
let employees = []

fetchData(employeeAPI)

//-----------------------
// EVENT LISTENERS
//-----------------------

// card.forEach(card => card.addEventListener('click', (e) =>{
//     if(e.target.id !== 'email'){
//         
//     }

// }))

//-----------------------
// HELPER FUNCTIONS
//-----------------------

// fetch api function with generateHTML() function call integrated
function fetchData(url) {
    fetch(url)
    .then(response => response.json())
    .then(data => data.results.forEach(result => employees.push(result)))
    .then(generateHTML())
}

// generate html for employee tabs helper function
function generateHTML() {
        employees.forEach(employee => {
            console.log(employee)
        // generate array items for employee cards
        employeeListHTML.push(
            `<div class="card flex">
            <img class="thumbnail" src="${employee.picture.large}" alt="${employee.name.first} ${employee.name.last}">
                <div class="cardInfo flex">
                    <h3>${employee.name.first} ${employee.name.last}</h3>
                    <a id="email" href="mailto:${employee.email}">Send Email</a>
                    <p>${employee.location.city}</p>
                </div>
            </div>`)

        // generate array items for employee popup cards
        popupListHTML.push(
            `<div class="card flex">
                <p class="close">x</p>
                <img class="popupthumbnail" src="${employee.picture.large}" alt="${employee.name.first} ${employee.name.last}">
                <div class="popupInfo flex">
                    <h3>${employee.name.first} ${employee.name.last}</h3>
                    <a href="mailto:${employee.email}">Send Email</a>
                    <p class="popupLocation">${employee.location.city}</p>
                    <p class="phone">${employee.phone}</p>
                    <p class="birthday">${employee.location.street.name} ${employee.location.street.number} ${employee.location.state} ${employee.location.postcode}</p>
                    <p>Birthday: ${employee.dob}</p>
                </div>
            </div>`)
    })
                            //  join array items to be used as one single string inserted into HTML
    employeeList.innerHTML = employeeListHTML.join("")
}

// function generatePopup(e){
//     let lightbox = document.querySelector('.lightbox')
//     if()
//     lightbox.innerHTML = 
// }








   