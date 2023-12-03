import React, { useState } from "react";

function QuestionItem({ question, onDelete, onUpdateCorrectAsw }) {
  const { id, prompt, answers, correctIndex } = question;
  const [selectedCorrectIndex, setSelectedCorrectIndex] = useState(
    correctIndex
  );

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  const handleUpdateAnswer = () => {
    onUpdateCorrectAsw(id, selectedCorrectIndex);
  };

  const handleCorrectIndexChange = (event) => {
    setSelectedCorrectIndex(parseInt(event.target.value, 10));
  };

  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select
          defaultValue={selectedCorrectIndex}
          onChange={handleCorrectIndexChange}
        >
          {options}
        </select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
      <button onClick={handleUpdateAnswer}>Update Answer</button>
    </li>
  );
}

export default QuestionItem;
