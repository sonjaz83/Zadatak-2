//////ARRAY


const grid = document.getElementById("grid");

const searchParams = new URLSearchParams(window.location.search); //izvlacenje broja redova i kolona iz adrese
x = searchParams.get('m'); // row
y = searchParams.get('n'); // col



//crtanje matrice
let gridArray = []; //[]ove zagrade znace newArray
for (let i = 0; i < x; i++) {
  gridArray[i] = [];
  gridArray[i] = row = document.createElement('div'); //pravi div row
  row.setAttribute("class", "ROW-MARK");
  row.setAttribute("id", i);
  for (let j = 0; j < y; j++) {

    gridArray[i][j] = seat = document.createElement('div'); //pravi div seat

    seat.available = true;
    seat.selected = false;

    seat.setAttribute("class", "COL available");
    seat.setAttribute("id", i + '-' + j);
    // seat.setAttribute("state", "");
    seat.setAttribute("row", i);
    seat.setAttribute("col", j);



    //cena ako je m neparan
    if (x % 2 !== 0) {
      let increment = (500 - 300) / ((x - 1) / 2);
      if (i < x / 2) {
        price = 300 + i * increment;
      } else {
        price = 300 + (x - i - 1) * increment;
      }
    }
    //cena ako je m paran
    else {
      let increment = (500 - 300) / ((x / 2) - 1);
      if (i < x / 2) {
        price = 300 + i * increment;
      } else {
        price = 300 + (x - i - 1) * increment;
      }
    }
    seat.row = i;
    seat.col = j;
    seat.price = price;

    // seat.className = i + '-' + j;
    seat.innerText = 'Red' + seat.row + ' Colona' + seat.col + ' Cena' + seat.price;
    seat.onclick = clickSeat;


    grid.appendChild(row);
    row.appendChild(seat);
  }
}
function clickSeat() {
  //susedna polja
  //uzeti vrednosti kliknutog polja
  a = this.getAttribute("row");
  b = this.getAttribute("col");
  //id kliknutog polja je //ne koristi se jos
  let selectedId = this.id;


  //states
  //open
  const available = this.classList.contains("available");
  //disabled
  const disabled = this.classList.contains("disabled");
  //selected
  const selected = this.classList.contains("selected");
  let availableElements = document.getElementsByClassName("available");
  let selectedElements = document.getElementsByClassName("selected");
  let disabledElements = document.getElementsByClassName("disabled");

  this.classList.replace("available", "selected");


  //uzmi sve elemente sa klasom selected, a onda pre prvog i posle poslednjeg dodaj available klasu
  let selectedLenght = selectedElements.length;
  let price = 0; //cena
  for (let h = 0; h < selectedLenght; h++) { //niz selektovanih polja

    for (let r = 0; r < x; r++) { //niz row-ova
      for (let c = 0; c < y; c++) { //niz kolona

        //naci min i max elemente
        let previousSeat = selectedElements[0].previousSibling;
        let nextElSeat = selectedElements[selectedLenght - 1].nextSibling;

        if (previousSeat !== null && nextElSeat !== null) {

          //dati available jedan ispred i jedan iza
          previousSeat.classList.replace("disabled", "available");
          nextElSeat.classList.replace("disabled", "available");

          //disablovati sve ostalo osim selektovanih, prethodnog i sledeceg mesta:
          let seatId = document.getElementById(r + '-' + c);
          if ((r + '-' + c) != previousSeat.id && (r + '-' + c) != nextElSeat.id) {
            seatId.classList.replace("available", "disabled");
          }
        }
      }
    }
    //izracunavanje cene
    price += selectedElements[h].price;
    document.getElementById('value').innerText = price;
  }



  //proci grid

  // let getSeat = document.getElementById('COL'); 
  // for (let i = 0; i < getSeat.length; i++) {
  //   console.log(3);
  // }

  //proci ceo grid i proveriti da li postoje elementi 
  //za min i max vrednost j iz array-a
  //i=i i j=j-1 ili j=j+1
  ////ako postoje dodati klasu selectable
  ////svim ostalim elementima dodati klasu disabled
}
function getSelectedElement() {

}
function confirmSeats() {
  //da li ste sigurni da zelite da kupite
  //proci grid i pronaci sve elemente sa atributom selected
  //obrisati atribut selected i dodati atribut bought
  //obrisati price

  //staviti sve kupljene u array
  //proci ceo grid,
  /////svim elementima dati atribut available,
  /////osim elementima sa min i-1 i max i+1
  //i j+1 i j-1
}

console.log(gridArray); //prikaz array-a



