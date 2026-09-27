// --- LOGIC NHẬP MẬT KHẨU (Mật mã: 020409) ---
const CORRECT_PASS = "020409";
let enteredPass = "";

function updatePassDisplay() {
  const display = document.getElementById("passDisplay");
  const errorMsg = document.getElementById("passError");
  if (!display) return;

  if (enteredPass.length === 0) {
    display.innerText = "_ _ _ _ _ _";
  } else {
    // Hiển thị số lượng dấu sao tương ứng với số ký tự đã nhập, phần còn lại giữ dấu gạch
    let hiddenText = "";
    for (let i = 0; i < enteredPass.length; i++) {
      hiddenText += "● ";
    }
    for (let i = enteredPass.length; i < 6; i++) {
      hiddenText += "_ ";
    }
    display.innerText = hiddenText.trim();
  }
  if (errorMsg) errorMsg.innerText = "";
}

function pressKey(num) {
  if (enteredPass.length < 6) {
    enteredPass += num;
    updatePassDisplay();
  }
}

function clearPass() {
  enteredPass = enteredPass.slice(0, -1);
  updatePassDisplay();
}

function submitPass() {
  const errorMsg = document.getElementById("passError");
  const passwordScreen = document.getElementById("passwordScreen");

  if (enteredPass === CORRECT_PASS) {
    // Đúng mật khẩu -> Ẩn màn hình nhập mã, mở khóa website
    if (passwordScreen) {
      passwordScreen.classList.add("hidden");
    }
  } else {
    // Sai mật khẩu -> Báo lỗi và reset
    if (errorMsg) {
      errorMsg.innerText = "Mật khẩu chưa đúng rồi, thử lại nhé! ❌";
    }
    enteredPass = "";
    setTimeout(updatePassDisplay, 800);
  }
}
// Hàm chuyển trang tổng quát
function goToPage(pageNumber) {
  const pages = document.querySelectorAll(".page");
  pages.forEach((page) => page.classList.remove("active"));

  const targetPage = document.getElementById(`page-${pageNumber}`);
  if (targetPage) {
    targetPage.classList.add("active");
  }

  const bgAudio = document.getElementById("bgAudio");
  const musicWidget = document.getElementById("musicWidget");
  const statusText = document.getElementById("musicStatusText");

  if (pageNumber === 5 && bgAudio && bgAudio.paused) {
    bgAudio
      .play()
      .then(() => {
        if (musicWidget) musicWidget.classList.add("playing");
        if (statusText) statusText.innerText = "Đang phát chill";
      })
      .catch((error) => {
        console.log("Autoplay bị chặn bởi trình duyệt:", error);
      });
  }
}

// Hàm Bật / Tắt nhạc khi click vào widget góc phải màn hình
function toggleBackgroundMusic() {
  const bgAudio = document.getElementById("bgAudio");
  const musicWidget = document.getElementById("musicWidget");
  const statusText = document.getElementById("musicStatusText");

  if (!bgAudio) return;

  if (bgAudio.paused) {
    bgAudio
      .play()
      .then(() => {
        musicWidget.classList.add("playing");
        statusText.innerText = "Đang phát chill";
      })
      .catch((error) => {
        alert(
          "Trình duyệt cần bạn tương tác click trên trang trước khi phát nhạc nhé!"
        );
      });
  } else {
    bgAudio.pause();
    musicWidget.classList.remove("playing");
    statusText.innerText = "Đã dừng nhạc";
  }
}

// Gắn sự kiện khi tải trang xong
document.addEventListener("DOMContentLoaded", () => {
  const btnTo2 = document.getElementById("btn-to-2");
  const btnTo3 = document.getElementById("btn-to-3");
  const btnTo4 = document.getElementById("btn-to-4");
  const btnTo5 = document.getElementById("btn-to-5");
  const btnTo6 = document.getElementById("btn-to-6"); // Thêm nút chuyển sang trang 6
  const btnTo1 = document.getElementById("btn-to-1");
  const envelope = document.getElementById("envelope-click");

  if (btnTo2) btnTo2.addEventListener("click", () => goToPage(2));
  if (btnTo3) btnTo3.addEventListener("click", () => goToPage(3));
  if (btnTo4) btnTo4.addEventListener("click", () => goToPage(4));
  if (btnTo5) btnTo5.addEventListener("click", () => goToPage(5));
  if (btnTo6) btnTo6.addEventListener("click", () => goToPage(6)); // Lắng nghe sự kiện trang 6
  if (btnTo1) btnTo1.addEventListener("click", () => goToPage(1));
  if (envelope) envelope.addEventListener("click", () => goToPage(5));

  createFloatingBackgroundElements();
});

