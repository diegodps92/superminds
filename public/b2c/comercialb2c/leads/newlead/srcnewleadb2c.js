const elemsDropdown = document.querySelectorAll(".dropdown-trigger");
const instancesDropdown = M.Dropdown.init(elemsDropdown, {
    coverTrigger: false
});

const elemsSidenav = document.querySelectorAll(".sidenav");
const instancesSidenav = M.Sidenav.init(elemsSidenav, {
    edge: "left"
});

var selelems = document.querySelectorAll('select');
var instances = M.FormSelect.init(selelems);


var alldate = [];
document.addEventListener('DOMContentLoaded',cotFirsStep());

document.getElementById("btn-buscar-Lemp").addEventListener("click", async function(){
  const custID = document.getElementById("LbusqEmpRuc-input").value.toString().trim();
  const data = {custID};
  const options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
      };
      //const response = await
      const response = await fetch('/api-getEmpresasbyRUC', options);
      const djson = await response.json();
      djson.forEach(v => {
          var sector=  v['sector'];
          var razonsocial = v['razonSocial'];
          document.getElementById("LbusqEmp-input").value = razonsocial;
          document.getElementById("idRubroEmpL").value = sector;
       });  
});

  async function  cotFirsStep (){    
    const responses = await fetch('/api-getFuenteLeadB2C');
    const datas = await responses.json();
    const arrayOfValues = datas.filter(function(r){return true;});
    const item = document.getElementById("item-fuenteleadb2c");
    const index = 'NombreFuente';
    const nombre = 'la fuente';
    addUniqueOptionsToDropDownList (item, arrayOfValues, index, nombre);

    var selelems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(selelems);
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


document.getElementById("btn-crealead").addEventListener("click", async function(){
    const mothernames   =  document.getElementById("NombreApoderado-input").value;
    const parentSurName   =  document.getElementById("idApellidoApoderado").value;
    const NombreFuente   =  document.getElementById("item-fuenteleadb2c").value;
    const names   =  document.getElementById("NombreAlumno-input").value;
    const surNameP   =  document.getElementById("idApellidoAlumno").value;
    const edad   =  document.getElementById("idedad").value;
    const parentCellphone   =  document.getElementById("idtelapoderado").value;
    const parentcorreo   =  document.getElementById("emailprincipal").value;
    const fecharegistro   =  document.getElementById("fecharegistrolead").value;
    const data = {mothernames, parentSurName, NombreFuente,names,surNameP,edad,parentCellphone, parentcorreo, fecharegistro }
    console.log(data);
    const options = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data) };

   const response = await  fetch('/api-addnewleadb2c', options);
   const json = await response.json();
   //await addDetailLead();
   //await limpieza();
   });

   function limpieza () {
    document.getElementById("NombreApoderado-input").value = "";
    document.getElementById("idApellidoApoderado-input").value = ""; 
    document.getElementById("item-fuenteleadb2c").value = "";
    document.getElementById("NombreAlumno-input").value = "";
    document.getElementById("idApellidoAlumno").value = "";
    document.getElementById("idedad").value ="";
    document.getElementById("idtelapoderado").value = ""; 
    document.getElementById("emailprincipal").value = "";
    document.getElementById("fecharegistrolead").value ="";
   }

 function addNewDetailLead(){  
    var iddetCot = getSno();
    var idContact = document.getElementById('moreNomContactEmpC').value;
    var idTelContact = document.getElementById('moreidtelEmpC').value;
    var idMail = document.getElementById('moreemail_inline').value;
    var data = [iddetCot,idContact,idTelContact,idMail]
    alldata.push(data);
    var searchResultsBox = document.getElementById("CDetEmpResults");
    var templateBox = document.getElementById("CDetEmprowTemplate");
    var template = templateBox.content;
    searchResultsBox.innerHTML =''
    alldata.map(function(r){
    var tr= template.cloneNode(true);
    var DetLeadID = tr.querySelector(".class-DetLeadID");
    var DetLeadNom = tr.querySelector(".class-DetLeadNom");
    var DetLeadTel = tr.querySelector(".class-DetLeadTel");
    var DetLeadMail = tr.querySelector(".class-DetLeadMail");
    DetLeadID.textContent = r[0];
    DetLeadNom.textContent = r[1];
    DetLeadTel.textContent = r[2];
    DetLeadMail.textContent = r[3];
    searchResultsBox.appendChild(tr);  
    });
  }  

  async function addDetailLead  () {
    alldata.forEach( async function (v) {
        const Nom = v[1];
        const Tel = v [2] ;  
        const Mail = v[3];
        const comod = "0";
        const data = {Nom, Tel , Mail, comod};
        const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data) };
       const response = await fetch('/api-addNewLead', options);
       const jsoni = await response.json();});
        }


        var serialNum = 0;

        function getSno(){
            serialNum++;
            return serialNum;
        }
        document.getElementById("btn-agregar-detcot").addEventListener("click", function()
        {
          validateForm();
          if(validationStatus == 'pass'){
            addNewDetailLead(); 
          }
         })
      
      function validateForm() {
        var idContact = document.getElementById('moreNomContactEmpC').value;
        var idTelContact = document.getElementById('moreidtelEmpC').value;
        var idMail = document.getElementById('moreemail_inline').value;
          checkRequired([idContact, idTelContact, idMail]); 
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
            

 




      
