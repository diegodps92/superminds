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
    const responses = await fetch('/api-getLeadFuente');
    const datas = await responses.json();
    const arrayOfValues = datas.filter(function(r){return true;});
    const item = document.getElementById("item-fuente");
    const index = 'fuente';
    const nombre = 'la fuente';
    addUniqueOptionsToDropDownList (item, arrayOfValues, index, nombre);
    const responses2 = await fetch('/api-getLeadArea');
    const datas2 = await responses2.json();
    const arrayOfValues2 = datas2.filter(function(r){return true;});
    console.log(arrayOfValues2);
    const item2 = document.getElementById("item-area");
    const index2 = 'area';
    const nombre2 = 'el area';
    addUniqueOptionsToDropDownList (item2, arrayOfValues2, index2, nombre2);
    const responses3 = await fetch('/api-getLeadPrograma');
    const datas3 = await responses3.json();
    const arrayOfValues3 = datas3.filter(function(r){return true;});
    const item3 = document.getElementById("item-programa");
    const index3 = 'programa';
    const nombre3 = 'el programa';
    addUniqueOptionsToDropDownList (item3, arrayOfValues3, index3, nombre3);
    const responses4 = await fetch('/api-getLeadEspecificacion');
    const datas4 = await responses4.json();
    const arrayOfValues4 = datas4.filter(function(r){return true;});
    const item4 = document.getElementById("item-especifico");
    const index4 = 'especificacion';
    const nombre4 = 'la especificación';
    addUniqueOptionsToDropDownList (item4, arrayOfValues4, index4, nombre4);

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
    const ruc  =  document.getElementById("LbusqEmpRuc-input").value;
    const razonsocial   =  document.getElementById("LbusqEmp-input").value;
    const rubro   =  document.getElementById("idRubroEmpL").value;
    const idrubro   =  "0";
    const fuente   =  document.getElementById("item-fuente").value;
    const nomcontacto   =  document.getElementById("NomContactEmpC").value;
    const telcontacto   =  document.getElementById("idtelEmpC").value;
    const cargo   =  document.getElementById("idCargo").value;
    const area   =  document.getElementById("item-area").value;
    const programa = document.getElementById("item-programa").value;
    const especificacion = document.getElementById("item-especifico").value;
    const data = {ruc, razonsocial, rubro,idrubro,fuente,nomcontacto,telcontacto,area, cargo, programa, especificacion };
    const options = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data) };

   const response = await  fetch('/api-addnewlead', options);
   const json = await response.json();
   //await addDetailLead();
   //await limpieza();
   });

   function limpieza () {
    document.getElementById("LbusqEmpRuc-input").value = "";
    document.getElementById("LbusqEmp-input").value = ""; 
    document.getElementById("idRubroEmpL").value = "";
    document.getElementById("item-fuente").value = "";
    document.getElementById("NomContactEmpC").value = "";
    document.getElementById("idtelEmpC").value ="";
    document.getElementById("idCargo").value = ""; 
    document.getElementById("moreNomContactEmpC").value = "";
    document.getElementById("moreidtelEmpC").value ="";
    document.getElementById("moreemail_inline").value = ""; 
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