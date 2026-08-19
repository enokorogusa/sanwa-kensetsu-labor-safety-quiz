(function () {
  document.getElementById("setTitle").textContent = "建設現場の労働災害クイズ";
  document.getElementById("setDesc").textContent = "回答結果";

  const state = window.QuizStorage.load();

  // 直前に回答した記録がない場合（URLを直接開いた等）はクイズの最初に戻す
  if (!state || !state.ids || !state.ids.length || state.lastChoiceIndex === undefined || state.lastChoiceIndex === null) {
    window.location.href = "quiz.html";
    return;
  }

  const q = (window.QUESTIONS || []).find(function (item) { return item.id === state.ids[state.index]; });
  if (!q) {
    window.location.href = "quiz.html";
    return;
  }

  const categoryImages = window.CATEGORY_IMAGES || {};
  const imageSourceLabel = window.CATEGORY_IMAGE_SOURCE_LABEL || "";
  const imageAccessedOn = window.CATEGORY_IMAGE_ACCESSED_ON || "";

  const progressFill = document.getElementById("progressFill");
  const progressLabel = document.getElementById("progressLabel");
  const categoryTag = document.getElementById("categoryTag");
  const questionImage = document.getElementById("questionImage");
  const imageCredit = document.getElementById("imageCredit");
  const questionRecap = document.getElementById("questionRecap");
  const judgeBanner = document.getElementById("judgeBanner");
  const answerSummary = document.getElementById("answerSummary");
  const explanationText = document.getElementById("explanationText");
  const sourceNote = document.getElementById("sourceNote");
  const nextBtn = document.getElementById("nextBtn");
  const mascotImage = document.getElementById("mascotImage");

  const MASCOT_CORRECT = "ミチハロ君奈良観光中.png";
  const MASCOT_WRONG = "回答ミチハロ君 (002).png";

  progressFill.style.width = Math.round(((state.index + 1) / state.ids.length) * 100) + "%";
  progressLabel.textContent = (state.index + 1) + " / " + state.ids.length + "問";
  categoryTag.textContent = q.category || "";

  const imageInfo = categoryImages[q.category];
  if (imageInfo && imageInfo.path) {
    questionImage.src = imageInfo.path;
    questionImage.alt = imageInfo.sourceTitle || (q.category + "のイメージ図");
    questionImage.style.display = "block";

    imageCredit.innerHTML = "";
    const label = document.createTextNode((imageSourceLabel || "") + "　");
    imageCredit.appendChild(label);
    if (imageInfo.sourceUrl) {
      const link = document.createElement("a");
      link.href = imageInfo.sourceUrl;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = imageInfo.sourceUrl;
      imageCredit.appendChild(link);
    }
    if (imageAccessedOn) {
      imageCredit.appendChild(document.createTextNode("（" + imageAccessedOn + "）"));
    }
    imageCredit.style.display = "block";
  } else {
    questionImage.removeAttribute("src");
    questionImage.style.display = "none";
    imageCredit.style.display = "none";
    imageCredit.textContent = "";
  }

  questionRecap.textContent = q.question;

  const isCorrect = state.lastCorrect;
  judgeBanner.textContent = isCorrect ? "○ 正解！" : "× 不正解";
  judgeBanner.className = "judge-banner " + (isCorrect ? "correct" : "wrong");

  mascotImage.src = isCorrect ? MASCOT_CORRECT : MASCOT_WRONG;
  mascotImage.alt = isCorrect ? "ミチハロくん（正解）" : "ミチハロくん（不正解）";

  answerSummary.innerHTML = "";
  if (!isCorrect) {
    const yourLine = document.createElement("p");
    yourLine.className = "answer-yours";
    yourLine.textContent = "あなたの回答：" + q.choices[state.lastChoiceIndex];
    answerSummary.appendChild(yourLine);
  }
  const correctLine = document.createElement("p");
  correctLine.className = "answer-correct";
  correctLine.textContent = "正解：" + q.choices[q.answerIndex];
  answerSummary.appendChild(correctLine);

  explanationText.textContent = q.explanation || "";
  sourceNote.textContent = q.source ? ("出典：" + q.source) : "";

  const isLast = state.index === state.ids.length - 1;
  nextBtn.textContent = isLast ? "結果を見る" : "次の問題へ";

  nextBtn.addEventListener("click", function () {
    window.location.href = isLast ? "quiz.html?step=finish" : "quiz.html?step=next";
  });

  window.scrollTo(0, 0);
})();
