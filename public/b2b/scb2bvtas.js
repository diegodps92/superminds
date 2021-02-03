const elemsDropdown = document.querySelectorAll(".dropdown-trigger");
const instancesDropdown = M.Dropdown.init(elemsDropdown, {
    coverTrigger: false
});

const elemsSidenav = document.querySelectorAll(".sidenav");
const instancesSidenav = M.Sidenav.init(elemsSidenav, {
    edge: "left"
});

function search() {
     
    var searchIpunt = document.getElementById("idsearchEmp").value.toString().toLowerCase().trim();
    var searchWords = searchIpunt.split(/\s+/);
    var searchColumns = [1,2];
    var resultArray = data.filter (function(r){
      return searchWords.every(function(word){
        return searchColumns.some(function(colIndex){
          return r[colIndex].toString().toLowerCase().indexOf(word) !== -1
            });
          });
        });
        
    var searchResultsBox = document.getElementById("SEmpResults");
    var templateBox = document.getElementById("SEmprowTemplate");
    var template = templateBox.content;
    searchResultsBox.innerHTML = "";
    resultArray.forEach(function(r){
      var tr= template.cloneNode(true);
      var custIdColumn = tr.querySelector(".class-EmpID");
      var nomColumn = tr.querySelector(".class-EmpN");
      var factColumn = tr.querySelector(".class-EmpFac");
      var numNinColumn = tr.querySelector(".class-EmpNumNin");
      var numHorColumn = tr.querySelector(".class-Emphor");
      var editButton = tr.querySelector(".edit-botton");
      custIdColumn.textContent = r[0];
      editButton.dataset.customerId = r[0];
      nomColumn.textContent = r[1];
      factColumn.textContent = r[2];
      numNinColumn.textContent = r[3];
      numHorColumn.textContent = r[4];
      numHorColumn.textContent = r[5];
      searchResultsBox.appendChild(tr);
    });
    }
    function fmodal () {
        var instance = M.Modal.getInstance(elem);
        instance.open(); 
    }
document.getElementById("btn-modal").addEventListener('click', fmodal)