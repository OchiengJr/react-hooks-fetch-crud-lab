import React, { useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  const handleAddQuestion = (newQuestion) => {
    setQuestions([...questions, newQuestion]);
    setPage("List");
  };

  return (
    <div className="app">
      <AdminNavBar onChangePage={setPage} />
      <main className="app__content">
        {page === "Form" ? (
          <QuestionForm onAddQuestion={handleAddQuestion} />
        ) : (
          <QuestionList questions={questions} />
        )}
      </main>
    </div>
  );
}

export default App;
