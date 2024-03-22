import React, { useState } from "react";

function QuestionItem({ question, onDelete, onUpdateCorrectAnswer }) {
  const { id, prompt, answers, correctIndex } = question;
  const [selectedCorrectIndex, setSelectedCorrectIndex] = useState(correctIndex);

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  const handleUpdateAnswer = () => {
    onUpdateCorrectAnswer(id, selectedCorrectIndex);
  };

  const handleCorrectIndexChange = (event) => {
    setSelectedCorrectIndex(parseInt(event.target.value, 10));
  };

  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <div className="question-item">
      <h3>Question {id}</h3>
      <div className="question-prompt">{prompt}</div>
      <div className="answer-selection">
        <label>
          Correct Answer:
          <select
            value={selectedCorrectIndex}
            onChange={handleCorrectIndexChange}
          >
            {options}
          </select>
        </label>
      </div>
      <div className="action-buttons">
        <button className="delete-button" onClick={handleDelete}>Delete Question</button>
        <button className="update-button" onClick={handleUpdateAnswer}>Update Answer</button>
      </div>
    </div>
  );
}

export default QuestionItem;
