const STEP_TO_MIN = 1 / 100;
const BASE_MIN = 60;
const ADMIN_PASSWORD = "password"; // 好きな文字に変えてOK

// ==========================
// データ管理
// ==========================
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
  updateZaurus();
}

// ==========================
// 管理者ログイン
// ==========================
function login() {
  const pw = document.getElementById("password").value;
  if (pw === ADMIN_PASSWORD) {
    document.getElementById("adminArea").style.display = "block";
  } else {
    alert("パスワードが違います");
  }
}

// ==========================
// 体型ベース取得
// ==========================
function getBaseImage() {
  const data = getData();

  if (data.fatLevel >= 2) {
    return { src: "images/zaurus_fat.png", text: "たぷたぷざうるす" };
  } else if (data.fatLevel <= -2) {
    return { src: "images/zaurus_thin.png", text: "ほそほそざうるす" };
  } else {
    return { src: "images/zaurus_normal.png", text: "ふつうのざうるす" };
  }
}

// ==========================
// 表示更新
// ==========================
function updateZaurus() {
  const img = document.getElementById("zaurus");
  const status = document.getElementById("status");
  if (!img) return;

  const base = getBaseImage();
  img.src = base.src;
  status.textContent = base.text;
}

// ==========================
// 触りリアクション
// ==========================
let touchCount = 0;
let touchTimer = null;

function pokeZaurus() {
  const img = document.getElementById("zaurus");
  const status = document.getElementById("status");
  if (!img) return;

  // 音再生
  const audio = new Audio("sounds/poke.mp3");
  audio.volume = 0.5;
  audio.play();

  touchCount++;

  if (touchCount === 1) {
    img.src = "images/zaurus_touch1.png";
    status.textContent = "むっ…";
  }

  if (touchCount >= 5) {
    img.src = "images/zaurus_touch2.png";
    status.textContent = "さわりすぎ！！";
  }

  // 3秒放置で元に戻る
  clearTimeout(touchTimer);
  touchTimer = setTimeout(() => {
    touchCount = 0;
    updateZaurus();
  }, 3000);
}

// ==========================
// 初期表示
// ==========================
updateZaurus();
