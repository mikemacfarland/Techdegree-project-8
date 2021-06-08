var generatedUsers = new XMLHttpRequest()
employeeList = document.querySelector('.gridSection')
let employees = []
employeeListHTML = []


// retrieve data from random user generator api - https://randomuser.me/documentation
generatedUsers.onreadystatechange = () => {
    if(generatedUsers.readyState === 4 && generatedUsers.status === 200){
        employees = JSON.parse(generatedUsers.responseText).results
    
        employees.forEach(employee => {
            employeeListHTML.push(
            `<div class="card">
            <img src="" alt="">
            <h2>${employee.name.first} ${employee.name.last}</h2>
            <a href="mailto:${employee.email}">Send Email</a>
            <p>${employee.location.city}</p>
            </div>`)
            
        })
        employeeList.innerHTML = employeeListHTML.join("")
    }
}
generatedUsers.open('GET', 'https://randomuser.me/api/?results=12')
generatedUsers.send()









   