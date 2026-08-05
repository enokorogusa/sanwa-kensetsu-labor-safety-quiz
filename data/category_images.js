// 事故の型（カテゴリ）ごとのイラストのマッピング
//
// 厚生労働省「職場のあんぜんサイト ヒヤリ・ハット事例」（https://anzeninfo.mhlw.go.jp/hiyari/anrdh00.html）に
// 掲載されている実際のイラストを、各カテゴリ1枚ずつ、加工せずそのまま使用しています。
// 「特記のないコンテンツは政府標準利用規約（PDL1.0）に基づき、出典を明記のうえ利用可能」という
// 厚生労働省の方針（https://www.mhlw.go.jp/chosakuken/）に基づき、各画像には個別ページのURLを出典として明記しています。
// 三和建設・本クイズを厚生労働省が推奨・監修しているものではありません。
//
// 画像を差し替えたい場合は、このファイルの path を書き換えるだけでよい（各問題データを直接編集する必要はない）。
window.CATEGORY_IMAGES = {
  "墜落・転落": {
    path: "assets/illustrations_mhlw/tsuiraku_tenraku.gif",
    sourceTitle: "足場の組立工事で足場上を歩行中、足場板のツメが破損して板が傾き、バランスを崩して転落しそうになった",
    sourceUrl: "https://anzeninfo.mhlw.go.jp/hiyari/hiy_0398.html"
  },
  "崩壊・倒壊": {
    path: "assets/illustrations_mhlw/houkai_toukai.gif",
    sourceTitle: "地山が崩壊したので、慌てて逃げた",
    sourceUrl: "https://anzeninfo.mhlw.go.jp/hiyari/hiy_0151.html"
  },
  "はさまれ・巻き込まれ": {
    path: "assets/illustrations_mhlw/hasamare_makikomare.gif",
    sourceTitle: "車両系建設機械のアタッチメントを交換していたところ、シリンダーとアタッチメントの隙間に指を挟んでしまいそうになった",
    sourceUrl: "https://anzeninfo.mhlw.go.jp/hiyari/hiy_0342.html"
  },
  "激突され": {
    path: "assets/illustrations_mhlw/gekitotsu_sare.gif",
    sourceTitle: "クレーン作業中につり荷が作業者に激突しそうになった",
    sourceUrl: "https://anzeninfo.mhlw.go.jp/hiyari/hiy_0267.html"
  },
  "交通事故（道路）": {
    path: "assets/illustrations_mhlw/koutsu_jiko_douro.jpg",
    sourceTitle: "工事車両の誘導待機中に、すでに動き出していた工事車両と接触しそうになった",
    sourceUrl: "https://anzeninfo.mhlw.go.jp/hiyari/hiy_0455.html"
  },
  "飛来・落下": {
    path: "assets/illustrations_mhlw/hirai_rakka.gif",
    sourceTitle: "工事現場の足場解体中、足場材が落下し、歩行者にぶつかりそうになった",
    sourceUrl: "https://anzeninfo.mhlw.go.jp/hiyari/hiy_0434.html"
  },
  "高温・低温物との接触": {
    path: "assets/illustrations_mhlw/kouon_teion_sesshoku.gif",
    sourceTitle: "橋げたの剥離剤拭き取り作業中、足場上のシンナー缶が倒れ、シンナーが照明器具に垂れ落ちて着火し、火傷しそうになった",
    sourceUrl: "https://anzeninfo.mhlw.go.jp/hiyari/hiy_0396.html"
  },
  "感電": {
    path: "assets/illustrations_mhlw/kanden.gif",
    sourceTitle: "受電設備内で作業中、充電部に工具を落としヒヤッとした",
    sourceUrl: "https://anzeninfo.mhlw.go.jp/hiyari/hiy_0152.html"
  },
  "転倒": {
    path: "assets/illustrations_mhlw/tentou.gif",
    sourceTitle: "クレーンで足場用鋼管を搬送中、転倒しそうになった",
    sourceUrl: "https://anzeninfo.mhlw.go.jp/hiyari/hiy_0286.html"
  },
  "おぼれ": {
    path: "assets/illustrations_mhlw/oborreru.jpg",
    sourceTitle: "下水道の補修工事中に、大量の水が流れてきて流されそうになった",
    sourceUrl: "https://anzeninfo.mhlw.go.jp/hiyari/hiy_0463.html"
  },
  "切れ・こすれ": {
    path: "assets/illustrations_mhlw/kire_kosure.gif",
    sourceTitle: "電動鋸を使用して木材板を切断中、指を切断しそうになった",
    sourceUrl: "https://anzeninfo.mhlw.go.jp/hiyari/hiy_0076.html"
  },
  "動作の反動・無理な動作": {
    path: "assets/illustrations_mhlw/dousano_handou_muri.gif",
    sourceTitle: "ガスボンベを階段に引上げようとしたところ、腰に違和感があった",
    sourceUrl: "https://anzeninfo.mhlw.go.jp/hiyari/hiy_0089.html"
  },
  "激突": {
    path: "assets/illustrations_mhlw/gekitotsu.gif",
    sourceTitle: "バックで人をひきそうになった",
    sourceUrl: "https://anzeninfo.mhlw.go.jp/hiyari/hiy_0272.html"
  },
  "踏み抜き": {
    path: "assets/illustrations_mhlw/fuminuki.gif",
    sourceTitle: "波形スレート屋根を踏み抜き、コンクリート床に転落しそうになった",
    sourceUrl: "https://anzeninfo.mhlw.go.jp/hiyari/hiy_0362.html"
  }
};

// 画像の出典（共通）
window.CATEGORY_IMAGE_SOURCE_LABEL = "厚生労働省「職場のあんぜんサイト ヒヤリ・ハット事例」";
window.CATEGORY_IMAGE_ACCESSED_ON = "2026年8月6日利用";
