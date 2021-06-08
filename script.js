const form = document.querySelector(".form");
const input = document.querySelector(".input");
const pending = document.querySelector(".pending");
const finished = document.querySelector(".finished")

let pendingDatabase = [];
let finishedDatabase = [];

function savePendingInStorage() {
    localStorage.setItem("PENDING", JSON.stringify(pendingDatabase));
}

function saveFinishedInStorage() {
    localStorage.setItem("FINISHED", JSON.stringify(finishedDatabase));
}

function deletePendingList(value) {
    const list = value.target.parentNode;
    pending.removeChild(list);
    const setNewPending = pendingDatabase.filter(element => { return element.id !== parseInt(list.id)});
    pendingDatabase = setNewPending;
    savePendingInStorage();
}

function moveFinished(value) {
    const list = value.target.parentNode;
    pending.removeChild(list);
    const setNewPending = pendingDatabase.filter(element => { return element.id !== parseInt(list.id)});
    pendingDatabase = setNewPending;
    savePendingInStorage();
    const content = list.querySelector("span");
    paintFinished(content.innerText);
}

function deleteFinishedList(value) {
    const list = value.target.parentNode;
    finished.removeChild(list);
    const setNewFinished = finishedDatabase.filter(element => { return element.id !== parseInt(list.id)});
    finishedDatabase = setNewFinished;
    saveFinishedInStorage();
}

function handlePending(value) {
    const list = value.target.parentNode;
    finished.removeChild(list);
    const setNewFinished = finishedDatabase.filter(element => { return element.id !== parseInt(list.id)});
    finishedDatabase = setNewFinished;
    saveFinishedInStorage();
    const content = list.querySelector("span");
    paintPending(content.innerText);
}

function paintFinished(value) {
    const list = document.createElement("li");
    const span = document.createElement("span");
    const deleteFinishedBtn = document.createElement("button");
    const pendingBtn = document.createElement("button");
    const finishedId = finishedDatabase.length + 1;

    list.id = finishedId;
    span.innerText = value;
    deleteFinishedBtn.innerText = "❌";
    pendingBtn.innerText = "⏫";

    deleteFinishedBtn.addEventListener("click", deleteFinishedList);
    pendingBtn.addEventListener("click", handlePending);

    list.appendChild(span);
    list.appendChild(deleteFinishedBtn);
    list.appendChild(pendingBtn);
    finished.appendChild(list);

    const dataSchemaFinished = {
        text: value,
        id: finishedId
    }

    finishedDatabase.push(dataSchemaFinished);
    saveFinishedInStorage();

}

function paintPending(value) {
    const list = document.createElement("li");
    const span = document.createElement("span");
    const deleteBtn = document.createElement("button");
    const finishedBtn = document.createElement("button");
    const pendingId = pendingDatabase.length + 1;

    list.id = pendingId;
    span.innerText = `${value} `;
    deleteBtn.innerText = "❌";
    finishedBtn.innerText = "✅";

    deleteBtn.addEventListener("click", deletePendingList);
    finishedBtn.addEventListener("click", moveFinished);
    
    list.appendChild(span);
    list.appendChild(deleteBtn);
    list.appendChild(finishedBtn);
    pending.appendChild(list);

    const dataSchemaPending = {
        text: value,
        id: pendingId
    }
    pendingDatabase.push(dataSchemaPending);
    savePendingInStorage();
}

function toDoApp(event) {
    event.preventDefault();
    const currentValue = input.value;
    paintPending(currentValue);
    input.value = "";
}

function defaultLoader() {
    const loadedPending = localStorage.getItem("PENDING");
    const loadedFinished = localStorage.getItem("FINISHED");
    if (loadedPending !== null) {
        const parsedPending = JSON.parse(loadedPending);
        parsedPending.forEach(element => { paintPending(element.text)});
    }
    if (loadedFinished !== null) {
        const parsedFinished = JSON.parse(loadedFinished);
        parsedFinished.forEach(element => { paintFinished(element.text)});
    }
    form.addEventListener("submit", toDoApp);

}


function init() {
    defaultLoader();
}

init();