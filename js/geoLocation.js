const apiKey = "f855bd7413894855a3c85713233012";

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

  document.getElementById("lat").innerHTML = latitude;
  document.getElementById("lon").innerHTML = longitude;

  currentLocationWeather(latitude, longitude);
}

function currentLocationWeather(latitude, longitude) {
  fetch(
    `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}`
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
      document.getElementById("temp").innerHTML = data.current.temp_c;
      document.getElementById("txt-el").innerHTML = data.current.condition.text;
    })
    .catch((error) => console.error("Error fetching weather:", error));
}

// Call getLocation function when the page loads
getLocation();
