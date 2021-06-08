const form = document.querySelector(".form");
const input = document.querySelector(".input");
const pending = document.querySelector(".pending");

const LS_PENDING = "PENDING"

function storeValue(value) {
    const newId = PendingArray.length + 1;
    const dataShema = {
        text: value,
        id: newId
    }

    localStorage.setItem()

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
    storeValue(currentValue);
}

function defaultLoader() {
    const loadedPending = localStorage.getItem(LS_PENDING);
    if (loadedPending !== null) {
      const parsedPending = JSON.parse(loadedPending);
      console.log(parsedPending);
    }
    form.addEventListener("submit", toDoApp);
}


function init() {
    defaultLoader();
}

init();