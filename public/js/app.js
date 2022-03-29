
console.log('Client side javascript file is loaded!')

//That's the demo of fetching json file through api

// fetch('https://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })




const weatherForm = document.querySelector('form')
const search = document.querySelector('input')   
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

//messageOne.textContent = 'from Javascript'

weatherForm.addEventListener('submit',(e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading....'
    messageTwo.textContent = ''

    fetch('/weather?address='+ location).then((response) => {
    response.json().then((data) => {
        if(data.error){
            messageOne.textContent = data.error
        }else{
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
            
            // console.log(data.location)
            // console.log(data.forecast)
        }
    })
})
})


// const printName = () => {
//     const txtbox=document.getElementById('name').value;
//     const label = document.getElementById('lbl').innerHTML = txtbox
// }

