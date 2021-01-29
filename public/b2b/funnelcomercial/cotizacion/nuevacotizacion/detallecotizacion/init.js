document.getElementById('sub-btn').addEventListener('click', formSubmit);
document.getElementById('formData').addEventListener('click', editRow);
document.getElementById('formData').addEventListener('click', deleteRow);
document.addEventListener("DOMContentLoaded", getFromLocalStore); //get items from local storage

var forms = [];
var selectedRow = null;
var btn;
let items;
var validationStatus = '';

function formSubmit(e){
    validateForm();
    if(validationStatus == 'pass'){
    let formData = readForm();
    if(selectedRow == null){
        addNewRow(formData);
        forms.push(formData);
        storeLocal(formData); 
    }
    else{
        updateRow();
    }
    // console.log(forms);
    // console.log(`form length is ${forms.length}`)
    }
    e.preventDefault();
}

function validateForm() {
   var fname = document.getElementById('fname');
   var lname = document.getElementById('lname');
   var mobile = document.getElementById('mobile');
   var email = document.getElementById('email');
    checkRequired([fname, lname, mobile, email]); 
}

function checkRequired(inputArr){
    for(i = 0; i < inputArr.length; i++){
        console.log(inputArr[i]);
        if(inputArr[i].value == ''){
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

function getFormId(){
    let formId;
    if(forms.length > 0){
        formId = forms[forms.length - 1].id + 1;
    }
    else{
        formId = 0;
    }
    return formId;
}

function getFromLocalStore(){
    let items;
    if(localStorage.getItem('items') === null){
        forms = [];
    }
    else{
        forms = JSON.parse(localStorage.getItem('items'));
        console.log(forms);
        forms.forEach(function(form){
        const tbody = document.getElementById('formData');  //get the tbody element
        // insert new row at bottom
        var newRow = tbody.insertRow();
        //set id for new row
        newRow.id = form.id;

        let sno = newRow.insertCell(0);
        sno.innerHTML = getSno();

        let fname = newRow.insertCell(1);
        fname.innerHTML = form.fname;
    
        let lname = newRow.insertCell(2);
        lname.innerHTML = form.lname;

        let mobile = newRow.insertCell(3);
        mobile.innerHTML = form.mobile;

        let email = newRow.insertCell(4);
        email.innerHTML = form.email;

        let edit = newRow.insertCell(5);
        edit.innerHTML = `<a href="#" class="edit"><i class="fas fa-edit"></i></a></td>`;

        let del = newRow.insertCell(6);
        del.innerHTML = `<a href="#" class="delete"><i class="fas fa-trash"></i></a></td>`;
        });
        
    }
    return items;
}


function storeLocal(form){
    // check if any item in local storage
    if(localStorage.getItem('items') === null){
        items = [];
        // push the new item
        items.push(form);
        // set in local storage     
        localStorage.setItem('items', JSON.stringify(items));
    }
    else{
        items = JSON.parse(localStorage.getItem('items')); 
        items.push(form);

        // re set local storage
        localStorage.setItem('items', JSON.stringify(items));
    }
}

function updateLocalStorage(id, data){
    // console.log( "data is  " + data)
    items = JSON.parse(localStorage.getItem('items'));
    console.log(id)
    items.forEach(function(item, index){
        if(item.id == id){
            console.log(`${item.id} and ${id}`)
            item.id = data.id;
            item.fname = data.fname;
            item.lname = data.lname;
            item.mobile = data.mobile;
            item.email = data.email;
            items.splice(index, 1, data);
        }
    });
    localStorage.setItem('items', JSON.stringify(items));
}

function deleteItemFromLocalStorage(id){
    // console.log("the received id is " + id)
    items = JSON.parse(localStorage.getItem('items'));
    items.forEach(function(item, index){
        if(item.id == id){
            // console.log(`${item.id} and the ${id}`)
            items.splice(index, 1);
            // console.log(items);
            // console.log("the length is " + items.length);
        }
        // console.log(arr);
    });
    localStorage.setItem('items', JSON.stringify(items));
    // console.log(items);
}

function readForm(){
    var formData = {};
    formData['id'] = getFormId();
    formData['fname'] = document.getElementById('fname').value;
    formData['lname'] = document.getElementById('lname').value;
    formData['mobile'] = document.getElementById('mobile').value;
    formData['email'] = document.getElementById('email').value;
    return formData;
}

var serialNum = 0;
function getSno(){
    serialNum++;
    return serialNum;
}

function addNewRow(form){
    
    // get the tbody id
    const tbody = document.getElementById('formData');  //get the tbody element

    // insert new row at bottom
    var newRow = tbody.insertRow();

    //set id for new row
    newRow.id = form.id;

    let sno = newRow.insertCell(0);
    sno.innerHTML = getSno();

    let fname = newRow.insertCell(1);
    fname.innerHTML = form.fname;
    
    let lname = newRow.insertCell(2);
    lname.innerHTML = form.lname;

    let mobile = newRow.insertCell(3);
    mobile.innerHTML = form.mobile;

    let email = newRow.insertCell(4);
    email.innerHTML = form.email;

    let edit = newRow.insertCell(5);
    edit.innerHTML = `<a href="#" class="edit"><i class="fas fa-edit"></i></a></td>`;

    let del = newRow.insertCell(6);
    del.innerHTML = `<a href="#" class="delete"><i class="fas fa-trash"></i></a></td>`;

    toastNotify('Record Added Successfully');
    // console.log(document.getElementById('formData'));
    resetForm();
}

function toastNotify(txt) {
    var toastDiv = document.getElementById('toast');
    toastDiv.classList.add('show');
    toastDiv.innerText = txt;
    setTimeout(function(){
        toastDiv.classList.remove("show");
      },5000);
}

function editRow(e){
    if(e.target.parentElement.classList.contains('edit')){
        selectedRow = e.target.parentElement.parentElement.parentElement;
        console.log(e.target.parentElement.parentElement.parentElement);
        forms.forEach(function(form){
            if(form.id == selectedRow.id){
                document.getElementById('fname').value = form.fname;
                document.getElementById('lname').value  = form.lname;
                document.getElementById('mobile').value  = form.mobile;
                document.getElementById('email').value  = form.email;
                console.log(form.id);
            }
        });
        btn = document.getElementById('sub-btn');
        btn.innerHTML = `Update <i class="fas fa-paper-plane"></i>`;     
    }
}

function updateRow(){
  forms.forEach(function(form){
    if(form.id == selectedRow.id){
        // for changes in data structure
        form.fname = document.getElementById('fname').value;
        form.lname = document.getElementById('lname').value;
        form.mobile = document.getElementById('mobile').value;
        form.email = document.getElementById('email').value;

        // for changes in the UI
        selectedRow.cells[1].textContent = document.getElementById('fname').value;
        selectedRow.cells[2].textContent = document.getElementById('lname').value;
        selectedRow.cells[3].textContent = document.getElementById('mobile').value;
        selectedRow.cells[4].textContent = document.getElementById('email').value;   

        a = {'id': form.id, 'fname':form.fname, 'lname': form.lname, 'mobile': form.mobile, 'email':form.email};
        updateLocalStorage(selectedRow.id, a);
    }
    btn = document.getElementById('sub-btn');
    btn.innerHTML = `Submit <i class="fas fa-paper-plane"></i>`;
  });
  resetForm();
}

function deleteRow(e){
    if(e.target.parentElement.classList.contains('delete')){
        selectedRow = e.target.parentElement.parentElement.parentElement;
        serialNum--;
        forms.forEach(function(form, index){
            if(form.id == selectedRow.id){
                selectedRow.remove();
                forms.splice(index, 1);
                toastNotify('Record Deleted Successfully');
                // console.log("sent index is " + form.id)
                deleteItemFromLocalStorage(form.id);
            }
        });
        
        var tb = document.getElementById('formData');
        var tempSerial = 1;
        for(i = 0; i < tb.rows.length; i++){
            // serialNum++;
            var d = tb.rows[i].cells[0];
            d.textContent = tempSerial++;
            console.log(i);
        }
        resetForm();
    }
}

function resetForm(){
    document.getElementById('fname').value = '';
    document.getElementById('lname').value = '';
    document.getElementById('mobile').value = '';
    document.getElementById('email').value = '';
    selectedRow = null;
}