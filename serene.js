// ===============================
// Timer Variables
// ===============================
let timer;
let seconds = 0;
let totalSeconds = 0;
let isRunning = false;

// ===============================
// Affirmation Themes
// ===============================
const affirmationThemes = {
  serenity: [
    "I welcome peace into this moment.",
    "My mind is calm, my soul is at ease.",
    "Serenity flows through me with every breath.",
    "I let go of what I cannot control.",
    "Stillness is my strength.",
    "In quiet, I find clarity.",
    "I choose grace over pressure.",
    "Peace begins within me.",
    "Each breath brings more calm.",
    "Even in chaos, I remain grounded."
  ],
  focus: [
    "Focus fuels success.",
    "One step at a time, I move forward.",
    "My attention is a powerful force.",
    "I eliminate distractions with ease.",
    "Every moment I focus brings me closer to my goal.",
    "Clarity sharpens my vision.",
    "I am in control of my attention.",
    "My mind is aligned with purpose.",
    "I protect my focus fiercely.",
    "Flow state is always within reach."
  ],
  motivation: [
    "I am capable of amazing things.",
    "Every effort counts.",
    "My potential is limitless.",
    "Obstacles are opportunities in disguise.",
    "I am stronger than my doubts.",
    "Each day is a chance to grow.",
    "I show up for myself, always.",
    "Discipline brings me freedom.",
    "I keep going, no matter what.",
    "My hard work always pays off."
  ]
};

// ===============================
// Initialize on Load
// ===============================
document.addEventListener('DOMContentLoaded', () => {
  updateTimerDisplay();
  
  // Add Enter key listener for todo input
  document.getElementById("todoInput").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  });
  
  // Initialize popup close button
  document.getElementById("closePopup").addEventListener("click", () => {
    document.getElementById("popup").classList.remove("active");
  });
  
  // Close popup when clicking outside
  document.getElementById("popup").addEventListener("click", (e) => {
    if (e.target === document.getElementById("popup")) {
      document.getElementById("popup").classList.remove("active");
    }
  });
});

// ===============================
// Affirmation Logic
// ===============================
document.getElementById("showAffirmBtn").addEventListener("click", () => {
  const theme = document.getElementById("themeSelector").value;
  showPopup(randomAffirmation(theme));
});

function randomAffirmation(theme) {
  const affirmations = affirmationThemes[theme] || affirmationThemes.serenity;
  return affirmations[Math.floor(Math.random() * affirmations.length)];
}

// ===============================
// Timer Functions
// ===============================
function setCustomTime() {
  const input = document.getElementById("customTime");
  const minutes = parseInt(input.value);
  if (isNaN(minutes)) {
    alert("Please enter a valid number for minutes.");
    return;
  }
  if (minutes <= 0) {
    alert("Please enter a positive number for minutes.");
    return;
  }
  
  seconds = minutes * 60;
  totalSeconds = seconds;
  updateTimerDisplay();
  input.value = "";
  pauseTimer();
}

function startTimer() {
  if (isRunning) return;
  if (seconds <= 0) {
    alert("Please set a timer first!");
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
      updateTimerDisplay();
      showPopup("Time's up! Take a break and refresh your mind.");
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timer);
  isRunning = false;
}

function resetTimer() {
  pauseTimer();
  seconds = totalSeconds;
  updateTimerDisplay();
}

function updateTimerDisplay() {
  const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
  const secs = String(seconds % 60).padStart(2, "0");
  document.getElementById("timerDisplay").textContent = `${mins}:${secs}`;

  const coffeeFill = document.getElementById("coffeeFill");
  if (totalSeconds > 0 && coffeeFill) {
    const fillHeight = (seconds / totalSeconds) * 128;
    coffeeFill.setAttribute("height", fillHeight);
    coffeeFill.setAttribute("y", 16 + (128 - fillHeight));
  }
}

// ===============================
// To-Do List Functions
// ===============================
function addTask() {
  const input = document.getElementById("todoInput");
  const task = input.value.trim();
  if (!task) return;

  const li = document.createElement("li");
  li.textContent = task;

  const btn = document.createElement("button");
  btn.textContent = "✕";
  btn.title = "Remove task";
  btn.onclick = () => li.remove();

  li.appendChild(btn);
  document.getElementById("todoList").appendChild(li);

  input.value = "";
}

// ===============================
// File Upload for Notes
// ===============================
document.getElementById("fileUpload").addEventListener("change", (e) => {
  const fileList = document.getElementById("fileList");
  fileList.innerHTML = "";

  Array.from(e.target.files).forEach((file) => {
    const li = document.createElement("li");

    const a = document.createElement("a");
    a.textContent = file.name;
    a.href = "#";
    a.title = "File name";

    const btn = document.createElement("button");
    btn.textContent = "✕";
    btn.title = "Remove file";
    btn.onclick = () => li.remove();

    li.appendChild(a);
    li.appendChild(btn);
    fileList.appendChild(li);
  });
});

// ===============================
// Popup Modal Logic
// ===============================
function showPopup(text) {
  const popup = document.getElementById("popup");
  const popupText = document.getElementById("popupText");
  popupText.textContent = text;
  popup.classList.add("active");
}