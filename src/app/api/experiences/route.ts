import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongodb';
import Experience from '../../../models/Experience';
import { getToken } from 'next-auth/jwt';

export async function GET() {
  await dbConnect();
  try {
    const experiences = await Experience.find({}).sort({ startDate: -1 });
    return NextResponse.json(experiences);
  } catch (error) {
    return NextResponse.json({ error: `Failed to delete experience ${error}` }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  await dbConnect();
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await request.json();
    const experience = await Experience.create(data);
    return NextResponse.json(experience);
  } catch (error) {
    return NextResponse.json({ error: `Failed to delete experience ${error}` }, { status: 500 });
  }
}


export async function DELETE(request: NextRequest) {
  await dbConnect();
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const experience = await Experience.findByIdAndDelete(id);
    return NextResponse.json(experience);
  } catch (error) {
    return NextResponse.json({ error: `Failed to delete experience ${error}` }, { status: 500 });
  }
}