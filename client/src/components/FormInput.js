import React, { useEffect, useState } from "react";

const FormInput = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [editId, seteditId] = useState(-1);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  // const API_URL = "http://localhost:4000/api/tasks";
  const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api/tasks`;

  const handleSubmit = () => {
    setError("");
    if (title.trim() !== "" && description.trim() !== "") {
      fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      })
        .then((res) => {
          if (res.ok) {
            setTodos([...todos, { title, description }]);
            setTitle("");
            setDescription("");
            setMessage("Item Added Sucesfully ! 👍");
            setTimeout(() => {
              setMessage("");
            }, 3000);
          } else {
            setError("Unable to Fetch Data");
          }
        })
        .catch(() => {
          setError("Unable to Create Data");
        });
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  const getItems = () => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((res) => {
        setTodos(res);
      })
      .catch(() => {
        setError("Unable to fetch items");
      });
  };

  const handleEdit = (item) => {
    {
      seteditId(item._id);
      setEditTitle(item.title);
      setEditDescription(item.description);
    }
  };

  const handleUpdate = () => {
    setError("");
    if (editTitle.trim() !== "" && editDescription.trim() !== "") {
      fetch(API_URL + "/" + editId, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: editTitle,
          description: editDescription,
        }),
      })
        .then((res) => {
          if (res.ok) {
            const updatedTodos = todos.map((item) => {
              if (item._id == editId) {
                item.title = editTitle;
                item.description = editDescription;
              }
              return item;
            });
            setTodos(updatedTodos);
            setEditTitle("");
            setEditDescription("");
            setMessage("Item Updated Sucesfully ! 👍");
            setTimeout(() => {
              setMessage("");
            }, 3000);
            seteditId(-1);
          } else {
            setError("Unable to Fetch Data");
          }
        })
        .catch(() => {
          setError("Unable to Create Data");
        });
    }
  };

  const handleEditCancel = () => {
    seteditId(-1);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are ypu sure want to delete?")) {
      fetch(API_URL + "/" + id, {
        method: "DELETE",
      }).then(() => {
        const updatedTodos = todos.filter((item) => item._id !== id);
        setTodos(updatedTodos);
      });
    }
  };
  return (
    <div>
      <div className="pt-3 sm:pt-5 mx-1">
        <div className="flex justify-center pb-4">
          <input
            type="text"
            placeholder="Title"
            className="input input-bordered input-info w-full max-w-xs "
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div>
        <div className="flex justify-center">
          <input
            type="text"
            placeholder="Description"
            className="input input-bordered input-info input-lg w-full max-w-xs "
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
        </div>
        {message && (
          <p className="pt-1 sm:pt-2 text-center font-serif text-green-700">
            {message}
          </p>
        )}
        <div className="flex justify-center pt-1 sm:pt-3 ">
          <button
            className="btn btn-info hover:bg-cyan-400 text-gray-900 hover:text-white"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
        {error && (
          <p className="text-center font-serif text-red-700 pt-1">{error}</p>
        )}
      </div>
      <main className="max-w-md mx-auto pt-3 px-2">
        <h2 className="text-2xl font-serif text-center pb-2">Tasks</h2>
        <ul>
          {todos.map((item, index) => {
            return (
              <li
                className="flex justify-between items-center bg-blue-200 p-2 px-3 rounded-md mb-3"
                key={index}
              >
                <div className="flex flex-col text-sm">
                  {editId == -1 || editId !== item._id ? (
                    <>
                      <span>{item.title}</span>
                      <span>{item.description}</span>
                    </>
                  ) : (
                    <>
                      <div className="pt-3 sm:pt-5 mx-1">
                        <div className="flex justify-center pb-4">
                          <input
                            type="text"
                            placeholder="Title"
                            className="input input-bordered input-info w-full max-w-xs "
                            onChange={(e) => setEditTitle(e.target.value)}
                            value={editTitle}
                          />
                        </div>
                        <div className="flex justify-center">
                          <input
                            type="text"
                            placeholder="Description"
                            className="input input-bordered input-info input-lg w-full max-w-xs "
                            onChange={(e) => setEditDescription(e.target.value)}
                            value={editDescription}
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <div className="space-x-4 items-center flex sm:flex-none sm:flex-row  flex-col sm:gap-4 gap-2">
                  {editId == -1 ? (
                    <button
                      className="bg-orange-600 p-1 rounded font-serif"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>
                  ) : (
                    <button
                      className="bg-orange-800  p-1 rounded font-serif ml-3 font-serif"
                      onClick={handleUpdate}
                    >
                      Update
                    </button>
                  )}

                  {editId == -1 ? (
                    <button
                      className="bg-red-600 text-white p-1 rounded font-serif"
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </button>
                  ) : (
                    <button
                      className="bg-red-600 text-white p-1 rounded font-serif"
                      onClick={handleEditCancel}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  );
};

export default FormInput;
