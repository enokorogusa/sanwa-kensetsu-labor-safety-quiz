(function () {
  document.getElementById("setTitle").textContent = "建設現場の労働災害クイズ【レビュー用】";
  document.getElementById("setDesc").textContent = "全50問を作成順（Q1〜Q50）にすべて表示します。上司確認・修正指示用のビルドです。";

  const questions = window.QUESTIONS || [];
  let index = 0;
  let score = 0;
  let answered = false;

  const quizArea = document.getElementById("quizArea");
  const finishScreen = document.getElementById("finishScreen");
  const progressFill = document.getElementById("progressFill");
  const progressLabel = document.getElementById("progressLabel");
  const questionNumberTag = document.getElementById("questionNumberTag");
  const categoryTag = document.getElementById("categoryTag");
  const questionImage = document.getElementById("questionImage");
  const imageCredit = document.getElementById("imageCredit");
  const questionText = document.getElementById("questionText");
  const categoryImages = window.CATEGORY_IMAGES || {};
  const imageSourceLabel = window.CATEGORY_IMAGE_SOURCE_LABEL || "";
  const imageAccessedOn = window.CATEGORY_IMAGE_ACCESSED_ON || "";
  const choicesEl = document.getElementById("choices");
  const questionView = document.getElementById("questionView");
  const answerView = document.getElementById("answerView");
  const questionRecap = document.getElementById("questionRecap");
  const judgeBanner = document.getElementById("judgeBanner");
  const answerSummary = document.getElementById("answerSummary");
  const explanationText = document.getElementById("explanationText");
  const sourceNote = document.getElementById("sourceNote");
  const nextBtn = document.getElementById("nextBtn");
  const mascotImage = document.getElementById("mascotImage");

  const MASCOT_CORRECT = "ミチハロ君奈良観光中.png";
  const MASCOT_WRONG = "回答ミチハロ君 (002).png";

  function renderQuestion() {
    answered = false;
    questionView.style.display = "block";
    answerView.style.display = "none";
    window.scrollTo(0, 0);

    if (questions.length === 0) {
      questionText.textContent = "この出題セットの問題データがまだ登録されていません。";
      choicesEl.innerHTML = "";
      progressLabel.textContent = "";
      progressFill.style.width = "0%";
      return;
    }

    const q = questions[index];
    progressFill.style.width = Math.round((index / questions.length) * 100) + "%";
    progressLabel.textContent = "Q" + (index + 1) + " / " + questions.length;
    questionNumberTag.textContent = "Q" + (index + 1);
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

    questionText.textContent = q.question;

    choicesEl.innerHTML = "";
    q.choices.forEach(function (choice, i) {
      const btn = document.createElement("button");
      btn.className = "choice-btn";
      btn.textContent = choice;
      btn.addEventListener("click", function () { selectAnswer(i); });
      choicesEl.appendChild(btn);
    });
  }

  function selectAnswer(i) {
    if (answered) return;
    answered = true;
    const q = questions[index];

    const isCorrect = i === q.answerIndex;
    if (isCorrect) score++;

    questionRecap.textContent = q.question;

    judgeBanner.textContent = isCorrect ? "○ 正解！" : "× 不正解";
    judgeBanner.className = "judge-banner " + (isCorrect ? "correct" : "wrong");

    mascotImage.src = isCorrect ? MASCOT_CORRECT : MASCOT_WRONG;
    mascotImage.alt = isCorrect ? "ミチハロくん（正解）" : "ミチハロくん（不正解）";

    if (isCorrect) {
      answerSummary.innerHTML = "";
      const correctLine = document.createElement("p");
      correctLine.className = "answer-correct";
      correctLine.textContent = "正解：" + q.choices[q.answerIndex];
      answerSummary.appendChild(correctLine);
    } else {
      answerSummary.innerHTML = "";
      const yourLine = document.createElement("p");
      yourLine.className = "answer-yours";
      yourLine.textContent = "あなたの回答：" + q.choices[i];
      const correctLine = document.createElement("p");
      correctLine.className = "answer-correct";
      correctLine.textContent = "正解：" + q.choices[q.answerIndex];
      answerSummary.appendChild(yourLine);
      answerSummary.appendChild(correctLine);
    }

    explanationText.textContent = q.explanation || "";
    sourceNote.textContent = q.source ? ("出典：" + q.source) : "";

    nextBtn.textContent = (index === questions.length - 1) ? "結果を見る" : "次の問題へ";

    questionView.style.display = "none";
    answerView.style.display = "block";
    window.scrollTo(0, 0);
  }

  function goNext() {
    if (index < questions.length - 1) {
      index++;
      renderQuestion();
    } else {
      showFinish();
    }
  }

  function showFinish() {
    quizArea.style.display = "none";
    finishScreen.style.display = "block";
    document.getElementById("finalScore").textContent = score + " / " + questions.length + "問正解";
  }

  nextBtn.addEventListener("click", goNext);

  renderQuestion();
})();
