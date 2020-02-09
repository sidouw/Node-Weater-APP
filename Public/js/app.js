

const weatherform = document.querySelector('#LocSubmit')
const locatin = document.querySelector('#Locinput')
const msg1 = document.querySelector('#msg1')
const msg2 = document.querySelector('#msg2')

weatherform.addEventListener('submit',(e)=>{
    e.preventDefault()
    
    msg1.textContent ='Loading ....'


    fetch('/weather?adress='+locatin.value).then((response)=>{
        response.json().then((data)=>{
        if(data.error){
            msg1.textContent =data.error
        }else{
            msg1.textContent =data.forecast
            msg2.textContent = data.Location
            }
        })
    })
})