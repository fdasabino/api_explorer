let result = document.getElementById("result");
let searchBtn = document.getElementById("search-btn");
let cityRef = document.getElementById("city");
const key = "a08e084549e1113524fb9e89243c486c";

//Function to fetch weather details from api and display them
let getWeather = () => {
  let cityValue = cityRef.value;
  if (!cityValue) {
    alert("Please enter a city value");
  } else {
    //If input field is empty
    if (cityValue.length == 0) {
      result.innerHTML = `<h3 class="msg">Please enter a city name</h3>`;
    }
    //If input field is NOT empty
    else {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${key}&units=metric`;
      //Clear the input field
      cityRef.value = "";
      fetch(url)
        .then((resp) => resp.json())

        //If city name is valid
        .then((data) => {
          // console.log(data);
          const cityName = data.name;
          const mainTemp = data.main.temp.toFixed();
          const minTemp = data.main.temp_min.toFixed();
          const maxTemp = data.main.temp_max.toFixed();
          const weatherSky = data.weather[0].main;
          const weatherDesc = data.weather[0].description;
          const imgSrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;

          result.innerHTML = `
                <h2>${cityName}</h2>
                <h4 class="weather">${weatherSky}</h4>
                <h4 class="desc">${weatherDesc}</h4>
                <img src=${imgSrc}>
                <h1>${mainTemp} &#176;</h1>
                <div class="temp-container">
                <div>
                <h4 class="title">min</h4>
                <h4 class="temp">${minTemp}&#176;</h4>
                </div>
                <div>
                <h4 class="title">max</h4>
                <h4 class="temp">${maxTemp}&#176;</h4>
                </div>
                </div>
                `;
        })
        //If city name is NOT valid
        .catch(() => {
          result.innerHTML = `<h3 class="msg">City not found</h3>`;
        });
    }
  }
};
searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  getWeather();
});
window.addEventListener("load", getWeather);
