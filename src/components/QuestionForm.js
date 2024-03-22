import React, { useState } from "react";

function QuestionForm({ onAddQuestion }) {
  const initialAnswers = {
    answer1: "",
    answer2: "",
    answer3: "",
    answer4: "",
  };

  const [formData, setFormData] = useState({
    prompt: "",
    answers: { ...initialAnswers },
    correctIndex: 0,
  });

  function handleChange(event) {
    const { name, value } = event.target;

    if (name === "correctIndex") {
      setFormData({
        ...formData,
        [name]: parseInt(value, 10),
      });
    } else if (name.startsWith("answer")) {
      const index = name.charAt(name.length - 1);
      setFormData({
        ...formData,
        answers: {
          ...formData.answers,
          [index]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: formData.prompt,
        answers: Object.values(formData.answers),
        correctIndex: formData.correctIndex,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // Update the state in the parent component (QuestionList)
        onAddQuestion(data);
      })
      .catch((error) =>
        console.error("Encountered error adding a question", error)
      );
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
        {[1, 2, 3, 4].map((index) => (
          <label key={index}>
            Answer {index}:
            <input
              type="text"
              name={`answer${index}`}
              value={formData.answers[`answer${index}`]}
              onChange={handleChange}
            />
          </label>
        ))}
        <label>
          Correct Answer:
          <select
            name="correctIndex"
            value={formData.correctIndex}
            onChange={handleChange}
          >
            {[1, 2, 3, 4].map((index) => (
              <option key={index} value={index - 1}>
                {formData.answers[`answer${index}`]}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Add Question</button>
      </form>
    </section>
  );
}

export default QuestionForm;
