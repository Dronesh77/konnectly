import { NextRequest, NextResponse } from "next/server";
import { User } from "@/mongodb/models/user";
import connectDB from "@/mongodb/db";
import { Post } from "@/mongodb/models/post";
import { Comment } from "@/mongodb/models/comment";

// This assumes userId is available from session/auth (to be replaced with real auth logic)

export async function GET(req: NextRequest) {
  await connectDB();
  const userId = req.nextUrl.searchParams.get("userId");
  if (!userId) return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  const user = await User.findOne({ userId });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });
  return NextResponse.json(user);
}

export async function PUT(req: NextRequest) {
  await connectDB();
  const body = await req.json();
  const { userId, ...update } = body;
  if (!userId) return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  const user = await User.findOneAndUpdate({ userId }, update, { new: true, upsert: true });

  // Propagate changes to posts and comments
  const userFields = {
    firstName: user.firstName,
    lastName: user.lastName,
    userImage: user.userImage,
  };

  // Update posts
  await Post.updateMany(
    { "user.userId": userId },
    { $set: { "user.firstName": userFields.firstName, "user.lastName": userFields.lastName, "user.userImage": userFields.userImage } }
  );

  // Update comments
  await Comment.updateMany(
    { "user.userId": userId },
    { $set: { "user.firstName": userFields.firstName, "user.lastName": userFields.lastName, "user.userImage": userFields.userImage } }
  );

  return NextResponse.json(user);
} 