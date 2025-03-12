import React from "react";
import { Alert, AlertTitle, AlertDescription } from "./ui/alert";
import { CheckCircle, AlertCircle, X } from "lucide-react";

export type AlertType = "success" | "error";

interface FormAlertProps {
  type?: AlertType;
  title?: string;
  message?: string;
  visible?: boolean;
  onClose?: () => void;
}

const FormAlert: React.FC<FormAlertProps> = ({
  type = "success",
  title = type === "success" ? "Success" : "Error",
  message = type === "success"
    ? "Your submission was successful."
    : "There was an error with your submission.",
  visible = false,
  onClose = () => {},
}) => {
  if (!visible) return null;

  return (
    <div className="relative mb-4 bg-background">
      <Alert
        variant={type === "success" ? "default" : "destructive"}
        className={`${type === "success" ? "border-green-500 bg-green-50 text-green-800" : "border-red-500 bg-red-50 text-red-800"}`}
      >
        <div className="flex items-start">
          {type === "success" ? (
            <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
          ) : (
            <AlertCircle className="h-5 w-5 mr-2 text-red-600" />
          )}
          <div className="flex-1">
            <AlertTitle>{title}</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
          </div>
          <button
            onClick={onClose}
            className="ml-auto -mr-1 -mt-1 p-1 rounded-full hover:bg-gray-200 transition-colors"
            aria-label="Close alert"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </Alert>
    </div>
  );
};

export default FormAlert;
