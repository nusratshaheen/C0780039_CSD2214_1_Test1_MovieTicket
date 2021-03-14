//******************************* SELECTIONS
// Git repo https://github.com/sitowebveloce/cinema-booking

const rows = document.querySelectorAll(".rows");
const total = document.querySelector(".total");
// Select seats total
let Total = document.querySelector(".Total");
let movie = document.querySelector(".movie");
// Select button
const submit = document.querySelector(".btnsubmit");
// Select movie selector
let movie = document.getElementById("movie");
// Select seat
const sedie = document.querySelectorAll(".seat:not(.occupant)");
// Global Variables
let removeSeat = false;
let seatRow = 0;
let seatNumber = 0;

// Select rows number and set the innerHtml value
let rowNumb = document.querySelectorAll(".rowNumb");
rowNumb.forEach(element => {
  element.innerHTML = `movie ${element.id}`;
});

//******************* UPDATE VALUES FUNCTION */
const updateValues = (seatNumber, seatRow, removeSeat) => {
  // Select seats with class 'selection'
  let seatSelected = document.querySelectorAll(".row .seat.selection");

  // Create array for localstorage
  let localStorageSeats = [...seatSelected].map(seat => {
    return [...seat].indexOf(seat);
  });
  // Save seats selected inside browser localstorage
  localStorage.setItem("movie", JSON.stringify(localStorageSeats));

  // Populate info area
  if (seatNumber && seatRow !== undefined) {
    if (!removeSeat) {
      postoS.innerHTML += ` ${seatNumber}/${seatRow} -`;
      // Save value inside browser local storage
      localStorage.setItem("S&&F", movie.innerHTML);
    } else {
      postoS.innerHTML = movie.innerHTML.replace(
        ` ${seatNumber}/${seatRow} -`,
        ""
      );
      // Save value inside browser local storage
      localStorage.setItem("S&&F", movie.innerHTML);
    }
  }
  // Set ticket price
  let ticket = movie.value;
  // Seats total number
  sedieTotale.innerHTML = seatSelected.length;
  // Price
  costo.innerHTML = seatSelected.length * ticket;
};

//************ Load data from browser local storage */
let sedieNotSelected = document.querySelectorAll(".sedia:not(.selezionata)");
const loadData = () => {
  // Load data from the browser
  let poltrone = JSON.parse(localStorage.getItem("poltrone"));
  let movie = localStorage.getItem("movie");
  let price = localStorage.getItem("price");
  let occupate = JSON.parse(localStorage.getItem("occupate"));

  // Set selected seats
  if (movie !== null && movie.length > 0) {
    seat.forEach((movie, index) => {
      if (movie.indexOf(index) > -1) {
        movie.classList.add("selection");
      }
    });
  }
  // Set seats occupate
  if (occupate !== null && occupate.length > 0) {
    seatNotSelected.forEach((poltrona, index) => {
      if (occupate.indexOf(index) > -1) {
        movie.classList.add("occupata");
      }
    });
  }

  // Set movie title
  let movieSavedIdx = localStorage.getItem("movie");
  if (movieSavedIdx !== null) {
    film.selectedIndex = movieSavedIdx;
  }

  // Update values
  updateValues();

  // Populate area info
  let seatsInfo = localStorage.getItem("S&&F");
  postoS.innerHTML = seatsInfo;
};
// Run load data
loadData();

//*************** Select sedie and add event listener */
const seatReload = document.querySelectorAll(".sedia:not(.occupant");
sedieReload.forEach(element => {
  // Set seat number
  element.innerHTML = element.id;
  // Add event listener
  element.addEventListener("click", () => {
    seatRow = element.parentElement.id;
    seatNumber = element.id;

    // Add and remove color class
    if (element.classList.value == "seat") {
      element.classList.add("selection");
      // Set false remove variable
      removeSeat = false;
      // Update values
      updateValues(seatNumber, seatRow, removeSeat);
    } else {
      element.classList.remove("selection");
      // Set true remove variable
      removeSeat = true;
      // Update values
      updateValues(seatNumber, seatRow, removeSeat);
    }
  });
});

//********************* Movie title event listener */
film.addEventListener("change", e => {
  // Ticket
  let ticket = parseInt(e.target.value);
  let movieTitle = e.target.selectedIndex;
  // Save inside localstorage movie title
  localStorage.setItem("movie", movieTitle);
  // Save price
  localStorage.setItem("price", ticket);
  // Update value
  updateValues();
});

//***************** BTN ACQUISTA EVENT LISTENER */
acquista.addEventListener("click", () => {
  let sedia = document.querySelectorAll(".sedia.selezionata");
  sedia.forEach(element => {
    element.classList.remove("selezionata");
    element.classList.add("occupata");
    // Clear all fields
    element.innerHTML = "";
    sedieTotale.innerHTML = "";
    costo.innerHTML = "";
    postoS.innerHTML = "";
    // Clear localStorage
    localStorage.clear();

    // Save inside local Storage
    let seatBusySelec = document.querySelectorAll(".row .sedia.occupata");

    const localStorageSeatsOccupied = [...seatBusySelec].map(seat => {
      return [...sedieNotSelected].indexOf(seat);
    });

    // Save
    localStorage.setItem("occupate", JSON.stringify(localStorageSeatsOccupied));
  });
});