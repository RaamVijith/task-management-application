import { useDraggable } from "@dnd-kit/core";
import { Task } from "./types";
import { Clock, TickCircle } from "iconsax-react";
import img from "../../../../public/profile img(1).png";
import Image from "next/image";

type TaskCardProps = {
  task: Task;
  onDoubleClick: () => void;
};

export function TaskCard({ task, onDoubleClick }: TaskCardProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="cursor-grab "
      style={style}
    >
      <div
        onDoubleClick={onDoubleClick}
        className="bg-white rounded-lg  hover:shadow-lg"
      >
        <div className="flex flex-row items-start border-b-[1px] border-b-border gap-5 p-6 py-5">
          {task.status === "COMPLETED" ? (
            <TickCircle
              size="24"
              color="#2A7E2E"
              variant="Bold"
              className="mt-1.5"
            />
          ) : (
            <TickCircle size="24" color="#1C1C1C" className="mt-1.5" />
          )}

          <h3 className="font-semibold text-[#1C1C1C] text-[20px] ">
            {task.taskName}
          </h3>
        </div>
        <div className="flex flex-col items-start border-b-[1px] border-b-border gap-5 p-6">
          <p className="text-base text-[#474747] font-normal">
            {task.description}
          </p>
          <div className="flex flex-row justify-between items-center w-full">
            <div className="flex flex-row gap-5 items-center ">
              <Image src={img} alt="pic" className="w-[40px] h-[40px]" />
              <div className="h-6 px-4 py-2 items-center flex text-[13px] font-medium text-[#CB2E27] bg-[#FCF4F4] rounded-[4px]">
                {task.dueDate}
              </div>
            </div>
            <div className="flex flex-row items-center gap-2 h-6 px-4 py-2 text-[13px] font-medium text-[#0C6FBF] bg-[#FCF4F4] rounded-[4px]">
              <div className="rounded-full h-[6px] w-[6px] bg-[#0C6FBF]"></div>
              {task.priority}
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center gap-5 p-6">
          <Clock size="16" color="#474747" />
          <div className="text-[#474747] text-[13px] font-medium">
            Should’ve completed 4 days ago
          </div>
        </div>
      </div>
    </div>
  );
}
