import { useState, useEffect} from "react"

const URL = `https://api.api-ninjas.com/v1/trivia`
const WIKIPEDIA = ``
const apiKey = process.env.REACT_APP_SECRET_KEY

function App() {

  const [question, setQuestion] = useState("No question")
  const [answer, setAnswer] = useState("No answer")
  const [answerIsVisible, toggleVisible] = useState(false)

  const handleAnswerClick = () => {
    toggleVisible(true)
  }

  const fetchData = async () => {
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
      <h1 class="mainTitle">Trivia Trainer Mobile</h1>
      <h2 class="subTitle">Endless Trivia On the Go</h2>
      <h3>Question: {question}</h3>
      <button onClick={handleAnswerClick}>Show Answer!</button>
      <button onClick={fetchData}>New Question</button>
      {answerIsVisible &&
        <h1>Answer: {answer}</h1>
      }
    </div>
  );
}

export default App;
