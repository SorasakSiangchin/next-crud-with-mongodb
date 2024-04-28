"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const EditPostPage = ({ params }) => {
  const { id } = params;

  const [postData, setPostData] = useState("");

  const router = useRouter();

  const [data, setData] = useState({
    title: "",
    img: "",
    content: "",
  });

  const getPostById = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
        method: "GET",
        cache: "no-store",
      });

      if (!res.ok) throw new Error("failed to fetch a post");

      const data = await res.json();

      console.log("data : ", data);

      setPostData(data.post);
    } catch (error) {
      console.log("Error : ", error);
    }
  };

  useEffect(() => {
    getPostById(id);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data }),
      });

      if (!res.ok) throw new Error("Failed to Update a Post");

      router.refresh();
      router.push("/");
    } catch (error) {
      console.log("Error : ", error);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h3 className="text-3xl font-bold">Edit Post</h3>
      <hr className="my-3" />
      <Link
        href="/"
        className="bg-gray-500 inline-block text-white border py-2 px-3 rounded my-2"
      >
        Back
      </Link>
      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => setData({ ...data, title: e.target.value })}
          type="text"
          className="w-[300px] block bg-gray-200 py-2 px-3 rounded text-lg my-2 "
          placeholder={postData.title}
        />
        <input
          onChange={(e) => setData({ ...data, img: e.target.value })}
          type="text"
          className="w-[300px] block bg-gray-200 py-2 px-3 rounded text-lg my-2 "
          placeholder={postData.img}
        />
        <textarea
          onChange={(e) => setData({ ...data, content: e.target.value })}
          row={10}
          className="w-[300px] block bg-gray-200 py-2 px-3 rounded text-lg my-2 "
          placeholder={postData.content}
        />
        <button
          type="submit"
          className="bg-green-500 text-white border py-2 px-3 rounded text-lg my-2"
        >
          Edit Post
        </button>
      </form>
    </div>
  );
};

export default EditPostPage;
