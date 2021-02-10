const elemsDropdown = document.querySelectorAll(".dropdown-trigger");
const instancesDropdown = M.Dropdown.init(elemsDropdown, {
    coverTrigger: false
});

const elemsSidenav = document.querySelectorAll(".sidenav");
const instancesSidenav = M.Sidenav.init(elemsSidenav, {
    edge: "left"
});
const elemsModal = document.querySelectorAll(".modal");
const instancesModal = M.Modal.init(elemsModal, {onOpenStart: dropdown()} );

 async function dropdown() {
    const response = await fetch('/api-status-emp');
    const data = await response.json();
    const arrayMes = data.filter(function(r){return true;});
    console.log(arrayMes);
    const item = document.getElementById("item-estado");
    const estado = 'estado'
    const index = 'estado';
    addUniqueOptionsToDropDownList(item, arrayMes, index, estado)
 } 

 
 function addUniqueOptionsToDropDownList (item, arrayofArrays, index, nombre) {       
    var currentlyAdded = [];
    item.innerHTML= '<option>Selecciona '+ nombre+'</option>';
    arrayofArrays.map(function(r)
    { 
      if(currentlyAdded.indexOf(r[index]) ===-1) {
      var option = document.createElement("option");
      option.textContent = r[index];
      item.appendChild(option);
      currentlyAdded.push(r[index]);
    }
    });      
}


const fechas = document.querySelectorAll('.datepicker');
const fecpicker = M.Datepicker.init(fechas, {format: 'yyyy-mm-dd'});

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
        
        document.getElementById("idQuote").value= newarrayofValues[0].quoteID
        document.getElementById("idDateQuote").value= newarrayofValues[0].dateQuote.substr(0,10);
        document.getElementById("idBRUCEmpC").value= newarrayofValues[0].entRUC;
        document.getElementById("idRazonSocial").value= newarrayofValues[0].entCompleteName;
        document.getElementById("BNomContactEmpC").value= newarrayofValues[0].entContact;      
        document.getElementById("BidtelEmpC").value= newarrayofValues[0].entTelContact;
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
        
        document.getElementById("btn-editar-cot").onclick = async function() { 
            const date= 0 
           const idquote = document.getElementById("idQuote").value;
           const entelcontacto = document.getElementById("BidtelEmpC").value;
           const BNumHorEmpC= document.getElementById("BNumHorEmpC").value;
            const BNumNinEmpC = document.getElementById("BNumNinEmpC").value;
           const BCosBudEmpC = document.getElementById("BCosBudEmpC").value;
           const  BNumZoomEmpC = document.getElementById("BNumZoomEmpC").value;
            const BCosZoomEmpC = document.getElementById("BCosZoomEmpC").value;
            const BNumKydemiEmpC =  document.getElementById("BNumKydemiEmpC").value;
            const BCosKydemiEmpC = document.getElementById("BCosKydemiEmpC").value;
            const BNumModEmpC = document.getElementById("BNumModEmpC").value;
            const BCosModEmpC = document.getElementById("BCosModEmpC").value;
            const BotroCosEmpC = document.getElementById("BotroCosEmpC").value;
            const TotalCosEmpC= document.getElementById("TotalCosEmpC").value;
            const BidmontoventaEmp = document.getElementById("BidmontoventaEmp").value;
            const BDateBegEmpC = new Date( document.getElementById("BDateBegEmpC").value);
            const BDateEndEmpC = new Date(document.getElementById("BDateEndEmpC").value);
            const estado = document.getElementById("item-estado").value;
            const data = {date, estado, idquote, entelcontacto, BNumHorEmpC, BNumNinEmpC, TotalCosEmpC, BDateEndEmpC, BidmontoventaEmp,  BDateBegEmpC, BCosZoomEmpC, BCosBudEmpC, BNumZoomEmpC,BNumKydemiEmpC,BCosKydemiEmpC,BNumModEmpC,BCosModEmpC,BotroCosEmpC }
            console.log(data);
            const options = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
                };
                //const response = await
                const response = await fetch('/api-update-quote', options);
                const djson = await response.json();
                newarray = Object.values(djson);
        }
        