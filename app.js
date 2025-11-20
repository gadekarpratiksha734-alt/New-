let reminders = [];
let missedPills = [];
let motivations = [
  "Your health is your wealth – take care of it!",
  "Every pill brings you closer to recovery 💊",
  "Stay strong, you’re doing amazing 🌟",
  "Healing takes time – be patient ❤️",
  "One step at a time, one pill at a time ✅"
];
function addReminder() {
  const name = document.getElementById("medicineName").value;
  const time = document.getElementById("reminderTime").value;
  const day = document.getElementById("daySelect").value;
  if (name && time) {
    reminders.push({ name, time, day });
    renderReminders();
    scheduleAlarm(name, time);
  } else {
    alert("Please enter medicine name and time!");
  }
}
function renderReminders() {
  const list = document.getElementById("reminderList");
  list.innerHTML = "";
  reminders.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `💊 ${item.name} at ${item.time} on ${item.day}`;
    const delBtn = document.createElement("button");
    delBtn.textContent = "❌";
    delBtn.classList.add("btn-red");
    delBtn.onclick = () => deleteReminder(index);
    li.appendChild(delBtn);
    list.appendChild(li);
  });
}
function deleteReminder(index) {
  reminders.splice(index, 1);
  renderReminders();
}
function scheduleAlarm(name, time) {
  const now = new Date();
  const [hours, minutes] = time.split(":");
  const alarmTime = new Date();
  alarmTime.setHours(hours, minutes, 0, 0);
  if (alarmTime <= now) {
    alarmTime.setDate(alarmTime.getDate() + 1);
  }
  const delay = alarmTime.getTime() - now.getTime();
  setTimeout(() => triggerAlarm(name), delay);
}
function triggerAlarm(name) {
  const beep = document.getElementById("beepSound");
  const chime = document.getElementById("chimeSound");
  if (beep) {
    beep.play().catch(() => {
      if (chime) chime.play().catch(err => console.error(err));
    });
  }
  if (Notification.permission === "granted") {
    new Notification("Pill Reminder 💊", {
      body: `Time to take your medicine: ${name}`,
      icon: "icon.png"
    });
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(permission => {
      if (permission === "granted") {
        new Notification("Pill Reminder 💊", {
          body: `Time to take your medicine: ${name}`,
          icon: "icon.png"
        });
      }
    });
  }
}
function measureHealth() {
  const result = document.getElementById("healthResult");
  result.textContent = "Measuring...";
  setTimeout(() => {
    const bp = Math.floor(Math.random() * 40) + 100;
    const pulse = Math.floor(Math.random() * 40) + 60;
    const temp = (36 + Math.random()).toFixed(1);
    result.textContent = `BP: ${bp}/80, Pulse: ${pulse}, Temp: ${temp}°C`;
  }, 2000);
}
function addMissedPill() {
  const date = new Date().toLocaleDateString();
  missedPills.push(date);
  renderMissedPills();
}
function renderMissedPills() {
  const list = document.getElementById("missedList");
  list.innerHTML = "";
  missedPills.forEach((date, index) => {
    const li = document.createElement("li");
    li.textContent = `❌ Missed pill on ${date}`;
    const delBtn = document.createElement("button");
    delBtn.textContent = "🗑️";
    delBtn.classList.add("btn-red");
    delBtn.onclick = () => deleteMissed(index);
    li.appendChild(delBtn);
    list.appendChild(li);
  });
}
function deleteMissed(index) {
  missedPills.splice(index, 1);
  renderMissedPills();
}
function playBeep() {
  const beep = document.getElementById("beepSound");
  const chime = document.getElementById("chimeSound");
  beep.play().catch(() => {
    if (chime) chime.play().catch(err => console.error(err));
  });
}
function playChime() {
  document.getElementById("chimeSound").play();
}
function shareWhatsApp() {
  let message = "📋 PillCare Reminders:\n";
  reminders.forEach(r => {
    message += `💊 ${r.name} at ${r.time} on ${r.day}\n`;
  });
  const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}
function shareEmail() {
  let subject = "PillCare Reminder Report";
  let body = "📋 PillCare Reminders:\n";
  reminders.forEach(r => {
    body += `💊 ${r.name} at ${r.time} on ${r.day}\n`;
  });
  const url = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = url;
}
function showMotivation() {
  const random = motivations[Math.floor(Math.random() * motivations.length)];
  document.getElementById("motivationText").textContent = random;
}