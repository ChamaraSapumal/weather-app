function run() {
  let searchVal = document.getElementById("cityInput").value;
  let selectedLan = document.getElementById("languageSelect").value;

  let langParam = ""; // Initialize an empty string to store the language parameter

  if (selectedLan == "en") {
    langParam = "lang=en";
  } else if (selectedLan == "si") {
    langParam = "lang=si";
  } else if (selectedLan == "tam") {
    langParam = "lang=ta";
  }

  let req = {
    method: `GET`,
    mode: "cors", // Specify CORS mode
  };

  let url = "https://api.weatherapi.com/v1/forecast.json?";

  if (langParam !== "") {
    url += langParam + "&";
  }

  fetch(
    `${url}key=${apiKey}&q=${searchVal}`,
    req // Pass the request object directly
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      document.getElementById("location-name").innerHTML = data.location.name;
      document.getElementById("temp").innerHTML = data.current.temp_c + "&deg;";
      document.getElementById("txt-el").innerHTML = data.current.condition.text;
      document.getElementById("high").innerHTML =
        data.forecast.forecastday[0].day.maxtemp_c + "&deg;";
      document.getElementById("low").innerHTML =
        data.forecast.forecastday[0].day.mintemp_c + "&deg;";
    })
    .catch((error) => console.log("error", error));
}
