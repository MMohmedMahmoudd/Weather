
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let ContactSection =document.getElementById('ContactSection');
ContactSection.style.display= 'none'
let Contact= document.getElementById('Contact');
let main= document.getElementById('main');
let Home= document.getElementById('Home');
let HomeLink=document.getElementById('HomeLink');
HomeLink.addEventListener('click',function(){
    displayHome()
})
Contact.addEventListener('click',function(){
    displayContact()
})
Home
function displayContact(){
    Home.classList.remove('d-flex')
    Home.classList.add('d-none')
    ContactSection.style.display="block";
    // main.style.height='60rem'

}
function displayHome(){
    Home.classList.remove("d-none");
    Home.classList.add("d-flex");
    ContactSection.style.display="none";
    // main.style.height='65rem'

}
async function search(location) {
    const apiKey = 'a9184adeba9b4fbdb4b22123242006';
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=3`);
    if (response.ok && response.status !== 400) {
        const data = await response.json();
        displayCurrent(data.location, data.current);
        displayForecast(data.forecast.forecastday);
    }
}

document.getElementById("search").addEventListener("keyup", (event) => {
    const location = event.target.value;
    if (location.length > 2) {
        search(location);
    }
});

function displayCurrent(location, current) {
    if (current) {
        const lastUpdated = new Date(current.last_updated.replace(" ", "T"));
        const currentWeatherHTML = `
            <div class="col-md-4 p-0">
                <div class="card one d-flex justify-content-start align-items-start flex-column">
                    <div class="top-info w-100 d-flex justify-content-between align-items-center p-3">
                        <span>${days[lastUpdated.getDay()]}</span>
                        <span>${lastUpdated.getDate()} ${monthNames[lastUpdated.getMonth()]}</span>
                    </div>
                    <div class="body h-100 w-100 d-flex justify-content-center align-items-start flex-column p-3">
                        <h4 class="fs-1">${location.name}</h4>
                        <div class="info w-100 d-flex justify-content-between align-items-start flex-column">
                            <h3 class=" fw-bold">${current.temp_c}<sub>o</sub>C</h3>
                            <img src="https:${current.condition.icon}" class="w-25" alt="">
                        </div>
                        <div class="clear text-primary">${current.condition.text}</div>
                        <div class="foot d-flex justify-content-start align-items-center column-gap-3 w-75 pt-3 pb-3">
                            <div class="ump d-flex justify-content-start align-items-center column-gap-1"><img src="icon-umberella.png" alt="icon-umberella"><span>20%</span></div>
                            <div class="win d-flex justify-content-start align-items-center column-gap-1"><img src="icon-wind.png" alt="icon-wind"><span>18km/h</span></div>
                            <div class="com d-flex justify-content-start align-items-center column-gap-1"><img src="icon-compass.png" alt="icon-compass"><span>East</span></div>
                        </div>
                    </div>
                </div>
            </div>`;
        document.getElementById("weatherResult").innerHTML = currentWeatherHTML;
    }
}

function displayForecast(forecastDays) {
    let forecastHTML = "";
    for (let i = 1; i < forecastDays.length; i++) {
        const day = forecastDays[i];
        const forecastDate = new Date(day.date);

        if (i == 1) {
            // Special logic for the first forecast day (i == 1)
            forecastHTML += `
                <div class="col-md-4 p-0">
                    <div class="card two special d-flex justify-content-start align-items-center flex-column">
                        <div class="top-info w-100 d-flex justify-content-center align-items-center p-3">
                            <span>${days[forecastDate.getDay()]}</span>
                        </div>
                        <div class="body h-100 w-100 d-flex justify-content-center align-items-center flex-column p-3">
                            <h3 class="fs-1 fw-bold">${day.day.maxtemp_c}<sub>o</sub>C</h3>
                            <h3 class="fs-5 fw-bold">${day.day.mintemp_c}<sub>o</sub>C</h3>
                            <img src="https:${day.day.condition.icon}" class="w-25" alt="">
                            <div class="clear text-primary">${day.day.condition.text}</div>
                        </div>
                    </div>
                </div>`;
        } else {
            // Standard logic for other forecast days
            forecastHTML += `
                <div class="col-md-4 p-0">
                    <div class="card three d-flex justify-content-start align-items-center flex-column">
                        <div class="top-info w-100 d-flex justify-content-center align-items-center p-3">
                            <span>${days[forecastDate.getDay()]}</span>
                        </div>
                        <div class="body h-100 w-100 d-flex justify-content-center align-items-center flex-column p-3">
                            <h3 class="fs-1 fw-bold">${day.day.maxtemp_c}<sub>o</sub>C</h3>
                            <h3 class="fs-5 fw-bold">${day.day.mintemp_c}<sub>o</sub>C</h3>
                            <img src="https:${day.day.condition.icon}" class="w-25" alt="">
                            <div class="clear text-primary">${day.day.condition.text}</div>
                        </div>
                    </div>
                </div>`;
        }
    }
    document.getElementById("weatherResult").innerHTML += forecastHTML;
}

search("Cairo");
