const inputTitle = document.querySelector('.title');
const inputDate = document.querySelector('.date');
const inputDescription = document.querySelector('.desc');
const addButton = document.querySelector('.add-button');
let list = document.querySelector('.toDoList');

let listArray = JSON.parse(localStorage.getItem('task')) || [];

// Function untuk menampilkan task
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
                <button class="delete px-5 py-1 bg-[#a74242] rounded-md text-white font-medium">Delete</button>
            </div>
        </div>`;

    div.innerHTML = taskValue;
    list.append(div);

    // Event listener untuk Done, Delete, dan Edit
    div.querySelector('.done').addEventListener('click', () => {
        listArray.splice(index, 1);
        localStorage.setItem('task', JSON.stringify(listArray));
        div.remove();
    });

    div.querySelector('.delete').addEventListener('click', () => {
        listArray = []; // Menghapus task berdasarkan index
        localStorage.setItem('task', JSON.stringify(listArray));
        list.innerHTML = '';
    });

    div.querySelector('.edit').addEventListener('click', () => {
        // Isi kembali form input dengan nilai task yang diedit
        inputTitle.value = task.title;
        inputDate.value = task.date;
        inputDescription.value = task.description;

        // Ubah tombol Add menjadi Save Changes
        addButton.textContent = 'Save Changes';

        // Event listener untuk Save Changes
        const saveChanges = () => {
            task.title = inputTitle.value;
            task.date = inputDate.value;
            task.description = inputDescription.value;

            // Simpan perubahan ke array dan localStorage
            listArray[index] = task;
            localStorage.setItem('task', JSON.stringify(listArray));

            // Hapus semua elemen di dalam list dan tampilkan kembali
            list.innerHTML = '';
            listArray.forEach(displayTask);

            // Reset form dan tombol
            inputTitle.value = '';
            inputDate.value = '';
            inputDescription.value = '';
            addButton.textContent = '+';
            addButton.removeEventListener('click', saveChanges); // Hapus event listener setelah selesai
            addButton.addEventListener('click', addNewTask);  // Kembalikan ke event listener untuk menambah task baru
        };

        // Ubah event listener dari Add ke Save Changes
        addButton.removeEventListener('click', addNewTask);  // Hapus event listener Add
        addButton.addEventListener('click', saveChanges);  // Tambahkan event listener Save Changes
    });
}

// Function untuk menambahkan task baru
function addNewTask() {
    // Validasi input
    if (inputTitle.value === '' || inputDate.value === '' || inputDescription.value === '') {
        alert('Tolong isi semua data!');
        return;
    }

    const objTask = {
        title: inputTitle.value,
        date: inputDate.value,
        description: inputDescription.value
    };

    listArray.push(objTask);
    localStorage.setItem('task', JSON.stringify(listArray));
    displayTask(objTask, listArray.length - 1);

    // Reset form
    inputTitle.value = '';
    inputDate.value = '';
    inputDescription.value = '';
}

// Event listener untuk tombol Add
addButton.addEventListener('click', addNewTask);

// Tampilkan task yang tersimpan saat reload
listArray.forEach((task, index) => {
    displayTask(task, index);
});
