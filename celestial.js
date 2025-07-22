let timer;
let seconds = 0;
let isRunning = false;
let totalSeconds = 0;

const affirmations = [
  // Celestial & Cosmicl,
  "I am as vast and limitless as the universe itself.",
  "My potential shines brighter than the North Star.",
  "Like the moon controls the tides, I control my focus.",
  "I am a constellation of talent and determination.",
  
  // Astronomy Inspired
  "My mind is a galaxy of brilliant ideas waiting to be discovered.",
  "I orbit my goals with perfect precision.",
  "Like a shooting star, I make my mark wherever I go.",
  "I am aligned with the universe's infinite wisdom.",
  
  // Space Exploration
  "I navigate challenges like an astronaut navigates the cosmos.",
  "My curiosity is as endless as the universe.",
  "I launch my dreams like rockets into the stars.",
  "Every challenge is just another planet to explore.",
  
  // Celestial Phenomena
  "I shine with the brilliance of a supernova.",
  "Like a comet, I leave a trail of success behind me.",
  "My focus is as constant as Polaris in the night sky.",
  "I am the architect of my own cosmic destiny.",
  
  // Galactic Wisdom
  "The universe conspires to help me achieve my goals.",
  "I am stardust made conscious, capable of amazing things.",
  "My thoughts create ripples in the fabric of reality.",
  "I am both the observer and the creator of my universe."
];

