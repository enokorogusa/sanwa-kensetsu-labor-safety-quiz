// クイズの進行状態（出題ID・現在の問題番号・スコア・直前の回答）をページ間で引き継ぐための保存領域
window.QuizStorage = (function () {
  const KEY = "sanwaQuizState";

  return {
    load: function () {
      try {
        return JSON.parse(sessionStorage.getItem(KEY));
      } catch (e) {
        return null;
      }
    },
    save: function (state) {
      sessionStorage.setItem(KEY, JSON.stringify(state));
    },
    clear: function () {
      sessionStorage.removeItem(KEY);
    }
  };
})();