// --- HÀM MỞ MODAL XEM ẢNH KÈM GHI CHÚ RIÊNG ---
function openModal(imgSrc, captionText) {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImg");
  const modalMsg = document.getElementById("modalMsg");

  if (modal && modalImg && modalMsg) {
      modal.style.display = "flex";
      modalImg.src = imgSrc;
      modalMsg.innerText = captionText; // Hiển thị đúng ghi chú riêng của ảnh đó
  }
}

function closeModal() {
  const modal = document.getElementById("imageModal");
  if (modal) {
      modal.style.display = "none";
  }
}

// Đóng Modal
function closeModal() {
  const modal = document.getElementById("imageModal");
  if (modal) {
    modal.style.display = "none";
  }
}

// Hiệu ứng background: Trái tim và 3 Ảnh cắt nền xoay trôi ngẫu nhiên
function createFloatingBackgroundElements() {
  const container = document.getElementById("heartContainer");
  if (!container) return;

  const heartSymbols = ["💙", "🤍", "💖", "🩵", "💜"];
  const stickerImages = [
    "ANH/nhan_vat1.png",
    "ANH/nhan_vat2.png",
    "ANH/nhan_vat3.png",
  ];

  setInterval(() => {
    if (Math.random() < 0.7) {
      const heart = document.createElement("div");
      heart.classList.add("floating-heart");
      heart.innerText =
        heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
      heart.style.left = Math.random() * 100 + "vw";

      const size = Math.random() * 16 + 18;
      heart.style.fontSize = size + "px";

      const duration = Math.random() * 2.5 + 3.5;
      heart.style.animationDuration = duration + "s";

      container.appendChild(heart);
      setTimeout(() => heart.remove(), duration * 1000);
    } else {
      const sticker = document.createElement("img");
      sticker.classList.add("floating-sticker");

      const randomSticker =
        stickerImages[Math.floor(Math.random() * stickerImages.length)];
      sticker.src = randomSticker;

      sticker.style.left = Math.random() * 85 + "vw";

      const duration = Math.random() * 3 + 6;
      sticker.style.animationDuration = duration + "s";

      container.appendChild(sticker);
      setTimeout(() => sticker.remove(), duration * 1000);
    }
  }, 300);
}

// --- LOGIC ĐẾM NGƯỢC ĐẾN 0H00 NGÀY 29/09 (Định dạng [HH:MM:SS]) ---
const currentYear = new Date().getFullYear();
const targetDate = new Date(`September 29, ${currentYear} 00:00:00`).getTime();

const countdownTimer = document.getElementById("countdownTimer");
const countdownScreen = document.getElementById("countdownScreen");

function updateCountdown() {
  const now = new Date().getTime();
  const distance = targetDate - now;

  if (distance <= 0) {
    // Đã đến hoặc qua thời gian 29/09 -> Ẩn màn hình đếm ngược, mở web
    if (countdownScreen) {
      countdownScreen.classList.add("hidden");
    }
    return;
  }

  // Tính tổng số giờ (bao gồm cả số ngày nhân lên thành giờ), phút, giây
  const totalHours = Math.floor(distance / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Hàm phụ trợ để đảm bảo luôn có đủ 2 chữ số (ví dụ: 09 thay vì 9)
  const formatTime = (num) => String(num).padStart(2, "0");

  // Ghép chuỗi đúng định dạng [HH:MM:SS] (Ví dụ: [48:30:15])
  const timeString = `[${formatTime(totalHours)}:${formatTime(
    minutes
  )}:${formatTime(seconds)}]`;

  if (countdownTimer) {
    countdownTimer.innerText = timeString;
  }
}

// Chạy ngay lập tức và cập nhật mỗi giây
updateCountdown();
setInterval(updateCountdown, 1000);
