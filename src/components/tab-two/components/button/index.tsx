import { Button } from "@mui/material";
import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
  onClick: () => void;
  title?: string;
  disabled?: boolean;
};

function ButtonCustom({ children, onClick, title, disabled }: Props) {
  return (
    <div className="wrapper-btn-add">
      <Button
        variant="contained"
        color="primary"
        startIcon={children}
        onClick={onClick}
        disabled={disabled}
      >
        {title}
      </Button>
    </div>
  );
}

export default ButtonCustom;
