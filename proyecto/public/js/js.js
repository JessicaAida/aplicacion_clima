const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const informacionClima = document.querySelector('#informacionClima')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    informacionClima.textContent = 'Loading...'

    fetch('/detalleClima?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                informacionClima.textContent = "No se encontraron coincidencias - Error Code: " + data.error;
                document.getElementById("imgClima").src = "";
                informacionClima.classList.add("estiloParrafo");

            } else {
                informacionClima.textContent = data.city + ", " + data.infoClima + ", Hora: " + data.localtime;
                document.getElementById("imgClima").src = data.img;
                informacionClima.classList.add("estiloParrafo");

            }
        })
    })
})