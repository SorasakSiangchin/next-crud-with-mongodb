import React from "react";

const DeleteBtn = ({ id }) => {
  const handleDelete = async () => {
    const confirmed = confirm("Are You sure?");
    if (confirmed) {
      const res = await fetch(`http://localhost:3000/api/posts?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) window.location.reload();
    }
  };
  return (
    <a
      onClick={handleDelete}
      className="bg-red-500 text-white border px-2 py-2 rounded-md text-lg my-2"
    >
      Delete
    </a>
  );
};

export default DeleteBtn;
