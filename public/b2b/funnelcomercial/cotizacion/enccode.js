const elemsDropdown = document.querySelectorAll(".dropdown-trigger");
const instancesDropdown = M.Dropdown.init(elemsDropdown, {
    coverTrigger: false
});

const elemsSidenav = document.querySelectorAll(".sidenav");
const instancesSidenav = M.Sidenav.init(elemsSidenav, {
    edge: "left"
});

const elemsModal = document.querySelectorAll(".modal");
const instancesModal = M.Modal.init(elemsModal);


callcotizaciones();
async function callcotizaciones(){
const response = await fetch('/api-obt-cot-total');
const data = await response.json();
var searchResultsBox = document.getElementById("CEmpResults");
var templateBox = document.getElementById("CEmprowTemplate");
var template = templateBox.content;
searchResultsBox.innerHTML = "";
console.log(data);
data.forEach(function(r){
var tr= template.cloneNode(true);
var DateID = tr.querySelector(".class-CEmpDate");
var CotID = tr.querySelector(".class-CotID");
var CEmpN = tr.querySelector(".class-CEmpN");
var CEmpNChild = tr.querySelector(".class-CEmpNumNin");
var CEmpNumHor = tr.querySelector(".class-CEmpNumHor");
var CEmpMonto = tr.querySelector(".class-CEmpMonto");
var CEmpCosto = tr.querySelector(".class-CEmpCosto");
var editButton = tr.querySelector(".edit-botton");
DateID.textContent = r['dateQuote']
CotID.textContent = r['quoteID'];
editButton.dataset.customerID = r['quoteID'];
CEmpN.textContent = r['entCompleteName'];
CEmpNumHor.textContent = r['numHour'];
CEmpNChild.textContent = r['numChild'];
CEmpMonto.textContent = r['quoteAmount'];
CEmpCosto.textContent = r['totalCost'];
searchResultsBox.appendChild(tr); 
});}

document.getElementById("btn-buscar-emp").onclick = async function(){
    const custID = document.getElementById("CbusqEmpRuc-input").value.toString().toLowerCase().trim();
    const data = {custID};
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
        };
        //const response = await
        const response = await fetch('/api-obt-det-cot-byruc', options);
        const djson = await response.json();
    

var searchResultsBox = document.getElementById("CEmpResults");
var templateBox = document.getElementById("CEmprowTemplate");
var template = templateBox.content;
searchResultsBox.innerHTML = "";
djson.forEach(function(r){
    console.log(r['quoteID'])
var tr= template.cloneNode(true);
var DateID = tr.querySelector(".class-CEmpDate");
var CotID = tr.querySelector(".class-CotID");
var CEmpN = tr.querySelector(".class-CEmpN");
var CEmpNChild = tr.querySelector(".class-CEmpNumNin");
var CEmpNumHor = tr.querySelector(".class-CEmpNumHor");
var CEmpMonto = tr.querySelector(".class-CEmpMonto");
var CEmpCosto = tr.querySelector(".class-CEmpCosto");
var editButton = tr.querySelector(".edit-botton");
DateID.textContent = r['dateQuote']
CotID.textContent = r['quoteID'];
editButton.dataset.customerID = r['quoteID'];
CEmpN.textContent = r['entCompleteName'];
CEmpNumHor.textContent = r['numHour'];
CEmpNChild.textContent = r['numChild'];
CEmpMonto.textContent = r['quoteAmount'];
CEmpCosto.textContent = r['totalCost'];
searchResultsBox.appendChild(tr); 
} )
}

document.getElementById("app-table").onclick = function myFunction(e) { 
    if (e.target.matches(".edit-botton")) {
        eventHandler(e);
    }
  }

   
  async function eventHandler (e) { 
    
    const custID = e.target.dataset.customerID;

    const data = {custID};
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
        };
        //const response = await
        const response = await fetch('/api-obt-det-cot', options);
        const djson = await response.json();
        newarray = Object.values(djson);
        newarrayofValues = newarray[0]; 

        document.getElementById("idDateQuote").value= newarrayofValues[0].dateQuote.substr(0,10);
        document.getElementById("idBRUCEmpC").value= newarrayofValues[0].entRUC;
        document.getElementById("BNomContactEmpC").value= newarrayofValues[0].entCompleteName;      
        document.getElementById("BidtelEmpC").value= newarrayofValues[0].entTelContact;
        document.getElementById("BidtelEmpC").value= newarrayofValues[0].entRUC;
        document.getElementById("BNumHorEmpC").value= newarrayofValues[0].numHour;
        document.getElementById("BNumNinEmpC").value= newarrayofValues[0].numChild;
        document.getElementById("BCosBudEmpC").value= newarrayofValues[0].costperHourBuddy;
        document.getElementById("BNumZoomEmpC").value= newarrayofValues[0].numZoom;
        document.getElementById("BCosZoomEmpC").value= newarrayofValues[0].costZoom;
        document.getElementById("BNumKydemiEmpC").value= newarrayofValues[0].numLiscKydemy;
        document.getElementById("BCosKydemiEmpC").value= newarrayofValues[0].costKydemy;
        document.getElementById("BNumModEmpC").value= newarrayofValues[0].numModerador;
        document.getElementById("BCosModEmpC").value= newarrayofValues[0].costPerModerador;
        document.getElementById("BotroCosEmpC").value= newarrayofValues[0].otherCost;
        document.getElementById("TotalCosEmpC").value= newarrayofValues[0].totalCost;
        document.getElementById("BidmontoventaEmp").value= newarrayofValues[0].quoteAmount;
        document.getElementById("BDateBegEmpC").value= newarrayofValues[0].BeginigDate.substr(0,10);
        document.getElementById("BDateEndEmpC").value= newarrayofValues[0].FinishDate.substr(0,10);
        
        }   