//-----------------------
// VARIABLES
//-----------------------

//document elements
const body = document.querySelector('body')
const search = document.querySelector('#search')
const employeeList = document.querySelector('.employeeSection')
const lightbox = document.querySelector('.lightbox')
const popup = document.querySelector('.popup')

//api
const employeeAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`

//empty arrays to populate from api data
let employeeListHTML = []
let popupListHTML = []
let employees = []
let cards = []

//-----------------------
// FETCH API DATA
//-----------------------

fetchData(employeeAPI)

//-----------------------
// EVENT LISTENERS
//-----------------------

document.addEventListener('click', (e) => {
    cards.forEach(card => {
    cardEmail = card.querySelector('#email')
    cardThumbnail = card.querySelector('.thumbnail')
    cardName = card.querySelector('h3')
    if(e.target === card || e.target === cardName ||  e.target === cardThumbnail  && e.target !== cardEmail){
        generatePopup(cardName)
        }
    else {
        closePopup(e)
    }
    })
})

search.addEventListener('keyup', () => searchFilter())

//-----------------------
// HELPER FUNCTIONS
//-----------------------

// fetch api function with generateHTML() function call integrated
function fetchData(url) {
    fetch(url)
    .then(response => response.json())
    .then(data => data.results.forEach(result => employees.push(result)))
    .then(generateHTML)
    .catch(err => console.log(err))
}
// generate html for employee tabs helper function
function generateHTML() {
        employees.forEach(employee => {
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
    })
    //  join array items to be used as one single string inserted into HTML
    employeeList.innerHTML = employeeListHTML.join("")
    document.querySelectorAll('.card').forEach(card => cards.push(card))
}

//generate html and data for employee card popup
function generatePopup(){
    let [popupEmployee] = employees.filter(employee => `${employee.name.first} ${employee.name.last}` === cardName.textContent)
    let dob = popupEmployee.dob.date.split("")
    let dobFlat = `${dob[5]+dob[6]}-${dob[8]+dob[9]}-${dob[2]+dob[3]}`
    popup.innerHTML = 
   `<p class="close">x</p>
    <img class="popupThumbnail" src="${popupEmployee.picture.large}" alt="${popupEmployee.name.first} ${popupEmployee.name.last}">
    <div class="popupInfo flex">
        <h3>${popupEmployee.name.first} ${popupEmployee.name.last}</h3>
        <a id="email" href="mailto:${popupEmployee.email}">Send Email</a>
        <p class="phone">${popupEmployee.phone}</p>
        <p class="adress">${popupEmployee.location.street.name} ${popupEmployee.location.street.number} ${popupEmployee.location.city} ${popupEmployee.location.state}, ${popupEmployee.location.postcode}</p>
        <p class ="birthday">Birthday: ${dobFlat}</p>
    </div>`
lightbox.style.display = 'flex'
popup.style.display = 'flex'
body.style.overflow = 'hidden'

}
//close popup function
function closePopup(e){
    if(e.target.className === 'close' || e.target.className === 'lightbox'){
        lightbox.style.display = 'none'
        popup.style.display = 'none'
        body.style.overflow = 'visible'
    }
}
//search filter function
function searchFilter(){
        cards.forEach(card => {
        cardName = card.querySelector('h3')
        if(cardName.textContent.toUpperCase().indexOf(search.value.toUpperCase()) > -1){
            card.style.display = 'flex'
        }
        else{
            card.style.display = 'none'
        }
    })   
}



