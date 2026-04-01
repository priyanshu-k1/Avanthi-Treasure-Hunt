const puzzles = {
  "1": {
    clue: "Where silence speaks louder than words and knowledge sleeps on shelves.",
    hint: "Books live here. Think study space.",
    solution: "l!brary@2021"
  },
  "2": {
    clue: "Ideas are presented where signals are strongest and future connects at high speed.",
    hint: "Think of presentations + fast internet.",
    solution: "$eminar@2021"
  },
  "3": {
    clue: "A place where minds gather to discuss, present, and learn.",
    hint: "Common hall for academic talks.",
    solution: "$eminar@2021"
  },
  "4": {
    clue: "Dreams meet opportunities and careers begin here.",
    hint: "Job-related activities happen here.",
    solution: "pl@cement@2021"
  },
  "5": {
    clue: "The highest authority sits here, where final decisions are made.",
    hint: "Head of the institution.",
    solution: "princip@l@2022"
  }
};

// ── URL Parameter Logic ────────────────────────────────────────
const urlParams = new URLSearchParams(window.location.search);
const puzzleId = urlParams.get('id'); // Looks for ?id=X in URL

let activePuzzle;

// If ID exists in our object, use it; otherwise, pick random
if (puzzleId && puzzles[puzzleId]) {
  activePuzzle = puzzles[puzzleId];
} else {
  const keys = Object.keys(puzzles);
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  activePuzzle = puzzles[randomKey];
}

// ── DOM refs ────────────────────────────────────────────────────
const puzzleStatusEl = document.getElementById("puzzleStatus");
const clueTextEl = document.getElementById("clueText");
const hintToggle = document.getElementById("hintToggle");
const hintTextEl = document.getElementById("hintText");
const answerInput = document.getElementById("answerInput");
const submitBtn = document.getElementById("submitBtn");
const feedbackEl = document.getElementById("feedback");
const confettiContainer = document.getElementById("confetti");

// ── Render hint ─────────────────────────────────────────────────
hintTextEl.textContent ="Think in terms of connectivity credentials. " +activePuzzle.hint ;

// ── Typewriter effect for clue ───────────────────────────────────
function typewrite(el, text, speed = 28) {
  el.textContent = "";
  el.classList.add("typing");
  let i = 0;
  const tick = () => {
    if (i < text.length) {
      el.textContent += text[i++];
      setTimeout(tick, speed);
    } else {
      el.classList.remove("typing");
    }
  };
  setTimeout(tick, 400);
}

typewrite(clueTextEl,"This word has two parts: 1)" + activePuzzle.clue + "2)The past is always attached at the end.");

// ── Hint toggle ──────────────────────────────────────────────────
hintToggle.addEventListener("click", () => {
  const expanded = hintToggle.getAttribute("aria-expanded") === "true";
  hintToggle.setAttribute("aria-expanded", String(!expanded));
  if (expanded) {
    hintTextEl.hidden = true;
    hintToggle.innerHTML = "<span>⚡</span> Reveal Hint";
  } else {
    hintTextEl.hidden = false;
    hintToggle.innerHTML = "<span>⚡</span> Hide Hint";
  }
});

// ── Answer checking ──────────────────────────────────────────────
function checkAnswer() {
  const userAnswer = answerInput.value.trim().toLowerCase();
  const correctSolution = activePuzzle.solution.toLowerCase();

  if (!userAnswer) {
    showFeedback("error", "✦ Please type an answer before submitting.");
    return;
  }

  if (userAnswer === correctSolution) {
    showFeedback(
      "success",
      "🎉 Congratulations! You solved the puzzle!" +
      `<span class="contact-line">📞 Contact Mr. Gangadhar for further assistance (Office)</span>`
    );
    puzzleStatusEl.textContent = "SOLVED ✓";
    puzzleStatusEl.classList.add("solved");
    submitBtn.disabled = true;
    answerInput.disabled = true;
    launchConfetti();
  } else {
    showFeedback("error", "✦ Incorrect. Re-read the clue carefully.");
    shake(answerInput);
  }
}

function showFeedback(type, html) {
  feedbackEl.className = `feedback show ${type}`;
  feedbackEl.innerHTML = html;
}

function shake(el) {
  el.style.animation = "none";
  void el.offsetHeight; 
  el.style.animation = "shake 0.4s ease";
}

// ── Event listeners ──────────────────────────────────────────────
submitBtn.addEventListener("click", checkAnswer);
answerInput.addEventListener("keydown", e => {
  if (e.key === "Enter") checkAnswer();
});

// ── Confetti ─────────────────────────────────────────────────────
function launchConfetti() {
  const colors = ["#00e6c8", "#3d7fff", "#ffffff", "#7efff5", "#a78bfa", "#fbbf24"];
  confettiContainer.innerHTML = "";

  for (let i = 0; i < 90; i++) {
    const el = document.createElement("div");
    el.className = "cp";
    const size = Math.random() * 9 + 5;
    el.style.cssText = `
      left: ${Math.random() * 100}vw;
      width: ${size}px;
      height: ${size * (Math.random() < 0.5 ? 1 : 0.4)}px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      animation-duration: ${Math.random() * 2.5 + 2}s;
      animation-delay: ${Math.random() * 1.2}s;
      border-radius: ${Math.random() < 0.4 ? "50%" : "3px"};
    `;
    confettiContainer.appendChild(el);
  }

  setTimeout(() => { confettiContainer.innerHTML = ""; }, 5500);
}
