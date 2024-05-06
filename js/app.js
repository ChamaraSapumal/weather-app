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
    headers: {
      Origin: "https://chamarasapumal.github.io/weather-app/",
    },
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
      document.getElementById("weather-icon").src = data.current.condition.icon;
      document.getElementById("txt-el").innerHTML = data.current.condition.text;
      document.getElementById("high").innerHTML =
        data.forecast.forecastday[0].day.maxtemp_c + "&deg;";
      document.getElementById("low").innerHTML =
        data.forecast.forecastday[0].day.mintemp_c + "&deg;";
      document.getElementById("humidity-el").innerHTML =
        data.current.humidity + "%";
      document.getElementById("clouds-el").innerHTML = data.current.cloud + "%";
      document.getElementById("wind-speed").innerHTML =
        data.current.wind_kph + " kph";

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
    .catch((error) => console.log("error", error));
}
