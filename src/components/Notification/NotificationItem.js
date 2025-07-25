import React, { useEffect } from "react";
import { CheckCircle, XCircle, Info, AlertTriangle, X } from "lucide-react";

const NotificationItem = ({ notification, onRemove }) => {
  const { id, type, message, duration = 3000 } = notification;

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-600" />,
    error: <XCircle className="w-5 h-5 text-red-600" />,
    info: <Info className="w-5 h-5 text-blue-600" />,
    warning: <AlertTriangle className="w-5 h-5 text-yellow-600" />,
  };

  const borderColors = {
    success: "border-l-green-500",
    error: "border-l-red-500",
    info: "border-l-blue-500",
    warning: "border-l-yellow-500",
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove(id);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration, onRemove]);

  return (
    <div
      className={`
      notification-item
      flex items-start gap-3 p-3
      bg-white border border-gray-200 ${borderColors[type]}
      rounded-lg shadow-sm
      min-w-[280px] max-w-[350px]
      border-l-4
      animate-slide-in
    `}
    >
      <div className="flex-shrink-0 mt-0.5">{icons[type]}</div>

      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-900 leading-relaxed">{message}</p>
      </div>

      <button
        onClick={() => onRemove(id)}
        className="flex-shrink-0 bg-red-100 text-red-400 hover:bg-red-200 hover:text-red-600 transition-colors ml-2 rounded-full p-1"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default NotificationItem;
