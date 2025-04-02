// DOM Elements
const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('newTask');
const taskList = document.getElementById('taskList');
const darkModeToggle = document.getElementById('darkModeToggle');

// Load tasks from localStorage or initialize empty array
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Check for saved dark mode preference
if (localStorage.getItem('darkMode') === 'enabled') {
  document.documentElement.classList.add('dark');
  darkModeToggle.checked = true;
}

// Render all tasks
function renderTasks() {
  taskList.innerHTML = '';
  
  tasks.forEach((task, index) => {
    const taskItem = document.createElement('li');
    taskItem.className = 'py-3 flex items-center group';
    
    taskItem.innerHTML = `
      <div class="flex items-center flex-1">
        <input 
          type="checkbox" 
          data-index="${index}"
          class="checkbox w-5 h-5 mr-3 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
          ${task.completed ? 'checked' : ''}
        >
        <span class="${task.completed ? 'line-through text-gray-400 dark:text-gray-500' : 'text-gray-800 dark:text-gray-200'}">
          ${task.text}
        </span>
      </div>
      <button 
        data-index="${index}"
        class="delete-btn ml-2 text-red-500 hover:text-red-700 dark:hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <i class="fas fa-trash"></i>
      </button>
    `;
    
    taskList.appendChild(taskItem);
  });
}

// Add new task
taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const taskText = taskInput.value.trim();
  
  if (taskText) {
    tasks.push({ text: taskText, completed: false });
    saveTasks();
    taskInput.value = '';
    renderTasks();
  } else {
    alert('Please enter a task!');
  }
});

// Toggle task completion
taskList.addEventListener('change', (e) => {
  if (e.target.classList.contains('checkbox')) {
    const index = e.target.dataset.index;
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
  }
});

// Delete task
taskList.addEventListener('click', (e) => {
  if (e.target.closest('.delete-btn')) {
    const index = e.target.closest('.delete-btn').dataset.index;
    if (confirm('Are you sure you want to delete this task?')) {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    }
  }
});

// Toggle dark mode
darkModeToggle.addEventListener('change', () => {
  if (darkModeToggle.checked) {
    document.documentElement.classList.add('dark');
    localStorage.setItem('darkMode', 'enabled');
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('darkMode', 'disabled');
  }
});

// Save tasks to localStorage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Initial render
renderTasks();