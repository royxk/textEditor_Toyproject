import { title } from "process";
import React, { ButtonHTMLAttributes, DetailedHTMLProps, FC } from "react";

interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  format: string;
  active: boolean;
}

const Button: FC<ButtonProps> = (props) => {
  const { children, format, active, ...rest } = props;
  return (
    <button
      className={active ? "btnActive" : "lol"}
      title={format}
      {...rest}
      style={{ width: "30px", height: "20px", margin: "0 2px" }}
    >
      {children}
    </button>
  );
};

export default Button;
