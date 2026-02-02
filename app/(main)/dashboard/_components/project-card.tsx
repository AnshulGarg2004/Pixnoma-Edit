import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card'
import { api } from '@/convex/_generated/api';
import { useConvexMutation } from '@/hooks/use-convex-query';
import { Edit, Trash2 } from 'lucide-react';
import {formatDistanceToNow} from 'date-fns'
import Image from 'next/image';
import React, { useState } from 'react'
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface ProjectCardProp {
    project : Project;
    onEdit : () => void
}

export type Project = {
  _id: string;
  userId: string;

  title: string;

  originalImageUrl: string;
  currentImageUrl: string;
  thumbnailUrl : string;
  

  width: number;
  height: number;

  canvasState?: any; 
  activeTransformation?: string;

  createdAt: number;
  updatedAt: number;
};


const ProjectCard = ({project, onEdit} : ProjectCardProp) => {
    const [isLoading, setIsLoading] = useState(false);
    const {mutate : deleteProject} = useConvexMutation(api.projects.deleteUserProject);

    console.log("Project content: ", project);
    console.log("Thumbnail : ", project.thumbnailUrl);
    

    const lastUpdated = formatDistanceToNow(new Date(project.updatedAt), {addSuffix : true});
    const handleDelete = async() => {
        const confirmed = confirm(`Are you sure you want to delete ${project.title}. This Action cannot be undone`);
        try {
            if(confirmed) {
                await deleteProject({projectId : project._id});
                toast.success("Project deleted Succssfully🎉🎉");
                console.log("deleted success");
                return;
                
            }
        } catch (error) {
            console.log("error deleting project: ", error);
            toast.error("Error in deleting project");
            return;
            
        }

        
        
    }
  return (
    <Card className='py-0 group relative bg-slate-800/50 border-slate-700/50 overflow-hidden hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10'>
      <div className='relative aspect-[4/3] overflow-hidden bg-slate-700/50'>
        {project.thumbnailUrl ? (
          <Image
            src={project.thumbnailUrl}
            alt={project.title}
            fill
            className='object-cover transition-transform duration-300 group-hover:scale-105'
            sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw'
          />
        ) : (
          <div className='w-full h-full flex items-center justify-center text-white/30'>
            No Preview
          </div>
        )}

        <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-3 items-center justify-center'>
          <Button variant={'glassy'} size={'sm'} onClick={onEdit} className='gap-2'>
            <Edit className='h-4 w-4'/>Edit
          </Button>
          <Button variant={'glassy'} size={'sm'} onClick={handleDelete} className='gap-2 text-red-400 hover:text-red-300 hover:bg-red-500/20' disabled={isLoading}>
            <Trash2 className='h-4 w-4'/>Delete
          </Button>
        </div>
      </div>

      <CardContent className='p-4'>
        <h3 className='font-semibold text-white truncate mb-2'>{project.title}</h3>
        <Badge variant={'secondary'} className='text-xs bg-slate-700/80 text-white/60 font-normal'>
          {project.width} × {project.height}
        </Badge>
      </CardContent>
    </Card>
  )
}

export default ProjectCard
