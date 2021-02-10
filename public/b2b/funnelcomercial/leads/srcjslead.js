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
