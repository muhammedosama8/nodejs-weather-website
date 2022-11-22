
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const temperature = document.getElementById('temperature')
const description = document.getElementById('description')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    temperature.textContent = 'loading...'
    description.textContent= ''
    fetch("/getWeather?location=" + location).then((res)=>{
        res.json().then((data)=>{
            if(data.error){
                temperature.textContent =data.error
            } else{
                temperature.textContent = 'Temperature = '+ data.temperature
                description.textContent = 'Description = '+ data.descriptions
            }
        })
    })
})
