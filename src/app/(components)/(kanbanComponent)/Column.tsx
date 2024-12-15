import { useDroppable } from "@dnd-kit/core";
import { TaskCard } from "./TaskCard";
import { Column as ColumnType, Task, TaskStatus } from "./types";
import { useState } from "react";
import { Add, CloseSquare, TickCircle, TickSquare, User } from "iconsax-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Assignee } from "../../../../public/data/assignee";
import { CalendarForm } from "@/components/ui/CaladerForm";
import { useToast } from "@/hooks/use-toast";

const priorityOptions = ["HIGH", "MEDIUM", "LOW"];

type ColumnProps = {
  column: ColumnType;
  tasks: Task[];
  onAddTask: (columnId: TaskStatus, task: Task) => void;
  onEditTask: (updatedTask: Task) => void;
  onDeleteTask: (taskId: string) => void;
  onTaskSelect: (task: Task) => void;
};

export function Column({
  column,
  tasks,
  onAddTask,

  onTaskSelect,
}: ColumnProps) {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [priority, setPriority] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [assignee, setAssignee] = useState("");

  const handleSubmit = () => {
    if (taskTitle && priority && dueDate && assignee) {
      onAddTask(column.id, {
        id: Date.now().toString(),
        taskName: taskTitle,
        description: taskDescription,
        status: column.id,
        priority: priority,
        dueDate: dueDate,
      });
      setTaskTitle("");
      setTaskDescription("");
      setPriority("");

      setDueDate("");

      setShowForm(false);
    } else {
      toast({
        variant: "destructive",
        title: "Fill all the fields",
        description: "There was a problem with your request.",
      });
    }
  };

  return (
    <div className="flex w-full flex-col my-4 p-4 border-dashed border-[1px] border-[#C8C8C8] rounded-xl min-h-[85vh] gap-6">
      <div className="flex justify-between items-center h-[56px] bg-white rounded-lg px-5">
        <div className="flex flex-row gap-3 items-center">
          {column.title === "To Do" ? (
            <div className="border-[2px] border-[#FFAD0D] rounded-full w-6 h-6"></div>
          ) : column.title === "In Progress" ? (
            <div className="border-[2px] border-[#0C6FBF] rounded-full w-6 h-6"></div>
          ) : (
            <div className="border-[2px] border-[#2A7E2E] rounded-full w-6 h-6"></div>
          )}
          <h2 className=" font-semibold text-[#1C1C1C] text-[20px]">
            {column.title}
          </h2>
          <h2 className="flex rounded-full justify-center items-center font-semibold text-[#0359E0] text-[13px] bg-[#F2F6FD] h-5 w-5">
            {tasks.length}
          </h2>
        </div>

        <Add
          size="24"
          color="#1C1C1C"
          className="cursor-pointer"
          onClick={() => setShowForm(true)}
        />
      </div>
      <div ref={setNodeRef} className="flex flex-1 flex-col gap-4">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDoubleClick={() => onTaskSelect(task)}
          />
        ))}
        {showForm ? (
          <div className="bg-white rounded-lg">
            <div className="flex flex-row items-center justify-between border-b-[1px] border-b-border gap-3 p-6 py-5">
              <div className="flex flex-row items-start gap-3">
                <TickCircle size="24" color="#727272" className="mt-1.5" />

                {/* {task.taskName} */}
                <input
                  type="text"
                  placeholder="Write a task name"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  className="font-normal text-[#727272] text-[20px] w-full focus:outline-none"
                />
              </div>
              <div className="flex flex-row gap-3 items-center">
                <TickSquare
                  onClick={handleSubmit}
                  size="24"
                  color="#727272"
                  variant="Outline"
                  className="text-blue-400 cursor-pointer"
                />
                <CloseSquare
                  onClick={() => setShowForm(false)}
                  size="24"
                  color="#727272"
                  variant="Outline"
                  className="cursor-pointer"
                />{" "}
              </div>
            </div>
            <div className="flex flex-col items-start gap-5 p-6">
              <div className="flex flex-row justify-between items-center w-full">
                <div className="flex flex-row gap-5 items-center ">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      {assignee ? (
                        <>
                          <Avatar className="w-[40px] h-[40px]">
                            <AvatarImage
                              src={`/users/1.png`}
                              alt="@shadcn"
                              className="object-cover w-full h-full"
                            />
                            <AvatarFallback>avatar</AvatarFallback>
                          </Avatar>
                        </>
                      ) : (
                        <div className="h-9 w-9 rounded-full border-dashed border-[1px] border-[#C8C8C8] flex items-center justify-center">
                          <User size="20" color="#727272" />
                        </div>
                      )}
                    </DropdownMenuTrigger>

                    <DropdownMenuContent className="flex ml-52 px-2 flex-col w-[206px]">
                      <DropdownMenuRadioGroup
                        value={assignee}
                        onValueChange={setAssignee}
                      >
                        {Assignee.map((index) => (
                          <DropdownMenuRadioItem
                            key={index.id}
                            value={index.name}
                          >
                            <div className="flex flex-row items-center gap-3 px-5 text-6 justify-between">
                              <div className="flex items-center gap-3">
                                <Avatar className="w-[24px] h-[24px]">
                                  <AvatarImage
                                    src={`/users/1.png`}
                                    alt="@shadcn"
                                    className="object-cover w-full h-full"
                                  />
                                  <AvatarFallback>avatar</AvatarFallback>
                                </Avatar>
                                {index.name}
                              </div>

                              {/* {assignee === index.name && <div>viji</div>} */}
                            </div>
                          </DropdownMenuRadioItem>
                        ))}
                      </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  {dueDate ? (
                    <div className="h-6 px-4 py-2 items-center flex text-[13px] font-medium text-[#CB2E27] bg-[#FCF4F4] rounded-[4px]">
                      {new Intl.DateTimeFormat("en-US", {
                        month: "short",
                        day: "2-digit",
                      }).format(new Date(`2024-${dueDate.replace(".", "-")}`))}
                    </div>
                  ) : (
                    <>
                      <CalendarForm onDateSelect={setDueDate} />
                    </>
                  )}
                </div>

                <div>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      {priority ? (
                        <div className="flex flex-row items-center gap-2 h-6 px-4 py-2 text-[13px] font-semibold text-[#0C6FBF] bg-[#FCF4F4] rounded-[4px]">
                          <div className="rounded-full h-[6px] w-[6px] bg-[#0C6FBF]"></div>
                          {priority}
                        </div>
                      ) : (
                        <div className="h-9 px-4 whitespace-nowrapi rounded-sm text-[#727272] text-[13px] border-dashed border-[1px] border-[#C8C8C8] flex items-center justify-center">
                          Set priority
                        </div>
                      )}
                    </DropdownMenuTrigger>

                    <DropdownMenuContent className="flex ml-52 px-2 flex-col w-[148px]">
                      <DropdownMenuRadioGroup
                        value={priority}
                        onValueChange={setPriority}
                      >
                        {priorityOptions.map((index) => (
                          <DropdownMenuRadioItem key={index} value={index}>
                            <div className="flex flex-row items-center gap-3 px-5 text-6 justify-between h-8 text-base text-[#1C1C1C]">
                              <div className="flex items-center gap-3">
                                {index}
                              </div>
                            </div>
                          </DropdownMenuRadioItem>
                        ))}
                      </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          </div>
        ) : (
          
          <button
            onClick={() => setShowForm(true)}
            className="w-full h-[48px] flex flex-row gap-3 mt-2 justify-center items-center text-4 text-[#727272] font-semibold"
          >
            <Add size="24" color="#727272" />
            Add Task
          </button>
        )}
      </div>
    </div>
  );
}
