import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { ArrowLeft, Calendar, CheckCircle2, Clock } from "lucide-react";
import { format, parseISO } from "date-fns";

export default function TaskDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const task = useSelector((state: RootState) =>
    state.tasks.tasks.find((t) => t.id === id)
  );

  if (!task) {
    return (
      <div className="min-h-screen bg-[#1a1f37] text-white p-8">
        <button
          onClick={() => navigate("/")}
          className="flex items-center text-gray-400 hover:text-white mb-8"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Dashboard
        </button>
        <div className="text-center">Task not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1a1f37] text-white p-8">
      <button
        onClick={() => navigate("/")}
        className="flex items-center text-gray-400 hover:text-white mb-8"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back to Dashboard
      </button>

      <div className="max-w-3xl mx-auto">
        <div className="bg-[#222b45] rounded-xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">{task.title}</h1>
            <div
              className={`px-4 py-2 rounded-full ${
                task.completed
                  ? "bg-green-500/10 text-green-500"
                  : "bg-yellow-500/10 text-yellow-500"
              }`}
            >
              <div className="flex items-center">
                {task.completed ? (
                  <CheckCircle2 className="h-5 w-5 mr-2" />
                ) : (
                  <Clock className="h-5 w-5 mr-2" />
                )}
                {task.completed ? "Completed" : "In Progress"}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-2">Description</h2>
              <p className="text-gray-400">
                {task.description || "No description provided"}
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2">Due Date</h2>
              <div className="flex items-center text-gray-400">
                <Calendar className="h-5 w-5 mr-2" />
                {task.dueDate
                  ? format(parseISO(task.dueDate), "MMMM d, yyyy")
                  : "No due date set"}
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2">Created</h2>
              <div className="text-gray-400">
                {format(parseISO(task.createdAt), "MMMM d, yyyy")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
