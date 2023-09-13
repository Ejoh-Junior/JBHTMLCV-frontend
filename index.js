var counterContainer = document.querySelector(".counter");
var visitCount;
var endpointURL = "https://i5adr8tf3e.execute-api.us-east-1.amazonaws.com/";
// console.log(visitCount);

fetch(endpointURL + "/items")
  // fetch("http://127.0.0.1:3000/items")
  .then(function (response) {
    // The API call was successful!
    if (response.ok) {
      // console.log(response);

      return response.json();
    } else {
      return Promise.reject(response);
    }
  })
  .then(function (data) {
    // This is the JSON from our response
    // console.log(data);
    // console.log(data[0].count);
    // visitCount = data[0].count;
    visitCount = typeof data[0] === "undefined" ? undefined : data[0].count;
    if (
      !visitCount ||
      visitCount == NaN ||
      visitCount == undefined ||
      visitCount == null
    ) {
      visitCount = 1;
      var body1 = JSON.stringify({
        count: visitCount,
      });
      // console.log(visitCount);

      //Add entry for key="page_view"
      fetch(endpointURL + "/items", {
        // fetch("http://127.0.0.1:3000/items", {
        method: "PUT",
        body: body1,
      })
        .then(function (response) {
          // The API call was successful!
          if (response.ok) {
            return response.json();
          } else {
            return Promise.reject(response);
          }
        })
        .then(function (data) {
          // This is the JSON from our response
          console.log(data);
        })
        .catch(function (err) {
          // There was an error
          console.warn("Something went wrong in if.", err);
        });
    } else {
      console.log("1==", visitCount);
      visitCount = Number(visitCount) + 1;
      var body1 = JSON.stringify({
        count: visitCount,
      });
      // console.log(visitCount);

      //Add entry for key="page_view"
      fetch(endpointURL + "/items", {
        // fetch("http://127.0.0.1:3000/items", {
        method: "PUT",
        body: body1,
      })
        .then(function (response) {
          // The API call was successful!
          if (response.ok) {
            return response.json();
          } else {
            return Promise.reject(response);
          }
        })
        .then(function (data) {
          // This is the JSON from our response
          console.log(data);
        })
        .catch(function (err) {
          // There was an error
          console.warn("Something went wrong in else.", err);
        });
    }
    counterContainer.innerHTML = visitCount;
  })
  .catch(function (err) {
    // There was an error
    console.warn("Something went wrong.", err);
  });
