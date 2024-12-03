import { useState } from "react";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteTask, toggleTaskComplete, updateTask } from "../store/taskSlice";
import { Task } from "../types/task";
import { Pencil, Trash2, Check, X, Calendar, ArrowRight } from "lucide-react";
import { format, parseISO } from "date-fns";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog";

interface TaskItemProps {
  task: Task;
}

export default function TaskItem({ task }: TaskItemProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);
  const [editedDueDate, setEditedDueDate] = useState(task.dueDate);

  const handleUpdate = () => {
    dispatch(
      updateTask({
        ...task,
        title: editedTitle,
        description: editedDescription,
        dueDate: editedDueDate,
      })
    );
    setIsEditing(false);
    toast("task updated sucessfully");
  };

  const handleDelete = () => {
    dispatch(deleteTask(task.id));
    toast("task deleted successfully");
  };

  if (isEditing) {
    return (
      <div className="bg-[#222b45] rounded-xl p-6">
        <input
          type="text"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          className="w-full mb-2 px-3 py-2 bg-[#1a1f37] border border-gray-700 rounded-lg"
        />
        <textarea
          value={editedDescription}
          onChange={(e) => setEditedDescription(e.target.value)}
          className="w-full mb-2 px-3 py-2 bg-[#1a1f37] border border-gray-700 rounded-lg"
        />
        <input
          type="date"
          value={editedDueDate}
          onChange={(e) => setEditedDueDate(e.target.value)}
          className="w-full mb-2 px-3 py-2 bg-[#1a1f37] border border-gray-700 rounded-lg"
        />
        <div className="flex justify-end space-x-2">
          <button
            onClick={handleUpdate}
            className="p-2 text-green-500 hover:bg-green-500/10 rounded-lg"
          >
            <Check className="h-5 w-5" />
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`bg-[#222b45] rounded-xl p-6 ${
        task.completed ? "opacity-75" : ""
      } hover:bg-[#2a3655] transition-colors cursor-pointer`}
      onClick={() => navigate(`/task/${task.id}`)}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => {
              dispatch(toggleTaskComplete(task.id));
            }}
            onClick={(e) => e.stopPropagation()}
            className="mt-1 h-4 w-4 border-gray-700 bg-[#1a1f37] checked:bg-purple-500 p-2"
          />
          <div>
            <h3
              className={`font-medium ${
                task.completed ? "line-through text-gray-400" : ""
              }`}
            >
              {task.title}
            </h3>
            <p className="text-gray-400 mt-1">{task.description}</p>
            {task.dueDate && (
              <div className="flex items-center text-sm text-gray-400 mt-2">
                <Calendar className="h-4 w-4 mr-1" />
                {format(parseISO(task.dueDate), "MMM d, yyyy")}
              </div>
            )}
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsEditing(true);
            }}
            className="p-2 text-blue-500 hover:bg-blue-500/10 rounded-lg"
          >
            <Pencil className="h-5 w-5" />
          </button>
          <button className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg">
            <AlertDialog>
              <AlertDialogTrigger onClick={(e) => e.stopPropagation()} asChild>
                <Trash2
                  onClick={(e) => e.stopPropagation()}
                  className="h-5 w-5"
                />
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    the particular event
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel
                    className="bg-white"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-purple-500 hover:bg-purple-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete();
                    }}
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/task/${task.id}`);
            }}
            className="p-2 text-purple-500 hover:bg-purple-500/10 rounded-lg"
          >
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
