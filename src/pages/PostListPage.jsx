import React, { useState, useEffect } from "react";
import PostCreate from "../components/PostCreate";
import PrivateRoute from "../components/PrivateRoute";

export default function PostListPage() {
  const [postList, setPostList] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    const url = "https://lab.willandskill.eu/api/v1/forum/posts/";
    const token = localStorage.getItem("webb21-lesson5");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    fetch(url, {
      headers: headers,
    })
      .then((res) => res.json())
      .then((data) => setPostList(data.results));
  }

  function handleOnDelete(id) {
    console.log(id)
    const url = `https://lab.willandskill.eu/api/v1/forum/posts/${id}/`;
    const token = localStorage.getItem("webb21-lesson5");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    fetch(url, {
      headers: headers,
      method: "DELETE"
    })
    .then((res) => fetchData())
  }

  return (
    <PrivateRoute>
      <div>
        Post List
        <PostCreate onSuccess={fetchData} />
        <button onClick={fetchData}>Refresh</button>
        {postList &&
          postList.map((item, index) => {
            return (
              <div key={item.id}>
                <p key={index}>
                  {item.title} - {item.content}
                </p>
                <button onClick={(e) => handleOnDelete(item.id)}>DELETE</button>
              </div>
            );
          })}
      </div>
    </PrivateRoute>
  );
}
