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
  row.setAttribute("id", "ROW-MARK");
  for (let j = 0; j < y; j++) {

    gridArray[i][j] = seat = document.createElement('div'); //pravi div seat
    seat.setAttribute("id", "COL");
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

  //provera da li ima atribut selected
  if (this.hasAttribute("state", "selected")) {
    this.removeAttribute("state");

  }else{
      //ako nema dodaj atribut selected
    this.setAttribute("state", "selected");
  }
  

  //posalji price u element za prikaz cene
  var c = document.querySelectorAll('[state="selected"]');    //<--- array of seats
  console.log(c.length);
  var tot = 0;
  for (var i = 0; i < c.length; i++) {
    tot += c[i].price;
  }
  document.getElementById('value').innerText = tot;


  //proci ceo grid i proveriti da li postoje elementi 
  //za min i max vrednost j iz array-a
  //i=i i j=j-1 ili j=j+1
  ////ako postoje dodati klasu selectable
  ////svim ostalim elementima dodati klasu disabled
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



