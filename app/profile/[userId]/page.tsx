"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";

function BackgroundImageBanner({ imageUrl }: { imageUrl?: string }) {
  return (
    <div
      className="relative w-full flex justify-center"
    >
      <div
        className="w-full max-w-2xl h-48 rounded-b-lg shadow border bg-gray-200 overflow-hidden flex items-center justify-center"
        style={{
          backgroundColor: imageUrl ? undefined : '#e5e7eb',
          backgroundImage: imageUrl ? `url(${imageUrl})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '12rem',
        }}
      />
    </div>
  );
}

export default function PublicProfilePage() {
  const { userId } = useParams();
  const [profile, setProfile] = useState<any>(null);
  const [userPosts, setUserPosts] = useState<any[]>([]);

  useEffect(() => {
    if (userId) {
      fetch(`/api/user?userId=${userId}`)
        .then((res) => res.json())
        .then((data) => setProfile(data));
      fetch(`/api/posts?userId=${userId}`)
        .then((res) => res.json())
        .then((posts) => setUserPosts(posts || []));
    }
  }, [userId]);

  if (!profile) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <BackgroundImageBanner imageUrl={profile.backgroundPhoto} />
      <div className="bg-white rounded-lg shadow p-6 border -mt-24 relative z-10 text-black max-w-2xl mx-auto">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-blue-200 flex items-center justify-center text-4xl font-bold text-blue-700 border-4 border-white -mt-16 shadow-lg overflow-hidden">
            {profile.firstName?.charAt(0)}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-black">{profile.firstName} {profile.lastName}</h2>
            <p className="text-black">{profile.email}</p>
            <p className="text-sm mt-1 text-black">{profile.education}</p>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="font-semibold text-lg mb-1 text-black">About</h3>
          <p className="mb-4 text-black">{profile.about}</p>
          <h3 className="font-semibold text-lg mb-1 text-black">Shop Details</h3>
          <div className="bg-gray-50 rounded p-4 border flex flex-col gap-1 mb-4 text-black">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-md text-black">{profile.shop?.name}</span>
              {profile.shop?.verified && <Badge variant="secondary">Verified</Badge>}
            </div>
            <span className="text-sm text-black">{profile.shop?.description}</span>
            <span className="text-xs text-black">{profile.shop?.location}</span>
          </div>
          <h3 className="font-semibold text-lg mb-1 text-black">Previous Posts</h3>
          <div className="space-y-2">
            {userPosts.length === 0 && <div className="text-black text-sm">No posts yet.</div>}
            {userPosts.map((post: any, idx: number) => (
              <div key={post._id || idx} className="bg-gray-100 rounded p-3 border text-black">
                <div className="text-sm">{post.text}</div>
                <div className="text-xs mt-1">{new Date(post.createdAt).toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 