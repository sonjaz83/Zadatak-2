//////ARRAY
//file:///C:/Users/sonja/Desktop/Js%20kurs/Git/Zadatak-2/index.html?m=10&n=10
const grid = document.getElementById("grid");

const searchParams = new URLSearchParams(window.location.search); //izvlacenje broja redova i kolona iz adrese
x = searchParams.get('m'); // row
y = searchParams.get('n'); // col

if(x < 3 || y < 3){
  alert('Broj redova i kolona treba da bude veci od 2');
}

//crtanje matrice
let gridArray = []; //[]ove zagrade znace newArray

let selectedElements = document.getElementsByClassName("S");
let seats = document.getElementsByClassName("COL");

let priceLabel = document.getElementById('value');
const minPrice = 300;
const maxPrice = 500;
let priceSum = 0;

// kreiranje array-a
for (let i = 0; i < x; i++) {
  gridArray[i] = row = document.createElement('div'); //pravi div row
  row.setAttribute("class", "ROW");

  for (let j = 0; j < y; j++) {
    gridArray[i][j] = seat = document.createElement('div'); //pravi div seat

    seat.setAttribute("class", "COL A");

    //cena ako je m neparan
    if (x % 2 !== 0) {
      let increment = (maxPrice - minPrice) / ((x - 1) / 2);
      price(increment);
    }
    //cena ako je m paran
    else {
      let increment = (maxPrice - minPrice) / ((x / 2) - 1);
      price(increment);
    }
    function price(inc) {
      if (i < x / 2) {
        price = Math.round((minPrice + i * inc) * 100) / 100;
      } else {
        price = Math.round((minPrice + (x - i - 1) * inc) * 100) / 100;
      }
    }

    seat.row = i;
    seat.col = j;
    seat.price = price;
    //if 500=>0, 300=>255, price=>color
    //255 - 50 je da min boja ne bude bela
    colorPrice = ((255 - 50) * (maxPrice - price) ) / (maxPrice - minPrice);
    seat.style.backgroundColor = `rgb(${colorPrice}, 216, 230)`;

    seat.innerText = `${price}`;

    //funkcija za selekciju sedista:
    seat.addEventListener('click', clickSeat);

    //iscrtaj grid
    grid.appendChild(row);
    row.appendChild(seat);
  }
}

//funkcija za add/remove klase
function toggleClasses(element, c1, c2, toggle) {
  if (toggle == false) {
    if (element.classList.contains(c1)) {
      element.classList.remove(c1);
      element.classList.add(c2);
    }
  }
  else {
    element.classList.toggle(c1);
    element.classList.toggle(c2);
  }
}

function clickSeat() {
  //ako je available, selektuj
  if (this.nextSibling != null && this.previousSibling != null && this.previousSibling.classList.contains("S") &&
    this.nextSibling.classList.contains("S")) {
    alert('nije moguce ponistiti ovo polje');
  }
  else {
    toggleClasses(this, 'A', 'S', true);

    //izracunavanje cene
    if (this.classList.contains('S')) {
      priceSum += this.price;
    } else {
      priceSum -= this.price;
    }
  }
  priceLabel.innerText = Math.round(priceSum * 100) / 100; //zaokruzeno zbog buga
  
  let selectedLenght = selectedElements.length;

  //funkcija koja vrti sve elemente
  for (let c = 0; c < seats.length; c++) { //niz colona

    if (selectedLenght != 0) {

      let prevSeat = selectedElements[0].previousSibling;
      let nextSeat = selectedElements[selectedElements.length - 1].nextSibling;

      //dati available prethodnom i sledecem
      if (seats[c] == prevSeat || seats[c] == nextSeat) {
        toggleClasses(seats[c], 'D', 'A', false);

      } else {
        //dati disabled svim ostalim elementima prethodnom i sledecem
        toggleClasses(seats[c], 'A', 'D', false);

      }
    } else if (selectedLenght == 0 || selectedLenght == null) {
      //ako nema vise selektovanih polja, dati svim poljima available
      toggleClasses(seats[c], 'D', 'A', false);
    }
  }

}
function emptySeats(){
  for (let c = 0; c < seats.length; c++) { //niz colona
      toggleClasses(seats[c], 'S', 'A', false);
      toggleClasses(seats[c], 'D', 'A', false);
    }
    priceSum = 0;
    priceLabel.innerText = priceSum;
}

function confirmSeats() {
  if (priceLabel.innerText == 0) {
    alert('izaberi mesta');
  } else {

    let selectedRowPrevious = selectedElements[0].row - 1; //red iznad selektovanog
    let selectedRowNext = selectedElements[0].row + 1; //red ispod selektovanog
    let selectedColMin = selectedElements[0].col - 1; //pozicija kolone ispred prvog selektovanog elementa
    let selectedColMax = selectedElements[selectedElements.length - 1].col + 1; //pozicija kolone iza poslednjeg selektovanog elementa

    let prevSeat = selectedElements[0].previousSibling;
    let nextSeat = selectedElements[selectedElements.length - 1].nextSibling;

    for (let c = 0; c < seats.length; c++) { //niz colona

      if (seats[c].classList.contains("S")) {
        toggleClasses(seats[c], 'S', 'B', false);
      }
      //isti red prev i next
      //red ispod i iznad
      else if (seats[c] == prevSeat ||
        seats[c] == nextSeat ||
        ((seats[c].row == selectedRowPrevious || seats[c].row == selectedRowNext) &&
          seats[c].col >= selectedColMin && seats[c].col <= selectedColMax)
      ) {
        toggleClasses(seats[c], 'A', 'DB', false);
        toggleClasses(seats[c], 'D', 'DB', false);
      }

      else {
        toggleClasses(seats[c], 'D', 'A', false);
      }
    }

    priceSum = 0; //ponisti cenu
    priceLabel.innerText = priceSum;

  }
}

console.log(gridArray); //prikaz array-a



