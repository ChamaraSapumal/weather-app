let url =
  "https://cors-anywhere.herokuapp.com/http://api.weatherapi.com/v1/current.json?";

console.log(apiKey);

function run() {
  let searchVal = document.getElementById("cityInput").value;
  let selectedLan = document.getElementById("languageSelect").value;

  if (selectedLan == "en") {
    url += `lang=en`;
  }
  if (selectedLan == "si") {
    url += `lang=si`;
  }
  if (selectedLan == "tam") {
    url += `lang=ta`;
  }

  let req = {
    method: `GET`,
    mode: "cors", // Specify CORS mode
  };

  fetch(
    `${url}&key=${apiKey}&q=${searchVal}`,
    req // Pass the request object directly
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      document.getElementById("location-name").innerHTML = data.location.name;
      document.getElementById("temp").innerHTML = data.current.temp_c;
      document.getElementById("txt-el").innerHTML = data.current.condition.text;
      document.getElementById("lat").innerHTML = data.location.lat;
      document.getElementById("lon").innerHTML = data.location.lon;
    })
    .catch((error) => console.log("error", error));
}
