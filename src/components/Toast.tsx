import * as React from "react";
import * as ToastPrimitive from "@radix-ui/react-toast";
import { Cross2Icon } from "@radix-ui/react-icons";

type ToastProps = {
  title: string;
  description?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type?: "default" | "success" | "error";
};

// Toast icons
const SuccessIcon = () => (
  <div className="h-5 w-5">
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" fill="#00CC66" />
      <path d="M8 12L11 15L16 9" stroke="white" strokeWidth="2" />
    </svg>
  </div>
);

const ErrorIcon = () => (
  <div className="h-5 w-5">
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" fill="#FF0000" />
      <path d="M8 8L16 16" stroke="white" strokeWidth="2" />
      <path d="M16 8L8 16" stroke="white" strokeWidth="2" />
    </svg>
  </div>
);

const InfoIcon = () => (
  <div className="h-5 w-5">
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" fill="#0066CC" />
      <rect x="11" y="10" width="2" height="8" fill="white" />
      <circle cx="12" cy="7" r="1.5" fill="white" />
    </svg>
  </div>
);

export function Toast({
  title,
  description,
  open,
  onOpenChange,
  type = "default",
}: ToastProps) {
  // Determine background color based on type
  const bgColors = {
    default: "bg-blue-100 border-blue-500",
    success: "bg-green-100 border-green-500",
    error: "bg-red-100 border-red-500",
  }[type];

  const titleColors = {
    default: "text-blue-800",
    success: "text-green-800",
    error: "text-red-800",
  }[type];

  return (
    <ToastPrimitive.Provider>
      <ToastPrimitive.Root
        className={`${bgColors} text-black rounded-none shadow-xl p-4 fixed bottom-6 right-6 z-50 w-auto max-w-sm border-2 outset`}
        open={open}
        onOpenChange={onOpenChange}
      >
        <table cellPadding={0} cellSpacing={0} border={0} width="100%">
          <tbody>
            <tr>
              <td width="24" valign="top">
                <div className="mt-0.5">
                  {type === "success" && <SuccessIcon />}
                  {type === "error" && <ErrorIcon />}
                  {type === "default" && <InfoIcon />}
                </div>
              </td>
              <td className="pl-3">
                <ToastPrimitive.Title
                  className={`font-bold text-sm ${titleColors}`}
                >
                  {title}
                </ToastPrimitive.Title>
                {description && (
                  <ToastPrimitive.Description className="text-xs mt-1 text-gray-700">
                    {description}
                  </ToastPrimitive.Description>
                )}
              </td>
              <td width="20" valign="top">
                <ToastPrimitive.Close className="rounded-none p-1 hover:bg-gray-200 transition-colors">
                  <Cross2Icon className="h-4 w-4" />
                </ToastPrimitive.Close>
              </td>
            </tr>
          </tbody>
        </table>
      </ToastPrimitive.Root>
      <ToastPrimitive.Viewport />
    </ToastPrimitive.Provider>
  );
}
