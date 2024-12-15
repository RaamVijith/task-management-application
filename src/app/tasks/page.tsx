"use client";

import React, { useState } from "react";
import type {
  Task,
  Column as ColumnType,
  TaskStatus,
} from "../(components)/(kanbanComponent)/types";
import { Column } from "../(components)/(kanbanComponent)/Column";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import Modal from "../(components)/(kanbanComponent)/Modal";

const COLUMNS: ColumnType[] = [
  { id: "TODO", title: "To Do" },
  { id: "IN_PROGRESS", title: "In Progress" },
  { id: "COMPLETED", title: "Completed" },
];

const INITIAL_TASKS: Task[] = [
  {
    id: "1",
    taskName: "Project setup and initial configurations",
    description:
      "Pellentesque varius ante posuere risus pellentesque mollis. Curabitur ultricee...",
    status: "TODO",
    dueDate: "Aug 11",
    priority: "LOW",
  },
  {
    id: "2",
    taskName: "Project setup and initial to configurations",
    description:
      "Pellentesque varius ante posuere risus pellentesque mollis. Curabitur ultricee...",
    status: "IN_PROGRESS",
    dueDate: "Aug 11",
    priority: "LOW",
  },
  {
    id: "3",
    taskName: "Project setup and initial to configurations",
    description:
      "Pellentesque varius ante posuere risus pellentesque mollis. Curabitur ultricee...",
    status: "TODO",
    dueDate: "Aug 11",
    priority: "HIGH",
  },
  {
    id: "4",
    taskName: "Project setup and initial to configurations",
    description:
      "Pellentesque varius ante posuere risus pellentesque mollis. Curabitur ultricee...",
    status: "COMPLETED",
    dueDate: "Aug 11",
    priority: "MEDIUM",
  },
];

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as TaskStatus;

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  }

  function handleAddTask(columnId: TaskStatus, task: Task) {
    setTasks((prevTasks) => [...prevTasks, task]);
  }

  function handleEditTask(updatedTask: Task) {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  }

  function handleDeleteTask(taskId: string) {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  }

  return (
    <div className="p-4">
      <div className="flex gap-8">
        <DndContext onDragEnd={handleDragEnd}>
          {COLUMNS.map((column) => (
            <Column
              key={column.id}
              column={column}
              tasks={tasks.filter((task) => task.status === column.id)}
              onAddTask={handleAddTask}
              onEditTask={handleEditTask}
              onDeleteTask={handleDeleteTask}
              onTaskSelect={setSelectedTask}
            />
          ))}
        </DndContext>
      </div>
      {selectedTask && (
        <Modal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
        />
      )}
    </div>
  );
};

export default Tasks;
