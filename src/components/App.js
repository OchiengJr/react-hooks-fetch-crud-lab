import React, { useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");

  const [questions, setQuestions] = useState([])

  const handlesAddQuestion = ((newQuestion) =>{
    setQuestions([...questions, newQuestion])
    setPage("List")
  })

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />

      {page === "Form" ? 
        <QuestionForm onAddQuestion={handlesAddQuestion}/> : 
        <QuestionList questions={questions}/>}

    </main>
  );
}

export default App;
