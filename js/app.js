//-----------------------
// VARIABLES
//-----------------------

//document elements
const body = document.querySelector('body')
const search = document.querySelector('#search')
const employeeList = document.querySelector('.employeeSection')
const lightbox = document.querySelector('.lightbox')
const popup = document.querySelector('.popup')
const filter = document.querySelector('#filter')

//api
const employeeAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`

//empty arrays to populate from api data
let employeeListHTML = []
let popupListHTML = []
let employees = []
let employeeNames = []
let cards = []

//-----------------------
// FETCH API DATA
//-----------------------

fetchData(employeeAPI)

//-----------------------
// EVENT LISTENERS
//-----------------------

search.addEventListener('keyup', () => searchFilter())
filter.addEventListener('change', () => selectFilter())
//listener for employee popup & popup actions
document.addEventListener('click', (e) => {cards.forEach(card => { 
    //popup generate statement
    cardEmail = card.querySelector('#email')
    cardThumbnail = card.querySelector('.thumbnail')
    cardName = card.querySelector('h3').textContent
    employeeName = card.textContent
        if(e.target === card || e.target === cardName ||  e.target === cardThumbnail  && e.target !== cardEmail){
            generatePopup(cardName)
            }
})
    // popup change statements and close statement
    next = document.querySelector('.next')
    previous = document.querySelector('.previous')
    if(e.target === next || e.target === previous){
        nextEmployee(e)
        // nextEmployee()
        }    
    else {
        closePopup(e)
    }
            
})

//-----------------------
// HELPER FUNCTIONS
//-----------------------

// fetch api function with generateHTML() function call
function fetchData(url) {
    fetch(url)
    .then(response => response.json())
    .then(data => data.results.forEach(result => employees.push(result)))
    .then(generateHTML)
    .catch(err => console.log(err))
}
// generate html for employee tabs, populate employeeNames array
function generateHTML() {
        employeeNames = []
        employees.forEach(employee => {
        // generate array items for employee cards
        employeeNames.push(`${employee.name.first} ${employee.name.last}`)
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
function generatePopup(employeeName){                                                 
    let [popupEmployee] = employees.filter(employee => `${employee.name.first} ${employee.name.last}` === employeeName)
    let dob = popupEmployee.dob.date.split("")
    let dobFlat = `${dob[5]+dob[6]}-${dob[8]+dob[9]}-${dob[2]+dob[3]}`
    popup.innerHTML = 
   `<p class="close">x</p>
    <img class="popupThumbnail" src="${popupEmployee.picture.large}" alt="${popupEmployee.name.first} ${popupEmployee.name.last}">
    <div class="popupInfo flex">
        <h3>${popupEmployee.name.first} ${popupEmployee.name.last}</h3>
        <a id="email" href="mailto:${popupEmployee.email}">${popupEmployee.email}</a>
        <p class="phone">${popupEmployee.phone}</p>
        <p class="adress">${popupEmployee.location.street.number} ${popupEmployee.location.street.name} ${popupEmployee.location.city} ${popupEmployee.location.state}, ${popupEmployee.location.postcode}</p>
        <p class ="birthday">Birthday: ${dobFlat}</p>
    </div>
    <img class="previous" src="svg/arrow.svg"> <img class="next" src="svg/arrow.svg">`
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
//select filter function
function selectFilter(){
        if(filter.value === 'A-Z'){
            employees.sort((a,b) => (a.name.first > b.name.first) ? 1 : -1)  
            employeeListHTML = []
            return generateHTML()
        }
        if(filter.value === 'Z-A'){
            employees.sort((a,b) => (a.name.first > b.name.first) ? 1 : -1)
            employees.reverse()
            employeeListHTML = []
            return generateHTML()
        }
}
//popup cycle employees function
function nextEmployee(e){
    let currentName = document.querySelector('.popupInfo').querySelector('h3').textContent
    if(e.target === next){
        let nextName = employeeNames[employeeNames.indexOf(currentName) + 1]
        if(currentName === employeeNames[11]){
            nextName = employeeNames[0]
            generatePopup(nextName)
        }
        else {
            generatePopup(nextName)
        }
    }
    if(e.target === previous){
        let nextName = employeeNames[employeeNames.indexOf(currentName) - 1]
        if(currentName === employeeNames[0]){
            nextName = employeeNames[11]
            generatePopup(nextName)
        }
        else {
            generatePopup(nextName)
        }
    }
}