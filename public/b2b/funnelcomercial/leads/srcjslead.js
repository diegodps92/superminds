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

callLeads();
async function callLeads(){
    const response = await fetch('/api-obt-lead');
    const data = await response.json();
    var searchResultsBox = document.getElementById("CEmpResults");
    var templateBox = document.getElementById("CEmprowTemplate");
    var template = templateBox.content;
    searchResultsBox.innerHTML = "";
    console.log(data);
    data.forEach(function(r){
    var tr= template.cloneNode(true);
    var LeadID = tr.querySelector(".class-LeadID");
    var LEmpDate = tr.querySelector(".class-LEmpDate");
    var LEmpN = tr.querySelector(".class-LEmpN");
    var LEmpStat = tr.querySelector(".class-LEmpStat");
    var LEmpObs = tr.querySelector(".class-LEmpObs");
    LeadID.textContent = r['idlead']
    LEmpDate.textContent = r['creationdate'];
    //editButton.dataset.customerID = r['quoteID'];
    LEmpN.textContent = r['razonsocial'];
    LEmpStat.textContent = r['estado'];
    LEmpObs.textContent = r['observacion'];
    searchResultsBox.appendChild(tr); 
    });}