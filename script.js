const form = document.querySelector(".form");
const input = document.querySelector(".input");
const pending = document.querySelector(".pending");


function storeValue() {

}

function toDoPending(value) {
    const list = document.createElement("li");
    const span = document.createElement("span");
    const deleteBtn = document.createElement("button");
    const finishedBtn = document.createElement("button");

    span.innerText = `${value} `;
    deleteBtn.innerText = "❌";
    finishedBtn.innerText = "✅";
    
    span.appendChild(deleteBtn);
    span.appendChild(finishedBtn);
    list.appendChild(span);
    pending.appendChild(list);
}

function toDoApp(event) {
    event.preventDefault();
    const currentValue = input.value;
    toDoPending(currentValue);
    input.value = "";
}

function defaultLoader() {
    form.addEventListener("submit", toDoApp);
}


function init() {
    defaultLoader();
}

init();