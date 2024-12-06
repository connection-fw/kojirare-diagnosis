import React, { useState } from 'react';
import './App.css';

const validateEmail = (email) => {
  if (!email) return false;
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(String(email).toLowerCase());
};

const EmailForm = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateEmail(email)) {
      onSubmit(email);
      setError('');
    } else {
      setError('正しいメールアドレスを入力してください');
    }
  };

  return (
    <div className="email-form-container">
      <h2>診断結果をお届けします</h2>
      <p>メールアドレスをご登録ください</p>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="example@email.com"
          className="email-input"
          required
        />
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="submit-button">
          診断結果を受け取る
        </button>
      </form>
    </div>
  );
};

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const typeNames = {
    type1: "完璧主義の迷走家",
    type2: "アイデア迷子の夢見る起業家",
    type3: "ひとり戦士の孤独な挑戦者",
    type4: "自己評価低めの隠れ実力者",
    type5: "学び続けるだけの永遠の生徒",
    type6: "価格競争に巻き込まれた値下げマニア",
    type7: "情報過多の分析麻痺者",
    type8: "他人優先の自己犠牲家"
  };

  const typeDetails = {
    type1: {
      illustration: process.env.PUBLIC_URL + "/images/type1.jpg",
      traits: [
        "高い基準を持ち、自分にも他人にも厳しい",
        "細部まで注意を払い、完璧を目指す",
        "行動よりも計画や準備に時間をかけがち"
      ],
      quotes: [
        "まだ完璧じゃないから…",
        "もう少し準備が必要です",
        "このままでは納得できない"
      ],
      seminarUrl: "https://seminar-landing.com/type1"
    },
    type2: {
      illustration: process.env.PUBLIC_URL + "/images/type2.jpg",
      traits: [
        "好奇心旺盛で創造的な発想力がある",
        "次々と新しいアイデアを思いつく",
        "一つのことに集中できず、完了が難しい"
      ],
      quotes: [
        "新しいアイデアを思いついた！",
        "これも面白そうかも",
        "次はこれを試してみたい"
      ],
      seminarUrl: "https://seminar-landing.com/type2"
    },
    type3: {
      illustration: process.env.PUBLIC_URL + "/images/type3.jpg",
      traits: [
        "自立心が強く、責任感がある",
        "すべてを一人で抱え込みがち",
        "他人に頼ることを苦手とする"
      ],
      quotes: [
        "自分でやった方が早い",
        "人に頼るのは苦手で…",
        "誰にも迷惑をかけたくない"
      ],
      seminarUrl: "https://seminar-landing.com/type3"
    },
    type4: {
      illustration: process.env.PUBLIC_URL + "/images/type4.jpg",
      traits: [
        "実力はあるのに自信が持てない",
        "謙虚で慎ましい性格",
        "自分の価値を十分にアピールできない"
      ],
      quotes: [
        "まだまだ未熟です",
        "大したことないですよ",
        "他の人の方が上手くできます"
      ],
      seminarUrl: "https://seminar-landing.com/type4"
    },
    type5: {
      illustration: process.env.PUBLIC_URL + "/images/type5.jpg",
      traits: [
        "向上心が高く、勉強熱心",
        "知識を蓄えることに熱心",
        "学んだことを実践に移せない"
      ],
      quotes: [
        "もっと勉強しなきゃ",
        "このセミナーに参加したい",
        "資格を取ってから始めます"
      ],
      seminarUrl: "https://seminar-landing.com/type5"
    },
    type6: {
      illustration: process.env.PUBLIC_URL + "/images/type6.jpg",
      traits: [
        "お客様思いでサービス精神旺盛",
        "価格で勝負しようとする傾向",
        "自分の価値を低く見積もりがち"
      ],
      quotes: [
        "もっと安くしないと売れない",
        "お得感を出さなきゃ",
        "価格を下げればお客様が増えるはず"
      ],
      seminarUrl: "https://seminar-landing.com/type6"
    },
    type7: {
      illustration: process.env.PUBLIC_URL + "/images/type7.jpg",
      traits: [
        "調査能力が高く、知識豊富",
        "情報収集に熱心で分析力がある",
        "情報が多すぎて決断が遅れがち"
      ],
      quotes: [
        "もっと情報を集めなきゃ",
        "このデータも参考にしよう",
        "決める前にもう少し調べたい"
      ],
      seminarUrl: "https://seminar-landing.com/type7"
    },
    type8: {
      illustration: process.env.PUBLIC_URL + "/images/type8.jpg",
      traits: [
        "思いやりがあり、協調性が高い",
        "他人の要求を優先しがち",
        "自分のニーズを後回しにする"
      ],
      quotes: [
        "私でよければお手伝いします",
        "断るのは悪いから…",
        "自分のことは後で大丈夫です"
      ],
      seminarUrl: "https://seminar-landing.com/type8"
    }
  };

  const questions = [
    {
      text: "新しいサービスや商品を始める前の心境として、最も近いものはどれですか？",
      options: [
        { text: "完璧な準備が整うまで慎重に進めたい", score: { type1: 5, type7: 3 } },
        { text: "とりあえず始めて、改良していきたい", score: { type2: 5, type3: 2 } },
        { text: "自分一人でコントロールしたい", score: { type3: 5, type1: 3 } },
        { text: "もっと学習してから始めたい", score: { type5: 5, type4: 2 } }
      ]
    },
    {
      text: "価格設定をする際、最も重視することは？",
      options: [
        { text: "品質に見合った適正価格", score: { type1: 4, type4: 3 } },
        { text: "競合より安い価格設定", score: { type6: 5, type8: 2 } },
        { text: "市場調査に基づく価格", score: { type7: 4, type5: 3 } },
        { text: "お客様が喜ぶ価格", score: { type8: 5, type6: 3 } }
      ]
    },
    {
      text: "他の人から依頼された仕事について、どう感じますか？",
      options: [
        { text: "自分の仕事に支障が出ても引き受けてしまう", score: { type8: 5, type4: 2 } },
        { text: "できるだけ自分で対応したい", score: { type3: 5, type1: 2 } },
        { text: "必要に応じて適切に断る", score: { type4: 4, type7: 3 } },
        { text: "新しい機会として捉える", score: { type2: 4, type5: 3 } }
      ]
    },
    {
      text: "ビジネスの悩みを誰かに相談することについて",
      options: [
        { text: "自分で解決したい", score: { type3: 5, type1: 3 } },
        { text: "詳しい人に積極的に相談したい", score: { type5: 4, type7: 3 } },
        { text: "相談するのは申し訳ない", score: { type8: 4, type4: 3 } },
        { text: "いろんな人の意見を聞きたい", score: { type2: 4, type7: 3 } }
      ]
    },
    {
      text: "新しい情報を得たとき、あなたは主にどうしますか？",
      options: [
        { text: "すぐに実践してみる", score: { type2: 5, type3: 2 } },
        { text: "慎重に分析検討する", score: { type7: 5, type1: 3 } },
        { text: "さらに詳しく調べる", score: { type5: 4, type7: 3 } },
        { text: "他の人と共有する", score: { type8: 4, type2: 2 } }
      ]
    },
    {
      text: "目標達成のために、最も大切だと思うことは？",
      options: [
        { text: "計画的な準備と実行", score: { type1: 5, type7: 3 } },
        { text: "新しいアイデアの創出", score: { type2: 5, type5: 2 } },
        { text: "確実な実績作り", score: { type3: 4, type4: 3 } },
        { text: "継続的な学習", score: { type5: 5, type7: 2 } }
      ]
    },
    {
      text: "サービス提供時の満足度について",
      options: [
        { text: "100%完璧を目指したい", score: { type1: 5, type3: 3 } },
        { text: "お客様の反応を重視したい", score: { type8: 5, type6: 3 } },
        { text: "自分の基準を達成したい", score: { type3: 4, type1: 3 } },
        { text: "市場価値に見合ったものを", score: { type6: 4, type7: 3 } }
      ]
    },
    {
      text: "ビジネスでの失敗を避けるために",
      options: [
        { text: "徹底的な事前準備をする", score: { type1: 5, type5: 3 } },
        { text: "様々な可能性を探る", score: { type2: 4, type7: 3 } },
        { text: "自分でコントロールする", score: { type3: 5, type1: 2 } },
        { text: "十分な情報収集をする", score: { type7: 5, type5: 3 } }
      ]
    },
    {
      text: "仕事の進め方について",
      options: [
        { text: "一人で黙々と進める", score: { type3: 5, type1: 3 } },
        { text: "チームで協力して進める", score: { type8: 4, type2: 3 } },
        { text: "計画に従って進める", score: { type1: 4, type7: 3 } },
        { text: "柔軟に対応しながら進める", score: { type2: 4, type6: 3 } }
      ]
    },
    {
      text: "新しいビジネスチャンスについて",
      options: [
        { text: "慎重に検討してから決める", score: { type7: 5, type1: 3 } },
        { text: "すぐに可能性を探る", score: { type2: 5, type6: 2 } },
        { text: "自分の実力を見極めてから", score: { type4: 4, type3: 3 } },
        { text: "十分な学習をしてから", score: { type5: 5, type7: 2 } }
      ]
    },
    {
      text: "理想のビジネス状態とは？",
      options: [
        { text: "すべてが完璧に整っている", score: { type1: 5, type3: 3 } },
        { text: "常に新しいことに挑戦できる", score: { type2: 5, type5: 2 } },
        { text: "自分でコントロールできている", score: { type3: 5, type1: 2 } },
        { text: "顧客が満足している", score: { type8: 5, type6: 3 } }
      ]
    },
    {
      text: "ビジネスの課題に直面したとき",
      options: [
        { text: "完璧な解決策を見つけるまで考える", score: { type1: 5, type7: 3 } },
        { text: "新しいアプローチを試してみる", score: { type2: 5, type6: 2 } },
        { text: "自分の力で乗り越える", score: { type3: 5, type4: 2 } },
        { text: "たくさんの情報を集めて分析する", score: { type7: 5, type5: 3 } }
      ]
    }
  ];
  const handleAnswer = (option) => {
    setAnswers({
      ...answers,
      [currentQuestion]: option
    });

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResult();
      setShowEmailForm(true);
    }
  };

  const calculateResult = () => {
    const scores = {
      type1: 0, type2: 0, type3: 0, type4: 0,
      type5: 0, type6: 0, type7: 0, type8: 0
    };

    Object.values(answers).forEach(answer => {
      Object.entries(answer.score).forEach(([type, score]) => {
        scores[type] += score;
      });
    });

    const sortedTypes = Object.entries(scores)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 2);

    setResult({
      mainType: sortedTypes[0][0],
      subType: sortedTypes[1][0]
    });
  };

  const handleEmailSubmit = async (email) => {
    try {
      console.log('Email submitted:', email);
      setShowEmailForm(false);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="App">
      <div className="decoration-frame">
        <div className="corner-decoration top-left"></div>
        <div className="corner-decoration top-right"></div>
        <div className="corner-decoration bottom-left"></div>
        <div className="corner-decoration bottom-right"></div>
      </div>

      {!result && !showEmailForm ? (
        <div className="question-container">
          <h1>こじらせ起業家診断</h1>
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${(currentQuestion / questions.length) * 100}%` }}
            ></div>
          </div>
          <h2>質問 {currentQuestion + 1} / {questions.length}</h2>
          <p>{questions[currentQuestion].text}</p>
          <div className="options-container">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                className="option-button"
              >
                {option.text}
              </button>
            ))}
          </div>
        </div>
      ) : showEmailForm ? (
        <EmailForm onSubmit={handleEmailSubmit} />
      ) : (
        <div className="result-container">
          <h2 className="result-title">診断結果</h2>
          <div className="result-main">
          {typeDetails[result.mainType] && (
      <div className="result-illustration">
        <img 
          src={typeDetails[result.mainType].illustration} 
          alt={typeNames[result.mainType]}
          className="type-illustration"
        />
      </div>
    )}
            <h3>あなたのこじらせタイプ</h3>
            <div className="type-box">
              <h4>{typeNames[result.mainType]}</h4>
              {typeDetails[result.mainType] && (
                <div className="traits-box">
                  <h5>主な特徴:</h5>
                  <ul>
                    {typeDetails[result.mainType].traits.map((trait, index) => (
                      <li key={index}>{trait}</li>
                    ))}
                  </ul>
                  <h5>よく使う口癖:</h5>
                  <ul>
                    {typeDetails[result.mainType].quotes.map((quote, index) => (
                      <li key={index}>『{quote}』</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            {typeDetails[result.mainType] && (
              <div className="cta-box">
                <h4>あなたの可能性を広げるために</h4>
                <p>今すぐ以下のことが分かります：</p>
                <ul>
                  <li>具体的な改善ステップ</li>
                  <li>あなたと相性の良いビジネスパートナー</li>
                  <li>あなたの強みを活かせるビジネスモデル</li>
                </ul>
                <a 
                  href={typeDetails[result.mainType].seminarUrl} 
                  className="seminar-button"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  無料セミナー＆デジタルブックを受け取る
                </a>
              </div>
            )}
          </div>
          <button
            onClick={() => {
              setCurrentQuestion(0);
              setAnswers({});
              setResult(null);
            }}
            className="restart-button"
          >
            もう一度診断する
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
