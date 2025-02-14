// clock
function clock() {
    let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let today = new Date();

    document.getElementById("date").innerHTML = (dayNames[today.getDay()] + " " + today.getDate() + " " + monthNames[today.getMonth()] + " " + today.getFullYear());

    let h = today.getHours();
    let m =today.getMinutes();
    let s = today.getSeconds();
    let day = h<11 ? "AM" : "PM";

    h = h<10? "0" +h: h;
    m = m<10? "0" +m: m;
    s = s<10? "0" +s: s;

    document.getElementById("hour").innerHTML = h;
    document.getElementById("minute").innerHTML = m;
    document.getElementById("second").innerHTML = s;
}let inter = setInterval(clock, 400);

// Task
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const priority = document.getElementById('choice');
const date = document.getElementById('dateInput');

let tasks = [];

function checkPriority(priorityLevel) {
    if (priorityLevel === 'low') {
        return "🟢";
    } else if (priorityLevel === 'medium') {
        return "🟡";
    } else if (priorityLevel === 'high') {
        return "🔴";
    }
}

function renderListToDo() {
    listContainer.innerHTML = '';
    tasks.forEach(task => {
        console.log("aaa",task);
        let li = document.createElement("li");
        li.textContent = checkPriority(task.priority);
        let name = document.createElement("p");
        name.textContent = task.name;
        let date = document.createElement("p");
        date.textContent = task.date;
        // li.appendChild(x);
        let span = document.createElement("span");
        span.textContent = "\u00d7";
        li.appendChild(date);
        li.appendChild(name);
        li.appendChild(span);
        listContainer.appendChild(li);
    });
}

function addTask() {
    if (inputBox.value === '') {
        alert('You must write something!');
    }
    else {
        const dataTask = {name: inputBox.value, date: date.value, priority: priority.value, done: false};
        let li = document.createElement("li");
        li.innerHTML = checkPriority(priority.value);
        listContainer.appendChild(li);
        let x = document.createElement("p");
        x.innerHTML = inputBox.value;
        li.appendChild(x);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
        console.log(dataTask);
        tasks.push(dataTask);
        renderListToDo();
    }
    inputBox.value = '';
    saveData();
}

function checkedTask() {
    const done = document.getElementById('done');
    done.innerHTML = '';
    const checks = document.querySelectorAll(".checked");

    checks.forEach(check => {
        done.appendChild(check.cloneNode(true)); 
    });
}

listContainer.addEventListener("click", function(e){
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        checkedTask();

        saveData();
    }
    else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

listContainer.value = "";
let taskInfo = {name: "", date: "", time: ""};

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}
function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask();

function clearTask() {
    localStorage.clear();
    inputBox.value = '';
}

function clearAll() {
    listContainer.innerHTML = '';
    localStorage.clear();
}

checkedTask();