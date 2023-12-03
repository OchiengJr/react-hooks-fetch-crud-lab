import React, { useState } from "react";

function QuestionForm({onAddQuestion}) {
  const initialAnswers = {
    answer1: "",
    answer2: "",
    answer3: "",
    answer4: "",
  }

  const [formData, setFormData] = useState({
    prompt: "",
    answers: {...initialAnswers},
    correctIndex: 0,
  });

  function handleChange(event) {
    const {name, value} = event.target

    if(name === "correctIndex"){
      setFormData({
        ...formData,
        [name]: parseInt(value, 10),
      });
    }
    else if(name.startsWith("answer")){
      const index = name.charAt(name.length - 1)
      setFormData({
        ...formData,
        answer: {
          ...formData.answers,
          [index] : value,
        },
      })
    }
    else{
      setFormData({
        ...formData,
        [name] : value,
      })
    }
    
  }

  function handleSubmit(event) {
    event.preventDefault();
    
    fetch("http://localhost:4000/questions",{
      method: "POST",
      headers:{
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        prompt: formData.prompt,
        answers: Object.values(formData.answers),
        correctIndex: formData.correctIndex,
      })
    })
      .then((res) => res.json())
      .then((data) => 
        // Update the state in the parent component (QuestionList)
        onAddQuestion(data)
      )
      .catch((error) => console.error("Encountered error adding a question", error))
  }

  return (
    <section>
      <h1>New Question</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Prompt:
          <input
            type="text"
            name="prompt"
            value={formData.prompt}
            onChange={handleChange}
          />
        </label>
        <label>
          Answer 1:
          <input
            type="text"
            name="answer1"
            value={formData.answer1}
            onChange={handleChange}
          />
        </label>
        <label>
          Answer 2:
          <input
            type="text"
            name="answer2"
            value={formData.answer2}
            onChange={handleChange}
          />
        </label>
        <label>
          Answer 3:
          <input
            type="text"
            name="answer3"
            value={formData.answer3}
            onChange={handleChange}
          />
        </label>
        <label>
          Answer 4:
          <input
            type="text"
            name="answer4"
            value={formData.answer4}
            onChange={handleChange}
          />
        </label>
        <label>
          Correct Answer:
          <select
            name="correctIndex"
            value={formData.correctIndex}
            onChange={handleChange}
          >
            <option value="0">{formData.answer1}</option>
            <option value="1">{formData.answer2}</option>
            <option value="2">{formData.answer3}</option>
            <option value="3">{formData.answer4}</option>
          </select>
        </label>
        <button type="submit">Add Question</button>
      </form>
    </section>
  );
}

export default QuestionForm;
