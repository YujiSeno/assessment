'use strict';
const userNameInput = document.getElementById('user-name');
const dawButtont = document.getElementById('daw');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

/**
 * 指定した要素の子どもをすべて除去する
 * @param {HTMLElement} element HTMLの要素
 */

function removeAllChildren(element) {
    while (element.firstChild) {
    // 子どもの要素がある限り削除
        element.removeChild(element.firstChild);
    }
}

dawButtont.onclick = () => {
    const userName = userNameInput.value;
    if (userName.length === 0) {
        // 名前が空の時は処理を終了する
        return;
    }

    userNameInput.onkeydown = event => {
        if (event.key === 'Enter') {
            dawButtont.onclick();
        }
    };

    // 診断結果表示エリアの作成
    removeAllChildren(resultDivided);
    const header = document.createElement('h3');
    header.innerText = '診断結果';
    resultDivided.appendChild(header);

    const paragraph = document.createElement('p');
    const result = daw(userName);
    paragraph.innerText = result;
    resultDivided.appendChild(paragraph);

    // ツイートエリアの作成
    removeAllChildren(tweetDivided);
    const anchor = document.createElement('a');
    const hrefValue = 
    'https://twitter.com/intent/tweet?button_hashtag=' +
    encodeURIComponent('あなたへのオススメDAW') +
    '&ref_src=twsrc%5Etfw';
    anchor.setAttribute('href', hrefValue);
    anchor.className = 'twitter-hashtag-button';
    anchor.setAttribute('data-text', result);
    anchor.innerText = 'Tweet #あなたへのオススメDAW';
    tweetDivided.appendChild(anchor);

    // widgets.jsの設定
    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    tweetDivided.appendChild(script);
};

const answers = [
  '{userName}へのオススメDAWは「Ableton Live」です。悩む前にノリを信じて行動をしてしまう{userName}にピッタリでしょう。',
  '{userName}へのオススメDAWは「Avid ProTools」です。細々した作業が苦手で、とにかく音を奏でたい{userName}にピッタリでしょう。',
  '{userName}へのオススメDAWは「ImageLine FL Studio」です。やれば出来るけど、その時々のモチベーションで行動する{userName}にピッタリでしょう。',
  '{userName}へのオススメDAWは「Steinberg Cubase」です。几帳面で、自分が出来ることは全てこなそうとする完璧主義の{userName}にピッタリでしょう。',
  '{userName}へのオススメDAWは「Tascam Sonar」です。一見平凡に見られがちだけど、秘めたる野望を持つ{userName}にピッタリでしょう。',
  '{userName}へのオススメDAWは「Apple Logic」です。自分の感性やセンスを何よりも大切にする芸術家志向の{userName}にピッタリでしょう。',
  '{userName}へのオススメDAWは「PreSonus StudioOne」です。賢さとお茶目さの二面性を持つハイブリッドな{userName}にピッタリでしょう。',
  '{userName}へのオススメDAWは「Bitwig Studio」です。目新しいものに対して興味があり、直感性を信じて生きている{userName}にピッタリでしょう。',
  '{userName}へのオススメDAWは「MOTU Digital Performer」です。どんなに険しき道でも自分の信念を曲げない{userName}にピッタリでしょう。',
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザーの名前
 * @return {string} 診断結果
 */
function daw(userName) {
  // 全文字のコード番号を取得してそれを足し合わせる
  let sumOfCharCode = 0;
  for (let i = 0; i < userName.length; i++) {
    sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
  }

  // 文字のコード番号の合計を回答の数で割って添字の数値を求める
  const index = sumOfCharCode % answers.length;
  let result = answers[index];
  result = result.replace(/\{userName\}/g, userName)
  return result;
}
