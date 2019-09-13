console.log('This sis loaded from client side JS')


const form = document.querySelector('form')
const search = document.querySelector('input')
const responsepara = document.getElementById('response')

form.addEventListener('submit', (e)=>{
    e.preventDefault()
    const location = search.value
    responsepara.innerHTML = 'loading..'
    fetch('/weather?address='+location).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                responsepara.innerHTML = data.error
            }else{
                responsepara.innerHTML= '<h2>'+data.location+'</h2><br><p> Temprature :'+data.Forecast.temprature+'</p><br>'+data.Forecast.summary +'<p>HighTemp = '+ data.Forecast.hightemp+'</p>'
                
            }

        })
    })



  //  console.log('testing!')
})