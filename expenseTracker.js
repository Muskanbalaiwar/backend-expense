console.log(1);
var form = document.getElementById('addValue');
var itemList = document.getElementById('items');
var amount = document.getElementById('amount');
var disc = document.getElementById('des');
var catg = document.getElementById('cat');
form.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
itemList.addEventListener('click', editItem);

function addItem(e) {
    e.preventDefault();
    console.log(98976);
    const user = {
        amn: e.target.amt.value,    
        dec: e.target.dsc.value,
        crt: e.target.ctg.value,
       
    }
    axios
    .post("http://localhost:3001/user/post",user)
   .then(res =>{
    console.log((res.data.details))
    showData((res.data.details))

})
   .catch(err=>console.log(err));
    //console.log(user);

form.reset();
}

function removeItem(e) {
    if (e.target.classList.contains('delete')) {
        if (confirm('Are You sure?')) {
            var li = e.target.parentElement;
            
            console.log(li.id);
            axios
    .delete(`http://localhost:3001/user/deleteData/${li.id}`)
    .then(res=>{console.log('data deleted');
        itemList.removeChild(li)})
    .catch(err=>console.log(err));
           
            
        }
    }
}

function editItem(e) {
    if (e.target.classList.contains('edit')) {
        if (confirm('Are You sure?')) {
             var editingId = e.target.parentElement;
             console.log(editingId.id);
             axios
             .get(`http://localhost:3001/user/getData/${editingId.id}`)
             .then((res) =>{
                console.log("res data "+JSON.stringify(res.data.details))
                amount.value=res.data.details.amount,
                disc.value=res.data.details.description,
                catg.value=res.data.details.category
            })
                .catch(err=>console.log(err))

                axios
             .delete(`http://localhost:3001/user/deleteData/${editingId.id}`)
           // item = JSON.parse(localStorage.getItem(editingId));
            //console.log(editingId);
            .then(res=> itemList.removeChild(editingId))
        }
    }

}

window.addEventListener("DOMContentLoaded",()=>{
    axios
    .get("http://localhost:3001/user/getData")
.then((res)=>{
    //console.log("res dtaa"+JSON.stringify(res.data.details[1].id));
    for(var i=0;i<res.data.details.length;i++){
        //console.log("res dtaa"+JSON.stringify(res.data.details[i].id));
       showData(res.data.details[i])
    }
})
.catch(err=>console.log(err));})

function showData(e){

    var newItem = e.amount;
    var newDes = e.description;
    var newCat =e.category;

    var li = document.createElement('li');
    li.id=e.id
    li.className = 'list-group-item';
    li.appendChild(document.createTextNode(newItem + " " + newDes + " " + newCat));
    var deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-danger exteme-right delete';
    deleteBtn.appendChild(document.createTextNode('Delete'));
    li.appendChild(deleteBtn);
    var btnEdit = document.createElement('button');
    btnEdit.className = 'btn btn-primary float-end edit';
    btnEdit.appendChild(document.createTextNode('Edit Details'));
    li.appendChild(btnEdit);
    itemList.append(li);


}