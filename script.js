const STEP_TO_MIN = 1 / 100;
const BASE_MIN = 60;
const ADMIN_PASSWORD = "password"; // 好きな文字に変えてOK

function getData() {
  return JSON.parse(localStorage.getItem("zaurusData")) || {
    fatLevel: 0
  };
}

function saveDataToStorage(data) {
  localStorage.setItem("zaurusData", JSON.stringify(data));
}

function saveData() {
  const minutes = Number(document.getElementById("minutes").value);
  const steps = Number(document.getElementById("steps").value);
  const total = minutes + steps * STEP_TO_MIN;

  const data = getData();
  data.fatLevel += (BASE_MIN - total) / 60;

  saveDataToStorage(data);
  alert("保存しました");
}

function login() {
  const pw = document.getElementById("password").value;
  if (pw === ADMIN_PASSWORD) {
    document.getElementById("adminArea").style.display = "block";
  } else {
    alert("パスワードが違います");
  }
}

function updateZaurus() {
  const data = getData();
  const img = document.getElementById("zaurus");
  const status = document.getElementById("status");

  if (!img) return;

  if (data.fatLevel >= 2) {
    img.src = "images/zaurus_fat.png";
    status.textContent = "たぷたぷざうるす";
  } else if (data.fatLevel <= -2) {
    img.src = "images/zaurus_thin.png";
    status.textContent = "ほそほそざうるす";
  } else {
    img.src = "images/zaurus_normal.png";
    status.textContent = "ふつうのざうるす";
  }
}

function pokeZaurus() {
  const audio = new Audio("sounds/poke.mp3");
  audio.volume = 0.5;
  audio.play();
}

updateZaurus();
