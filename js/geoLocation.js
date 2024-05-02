const apiKey = "f855bd7413894855a3c85713233012";
let geoLocationCompletedEvent = new Event("geoLocationCompleted");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  currentLocationWeather(latitude, longitude);
  document.dispatchEvent(geoLocationCompletedEvent);
}

function currentLocationWeather(latitude, longitude) {
  fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${latitude},${longitude}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);

      document.getElementById("location-name").innerHTML = data.location.name;
      document.getElementById("temp").innerHTML = data.current.temp_c + "&deg;";
      document.getElementById("txt-el").innerHTML = data.current.condition.text;
      document.getElementById("high").innerHTML =
        data.forecast.forecastday[0].day.maxtemp_c + "&deg;";
      document.getElementById("low").innerHTML =
        data.forecast.forecastday[0].day.mintemp_c + "&deg;";
      document.getElementById("current-date").innerHTML =
        data.current.last_updated;

      // Remove existing hourly forecast list items
      const hourlyList = document.getElementById("hourly-list");
      hourlyList.innerHTML = "";

      const currentHour = new Date().getHours();

      // Create list items for hourly forecast
      for (let i = 0; i < 24; i++) {
        const listItem = document.createElement("li");
        listItem.classList.add("me-auto");

        if (i === currentHour) {
          listItem.classList.add("bg-info");
          listItem.classList.add("bg-opacity-10");
          listItem.classList.add("border");
          listItem.classList.add("border-info");

          listItem.scrollIntoView({ behavior: "auto", block: "nearest" });
        }
        const div = document.createElement("div");
        div.classList.add("border-end");
        const hour = document.createElement("h6");
        hour.classList.add("h6", "text-center", "mx-4");
        hour.textContent = ("0" + i).slice(-2); // format hour with leading zero
        const img = document.createElement("img");
        img.classList.add("rounded");
        img.alt = "Weather Icon";
        img.src = data.forecast.forecastday[0].hour[i].condition.icon;
        const temp = document.createElement("h6");
        temp.classList.add("h6", "text-center", "mx-4");
        temp.innerHTML = data.forecast.forecastday[0].hour[i].temp_c + "&deg;";

        div.appendChild(hour);
        div.appendChild(img);
        div.appendChild(temp);
        listItem.appendChild(div);
        hourlyList.appendChild(listItem);
      }
    })
    .catch((error) => console.error("Error fetching weather:", error));
}

// Call getLocation function when the page loads
getLocation();
