import { useState } from "react";
import "./App.css";
import data from "./data.json";

function App() {
  const [answer, setAnswer] = useState([]);
  const checkResults = () => {
    let count = 0;
    answer.map((i) => {
      if (data.questions[i.id].answerKey == i.answer) {
        count = count + 1;
      }
    });
    alert("Правильных ответов: " + count); // переделать это желательно в модалку
  };
  const makeAnswer = (i, keyAnswer) => {
    const keys = answer.map((item) => item.id); // получаем просто массив  наших id
    console.log(keys); // посмотри в консоли тогда ( но не забывай пользоваться инструментами разработчика)
    if (keys.includes(i)) {
      // если ответ на это уже был дан
      const newAnswers = answer.map((item) => {
        if (item.id == i) {
          item.answer = keyAnswer;
          return item;
          // обновляем ответ через
        }
        return item;
      });
      setAnswer(newAnswers); // устанавливаем новый ответ
      return;
    }
    setAnswer([...answer, { id: i, answer: keyAnswer }]);
    // здесь у нас нужно сделать основную переделку
    // если ответ уже присутствуе, то его его надо обновить
    // если нет тогда  просто записываем его
  };
  const listQuestions = data.questions.map((quest, index) => {
    return (
      <div key={index}>
        <h2>{quest.question}</h2>
        <input
          type="radio"
          name={quest.question}
          value="0"
          onChange={() => makeAnswer(index, 0)}
        ></input>
        <label>{quest.options[0]} </label>
        <br></br>
        <input
          type="radio"
          name={quest.question}
          value="1"
          onChange={() => makeAnswer(index, 1)}
        ></input>
        <label> {quest.options[1]} </label>
        <br></br>
        <input
          type="radio"
          name={quest.question}
          value="2"
          onChange={() => makeAnswer(index, 2)}
        ></input>
        <label> {quest.options[2]} </label>
        <br></br>
        <input
          type="radio"
          name={quest.question}
          value="3"
          onChange={() => makeAnswer(index, 3)}
        ></input>
        <label> {quest.options[3]} </label>
        <br></br>
      </div>
    );
  });

  return (
    <>
      {listQuestions}
      <button onClick={checkResults}>Узнать результат</button>
    </>
  );
}

export default App;
