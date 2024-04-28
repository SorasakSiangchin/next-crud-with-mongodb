"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import DeleteBtn from "./DeleteBtn";

export default function Home() {
  const [postData, setPostData] = useState([]);

  console.log("postData : ", postData);

  const getPosts = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/posts", {
        method: "GET",
        cache: "no-store", // ต้องการข้อมูลไหม่ทุกครั้งเมื่อมีการยิง request
      });

      if (!res.ok) throw new Error("Failed to fetch posts.");

      const data = await res.json();
      setPostData(data.posts);
    } catch (error) {
      console.log("Error Loading Posts : ", error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <main className="container mx-auto my-3">
      <h1>NextJS + MongoDB</h1>
      <hr className="my-3" />
      <button className="bg-green-500 p-3 text-white rounded">
        <Link href="/create">Create Post</Link>
      </button>
      <div className="grid grid-cols-4 gap-5 mt-3">
        {postData && postData.length > 0 ? (
          postData.map((val) => (
            <div key={val._id} className="shadow-xl my-10 p-10 rounded-xl">
              <h4>{val.title}</h4>
              <Image src={val.img} width={300} height={0} alt={val.title} />
              <p>{val.content}</p>
              <div className="mt-2">
                <Link
                  className="bg-gray-500 text-white border px-2 py-2 rounded-md text-lg my-2"
                  href={`/edit/${val._id}`}
                >
                  Edit
                </Link>
                <DeleteBtn id={val._id} />
              </div>
            </div>
          ))
        ) : (
          <p className="bg-gray-300 p-3 my-3">You do not have any post yet.</p>
        )}
      </div>
    </main>
  );
}
