"use client";
import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { IPostDocument } from "@/mongodb/models/post";
import { Button } from "./ui/button";
import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { useEffect, useState } from "react";

function UserInformation({ posts }: { posts: IPostDocument[] }) {
  const { user, isLoaded } = useUser();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    if (user && user.id) {
      fetch(`/api/user?userId=${user.id}`)
        .then((res) => res.json())
        .then((data) => setProfile(data));
    }
  }, [user]);

  if (!isLoaded) return null;

  const firstName = profile?.firstName || user?.firstName || "";
  const lastName = profile?.lastName || user?.lastName || "";
  const imageUrl = profile?.userImage || user?.imageUrl || "https://github.com/shadcn.png";

  const userPosts = posts?.filter((post) => post.user.userId === user?.id) || [];
  const userComments = posts?.flatMap(
    (post) =>
      post?.comments?.filter((comment) => comment.user.userId === user?.id) || []
  ) || [];

  return (
    <div className="flex flex-col justify-center items-center bg-white mr-6 rounded-lg border py-4">
      <Avatar className="h-16 w-16 mb-5">
        <AvatarImage src={imageUrl} />
        <AvatarFallback>
          {firstName?.charAt(0)}
          {lastName?.charAt(0)}
        </AvatarFallback>
      </Avatar>

      <SignedIn>
        <div className="text-center">
          <p className="font-semibold text-black">
            {firstName} {lastName}
          </p>

          <p className="text-xs text-gray-700">
            @{firstName}
            {lastName}-{user?.id?.slice(-4)}
          </p>
        </div>
      </SignedIn>

      <SignedOut>
        <div className="text-center space-y-2">
          <p className="font-semibold text-black">You are not signed in</p>

          <Button asChild className="bg-[#0B63C4] text-white">
            <SignInButton>Sign in</SignInButton>
          </Button>
        </div>
      </SignedOut>

      <hr className="w-full border-gray-200 my-5" />

      <div className="flex justify-between w-full px-4 text-sm">
        <p className="font-semibold text-gray-500">Posts</p>
        <p className="text-blue-600">{userPosts.length}</p>
      </div>

      <div className="flex justify-between w-full px-4 text-sm">
        <p className="font-semibold text-gray-500">Comments</p>
        <p className="text-blue-600">{userComments.length}</p>
      </div>
    </div>
  );
}

export default UserInformation;
