import React from "react";
import { Button } from "./ui/button";
import { LoaderCircle } from "lucide-react";

interface ActionButtonProps {
  disabled: boolean;
  loading: boolean;
  action?: () => void;
  label: string;
  classname?: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  disabled,
  loading,
  action,
  classname,
  label,
}) => {
  return (
    <Button
      disabled={disabled || loading}
      className={classname}
      onClick={action}
    >
      {loading ? (
        <LoaderCircle className="w-5 h-5 text-white animate-spin" />
      ) : (
        <span className="text-white">{label}</span>
      )}
    </Button>
  );
};

export default ActionButton;
