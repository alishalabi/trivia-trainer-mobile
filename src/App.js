import { useState, useEffect} from "react"

const URL = `https://api.api-ninjas.com/v1/trivia`
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
      <button onClick={fetchData}>New Question</button>
      <h1>Question: {question}</h1>
      <button onClick={handleAnswerClick}>Show Answer!</button>
      {answerIsVisible &&
        <h1>Answer: {answer}</h1>
      }
    </div>
  );
}

export default App;
