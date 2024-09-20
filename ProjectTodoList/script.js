const inputTitle = document.querySelector('.title');
const inputDate = document.querySelector('.date');
const inputDescription = document.querySelector('.desc');
const addButton = document.querySelector('.add-button');
let list = document.querySelector('.toDoList');

const listArray = [];

function displayTask(task, index) {
    const div = document.createElement('div');
    div.classList.add('container', 'p-5');
    const taskValue = `<div class="text-justify">
            <div>
                <h2 class="font-semibold text-lg">${task.title}</h2>
                <span class="italic text-xs">${task.date}</span>
                <p class="text-sm">${task.description}</p>
            </div>
            <div>
                <button class="done px-5 py-1 bg-[#43C55F] rounded-md text-white font-medium">Done</button>
                <button class="edit px-5 py-1 bg-[#2185D5] rounded-md text-white font-medium">Edit</button>
                <button class="delete px-5 py-1 bg-[#FF5656] rounded-md text-white font-medium">Delete</button>
            </div>
        </div>`;

        div.innerHTML = taskValue;
        list.append(div);


    // func untuk setiap button done edit delete
    const doneButton = document.querySelector('.done');
    const editButton = document.querySelector('.edit');
    const deleteButton = document.querySelector('.delete');

    doneButton.addEventListener('click', () => {
        
        listArray.splice('i', 1);
        localStorage.setItem('task', JSON.stringify(listArray) || []);

        div.remove();

        // tambahkan poin task yang selesai.
    });

    deleteButton.addEventListener('click', () => {
        
        listArray.splice('i', 1);
        localStorage.setItem('task', JSON.stringify(listArray));

        div.remove();
    })

    editButton.addEventListener('click', () => {
        inputTitle.value = task.title;
        inputDate.value = task.date;
        inputDescription.value = task.description;

       addButton.textContent = 'save changes';

       addButton.addEventListener('click', () => {
            task.title = inputTitle.value;
            task.date = inputDate.value;
            task.description = inputDescription.value;

            listArray[index] = task;
            localStorage.setItem('task', JSON.stringify(listArray));

            list.innerHTML = '';
            listArray.forEach(displayTask);

            inputTitle.value = '';
            inputDate.value = '';
            inputDescription.value = '';
            addButton.textContent = 'Add Task';

       })
    })
}



addButton.addEventListener('click', () => {
    const objTask = {
        title : inputTitle.value,
        date : inputDate.value,
        description : inputDescription.value
    };

    listArray.push(objTask);
    localStorage.setItem('task', JSON.stringify(listArray));

    // func di sini
    displayTask(objTask, listArray.length - 1);

    inputTitle.value = '';
    inputDate.value = '';
    inputDescription.value = '';
});

listArray.forEach((task, index )=> {
    displayTask(task, index);
});

