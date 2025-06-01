"use client";

import { Trash2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { IPostDocument } from "@/mongodb/models/post";
import PostOptions from "./PostOptions";
import Image from "next/image";
import deletePostAction from "@/actions/deletePostAction";
import { useUser } from "@clerk/nextjs";
import { Button } from "./ui/button";
import ReactTimeago from "react-timeago";
import { Badge } from "./ui/badge";
import { toast } from "sonner";
import Link from "next/link";

function Post({ post }: { post: IPostDocument }) {
  const { user } = useUser();

  const isAuthor = user?.id === post.user.userId;
  return (
    <div className="bg-white rounded-md border">
      <div className="p-4 flex space-x-2">
        <div>
          <Link href={`/profile/${post.user.userId}`} className="flex items-center">
            <Avatar>
              <AvatarImage src={post.user.userImage} />
              <AvatarFallback>
                {post.user.firstName?.charAt(0)}
                {post.user.lastName?.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </Link>
        </div>

        <div className="flex justify-between flex-1">
          <div>
            <Link href={`/profile/${post.user.userId}`} className="hover:underline">
              <p className="font-semibold text-black">
                {post.user.firstName} {post.user.lastName}{" "}
                {isAuthor && (
                  <Badge className="ml-2" variant="secondary">
                    Author
                  </Badge>
                )}
              </p>
              <p className="text-xs text-gray-700">
                @{post.user.firstName}
                {post.user.firstName}-{post.user.userId.toString().slice(-4)}
              </p>
            </Link>
            <p className="text-xs text-gray-500">
              <ReactTimeago date={new Date(post.createdAt)} />
            </p>
          </div>

          {isAuthor && (
            <Button
              variant="outline"
              onClick={() => {
                const promise = deletePostAction(post._id);
                toast.promise(promise, {
                  loading: "Deleting post...",
                  success: "Post deleted!",
                  error: "Error deleting post",
                });
              }}
            >
              <Trash2 />
            </Button>
          )}
        </div>
      </div>

      <div className="">
        <p className="px-4 pb-2 mt-2 text-black">{post.text}</p>

        {/* If image uploaded put it here... */}
        {post.imageUrl && (
          <Image
            src={post.imageUrl}
            alt="Post Image"
            width={500}
            height={500}
            className="w-full mx-auto"
          />
        )}
      </div>

      <PostOptions postId={post._id} post={post} />
    </div>
  );
}

export default Post;
