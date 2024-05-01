function run() {
  let searchVal = document.getElementById("cityInput").value;

  let req = {
    method: `GET`,
  };

  fetch(
    `https://cors-anywhere.herokuapp.com/http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${searchVal}`,
    req
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
