import React, { useState } from 'react';
import { Task } from './types';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// Modal Props Definition
type ModalProps = {
  task: Task;
  onClose: () => void;
  onEdit: (updatedTask: Task) => void;
  onDelete: (taskId: string) => void;
};

const Modal = ({ task, onClose, onEdit, onDelete }: ModalProps) => {
  const [taskName, setTaskName] = useState(task.taskName);
  const [description, setDescription] = useState(task.description);

  const handleEdit = () => {
    onEdit({ ...task, taskName, description });
    onClose();
  };

  return (
    <Sheet open onOpenChange={onClose}>
      <SheetTrigger asChild>
        <button className="hidden" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Task</SheetTitle>
          <SheetDescription>Update the task details below.</SheetDescription>
        </SheetHeader>

        <div className="space-y-4">
          <label className="font-semibold">Title</label>
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            className="w-full rounded border p-2"
          />

          <label className="font-semibold">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded border p-2"
          />
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={handleEdit}
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-500"
          >
            Save
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-500"
          >
            Delete
          </button>
          <button
            onClick={onClose}
            className="rounded bg-gray-300 px-4 py-2 hover:bg-gray-200"
          >
            Cancel
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
};


export default Modal;


// import React, { useState } from 'react';
// import { Task } from './types';

// // Modal Props Definition
// type ModalProps = {
//   task: Task;
//   onClose: () => void;
//   onEdit: (updatedTask: Task) => void;
//   onDelete: (taskId: string) => void;
// };

// const Modal = ({ task, onClose, onEdit, onDelete }: ModalProps) => {
//   const [taskName, setTaskName] = useState(task.taskName);
//   const [description, setDescription] = useState(task.description);

//   const handleEdit = () => {
//     onEdit({ ...task, taskName, description });
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="w-1/3 rounded-lg bg-white p-6">
//         <h2 className="mb-4 text-xl font-bold">Edit Task</h2>
//         <label className="block mb-2 font-semibold">Title</label>
//         <input
//           type="text"
//           value={taskName}
//           onChange={(e) => setTaskName(e.target.value)}
//           className="w-full rounded border p-2"
//         />

//         <label className="block mt-4 mb-2 font-semibold">Description</label>
//         <textarea
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           className="w-full rounded border p-2"
//         />

//         <div className="mt-6 flex justify-end gap-4">
//           <button
//             onClick={handleEdit}
//             className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-500"
//           >
//             Save
//           </button>
//           <button
//             onClick={() => onDelete(task.id)}
//             className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-500"
//           >
//             Delete
//           </button>
//           <button
//             onClick={onClose}
//             className="rounded bg-gray-300 px-4 py-2 hover:bg-gray-200"
//           >
//             Cancel
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Modal;