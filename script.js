//////ARRAY
//file:///C:/Users/sonja/Desktop/Js%20kurs/Git/Zadatak-2/index.html?m=10&n=10
const grid = document.getElementById("grid");

const searchParams = new URLSearchParams(window.location.search); //izvlacenje broja redova i kolona iz adrese
x = searchParams.get('m'); // row
y = searchParams.get('n'); // col

//crtanje matrice
let gridArray = []; //[]ove zagrade znace newArray

let selectedElements = document.getElementsByClassName("selected");
let seats = document.getElementsByClassName("COL");

let priceLabel = document.getElementById('value');

// kreiranje array-a
for (let i = 0; i < x; i++) {
  gridArray[i] = row = document.createElement('div'); //pravi div row
  row.setAttribute("class", "ROW-MARK");

  for (let j = 0; j < y; j++) {
    gridArray[i][j] = seat = document.createElement('div'); //pravi div seat

    seat.setAttribute("class", "COL available");

    //cena ako je m neparan
    if (x % 2 !== 0) {
      let increment = (500 - 300) / ((x - 1) / 2);
      price(increment);
    }
    //cena ako je m paran
    else {
      let increment = (500 - 300) / ((x / 2) - 1);
      price(increment);
    }
    function price(inc) {
      if (i < x / 2) {
        price = Math.round((300 + i * inc) * 100) / 100;
      } else {
        price = Math.round((300 + (x - i - 1) * inc) * 100) / 100;
      }
    }

    //proveriti zasto se ovo koristi za  kupovinu
    seat.row = i;
    seat.col = j;
    seat.price = price;

    seat.innerText = `Red  ${i} Colona ${j} Cena ${price}`;

    //funkcija za selekciju sedista:
    seat.addEventListener('click', clickSeat);

    //iscrtaj grid
    grid.appendChild(row);
    row.appendChild(seat);
  }
}

//funkcija za add/remove klase
function toggleClasses(element, c1, c2) {
  element.classList.remove(c1);
  element.classList.add(c2);
}

function clickSeatLoop(selectedLenght) { //koristi se u okviru select element funkcije

    for (let c = 0; c < seats.length; c++) { //niz colona

      if (selectedLenght != 0) {

        let selectedRow = selectedElements[0].row;
        // let selectedCol = selectedElements[k].col;
        let selectedColMin = selectedElements[0].col - 1;
        let selectedColMax = selectedElements[selectedElements.length - 1].col + 1;

        //dati available prethodnom i sledecem
        if (seats[c].row == selectedRow &&
          !seats[c].classList.contains("selected") &&
          (seats[c].col == selectedColMin || seats[c].col == selectedColMax)) {
          if (seats[c].classList.contains("disabled")) {
            toggleClasses(seats[c], 'disabled', 'available');
          } else if (seats[c].classList.contains("available")) {
          }

        } else {
          //dati disabled svim ostalim elementima prethodnom i sledecem
          if (seats[c].classList.contains("available")) {
            toggleClasses(seats[c], 'available', 'disabled');
          }
        }
      } else if (selectedLenght == 0 || selectedLenght == null) {
        //ako nema vise selektovanih polja, dati svim poljima available
        toggleClasses(seats[c], 'disabled', 'available');

        price = 0;
        priceLabel.innerText = price;
      }
    }
}


function clickSeat() {
  //ako je available, selektuj
  if (this.nextSibling != null && this.previousSibling != null) {
    if (this.previousSibling.classList.contains("selected") && this.nextSibling.classList.contains("selected")) {
      alert('nije moguce ponistiti ovo polje');
    } else {
      this.classList.toggle("available");
      this.classList.toggle("selected");
    }
  }
  else if (this.nextSibling == null || this.previousSibling == null) {
    this.classList.toggle("available");
    this.classList.toggle("selected");

  }
  let selectedLenght = selectedElements.length;

  //funkcija koja vrti sve elemente
  clickSeatLoop(selectedLenght);

  //izracunavanje cene
  let price = 0; //cena
  for (let h = 0; h < selectedLenght; h++) { //niz selektovanih polja
    price += selectedElements[h].price;
    priceLabel.innerText = price;
  }
}

function confirmSeatsLoop(){
  let selectedRow = selectedElements[0].row;  //selektovani red
  let selectedRowPrevious = selectedElements[0].row - 1; //red iznad selektovanog
  let selectedRowNext = selectedElements[0].row + 1; //red ispod selektovanog
  let selectedColMin = selectedElements[0].col - 1; //pozicija kolone ispred prvog selektovanog elementa
  let selectedColMax = selectedElements[selectedElements.length - 1].col + 1; //pozicija kolone iza poslednjeg selektovanog elementa

    for (let c = 0; c < seats.length; c++) { //niz colona

      if (seats[c].classList.contains("selected")) {
        // element.classList.replace("selected", "bought");
        toggleClasses(seats[c], 'selected', 'bought');
      }
      //ovaj uslov ima isti za klik, ali je ishod drugaciji
      else if (seats[c].row == selectedRow &&
        !seats[c].classList.contains("bought") &&
        (seats[c].col == selectedColMin || seats[c].col == selectedColMax)) {
        toggleClasses(seats[c], 'available', 'disabled-bought');
        toggleClasses(seats[c], 'disabled', 'disabled-bought');

      }
      else if (seats[c].row == selectedRowPrevious || seats[c].row == selectedRowNext) {
        if (seats[c].col >= selectedColMin && seats[c].col <= selectedColMax) {

          toggleClasses(seats[c], 'available', 'disabled-bought');
          toggleClasses(seats[c], 'disabled', 'disabled-bought');
        }
        else {
          toggleClasses(seats[c], 'disabled', 'available');
        }
      }
      else {
        toggleClasses(seats[c], 'disabled', 'available');
      }
    }
}
function confirmSeats() {
  if (priceLabel.innerText == 0) {
    alert('izaberi mesta');
  }else{

    confirmSeatsLoop();

  price = 0; //ponisti cenu
  priceLabel.innerText = price;

  }
}

console.log(gridArray); //prikaz array-a



