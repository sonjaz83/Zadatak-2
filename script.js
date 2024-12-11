//////ARRAY
//file:///C:/Users/sonja/Desktop/Js%20kurs/Git/Zadatak-2/index.html?m=10&n=10
const grid = document.getElementById("grid");

const searchParams = new URLSearchParams(window.location.search); //izvlacenje broja redova i kolona iz adrese
x = searchParams.get('m'); // row
y = searchParams.get('n'); // col

//crtanje matrice
let gridArray = []; //[]ove zagrade znace newArray

// let availableElements = document.getElementsByClassName("available");
let selectedElements = document.getElementsByClassName("selected");
// let disabledElements = document.getElementsByClassName("disabled");

// kreiranje array-a
for (let i = 0; i < x; i++) {
  gridArray[i] = [];
  gridArray[i] = row = document.createElement('div'); //pravi div row
  row.setAttribute("class", "ROW-MARK");
  row.setAttribute("id", i); //ne koristi se

  for (let j = 0; j < y; j++) {
    gridArray[i][j] = seat = document.createElement('div'); //pravi div seat

    seat.setAttribute("class", "COL available");
    seat.setAttribute("id", i + '-' + j);
    seat.setAttribute("row", i);
    seat.setAttribute("col", j);

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
    function price(inc){
    if (i < x / 2) {
      price = 300 + i * inc;
    } else {
      price = 300 + (x - i - 1) * inc;
    }
    }

    //proveriti zasto se ovo koristi za  kupovinu
    seat.row = i;
    seat.col = j;
    seat.price = price;

    seat.innerText = 'Red' + i + ' Colona' + j + ' Cena' + price;

    seat.addEventListener('click', clickSeat);

    //iscrtaj grid
    grid.appendChild(row);
    row.appendChild(seat);
  }
}

function clickSeat() {
//ako je available, selektuj

  if (this.previousSibling.classList.contains("selected") && this.nextSibling.classList.contains("selected")) {
    alert('nije moguce ponistiti ovo polje');
  }else{
    this.classList.toggle("available");
    this.classList.toggle("selected");
  }

  
const selectedElementsArray = Array.from(selectedElements);
console.log('selektovani elementi click' + selectedElementsArray);



let selectedLenght = selectedElements.length;
console.log('ddd' + selectedLenght);

  for (let r = 0; r < x; r++) { //niz row-ova
    for (let c = 0; c < y; c++) { //niz colona

      let elementId = r + '-' + c;
      let element = document.getElementById(elementId);
      let price = 0; //cena

      for (let k = 0; k < selectedElements.length; k++) { 

        let selectedRow = selectedElementsArray[0].row;
        // let selectedCol = selectedElementsArray[k].col;
        let selectedColMin = selectedElementsArray[0].col - 1;
        let selectedColMax = selectedElementsArray[selectedElements.length - 1].col + 1;
        
        
          //polje levo
          let seatLeftId = selectedRow + '-' + selectedColMin;
          let seatLeft = document.getElementById(seatLeftId);
          //polje desno
          let seatRightId = selectedRow + '-' + selectedColMax;
          let seatRight = document.getElementById(seatRightId);



  
      if (selectedLenght != 0) {

        //disablovati sve ostalo osim selektovanih, prethodnog i sledeceg mesta:
        if (seatLeft == null) {
          // console.log('jeste null prev');
        }
        else if (seatRight == null) {
          // console.log('jeste null next');
        }
        else if (elementId != seatLeftId && elementId != seatRightId) {

          if (element.classList.contains("available")) {
            element.classList.remove("available");
            element.classList.add("disabled");
          }

        }

        else if (elementId == seatLeftId) {

          //dati available jedan ispred i jedan iza

          if (seatLeft.classList.contains("disabled")) {
            seatLeft.classList.remove("disabled");
            seatLeft.classList.add("available");
          } else if (seatLeft.classList.contains("available")) {

          }

        } else if (elementId == seatRightId) {
          if (seatRight.classList.contains("disabled")) {
            seatRight.classList.remove("disabled");
            seatRight.classList.add("available");
          } else if (seatRight.classList.contains("available")) {

          }
        }
        // }
      } 
      price += selectedElements[k].price;
      document.getElementById('value').innerText = price;
    }
    if (selectedLenght == 0 || selectedLenght == null) {
      //ako nema vise selektovanih polja, dati svim poljima available
      element.classList.remove("disabled");
      element.classList.add("available");

      price = 0;
      document.getElementById('value').innerText = price;
    }
  }

}

  //izracunavanje cene
  let price = 0; //cena
  for (let h = 0; h < selectedLenght; h++) { //niz selektovanih polja
    price += selectedElements[h].price;
    document.getElementById('value').innerText = price;
  }

}

function confirmSeats() {
  // let price = document.getElementById('value').textContent;

  //array selektovanih elemenata

  const selectedElementsArray = Array.from(selectedElements);
  console.log('selektovani elementi' + selectedElementsArray);

  //array svih elemenata okolo
  let aroundElementsArray = [];
  for (let k = 0; k < selectedElements.length; k++) { 
  let selectedRow = selectedElementsArray[0].row;
  let selectedCol = selectedElementsArray[k].col;
  let selectedColMin = selectedElementsArray[0].col;
  let selectedColMax = selectedElementsArray[selectedElements.length - 1].col;


  console.log(selectedRow, + ' ' + selectedCol, + ' ' + selectedColMin, + ' ' + selectedColMax);
  //red iznad
  let rowAbove = (selectedRow - 1) + '-' + selectedCol;

  //red ispod
  let rowBelow = (selectedRow + 1) + '-' + selectedCol;

  //isti red, polje levo
  let thisRowLeft = selectedRow + '-' + (selectedColMin - 1);

  //isti red, polje desno
  let thisRowRight = selectedRow + '-' + (selectedColMax + 1);

  //levo gore dijagonala
  let rowAboveLeft = (selectedRow - 1) + '-' + (selectedColMin - 1);

  //desno gore dijagonala
  let rowAboveRight = (selectedRow - 1) + '-' + (selectedColMax + 1);

  //levo dole dijagonala
  let rowBelowLeft = (selectedRow + 1) + '-' + (selectedColMin - 1);

  //desno dole dijagonala
  let rowBelowRight = (selectedRow + 1) + '-' + (selectedColMax + 1);

  aroundElementsArray.push(rowAbove, rowBelow, thisRowLeft, thisRowRight, rowAboveLeft, rowAboveRight, rowBelowLeft, rowBelowRight);
  }
  //elementi oko selektovanih
  console.log('around elements ' + aroundElementsArray);


  for (let r = 0; r < x; r++) { //niz row-ova
    for (let c = 0; c < y; c++) { //niz colona
      let elementId = r + '-' + c;
      let element = document.getElementById(elementId);

      if (element.classList.contains("selected")) {
        element.classList.replace("selected", "bought");
      }else if (aroundElementsArray.includes(element.id)  && !element.classList.contains("selected") ) {
        element.classList.replace("available", "disabled-bought");
        element.classList.replace("disabled", "disabled-bought");
      }
      else if (!aroundElementsArray.includes(element.id)  && !element.classList.contains("selected")) {
        if(element.classList.contains("disabled-bought")){
        
        }else{
          element.classList.replace("disabled", "available");
        }
        
      }

    }
  }
  price = 0; //ponisti cenu
  document.getElementById('value').innerText = price;


}

console.log(gridArray); //prikaz array-a



