let addTaskBtn = document.getElementById('add-btn')
let todoInput = document.getElementById('todo-input')
let addAlert = document.getElementById("addAlert")
let tasksContainer = document.getElementById("tasksContainer")
const apiKey = '6764194f60a208ee1fde6ba1'
getAllToDos()

addTaskBtn.addEventListener('click', function () {
    let taskTitle = todoInput.value;
    addToDo(taskTitle)

})

async function addToDo(taskTitle) {
    second.classList.replace("d-none", "d-inline-block")
    first.classList.add("d-none")
    let body = {
        title: taskTitle,
        apiKey
    }
    let addReq = await fetch(`https://todos.routemisr.com/api/v1/todos`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'content-type': 'application/json',
        }

    }).catch(function (e) {
        toastr.error('Error in adding api ', 'Error');
        second.classList.replace("d-inline-block", "d-none")
        first.classList.remove("d-none")


    })
    let response = await addReq.json()


    if (response.message === 'success') {
        getAllToDos()
        toastr.success('Task Added Successfully!', 'Success');




    } else {
        toastr.error(`<p class="text-capitalize mb-0">${response.error[0].message}</p>`, 'Error');

    }
    second.classList.replace("d-inline-block", "d-none")
    first.classList.remove("d-none")

}
async function deleteToDo(todoId) {

    let body = {
        todoId
    }

    let addReq = await fetch('https://todos.routemisr.com/api/v1/todos',
        {
            method: 'DELETE',
            body: JSON.stringify(body),
            headers: {
                'content-type': 'application/json',
            }

        })
    let response = await addReq.json()
    console.log(response);
    if (response.message === 'success') {

        toastr.info('Task Deleted!', 'Info');



    }
    getAllToDos()

}
async function markAsCompleted(todoId) {

    let body = {
        todoId
    }

    let addReq = await fetch('https://todos.routemisr.com/api/v1/todos',
        {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: {
                'content-type': 'application/json',
            }

        }).catch(function (e) {
            toastr.error('Error in mark as completed api ', 'Error');




        })
    let response = await addReq.json()

    if (response.message === 'success') {
        toastr.info('Task Completed!', 'Info');
    }
    getAllToDos()

}


async function getAllToDos() {
    taskLoad.classList.remove("d-none")
    tasksContainer.classList.add("d-none")
    let data = await fetch(`https://todos.routemisr.com/api/v1/todos/${apiKey}`)
        .catch(function (e) {
            toastr.error('Error in getting tasks ', 'Error');
        })
    let todosRes = await data.json()
    if (todosRes.todos) {
        taskLoad.classList.add("d-none")
        tasksContainer.classList.remove("d-none")


    }
    displayToDos(todosRes.todos)
}

function displayToDos(todos) {
    let cartoona
    if (todos.length == 0) {
        cartoona = `<p id="emptyAlert" class="text-success fs-3 mt-5 text-center">..No Tasks Available..</p>`
    } else {

        cartoona = `
        <h2 class="mt-5  fs-3 mb-3 text-success text-center text-uppercase">All tasks</h2>
        
        `
        for (let i = 0; i < todos.length; i++) {
            cartoona += `
          <div class="task mx-auto mb-3 rounded-3 p-3 ${todos[i].completed ? "bg-danger" : "bg-success"} d-flex justify-content-between align-items-center ">
                        <h5 class="mb-0 text-white ${todos[i].completed ? "text-decoration-line-through" : "text-decoration-none"} text-capitalize">${todos[i].title}</h5>
                        <div class="task-action ">
                            <i onclick="markAsCompleted('${todos[i]._id}')" class="fa-regular ${todos[i].completed ? "d-none" : "d-inline-block"} p-2 fa-lg fa-circle-check text-white"></i>
                            <i onclick="deleteToDo('${todos[i]._id}')" class="fa-solid p-2 fa-sm fa-trash text-white "></i>
                        </div>
         </div>
        `
        }
    }
    tasksContainer.innerHTML = cartoona
}