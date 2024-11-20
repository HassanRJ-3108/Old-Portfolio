'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useProjects } from '../../contexts/ProjectContext'

function SortableItem({ id, title }: { id: string; title: string }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-[#2A2A2A] p-4 rounded-lg shadow-md cursor-move"
    >
      <span className="text-white font-manrope">{title}</span>
    </li>
  );
}

const ReorderProjects = () => {
  const router = useRouter()
  const { data: session } = useSession()
  const { projects, setProjects, refreshProjects } = useProjects()

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setProjects((items) => {
        const oldIndex = items.findIndex((item) => item._id === active.id);
        const newIndex = items.findIndex((item) => item._id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  const saveOrder = async () => {
    const projectOrders = projects.map((project, index) => ({
      id: project._id,
      order: index
    }));

    const response = await fetch('/api/projects/reorder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ projectOrders }),
    });

    if (response.ok) {
      alert('Project order saved successfully!');
      await refreshProjects();  // Refresh the projects after saving
      router.push('/admin/projects');
    } else {
      alert('Failed to save project order');
    }
  }

  if (!session) {
    return <div>Access Denied</div>
  }

  return (
    <div className="bg-[#1A1A1A] min-h-screen p-8">
      <h1 className="text-3xl font-bebas-neue mb-6 text-white">Reorder Projects</h1>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={projects.map(project => project._id)}
          strategy={verticalListSortingStrategy}
        >
          <ul className="space-y-4">
            {[...projects].reverse().map((project) => (
              <SortableItem key={project._id} id={project._id} title={project.title} />
            ))}
          </ul>
        </SortableContext>
      </DndContext>
      <button
        onClick={saveOrder}
        className="mt-6 bg-[#D3E97A] text-black font-manrope font-bold py-2 px-4 rounded hover:bg-[#C3D96A] transition duration-300"
      >
        Save Order
      </button>
    </div>
  )
}

export default ReorderProjects