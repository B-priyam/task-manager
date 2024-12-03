import React from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import TaskFilters from "../components/TaskFilters";
import TaskStats from "../components/TaskStats";
import { Bell, Settings } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#1a1f37] text-white">
      <div className=" p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold">Task Dashboard</h1>
            <p className="text-gray-400 w-full">
              Manage your tasks efficiently
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full hidden md:flex hover:bg-[#2a3655]">
              <Bell className="h-5 w-5" />
            </button>
            <button className="p-2 rounded-full hidden md:flex hover:bg-[#2a3655]">
              <Settings className="h-5 w-5" />
            </button>
            <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center">
              <span className="font-medium">JD</span>
            </div>
          </div>
        </div>

        <TaskStats />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <div className="bg-[#222b45] rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
            <TaskForm />
          </div>
          <div className="bg-[#222b45] rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">Task Filters</h2>
            <TaskFilters />
          </div>
        </div>

        <div className="mt-8">
          <TaskList />
        </div>
      </div>
    </div>
  );
}
