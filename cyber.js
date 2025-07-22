let timer;
let seconds = 0;
let isRunning = false;
let totalSeconds = 0;

const affirmations = [
  // Coding & Focus
  "My focus is like optimized code - clean, efficient, and bug-free.",
  "I compile concentration and execute excellence.",
  "Each line of code brings me closer to my goals.",
  "My mind is a secure system - distractions get firewall protection.",
  
  // Cybersecurity Metaphors
  "I encrypt my focus and decrypt success.",
  "Distractions are malware - my willpower is the ultimate antivirus.",
  "My concentration has multi-factor authentication against interruptions.",
  "I patch my procrastination vulnerabilities daily.",
  
  // Tech-Inspired Motivation
  "Ctrl+Alt+Del my distractions, F5 my focus.",
  "I'm in sudo mode - no permission is needed to achieve my goals.",
  "My productivity is blockchain-secured - immutable and decentralized.",
  "Like cloud storage, my potential has unlimited capacity.",
  
  // Hacker Mindset
  "I hack through challenges with elegant solutions.",
  "Bugs are just opportunities to debug my approach.",
  "My willpower is an infinite loop of determination.",
  "I brute force my way through obstacles with persistence.",
  
  // Futuristic Cyber
  "My neural network is trained for peak performance.",
  "I'm compiling my future one focused session at a time.",
  "Like machine learning, I improve with every iteration.",
  "I'm the admin of my destiny - no root access required."
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
        showPopup("Time's up! Take a short break and recharge.");
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
});