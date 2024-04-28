"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const CreatePostPage = () => {
  const [data, setData] = useState({
    title: "",
    img: "",
    content: "",
  });

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.title || !data.img || !data.content) {
      alert("Please complete all inputs");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        router.push("/");
      } else {
        throw new Error("Failed to create a post");
      }
    } catch (error) {
      console.log("Error : ", error);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h3 className="text-3xl font-bold">Create Post</h3>
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
          placeholder="Post title"
        />
        <input
          onChange={(e) => setData({ ...data, img: e.target.value })}
          type="text"
          className="w-[300px] block bg-gray-200 py-2 px-3 rounded text-lg my-2 "
          placeholder="Post Image Url"
        />
        <textarea
          onChange={(e) => setData({ ...data, content: e.target.value })}
          row={10}
          className="w-[300px] block bg-gray-200 py-2 px-3 rounded text-lg my-2 "
          placeholder="Enter your content"
        />
        <button
          type="submit"
          className="bg-green-500 text-white border py-2 px-3 rounded text-lg my-2"
        >
          Create Post
        </button>
      </form>
    </div>
  );
};

export default CreatePostPage;
