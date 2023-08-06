let tasks = [];
const tasksList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');

function fetchTodos() {
    //GET resquest
    fetch('https://jsonplaceholder.typicode.com/todos')
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            tasks = data.slice(1, 10);

            renderList();
        })
        .catch(function (error) {
            console.log(error);

        })

}



function addTaskTodDOM(task) {
    const li = document.createElement('li');

    li.innerHTML = `
        
          <input type="checkbox" id="${task.id}" ${task.completed ? 'checked' : ''} class="custom-checkbox"/>
          <label for="${task.id}">${task.title}</label>
          <img src="./images/delete_Icon.png" class="delete" data-id="${task.id}" />
         
        
    `;
    tasksList.append(li);
}

function renderList() {
    tasksList.innerHTML = "";
    for (let i = 0; i < tasks.length; i++) {
        console.log("Inside render list");
        console.log("task is ", tasks[i]);
        addTaskTodDOM(tasks[i]);

    }
}

function markTaskAsComplete(taskId) {
    let newTask = tasks.filter(function (task) {
        return task.id === Number(taskId);
    });
    if (newTask.length > 0) {
        const currentTask = newTask[0];
        currentTask.completed == !(currentTask.completed);
        renderList();
        showNotification("Task toggled successfully!");
        return;

    }
}

function deleteTask(taskId) {
    let newTasks = tasks.filter((x) => x.id != taskId);
    tasks = newTasks;
    renderList();
    showNotification("Task deleted successfully");
}

function addTask(task) {
    console.log("Add task ", task);
    if (task) {
        tasks.push(task);
        renderList();
        showNotification("Task Added Successfully!");
        return;
    }
    showNotification("Task Added Successfully!");



}

function showNotification(text) {
    alert(text);
}

function handleInputKeypress(e) {
    if (e.key === 'Enter') {
        const text = e.target.value;
        if (!text) {
            showNotification("Task can not be empty");
            return;
        }
        let task = {
            title: text,
            id: Date.now(),
            completed: false
        }
        e.target.value = '';
        addTask(task);
    }
}

function handleClickEvent(e) {
    const target = e.target;
    if (target.className === 'delete') {
        deleteTask(target.dataset.id);
        return;

    } else if (target.className === 'custom-checkbox') {
        markTaskAsComplete(target.id);
        return;
    }



}

function initializeApp() {

    fetchTodos();

    addTaskInput.addEventListener('keyup', handleInputKeypress);
    document.addEventListener('click', handleClickEvent);
}
initializeApp();

