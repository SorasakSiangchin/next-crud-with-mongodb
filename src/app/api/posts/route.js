import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import Post from "../../../../models/post";

export async function POST(req) {
  const { title, img, content } = await req.json();

  console.log(title, img, content);

  // เชื่อต่อฐานข้อมูล
  await connectMongoDB();

  await Post.create({ title, img, content });

  return NextResponse.json(
    {
      message: "Post created",
    },
    { status: 201 }
  );
}

export async function GET() {
  await connectMongoDB();
  const posts = await Post.find({});
  return NextResponse.json({ posts });
}

export async function DELETE(req) {
  const id = req.nextUrl.searchParams.get("id");
  await connectMongoDB();
  const posts = await Post.findByIdDelete(id);
  return NextResponse.json({ message: "Post Deleted" }, { status: 200 });
}
