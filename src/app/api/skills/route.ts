import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongodb';
import Skill from '../../../models/Skill';
import { getToken } from 'next-auth/jwt';

export async function GET() {
  await dbConnect();
  try {
    const skills = await Skill.find({});
    return NextResponse.json(skills);
  } catch (error) {
    return NextResponse.json({ error: `Failed to fetch skills ${error}` }, { status: 500 });
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
    const skill = await Skill.create(data);
    return NextResponse.json(skill);
  } catch (error) {
    return NextResponse.json({ error: `Failed to fetch skills ${error}`  }, { status: 500 });
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
    const skill = await Skill.findByIdAndDelete(id);
    return NextResponse.json(skill);
  } catch (error) {
    return NextResponse.json({ error: `Failed to fetch skills ${error}`  }, { status: 500 });
  }
}