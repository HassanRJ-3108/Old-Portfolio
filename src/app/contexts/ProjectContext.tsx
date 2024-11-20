'use client'

import React, { createContext, useState, useContext, useEffect } from 'react';


interface Project {
    _id: string;
    title: string;
    order: number;
    description: string;
    imageUrl: string;
    demoUrl: string;
    githubUrl?: string;
    year: number;
    role: string;
}

interface ProjectContextType {
    projects: Project[];
    setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
    refreshProjects: () => Promise<void>;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [projects, setProjects] = useState<Project[]>([]);

    const refreshProjects = async () => {
        try {
            const response = await fetch('/api/projects');
            if (response.ok) {
                const data = await response.json();
                setProjects(data.sort((a: Project, b: Project) => a.order - b.order));
            } else {
                console.error('Failed to fetch projects');
            }
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    useEffect(() => {
        refreshProjects();
    }, []);

    return (
        <ProjectContext.Provider value={{ projects, setProjects, refreshProjects }}>
            {children}
        </ProjectContext.Provider>
    );
};

export const useProjects = () => {
    const context = useContext(ProjectContext);
    if (context === undefined) {
        throw new Error('useProjects must be used within a ProjectProvider');
    }
    return context;
};