import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilter, setSearchQuery } from "../store/taskSlice";
import { RootState } from "../store/store";
import { Search } from "lucide-react";

export default function TaskFilters() {
  const dispatch = useDispatch();
  const { filter, searchQuery } = useSelector(
    (state: RootState) => state.tasks
  );

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          className="w-full pl-10 pr-4 py-2 bg-[#1a1f37] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {(["all", "completed", "pending", "overdue"] as const).map(
          (filterOption) => (
            <button
              key={filterOption}
              onClick={() => dispatch(setFilter(filterOption))}
              className={`px-4 py-2 rounded-lg capitalize transition-colors ${
                filter === filterOption
                  ? "bg-purple-500 text-white"
                  : "bg-[#1a1f37] text-gray-300 hover:bg-[#2a3655]"
              }`}
            >
              {filterOption}
            </button>
          )
        )}
      </div>
    </div>
  );
}
