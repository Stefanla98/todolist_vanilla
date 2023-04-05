const button = document.getElementById('add_button');

button.addEventListener("click", addToToDoList);
const myTodoListItemCounter = {};

function addToToDoList() {
    const item = document.getElementById('item');
    const todolist = document.getElementById("item_list");
    let itemQuantity = 0;

    for ( const [key, value] of Object.entries(myTodoListItemCounter)) {
        if (key === item.value) {
            myTodoListItemCounter[key] += 1;
        }
    }

    if (item.value in myTodoListItemCounter) {
        itemQuantity = myTodoListItemCounter[item.value];
    } else {
        itemQuantity = 0;
    }

    if (itemQuantity == 0) {
        const list_item = document.createElement("li");
        list_item.setAttribute("id", item.value);

        list_item.appendChild(document.createTextNode(`${item.value}, Quantity: 1`));

        let checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.id = item.value;
        checkbox.addEventListener('change', checkBoxListener)
        list_item.appendChild(checkbox);

        todolist.appendChild(list_item);
        myTodoListItemCounter[item.value] = 1;
    } else {
        const list_item = document.getElementById(item.value);
        list_item.innerHTML = `${item.value}, Quantity: ${myTodoListItemCounter[item.value]}`

        let checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.id = item.value;
        checkbox.addEventListener('change', checkBoxListener)
        list_item.appendChild(checkbox);
    }

}

function checkBoxListener(event) {
    if(myTodoListItemCounter[event.currentTarget.id] == 1) {
        const list_item = document.getElementById(event.currentTarget.id);
        list_item.remove();
        delete myTodoListItemCounter[event.currentTarget.id];
    } else {
        myTodoListItemCounter[event.currentTarget.id] -= 1;

        const list_item = document.getElementById(event.currentTarget.id);
        list_item.innerHTML = `${event.currentTarget.id}, Quantity: ${myTodoListItemCounter[event.currentTarget.id]}`

        let checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.id = event.currentTarget.id;
        checkbox.addEventListener('change', checkBoxListener)
        list_item.appendChild(checkbox);
    }
}
