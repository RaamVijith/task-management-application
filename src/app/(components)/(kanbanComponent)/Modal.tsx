import React, { useState } from "react";
import { Task } from "./types";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Calendar, DocumentText1, Flag, TickCircle } from "iconsax-react";
import { ArrowRight, Trash, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CalendarForm } from "@/components/ui/CaladerForm";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Assignee } from "../../../../public/data/assignee";


const priorityOptions = ["HIGH", "MEDIUM", "LOW"];

type ModalProps = {
  task: Task;
  onClose: () => void;
  onEdit: (updatedTask: Task) => void;
  onDelete: (taskId: string) => void;
};

const Modal = ({ task, onClose, onEdit, onDelete }: ModalProps) => {
  const [taskName, setTaskName] = useState(task.taskName);
  const [description, setDescription] = useState(task.description);
  const [dueDate, setDueDate] = useState(task.dueDate);
  const [assignee, setAssignee] = useState("John Taylor");
  const [priority, setPriority] = useState(task.priority);

  const handleEdit = () => {
    onEdit({ ...task, taskName, description,priority, dueDate });
    onClose();
  };

  return (
    <Sheet open onOpenChange={onClose}>
      <SheetTrigger asChild>
        <button className="hidden" />
      </SheetTrigger>

      <SheetContent className=" w-[483px] px-8">
        <SheetHeader>
          <SheetTitle className="border-b-[1px] border-b-[#EFEFEF] mt-[50px] flex flex-row items-center justify-between w-full pb-4">
            <div className="flex flex-row gap-3 w-fit items-center text-base text-[#1C1C1C] px-3 py-1 border-[1px] border-[#EFEFEF] rounded-[8px]">
              <TickCircle size="20" color="#1C1C1C" />
              Mark Complete
            </div>
            <div className="flex flex-row gap-5">
              <Dialog>
                <DialogTrigger asChild>
                  <Trash size="18" color="#727272" className="cursor-pointer" />
                </DialogTrigger>
                <DialogContent className="w-[650px]">
                  <DialogHeader>
                    <DialogTitle className="text-[20px] font-semibold text-[#1C1C1C]">
                      Are you sure you want to delete selected task?
                    </DialogTitle>
                  </DialogHeader>
                  <div className="text-[16px] font-normal text-[#474747] py-2 ">
                    This will permanently delete the selected task. These items
                    will no longer be accessible to you. This action is
                    irreversible.
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button
                        type="button"
                        variant="secondary"
                        className="h-[43px] rounded-[8px] bg-white text-[#1C1C1C] border-[#EFEFEF] border-[1px] px-4 font-semibold text-[16px]"
                      >
                        Close
                      </Button>
                    </DialogClose>
                    <Button
                      type="submit"
                      className="h-[43px] rounded-[8px] bg-[#CB2E27] text-white px-4 font-semibold text-[16px]"
                      onClick={() => {
                        onDelete(task.id);
                        onClose();
                      }}
                    >
                      Yes, delete
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <ArrowRight
                size="18"
                color="#727272"
                className="cursor-pointer"
                onClick={handleEdit}
              />
            </div>
          </SheetTitle>
        </SheetHeader>

        <div className="space-y-4">
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            className="font-semibold text-[#1C1C1C] p-3 my-7 border-[1px] border-[#EFEFEF] rounded-[8px] text-[25px] w-full focus:outline-none"
          />

          <div className="flex flex-row gap-10 w-full">
            <div className="flex flex-col gap-7">
              <div className="flex gap-3 text-[16px] text-[#727272] items-center flex-row">
                <div className="border-[1.5px] border-[#727272] rounded-full w-5 h-5"></div>
                Status
              </div>
              <div className="flex gap-3 text-[16px] text-[#727272] items-center flex-row">
                <Calendar size="20" color="#727272" />
                Due Date
              </div>
              <div className="flex gap-3 text-[16px] text-[#727272] items-center flex-row">
                <User size="20" color="#727272" />
                Assignee
              </div>
              <div className="flex gap-3 text-[16px] text-[#727272] items-center flex-row">
                <Flag size="20" color="#727272" /> Priority
              </div>
            </div>
            <div className="flex flex-col gap-7">
              <div className="flex gap-3 text-[16px] text-[#1C1C1C] font-semibold items-center flex-row">
                {task.status === "TODO" ? (
                  <div className="border-[1.5px] border-[#FFAD0D] rounded-full w-5 h-5"></div>
                ) : task.status === "IN_PROGRESS" ? (
                  <div className="border-[1.5px] border-[#0C6FBF] rounded-full w-5 h-5"></div>
                ) : (
                  <div className="border-[1.5px] border-[#2A7E2E] rounded-full w-5 h-5"></div>
                )}
                {task.status}
              </div>

              <div className="flex flex-row items-center gap-3">
               <div>
               <CalendarForm onDateSelect={setDueDate} />
               </div>
                 {dueDate}
                
              </div>
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    {assignee ? (
                      <div className="flex flex-row items-center gap-3 text-[#1C1C1C] text-base font-semibold">
                        <Avatar className="w-[24px] h-[24px]">
                          <AvatarImage
                            src={`/users/1.png`}
                            alt="@shadcn"
                            className="object-cover w-full h-full"
                          />
                          <AvatarFallback>avatar</AvatarFallback>
                        </Avatar>
                        {assignee}
                      </div>
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

          <div className="flex gap-3 pt-10 text-[16px] text-[#727272] items-center flex-row">
                <DocumentText1 size="20" color="#727272" />
                Description
              </div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded border p-2 text-[#474747] text-base"
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Modal;
