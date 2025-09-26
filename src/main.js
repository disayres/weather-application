const $ = document
const form = $.querySelector("form")
const input = $.querySelector("#default-search")
const weatherComp = $.querySelector("#weather-component")
const cityName = $.querySelector("#city-name")
const currentDate = $.querySelector("#current-date")
const cityTemp = $.querySelector("#temp")
const cityWeatherStatus = $.querySelector("#weather-status")
const cityMaxTemp = $.querySelector("#max-temp")
const cityMinTemp = $.querySelector("#min-temp")
const cityWindSpeed = $.querySelector("#wind-speed")
const cityHumidity = $.querySelector("#humidity")
const cityWeatherDesc = $.querySelector("#desc")

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const weekdays = [
  "Sunday", "Monday", "Tuesday", "Wednesday",
  "Thursday", "Friday", "Saturday"
];

let apiData = {
  url: "https://api.openweathermap.org/data/2.5/weather?q=",
  key: "8d51736cd018e72fbe3956f892f27a8f"
}

const formValidation = () => {
  const cityRegex = /^[a-zA-Z\u0600-\u06FF\s\-]{2,}$/;
  let cityInputValue = input.value.trim().toLowerCase();

  if (!cityRegex.test(cityInputValue)) {
    alert("please insert a valid city name");
    return;
  }

  getCityFromApi(cityInputValue)
}

const getCityFromApi = async (currentCity) => {
  try {
    const res = await fetch(`${apiData.url}${currentCity}&appid=${apiData.key}&units=metric`)

    if (!res.ok) {
      throw new Error("نام شهر را به درستی وارد نکرده اید");
      return;
    }
    const cityData = await res.json();
    showCityWeather(cityData)
    input.value = ""

  } catch (err) {
    alert(err);
  }
}

const getDate = () => {
  let date = new Date()

  let month = months[date.getMonth()]
  let dayOfMonth = date.getDate()
  let dayOfWeek = weekdays[date.getDay()]
  let year = date.getFullYear();

  return `${dayOfWeek} ${dayOfMonth} ${month} ${year}`
}

const showCityWeather = (city) => {
  weatherComp.classList.replace("hidden", "flex")
  cityName.innerHTML = `${city.name}, ${city.sys.country}`
  currentDate.innerHTML = getDate()
  cityTemp.innerHTML = `${Math.floor(city.main.temp)}°`
  cityWeatherStatus.innerHTML = city.weather[0].main
  cityMaxTemp.innerHTML = `${Math.floor(city.main.temp_max)}°C`
  cityMinTemp.innerHTML = `${Math.round(city.main.temp_min)}°C`
  cityWindSpeed.innerHTML = `${Math.floor((city.wind.speed) * 3.6)} km/h`
  cityHumidity.innerHTML = `${city.main.humidity}%`
  cityWeatherDesc.innerHTML = `${city.weather[0].description}`
  getDate()
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation()
})