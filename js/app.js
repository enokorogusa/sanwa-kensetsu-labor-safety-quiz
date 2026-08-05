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

  const params = new URLSearchParams(window.location.search);
  const setKey = params.get("set") === "injury" ? "injury" : "death";

  const SET_INFO = {
    death: {
      title: "死亡者数編",
      desc: "労働災害の「死亡者数」が多い事故の型を中心に出題しています。",
      questions: window.QUESTIONS_DEATH || []
    },
    injury: {
      title: "傷病者数編",
      desc: "「休業4日以上の死傷者数」が多い事故の型を中心に出題しています。",
      questions: window.QUESTIONS_INJURY || []
    }
  };

  const current = SET_INFO[setKey];
  document.getElementById("setTitle").textContent = current.title;
  document.getElementById("setDesc").textContent = current.desc;

  const questions = shuffle(current.questions).slice(0, QUESTIONS_PER_ROUND);
  let index = 0;
  let score = 0;
  let answered = false;

  const quizArea = document.getElementById("quizArea");
  const finishScreen = document.getElementById("finishScreen");
  const progressFill = document.getElementById("progressFill");
  const progressLabel = document.getElementById("progressLabel");
  const categoryTag = document.getElementById("categoryTag");
  const questionImage = document.getElementById("questionImage");
  const questionText = document.getElementById("questionText");
  const categoryImages = window.CATEGORY_IMAGES || {};
  const choicesEl = document.getElementById("choices");
  const resultPanel = document.getElementById("resultPanel");
  const judgeText = document.getElementById("judgeText");
  const explanationText = document.getElementById("explanationText");
  const sourceNote = document.getElementById("sourceNote");
  const nextBtn = document.getElementById("nextBtn");

  function renderQuestion() {
    answered = false;
    resultPanel.classList.remove("show");

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

    const imageSrc = categoryImages[q.category];
    if (imageSrc) {
      questionImage.src = imageSrc;
      questionImage.alt = q.category + "のイメージ図";
      questionImage.style.display = "block";
    } else {
      questionImage.removeAttribute("src");
      questionImage.style.display = "none";
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
    const buttons = choicesEl.querySelectorAll(".choice-btn");
    buttons.forEach(function (b) { b.disabled = true; });

    const isCorrect = i === q.answerIndex;
    if (isCorrect) score++;

    buttons[q.answerIndex].classList.add("correct");
    if (!isCorrect) {
      buttons[i].classList.add("wrong");
    }

    judgeText.textContent = isCorrect ? "○ 正解！" : "× 不正解";
    judgeText.className = "judge " + (isCorrect ? "correct-text" : "wrong-text");
    explanationText.textContent = q.explanation || "";
    sourceNote.textContent = q.source ? ("出典：" + q.source) : "";

    resultPanel.classList.add("show");
    nextBtn.textContent = (index === questions.length - 1) ? "結果を見る" : "次の問題へ";
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
