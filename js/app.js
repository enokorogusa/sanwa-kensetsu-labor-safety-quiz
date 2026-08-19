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

  const params = new URLSearchParams(window.location.search);
  let step = params.get("step"); // null（新規開始） | "next"（次の問題） | "finish"（結果表示）

  function startNewRound() {
    const allQuestions = window.QUESTIONS || [];
    const ids = shuffle(allQuestions).slice(0, QUESTIONS_PER_ROUND).map(function (q) { return q.id; });
    const state = { ids: ids, index: 0, score: 0 };
    window.QuizStorage.save(state);
    return state;
  }

  let state = window.QuizStorage.load();

  if (step === "next" && state) {
    state.index++;
    window.QuizStorage.save(state);
  } else if (step === "finish" && state) {
    // 保存済みのスコアをそのまま結果表示に使う
  } else if (!step) {
    state = startNewRound();
  } else {
    // sessionStorageが失われている等の想定外のケースは新規開始扱いにする
    state = startNewRound();
    step = null;
  }

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

  function findQuestion(id) {
    return (window.QUESTIONS || []).find(function (q) { return q.id === id; });
  }

  function renderQuestion() {
    if (!state.ids.length) {
      questionText.textContent = "この出題セットの問題データがまだ登録されていません。";
      choicesEl.innerHTML = "";
      progressLabel.textContent = "";
      progressFill.style.width = "0%";
      return;
    }

    const q = findQuestion(state.ids[state.index]);
    progressFill.style.width = Math.round((state.index / state.ids.length) * 100) + "%";
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

    questionText.textContent = q.question;

    choicesEl.innerHTML = "";
    q.choices.forEach(function (choice, i) {
      const btn = document.createElement("button");
      btn.className = "choice-btn";
      btn.textContent = ["①", "②", "③", "④", "⑤"][i] + "　" + choice;
      btn.addEventListener("click", function () { selectAnswer(i, q); });
      choicesEl.appendChild(btn);
    });
  }

  function selectAnswer(i, q) {
    const isCorrect = i === q.answerIndex;
    if (isCorrect) state.score++;
    state.lastChoiceIndex = i;
    state.lastCorrect = isCorrect;
    window.QuizStorage.save(state);
    window.location.href = "answer.html";
  }

  function showFinish() {
    quizArea.style.display = "none";
    finishScreen.style.display = "block";
    document.getElementById("finalScore").textContent = state.score + " / " + state.ids.length + "問正解";
  }

  if (step === "finish") {
    showFinish();
  } else {
    renderQuestion();
    window.scrollTo(0, 0);
  }
})();
