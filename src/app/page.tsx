"use client";

import { FolderKanban, Plus, User } from "lucide-react";
import { useMutation, useQuery } from "convex/react";

import { api } from "../../convex/_generated/api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Skeleton } from "@/components/ui/skeleton";

const X = () => {
  const projects = useQuery(api.projects.get, {});
  const createProject = useMutation(api.projects.create);

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <div className="flex flex-col items-start justify-between gap-4 border-b pb-6 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Projects</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Everything you&apos;re building, in one place.
          </p>
        </div>
        <Button onClick={() => createProject({ name: "New Project", ownerId: "123" })}>
          <Plus className="size-4" />
          Add new project
        </Button>
      </div>

      <div className="mt-8">
        {projects === undefined ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-5 w-2/3" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-1/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : projects.length === 0 ? (
          <Empty className="border">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <FolderKanban />
              </EmptyMedia>
              <EmptyTitle>No projects yet</EmptyTitle>
              <EmptyDescription>
                Create your first project to get started.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button
                onClick={() => createProject({ name: "New Project", ownerId: "123" })}
              >
                <Plus className="size-4" />
                Add new project
              </Button>
            </EmptyContent>
          </Empty>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <Card
                key={project._id}
                className="transition-shadow hover:shadow-md"
              >
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground">
                      <FolderKanban className="size-4" />
                    </div>
                    <CardTitle className="truncate">{project.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <Badge variant="secondary" className="gap-1">
                    <User className="size-3" />
                    {project.ownerId}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default X;
