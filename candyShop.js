var form =document.getElementById('form_id');
var candy_Name=document.getElementById('name_id');
var candy_des=document.getElementById('description_id');
var candy_price=document.getElementById('price_id');
var candy_quantity=document.getElementById('quantity_id');
var itemList = document.getElementById('items');

form.addEventListener('submit',addItem);
itemList.addEventListener('click',buy1);
itemList.addEventListener('click',buy2);

function addItem(e){
    e.preventDefault();
    console.log(1);
const user={
    name:e.target.Name.value,
    description:e.target.Description.value,
    price:e.target.Price.value,
    quantity:e.target.Quantity.value,
}
axios
    .post("http://localhost:3001/candy/post",user)
   .then(res =>{
    console.log(('data added'))
    showList((res.data.details))

})
   .catch(err=>console.log(err));

    form.reset();
}

function buy1(e){
    if (e.target.classList.contains('one')) {
            var li = e.target.parentElement;
            
            axios
            .patch(`http://localhost:3001/candy/put1/${li.id}`,li.quant)
           .then(res=>{li.quant=li.quant-1;
            console.log(li.quant)})
            .catch(err=>console.log(err));
           

          
           
    }
}

function buy2(e){
    if (e.target.classList.contains('two')) {
            var li = e.target.parentElement;
            axios
            .patch(`http://localhost:3001/candy/put2/${li.id}`)
           .then(res=>{li.quant=li.quant-2;
            console.log(li.quant)})
            .catch(err=>console.log(err));
    }
}



window.addEventListener("DOMContentLoaded",()=>{
    axios
    .get("http://localhost:3001/candy/getData")
.then((res)=>{
    for(var i=0;i<res.data.details.length;i++){
       showList(res.data.details[i])
    }
})
.catch(err=>console.log(err));})

function showList(e){

    var _name = e.name;
    var _description = e.description;
    var  _price=e.price;
    var _quantity=e.quantity

    var li = document.createElement('li');
    li.quant=e.quantity
    li.id=e.id
    li.className = 'list-group-item';
    li.appendChild(document.createTextNode(_name + " " + _description + " " + _price+" "+_quantity));
    var buyOne = document.createElement('button');
    buyOne.className = 'btn btn-primary float-end one';
    buyOne.appendChild(document.createTextNode('BUY ONE'));
    li.appendChild(buyOne);
    var buyTwo = document.createElement('button');
    buyTwo.className = 'btn btn-primary float-end two';
    buyTwo.appendChild(document.createTextNode('BUY TWO'));
    li.appendChild(buyTwo);
    itemList.append(li);


}