document.addEventListener("DOMContentLoaded", () => {
  // Initialize elements
  const popup = document.getElementById("popup");
  const popupText = document.getElementById("popupText");
  const closePopupBtn = document.getElementById("closePopup");
  const showAffirmBtn = document.getElementById("showAffirmBtn");
  const fileInput = document.getElementById("fileUpload");
  const fileList = document.getElementById("fileList");
  const notesTextarea = document.getElementById("notesTextarea");
  const todoInput = document.getElementById("todoInput");

  // Create twinkling stars
  createTwinklingStars();

  // Load saved data
  loadSavedData();

  // Update the timer display and the fill animation
  function updateTimerDisplay() {
    const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    const timerDisplay = document.getElementById("timerDisplay");
    if (timerDisplay) timerDisplay.textContent = `${mins}:${secs}`;

    const fill = document.getElementById("fill");
    if (totalSeconds > 0 && fill) {
      const percent = Math.max(0, seconds / totalSeconds);
      fill.style.height = `${percent * 100}%`;
    }
  }

  // Set timer from user input
  window.setCustomTime = function() {
    const input = document.getElementById("customTime");
    if (!input) return;
    
    const parsed = parseInt(input.value);
    if (isNaN(parsed)) {
      showPopup("Please enter a valid number for minutes.");
      return;
    }
    
    if (parsed <= 0) {
      showPopup("Please enter a positive number for minutes.");
      return;
    }
    
    seconds = parsed * 60;
    totalSeconds = seconds;
    updateTimerDisplay();
    input.value = "";
  };

  // Start the countdown timer
  window.startTimer = function() {
    if (isRunning) return;
    if (seconds === 0) {
      showPopup("Please set a timer first.");
      return;
    }
    
    isRunning = true;
    timer = setInterval(() => {
      if (seconds > 0) {
        seconds--;
        updateTimerDisplay();
      } else {
        clearInterval(timer);
        isRunning = false;
        showPopup("Time's up! Float for a while and return when you're ready to shine.");
        document.getElementById("timerDisplay").classList.add("pulse");
        setTimeout(() => {
          document.getElementById("timerDisplay").classList.remove("pulse");
        }, 3000);
      }
    }, 1000);
  };

  // Pause the timer
  window.pauseTimer = function() {
    clearInterval(timer);
    isRunning = false;
  };

  // Reset the timer and fill
  window.resetTimer = function() {
    clearInterval(timer);
    seconds = 0;
    totalSeconds = 0;
    isRunning = false;
    updateTimerDisplay();
    const fill = document.getElementById("fill");
    if (fill) fill.style.height = "0%";
  };

  // Show the popup with a given message
  function showPopup(message) {
    popupText.textContent = message;
    popup.classList.add("active");
    document.addEventListener("keydown", handleKeyDown);
  }

  // Close the popup
  function closePopup() {
    popup.classList.remove("active");
    document.removeEventListener("keydown", handleKeyDown);
  }

  // Handle ESC key press
  function handleKeyDown(e) {
    if (e.key === "Escape") {
      closePopup();
    }
  }

  // Show a random affirmation
  function showAffirmation() {
    const randomIndex = Math.floor(Math.random() * affirmations.length);
    const randomAffirmation = affirmations[randomIndex];
    showPopup(randomAffirmation);
  }

  // To-Do List: Add new task
  window.addTask = function() {
    if (!todoInput) return;
    
    const task = todoInput.value.trim();
    if (task === "") {
      showPopup("Please enter a task first.");
      return;
    }

    const todoList = document.getElementById("todoList");
    if (!todoList) return;

    const li = document.createElement("li");
    li.textContent = task;

    const delBtn = document.createElement("button");
    delBtn.textContent = "✖";
    delBtn.onclick = () => {
      li.remove();
      saveToDoList();
    };

    li.appendChild(delBtn);
    todoList.appendChild(li);
    todoInput.value = "";
    
    saveToDoList();
  };

  // File Upload handling
  if (fileInput && fileList) {
    fileInput.addEventListener("change", function() {
      fileList.innerHTML = "";

      for (const file of this.files) {
        const li = document.createElement("li");

        const link = document.createElement("a");
        link.href = URL.createObjectURL(file);
        link.textContent = file.name;
        link.target = "_blank";

        const delBtn = document.createElement("button");
        delBtn.textContent = "✖";
        delBtn.onclick = () => li.remove();

        li.appendChild(link);
        li.appendChild(delBtn);
        fileList.appendChild(li);
      }
    });
  }

  // Save notes to localStorage when changed
  if (notesTextarea) {
    notesTextarea.addEventListener("input", () => {
      localStorage.setItem("notes", notesTextarea.value);
    });
  }

  // Save todo list to localStorage
  function saveToDoList() {
    const todoList = document.getElementById("todoList");
    if (!todoList) return;
    
    const tasks = [];
    todoList.querySelectorAll("li").forEach(li => {
      tasks.push(li.textContent.replace("✖", "").trim());
    });
    
    localStorage.setItem("todoList", JSON.stringify(tasks));
  }

  // Load saved data from localStorage
  function loadSavedData() {
    // Load notes
    if (notesTextarea) {
      const savedNotes = localStorage.getItem("notes");
      if (savedNotes) {
        notesTextarea.value = savedNotes;
      }
    }
    
    // Load todo list
    const todoList = document.getElementById("todoList");
    if (todoList) {
      const savedTasks = localStorage.getItem("todoList");
      if (savedTasks) {
        const tasks = JSON.parse(savedTasks);
        tasks.forEach(task => {
          if (task) {
            const li = document.createElement("li");
            li.textContent = task;

            const delBtn = document.createElement("button");
            delBtn.textContent = "✖";
            delBtn.onclick = () => {
              li.remove();
              saveToDoList();
            };

            li.appendChild(delBtn);
            todoList.appendChild(li);
          }
        });
      }
    }
  }

  // Create twinkling stars effect
  function createTwinklingStars() {
    const container = document.querySelector('.container');
    if (!container) return;
    
    for (let i = 0; i < 30; i++) {
      const star = document.createElement('div');
      star.classList.add('twinkle');
      
      // Random position
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      
      // Random size (1-3px)
      const size = Math.random() * 2 + 1;
      
      // Random animation delay
      const delay = Math.random() * 5;
      
      star.style.left = `${left}%`;
      star.style.top = `${top}%`;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.animationDelay = `${delay}s`;
      
      container.appendChild(star);
    }
  }

  // Event listeners
  if (showAffirmBtn) showAffirmBtn.addEventListener("click", showAffirmation);
  if (closePopupBtn) closePopupBtn.addEventListener("click", closePopup);
  if (popup) popup.addEventListener("click", (e) => {
    if (e.target === popup) closePopup();
  });

  // Equalize heights (optional)
  window.addEventListener("load", () => {
    setTimeout(() => {
      const playlist = document.querySelector(".playlist");
      const affirmation = document.querySelector(".affirmation");
      if (playlist && affirmation) {
        affirmation.style.height = `${playlist.offsetHeight}px`;
      }
    }, 500);
  });

  // Handle Enter key in todo input
  if (todoInput) {
    todoInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        addTask();
      }
    });
  }
});function createIceCubes() {
  const glass = document.querySelector('.glass');
  if (!glass) return;

  for (let i = 0; i < 4; i++) {
    const ice = document.createElement('div');
    ice.classList.add('ice-cube');

    const size = 30 + Math.random() * 10;
    ice.style.width = `${size}px`;
    ice.style.height = `${size}px`;
    ice.style.left = `${Math.random() * 100}%`;
    ice.style.bottom = `${Math.random() * 40 + 10}px`;
    ice.style.transform = `rotate(${Math.random() * 360}deg)`;
    glass.appendChild(ice);
  }
}