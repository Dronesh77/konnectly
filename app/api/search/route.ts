import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/mongodb/db';
import { User } from '@/mongodb/models/user';

export async function GET(req: NextRequest) {
  await connectDB();
  const q = req.nextUrl.searchParams.get('q');
  if (!q) return NextResponse.json([]);
  const regex = new RegExp(q, 'i');
  const users = await User.find({
    $or: [
      { firstName: regex },
      { lastName: regex },
      { 'shop.name': regex },
    ],
  }).lean();
  return NextResponse.json(users);
} 