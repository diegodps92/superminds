var arrayofEmpresas; 
var alldata = [];
var arrayOfValues;
const elemsSidenav = document.querySelectorAll(".sidenav");
const instancesSidenav = M.Sidenav.init(elemsSidenav, {
    edge: "left"
});
///
document.addEventListener('DOMContentLoaded', cotFirsStep());
document.getElementById("item-curso-detcot").addEventListener("change",afterFirstDropDownChanged);
function afterFirstDropDownChanged () {
    var item = document.getElementById("item-edad-detcot");
    var curso = document.getElementById("item-curso-detcot").value;
    var filteredOfArrayOfValues = arrayOfValues.filter(function(r) {return r['courseName'] === curso });
    const index = 'courseEdad' 
    const nombre = 'la edad'
    addUniqueOptionsToDropDownList(item, filteredOfArrayOfValues,index, nombre);     
}
async function  cotFirsStep (){
var fechas = document.querySelectorAll('.datepicker');
var fecpicker = M.Datepicker.init(fechas, {format: 'yyyy-mm-dd'});
const response = await fetch('/api-obt-empresas');
const data = await response.json();
arrayofEmpresas = data.filter(function(r){return true;});
const options = {};
const newarray = arrayofEmpresas.map(function(v){options[v['razonSocial']] = null ;});
var automcomplete = document.getElementById('busqEmp-input');
var instances = M.Autocomplete.init(automcomplete, {data: options});

const responses = await fetch('/api-enviar-disponibilidaddb');
const datas = await responses.json();
arrayOfValues = datas.filter(function(r){return true;});
var item = document.getElementById("item-curso-detcot");
const index = 'courseName';
const nombre = 'el curso';
addUniqueOptionsToDropDownList (item, arrayOfValues, index, nombre);

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

document.getElementById("btn-precioSug").addEventListener("click", function(){
    M.updateTextFields();
  const numHour  =  Number(document.getElementById("NumHorEmpC").value);
   const costperHourBuddy  =  Number(document.getElementById("CosBudEmpC").value);
   const numZoom  =  Number(document.getElementById("NumZoomEmpC").value); 
   const costZoom  =  Number(document.getElementById("CosZoomEmpC").value);
   const numLiscKydemy  =  Number(document.getElementById("NumKydemiEmpC").value); 
   const costKydemy  =  Number(document.getElementById("CosKydemiEmpC").value);
   const numModerador  =  Number(document.getElementById("NumModEmpC").value);
   const costPerModerador  =  Number(document.getElementById("CosModEmpC").value);
   const otherCost  =  Number(document.getElementById("otroCosEmpC").value);
  const costoBud = numHour * costperHourBuddy;
   const  costoZoom = numZoom * costZoom;
   const costoKydemi =  numLiscKydemy * costKydemy;
   const costoModerador = numModerador * costPerModerador;
   const totalCost  = costoBud + costoZoom + costoKydemi + costoModerador + Number(otherCost);
   const percent = document.getElementById("idrentabilidadEmpC").value;
    document.getElementById("idmontoventaEmp").value = totalCost + (percent + 1) * totalCost;
    document.getElementById("totalcostoCot").textContent = totalCost;
    document.getElementById("totalcostBudCot").textContent = costoModerador + costoBud;
    document.getElementById("totalcostLiscCot").textContent = costoKydemi;
    document.getElementById("totalcostZoom").textContent = costoZoom;
} )



  
  document.getElementById("btn-buscarcemp").addEventListener("click",function(){
    M.updateTextFields();
   const filroEmp = document.getElementById('busqEmp-input').value;
   const razonSocial = arrayofEmpresas.filter(r=> r['razonSocial'] === filroEmp).map(ele=>ele['entRUC']);
   const sector = arrayofEmpresas.filter(r=> r['razonSocial'] === filroEmp).map(ele=>ele['sector']);
   document.getElementById('idRUCEmpC').value = razonSocial[0];
   document.getElementById('idRubroEmpC').value = sector[0];
  });

  var serialNum = 0;

  function getSno(){
      serialNum++;
      return serialNum;
  }
  document.getElementById("btn-agregar-detcot").addEventListener("click", function()
  {
    validateForm();
    if(validationStatus == 'pass'){
        addNewDetailCot(); 
    }
   })

function validateForm() {
   var idDetCotCourse = document.getElementById('item-curso-detcot');
   var idDetCotEdad = document.getElementById('item-edad-detcot');
   var idDetCotCosto = document.getElementById('idDetCotCosto');
    checkRequired([idDetCotCourse, idDetCotEdad, idDetCotCosto]); 
}

function checkRequired(inputArr){
    for(i = 0; i < inputArr.length; i++){
        if(inputArr[i].value == '' || inputArr[i].value == 'Selecciona la edad' ||  inputArr[i].value == 'Selecciona el edad' ){
            alert(`${inputArr[i].id} is required`);
            inputArr[i].focus();
            validationStatus = 'fail';
            return false;
        }
        else{
            validationStatus = 'pass';
        }
    }
}



  function addNewDetailCot(){  
    var iddetCot = getSno();
    var idDetCotCourse = document.getElementById('item-curso-detcot').value;
    var idDetCotEdad = document.getElementById('item-edad-detcot').value;
    var idDetCotCosto = document.getElementById('idDetCotCosto').value;
    var data = [iddetCot,idDetCotCourse,idDetCotEdad,idDetCotCosto]
    alldata.push(data);
    var searchResultsBox = document.getElementById("CDetEmpResults");
    var templateBox = document.getElementById("CDetEmprowTemplate");
    var template = templateBox.content;
    searchResultsBox.innerHTML =''
    alldata.map(function(r){
    var tr= template.cloneNode(true);
    var DetCotID = tr.querySelector(".class-DetCotID");
    var DetCotCurso = tr.querySelector(".class-DetCotCurso");
    var DetCotEdad = tr.querySelector(".class-DetCotEdad");
    var DetCotCosto = tr.querySelector(".class-DetCotCosto");
    DetCotID.textContent = r[0];
    DetCotCurso.textContent = r[1];
    DetCotEdad.textContent = r[2];
    DetCotCosto.textContent = r[3];
    searchResultsBox.appendChild(tr);  
    });
    let arrayofsums = alldata.reduce((acc,val) => {return Number(val[3]) + acc;},0);
    document.getElementById("CosBudEmpC").value = arrayofsums /alldata.length
    toastNotify('Record Added Successfully');
  }  

  function toastNotify(txt) {
      var toastDiv = document.getElementById('toast');
      toastDiv.classList.add('show');
      toastDiv.innerText = txt;
      setTimeout(function(){
          toastDiv.classList.remove("show");
        },5000);
  }

  document.getElementById("btn-cotizar").addEventListener("click", async function()
  {
   const entRUC  =  document.getElementById("idRUCEmpC").value;
   const dateQuote = '0' 
   const entCompleteName  =  document.getElementById("busqEmp-input").value;
   const idRubroEmpC =  document.getElementById("idRubroEmpC").value;
   const entContact =  document.getElementById("NomContactEmpC").value;
   const entTelContact =  Number(document.getElementById("idtelEmpC").value);
   const quoteAmount  =  Number(document.getElementById("idmontoventaEmp").value);
   const numChild  =  Number(document.getElementById("NumNinEmpC").value); 
   const numHour  =  Number(document.getElementById("NumHorEmpC").value);
   const costperHourBuddy  =  Number(document.getElementById("CosBudEmpC").value);
   const numZoom  =  Number(document.getElementById("NumZoomEmpC").value); 
   const costZoom  =  Number(document.getElementById("CosZoomEmpC").value);
   const numLiscKydemy  =  Number(document.getElementById("NumKydemiEmpC").value); 
   const costKydemy  =  Number(document.getElementById("CosKydemiEmpC").value);
   const numModerador  =  Number(document.getElementById("NumModEmpC").value);
   const costPerModerador  =  Number(document.getElementById("CosModEmpC").value);
   const otherCost  =  Number(document.getElementById("otroCosEmpC").value);
   const BeginigDate =  document.getElementById("DateBegEmpC").value;
   const FinishDate =  document.getElementById("DateEndEmpC").value;
   const IDdetail = 0
   const costoBud = numHour * costperHourBuddy;
   const  costoZoom = numZoom * costZoom;
   const costoKydemi =  numLiscKydemy * costKydemy;
   const costoModerador = numModerador * costPerModerador;
   const totalCost  = costoBud + costoZoom + costoKydemi + costoModerador + Number(otherCost);
   const data = {entRUC, 
    dateQuote, 
    entCompleteName,
      entContact,
      entTelContact,
    quoteAmount,
    numChild,
    numHour,
    costperHourBuddy, 
    numZoom, 
    costZoom,
    numLiscKydemy, 
    costKydemy, 
    numModerador,
    costPerModerador,
    otherCost,
    totalCost, 
    BeginigDate,
    FinishDate,
    IDdetail}
   const options = {
   method: 'POST',
   headers: {'Content-Type': 'application/json'},
   body: JSON.stringify(data) };
  const response = await  fetch('/api-nueva-cotizacion', options);
  const json = await response.json();
  await addDetailQuote();
  await limpieza();
  });





function limpieza () {
    document.getElementById("idRUCEmpC").value ='';
    document.getElementById("busqEmp-input").value='';
    document.getElementById("idRubroEmpC").value='';
    document.getElementById("NomContactEmpC").value='';
    document.getElementById("idtelEmpC").value='';
    document.getElementById("idmontoventaEmp").value ='';
    document.getElementById("NumNinEmpC").value ='';
    document.getElementById("NumHorEmpC").value ='';
    document.getElementById("CosBudEmpC").value= '';
    document.getElementById("NumZoomEmpC").value = '';
    document.getElementById("CosZoomEmpC").value ='';
    document.getElementById("NumKydemiEmpC").value= ''; 
    document.getElementById("CosKydemiEmpC").value ='';
    document.getElementById("NumModEmpC").value ='';
    document.getElementById("CosModEmpC").value='';
    document.getElementById("otroCosEmpC").value = '';
    document.getElementById("DateBegEmpC").value = '';
    document.getElementById("DateEndEmpC").value = '';
    document.getElementById('item-curso-detcot').value = '';
    document.getElementById('item-edad-detcot').value = '';
    document.getElementById('idDetCotCosto').value = '';
    alldata = '';
    var searchResultsBox = document.getElementById("CDetEmpResults");
    var templateBox = document.getElementById("CDetEmprowTemplate");
    var template = templateBox.content;
    searchResultsBox.innerHTML =''
}

document.getElementById("app-det-table").onclick = function myFunction(e) { 
    if (e.target.matches(".del-but-detcot")) {
        custID = e.target.dataset.customerID;
        e.target.closest(".CDetEmpresult-box").remove();
        alldata.splice(Number(custID)-1,1); }
    }

 
    async function addDetailQuote  () {
        alldata.forEach( async function (v) {
            const course = v[1];
            const age = v [2];
            const cost = v [3] ;  
            const comod = "0";
            const data = {course, age , cost, comod};
            const options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data) };
           const response = await fetch('/api-post-detailquote', options);
           const jsoni = await response.json();})
            }
    

