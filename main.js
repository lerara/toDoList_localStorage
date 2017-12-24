var button = document.querySelector('button');
var toDoArray = JSON.parse(localStorage.getItem('toDoArray'));
var list = document.querySelector('ul');

var id = -1;
if(toDoArray === null || toDoArray.length === 0){
    toDoArray = [];
    id = 0;
}else{
    id = toDoArray[toDoArray.length-1].id;
    showItems();
}

button.addEventListener('click',function() {

    var input = document.querySelector('input');
    id++;
    var obj = {
        id: id,
        text: input.value,
        isChecked:false
    }
    buildItem(obj);
    saveItem(obj);

});


list.addEventListener('click', function(ev) {
    if (ev.target.tagName === 'LI') {
        console.log('id' + ev.target.id);
        ev.target.classList.toggle('checked');
        if(ev.target.classList == 'checked'){
            checkedItem(ev.target, true);
            ev.target.style.textDecoration = 'line-through';
        }else{
            checkedItem(ev.target, false);
            ev.target.style.textDecoration = 'none';
        }
    }
}, false);

function buildItem(obj) {
    var li = document.createElement("li");
    var t = document.createTextNode(obj.text);
    li.id = obj.id;
    li.appendChild(t);


    if(obj.isChecked){
        li.style.textDecoration = 'line-through';
    }else{
        li.style.textDecoration = 'none';
    }

    if (obj.value === '') {
        alert("write task!");
    } else {
        document.querySelector("ul").appendChild(li);
    }

    var deleteButton = document.createElement('button');
    deleteButton.id = id;
    deleteButton.innerHTML = 'delete';
    deleteButton.style.marginLeft = '5px';
    deleteButton.addEventListener('click', function () {
       toDoArray.forEach(function (elem,i) {
           if(deleteButton.id == elem.id){
               toDoArray.splice(i,1);
               updateItems();
               showItems();
           }
       }) 
    });
    li.appendChild(deleteButton);
    
    
}

function checkedItem(target, answer) {
    toDoArray.forEach(function (elem) {
        if(elem.id == target.id){
            elem.isChecked = answer;
            updateItems();

        }
    });

}

function saveItem(obj) {
    toDoArray.push(obj);
    updateItems();
}

function updateItems() {
    localStorage.setItem('toDoArray',JSON.stringify(toDoArray));
}

function showItems() {
    list.innerHTML = "";
    toDoArray.forEach(function (elem) {
        buildItem(elem);
    });
}