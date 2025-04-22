import React from "react";
import { CheckCircle, Clock, Loader } from "lucide-react";

const TimelineTracker = ({ status }) => {
  // Define all possible statuses in order
  const allStatuses = ["Request", "Manufacturing", "Inventory Check", "Production", "Dispatch", "Delivered"];
  
  // Find the current status index
  const currentIndex = allStatuses.indexOf(status);

  return (
    <div className="w-full py-4">
      <div className="flex items-center">
        {allStatuses.map((step, index) => (
          <React.Fragment key={step}>
            {/* Status point */}
            <div className="relative flex flex-col items-center">
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  index < currentIndex 
                    ? "bg-green-100 text-green-600" 
                    : index === currentIndex 
                      ? "bg-blue-100 text-blue-600"
                      : "bg-gray-100 text-gray-400"
                }`}
              >
                {index < currentIndex ? (
                  <CheckCircle size={16} />
                ) : index === currentIndex ? (
                  <Loader size={16} className="animate-spin" />
                ) : (
                  <Clock size={16} />
                )}
              </div>
              <div className="text-xs mt-1 text-center">
                {step}
              </div>
            </div>
            
            {/* Connecting line */}
            {index < allStatuses.length - 1 && (
              <div 
                className={`flex-1 h-1 ${
                  index < currentIndex 
                    ? "bg-green-500" 
                    : "bg-gray-300"
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default TimelineTracker;