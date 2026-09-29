import React from 'react';
import { CheckCircle, Info, AlertCircle, X } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useShop();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto bg-[#111111] text-[#F7F5F1] p-4 shadow-xl border border-neutral-700 flex items-center justify-between gap-3 text-xs tracking-wide animate-slideUp"
        >
          <div className="flex items-center gap-2.5">
            {toast.type === 'error' ? (
              <AlertCircle size={16} className="text-rose-400 shrink-0" />
            ) : toast.type === 'info' ? (
              <Info size={16} className="text-sky-400 shrink-0" />
            ) : (
              <CheckCircle size={16} className="text-emerald-400 shrink-0" />
            )}
            <span className="font-medium">{toast.message}</span>
          </div>

          <button
            onClick={() => removeToast(toast.id)}
            className="text-neutral-400 hover:text-white p-0.5 cursor-pointer"
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
};
