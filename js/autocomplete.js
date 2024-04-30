$(document).ready(function () {
  $("#cityInput").autocomplete({
    source: function (request, response) {
      fetch(
        "https://api.weatherapi.com/v1/search.json?key=f855bd7413894855a3c85713233012&q=" +
          request.term
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          var cities = data.map((item) => item.name);
          response(cities);
        })
        .catch((error) => console.error("Error fetching data:", error));
    },
    minLength: 2,
  });
});
