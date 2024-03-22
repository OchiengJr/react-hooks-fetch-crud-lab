import React from "react";

function AdminNavBar({ onChangePage }) {
  const handlePageChange = (page) => {
    onChangePage(page);
  };

  return (
    <nav className="admin-nav">
      <button className="admin-nav__button" onClick={() => handlePageChange("Form")}>
        New Question
      </button>
      <button className="admin-nav__button" onClick={() => handlePageChange("List")}>
        View Questions
      </button>
    </nav>
  );
}

export default AdminNavBar;
