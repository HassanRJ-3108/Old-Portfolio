import { NextResponse, NextRequest } from 'next/server';
import dbConnect from '../../../lib/mongodb';
import Project from '../../../models/Project';
import { getToken } from 'next-auth/jwt';
import { mkdir, writeFile } from 'fs/promises';
import path from 'path';

export async function GET() {
  await dbConnect();
  try {
    const projects = await Project.find({}).sort({ order: 1 });
    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json({ error: `Failed to fetch projects ${error}`  }, { status: 500 });
  }
}

async function ensureUploadDirectory() {
  const uploadDir = path.join(process.cwd(), 'public', 'uploads');
  try {
    await mkdir(uploadDir, { recursive: true });
  } catch (error: any) {
    if (error.code !== 'EEXIST') {
      console.error('Error creating upload directory:', error);
      throw error;
    }
  }
}


export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
    await ensureUploadDirectory();

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const demoUrl = formData.get('demoUrl') as string;
    const githubUrl = formData.get('githubUrl') as string;
    const year = formData.get('year') as string;
    const role = formData.get('role') as string;
    const imageFile = formData.get('image') as File | null;
    const imageUrl = formData.get('imageUrl') as string;

    let finalImageUrl = '';

    if (imageFile) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const filename = `${Date.now()}-${imageFile.name}`;
      const filepath = path.join(process.cwd(), 'public', 'uploads', filename);
      await writeFile(filepath, buffer);
      finalImageUrl = `/uploads/${filename}`;
    } else {
      finalImageUrl = imageUrl;
    }

    console.log('Creating project with data:', {
      title,
      description,
      imageUrl: finalImageUrl,
      demoUrl,
      githubUrl: githubUrl || undefined,
      year,
      role,
    });

    const project = await Project.create({
      title,
      description,
      imageUrl: finalImageUrl,
      demoUrl,
      githubUrl: githubUrl || undefined,
      year,
      role,
    });

    console.log('Project created successfully:', project);

    return NextResponse.json(project);
  } catch (error: any) {
    console.error('Error creating project:', error);
    return NextResponse.json({ error: 'Failed to create project', details: error.message }, { status: 500 });
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
    const project = await Project.findByIdAndDelete(id);
    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json({ error: `Failed to delete project ${error}` }, { status: 500 });
  }
}