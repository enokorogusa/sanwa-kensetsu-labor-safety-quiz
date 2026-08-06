(function () {
  const QUESTIONS_PER_ROUND = 3;

  function shuffle(array) {
    const result = array.slice();
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }

  document.getElementById("setTitle").textContent = "建設現場の労働災害クイズ";
  document.getElementById("setDesc").textContent = "労働災害の「死亡者数」「休業4日以上の死傷者数」がともに多い事故の型を中心に出題しています。";

  const questions = shuffle(window.QUESTIONS || []).slice(0, QUESTIONS_PER_ROUND);
  let index = 0;
  let score = 0;
  let answered = false;

  const quizArea = document.getElementById("quizArea");
  const finishScreen = document.getElementById("finishScreen");
  const progressFill = document.getElementById("progressFill");
  const progressLabel = document.getElementById("progressLabel");
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
    progressLabel.textContent = (index + 1) + " / " + questions.length + "問";
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
