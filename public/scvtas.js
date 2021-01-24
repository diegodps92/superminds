    var arrayOfValues;
    var arrayOfBuddy;
    var arrayMes;
    const alldata = [];
    const dataStok = [];
    function comprar() {
            
              alldata.forEach(async function (r) {
                const currentdate = '1';
                const idlead = r[1];
                const nom = r[2];
                const month = r[9];
                const year = r[10];
                const curso = r[3];
                const edad = r[4];
                const availableday = r[5];
                const buddyCompleteName = r[6];
                const initialHour = r[7];
                const surName = r[8];
                const data = { currentdate, idlead,nom,curso,edad,availableday,buddyCompleteName,initialHour,surName};
                console.log(data);
                const options = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
                
                };
                //const response = await 
                const response = await  fetch('/apis', options);
                const json = await response.json();
                const datas = {month, year,availableday, buddyCompleteName,initialHour}
                const optionsd = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(datas)
                };
                //const response = await 
                const response2 = await  fetch('/api-actualiza-stock', optionsd);
                const json2 = await response2.json();
              }) 
            
            limpieza ();
            }
    function limpieza (){
       alldata.length = 0
       var idleadBox = document.getElementById("idLead");
       var courseBox = document.getElementById("item-curso");
       var edadBox = document.getElementById("item-edad");
       var diaBox = document.getElementById("item-dia");
       var horarioBox = document.getElementById("item-horario");
       var buddyBox = document.getElementById("item-Buddy");
       var qtyBox = document.getElementById("item-niños");
       var nomBox = document.getElementById("idNombre");
       var apeBox = document.getElementById("idApellido");
       var idleadBox = document.getElementById("idLead");
       edadBox.innerHTML = '<option>Selecciona la edad</option>';
       diaBox.innerHTML = '<option>Selecciona el día</option>';
       horarioBox.innerHTML = '<option>Selecciona el horario</option>';
       buddyBox.innerHTML = '<option>Selecciona el Buddy</option>';
       qtyBox.value = "";
       nomBox.value = "";
       apeBox.value ="";
       idleadBox.value ="";
       var searchResultsBox = document.getElementById("ventaResults");
       searchResultsBox.innerHTML = "";
    }

    async function afterSidebarLoads1 ()  {
      //dropdownmonth();
      console.log('diego');
      const response = await fetch('/api-enviar-disponibilidaddb');
      const data = await response.json();
      arrayOfValues = data.filter(function(r){return true;});
      var item = document.getElementById("item-curso");
      const index = 'courseName';
      const nombre = 'el curso';
      addUniqueOptionsToDropDownList (item, arrayOfValues, index, nombre);
    }

    async function dropdownmonth ()  {
      const response = await fetch('/api-mes');
      const data = await response.json();
      arrayMes = data.filter(function(r){return true;});
      var item = document.getElementById("item-mes");
      const index = 'monthDesc';
      const nombre = 'el mes'
      addUniqueOptionsToDropDownList (item, arrayMes, index,nombre);
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

    function afterFirstDropDownChanged () {
            var item = document.getElementById("item-edad");
            var curso = document.getElementById("item-curso").value;
            var filteredOfArrayOfValues = arrayOfValues.filter(function(r) {return r['courseName'] === curso });
            const index = 'courseEdad' 
            const nombre = 'la edad'
            addUniqueOptionsToDropDownList(item, filteredOfArrayOfValues,index, nombre);     
        }
    

    async function afterSecondDropDownChanged () { 
            const response = await fetch('/api-enviar-buddydb');
            const data = await response.json();
            arrayOfBuddy = data.filter(function(r){return true;});   
            var curso = document.getElementById("item-curso").value;
            var edad = document.getElementById("item-edad").value;
            var item =  document.getElementById("item-dia");
            
            var buddyrange = arrayOfValues.filter(function(r) {return r['courseName'] === curso && r['courseEdad'] === edad});
            var filtro = [];
            buddyrange.forEach(function(r) {filtro.push(r['buddyCompleteName'])});
            var newarray =[];
            newarray = arrayOfBuddy.filter(function(v) { return filtro.indexOf(v['buddyCompleteName'])!==-1 });  
            const index = 'availableday' 
            const nombre = 'el día'
            addUniqueOptionsToDropDownList(item, newarray,index, nombre);  
          }
          
    function afterThirdDropDownChanged () {
            var curso = document.getElementById("item-curso").value;
            var edad = document.getElementById("item-edad").value;
            var dia =  document.getElementById("item-dia").value;
            var item =  document.getElementById("item-horario");
            
            var buddyrange = arrayOfValues.filter(function(r) {return r['courseName'] === curso && r['courseEdad'] === edad});
            var filtro = [];
            buddyrange.forEach(function(r) {filtro.push(r['buddyCompleteName'])});
            var newarray =[];
            newarray = arrayOfBuddy.filter(function(v) { return filtro.indexOf(v['buddyCompleteName'])!==-1 });  
            var filteredarray = newarray.filter(function(r) {return r['availableday'] === dia && r['stock'] !== 0});
            const index = 'initialHour' 
            const nombre = 'la hora'
            addUniqueOptionsToDropDownList(item, filteredarray,index,nombre);      
      }

      function afterForthDropDownChanged () {
        var curso = document.getElementById("item-curso").value;
            var edad = document.getElementById("item-edad").value;
            var dia =  document.getElementById("item-dia").value;
            var horario =  document.getElementById("item-horario").value;
            horario = Number(horario)
            var item =  document.getElementById("item-Buddy");
            var buddyrange = arrayOfValues.filter(function(r) {return r['courseName'] === curso && r['courseEdad'] === edad});
            var filtro = [];
            buddyrange.forEach(function(r) {filtro.push(r['buddyCompleteName'])});
            var newarray =[];
            newarray = arrayOfBuddy.filter(function(v) { return filtro.indexOf(v['buddyCompleteName'])!==-1 });  
            var filteredarray = newarray.filter(function(r) {return r['availableday'] === dia && r['stock'] !== 0 && r['initialHour']  == horario});
            const index = 'buddyCompleteName' 
            const nombre = 'el Buddy'
            addUniqueOptionsToDropDownList(item, filteredarray,index,nombre);      
      }
      
      async function afterFifthDropDownChanged () {
            var curso = document.getElementById("item-curso").value;
            var edad = document.getElementById("item-edad").value;
            var availableday =  document.getElementById("item-dia").value;
            var horario =  document.getElementById("item-horario").value;
            var descMes = document.getElementById("item-mes").value;
            var buddyCompleteName = document.getElementById("item-Buddy").value; 
            const newArrayofMonth = arrayMes.filter (r=> r.monthDesc === descMes).map(ele=>ele.idmes);
            const month = Number(newArrayofMonth[0])
            const year = 2021;
            const initialHour = Number(horario);
            const data = { month, year,availableday, buddyCompleteName,initialHour };
            const options = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
                };
                //const response = await
                const response = await fetch('/api-consulta-stock', options);
                const djson = await response.json();

                const aresult = djson[0];
                const nresult = aresult[0];
                 
                //const val = Object.values(nresult)
                
                const stock = val[7];
                document.getElementById("item-niños").textContent = stock;
      }
      function  calltablas () {
            var nom = document.getElementById("idNombre").value;
            var ape = document.getElementById("idApellido").value;
            var idlead = document.getElementById("idLead").value;
            var curso = document.getElementById("item-curso").value;
            var edad = document.getElementById("item-edad").value;
            var availableday =  document.getElementById("item-dia").value;
            var horario = document.getElementById("item-horario").value;
            var descMes = document.getElementById("item-mes").value;
            var buddyCompleteName = document.getElementById("item-Buddy").value; 
            const newArrayofMonth = arrayMes.filter (r=> r.monthDesc === descMes).map(ele=>ele.idmes);
            const month = Number(newArrayofMonth[0])
            const year = 2021;
            const currentdate = new Date();
            const initialHour = Number(horario);
        
            if (nom.trim().length === 0 || idlead.trim().length === 0)
             {M.toast({html: 'Falta campos'})}
            else
             {
            var data = [currentdate,idlead,nom,curso, edad, availableday, buddyCompleteName,initialHour,ape, month, year];            
            alldata.push(data);
            var searchResultsBox = document.getElementById("ventaResults");
            var templateBox = document.getElementById("vtarowTemplate");
            var template = templateBox.content;
            searchResultsBox.innerHTML = "";
            alldata.forEach(function(r){
            var tr= template.cloneNode(true);
            var cName = tr.querySelector(".class-Name");
            var cCourse = tr.querySelector(".class-Curso");
            var cDay = tr.querySelector(".class-Dia");
            var cHour = tr.querySelector(".class-hora");
            var cBuddy = tr.querySelector(".class-buddy");
            cName.textContent = r[2];
            cCourse.textContent = r[3];
            cDay.textContent = r[5];
            cBuddy.textContent = r[6];
            cHour.textContent = r[7];
            searchResultsBox.appendChild(tr);      
             });
            }
            }


    document.addEventListener("DOMContentLoaded",e => {afterSidebarLoads1(); dropdownmonth();});
    document.getElementById("btn-agregar").addEventListener("click",calltablas);
    document.getElementById("item-Buddy").addEventListener("change",afterFifthDropDownChanged); 
    document.getElementById("item-curso").addEventListener("change",afterFirstDropDownChanged); 
    document.getElementById("item-edad").addEventListener("change",afterSecondDropDownChanged); 
    document.getElementById("item-dia").addEventListener("change",afterThirdDropDownChanged); 
    document.getElementById("item-horario").addEventListener("change",afterForthDropDownChanged);  
    document.getElementById('btn-Comprar').addEventListener('click',comprar )