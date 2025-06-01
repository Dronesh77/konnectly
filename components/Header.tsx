'use client';
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import {
  Briefcase,
  HomeIcon,
  MessagesSquare,
  SearchIcon,
  UsersIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { useState, useRef } from 'react';

function Header() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    if (value.trim() === '') {
      setResults([]);
      setShowDropdown(false);
      return;
    }
    searchTimeout.current = setTimeout(async () => {
      const res = await fetch(`/api/search?q=${encodeURIComponent(value)}`);
      const data = await res.json();
      setResults(data);
      setShowDropdown(true);
    }, 300);
  };

  return (
    <div className="flex items-center p-4 max-w-6xl mx-auto">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <div className="bg-blue-600 rounded-full w-10 h-10 flex items-center justify-center">
          <span className="text-white text-2xl font-bold">K</span>
        </div>
        <span className="text-xl font-bold text-blue-500">Konnectly</span>
      </div>

      {/* Search */}
      <div className="flex-1 relative">
        <form className="flex items-center space-x-1 bg-gray-800 p-2 rounded-lg flex-1 mx-4 max-w-96 border border-gray-700">
          <SearchIcon className="h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent flex-1 outline-none text-gray-100 placeholder-gray-400"
            value={search}
            onChange={handleSearch}
            onFocus={() => search && setShowDropdown(true)}
            onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
          />
        </form>
        {showDropdown && results.length > 0 && (
          <div className="absolute z-50 bg-white text-black rounded-lg shadow-lg mt-2 w-full max-w-96">
            {results.map((user, idx) => (
              <Link href={`/profile/${user.userId}`} key={user._id || idx} className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center font-bold text-blue-700 overflow-hidden">
                  {user.userImage ? (
                    <img src={user.userImage} alt={user.firstName} className="w-full h-full object-cover rounded-full" />
                  ) : (
                    <span>{user.firstName?.charAt(0)}</span>
                  )}
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold">{user.firstName} {user.lastName}</span>
                  {user.shop?.name && <span className="text-xs text-gray-500">{user.shop.name}</span>}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center space-x-6 px-6">
        <Link href="/" className="flex flex-col items-center hover:text-blue-500 transition-colors">
          <HomeIcon className="h-5" />
          <p className="text-sm">Home</p>
        </Link>

        <Link href="" className="flex flex-col items-center hover:text-blue-500 transition-colors hidden md:flex">
          <UsersIcon className="h-5" />
          <p className="text-sm">Network</p>
        </Link>

        <Link href="/shops" className="flex flex-col items-center hover:text-blue-500 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7V6a1 1 0 011-1h16a1 1 0 011 1v1M5 21h14a2 2 0 002-2v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7a2 2 0 002 2z" /></svg>
          <p className="text-sm">Shops</p>
        </Link>

        <Link href="/profile" className="flex flex-col items-center hover:text-blue-500 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A9 9 0 1112 21a9 9 0 01-6.879-3.196z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          <p className="text-sm">Profile</p>
        </Link>

        <Link href="" className="flex flex-col items-center hover:text-blue-500 transition-colors">
          <MessagesSquare className="h-5" />
          <p className="text-sm">Messaging</p>
        </Link>

        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>

        <SignedOut>
          <Button asChild variant="secondary" className="bg-blue-600 hover:bg-blue-700 text-white">
            <SignInButton />
          </Button>
        </SignedOut>
      </div>
    </div>
  );
}

export default Header;
