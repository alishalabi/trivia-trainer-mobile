import { useState, useEffect} from "react"

const URL = `https://api.api-ninjas.com/v1/trivia`
const WIKIPEDIA = ``
const apiKey = process.env.REACT_APP_SECRET_KEY

function App() {

  const [question, setQuestion] = useState("No question")
  const [questionNumber, setQuestionNumber] = useState(0)
  const [answer, setAnswer] = useState("No answer")
  const [answerIsVisible, toggleVisible] = useState(false)

  const handleAnswerClick = () => {
    toggleVisible(true)
  }

  const fetchData = async () => {
    setQuestionNumber(questionNumber + 1)
    toggleVisible(false)
    const result = await fetch(URL, {
      headers: {'X-Api-Key': apiKey}
    })
    result.json().then(json => {
      console.log(json)
      setQuestion(json[0].question)
      setAnswer(json[0].answer)
    })
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="App">
      <div class="appBody">
        <h1 class="mainTitle">Trivia Trainer - Mobile</h1>
        {/* <h2 class="subTitle">Endless Trivia On the Go</h2> */}
        <div class="questionSection">
          <h3 class="question">Question #{questionNumber}: {question}</h3>
        </div>
        <div class="buttonSection">
          <button onClick={handleAnswerClick}>Show Answer</button>
          <button onClick={fetchData}>New Question</button>
        </div>
        <div class="answerSection">
          {answerIsVisible &&
            <h3 class="answer">Answer: {answer}</h3>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
