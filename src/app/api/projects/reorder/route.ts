import { NextResponse, NextRequest } from 'next/server';
import dbConnect from '../../../../lib/mongodb';
import Project from '../../../../models/Project';
import { getToken } from 'next-auth/jwt';

export async function POST(request: NextRequest) {
  await dbConnect();
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { projectOrders } = await request.json();

    for (const { id, order } of projectOrders) {
      await Project.findByIdAndUpdate(id, { order });
    }

    // Fetch and return the updated projects
    const updatedProjects = await Project.find({}).sort({ order: 1 });

    return NextResponse.json({ message: 'Projects reordered successfully', projects: updatedProjects });
  } catch (error) {
    console.error('Error reordering projects:', error);
    return NextResponse.json({ error: 'Failed to reorder projects' }, { status: 500 });
  }
}