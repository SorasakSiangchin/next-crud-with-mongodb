import mongoose, { Schema } from "mongoose";

const postSchema = new Schema(
  {
    title: String,
    img: String,
    content: String,
  },
  {
    timestamps: true,
  }
);

//ถ้ามีการสร้างตัว model แล้ว ก้ใช้ไปแต่ถ้ายังไม่สร้างให้มันสร้าง
const Post = mongoose.model.Post || mongoose.model("Post", postSchema);
export default Post;
