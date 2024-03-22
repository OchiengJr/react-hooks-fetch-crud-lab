import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [allQuestions, setAllQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((response) => response.json())
      .then((data) => setAllQuestions(data))
      .catch((error) => console.error("Error fetching: ", error));
  }, []);

  const handleUpdate = (id, correctIndex) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(correctIndex),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Couldn't update the answer");
        }
        setAllQuestions((oldQuestion) =>
          oldQuestion.map((question) =>
            question.id === id ? { ...question, correctIndex: correctIndex } : question
          )
        );
      })
      .catch((error) => console.error("Error updating the correct answer", error));
  };

  function handleDelete(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Couldn't delete the question");
        }
        setAllQuestions((oldQuestionArray) =>
          oldQuestionArray.filter((question) => question.id !== id)
        );
      })
      .catch((error) => console.error("Encountered error while deleting", error));
  }

  return (
    <section>
      <h2 className="section-title">Quiz Questions</h2>
      <ul className="question-list">
        {allQuestions.map((eachQuestion) => (
          <QuestionItem
            key={eachQuestion.id}
            question={eachQuestion}
            onDelete={handleDelete}
            onUpdateCorrectAnswer={handleUpdate}
          />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
