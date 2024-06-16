import React, { DetailedHTMLProps, HTMLAttributes, FC } from "react";

interface ButtonProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  format: string;
  active: boolean;
}

const Button: FC<ButtonProps> = (props) => {
  const { children, format, active, color, ...rest } = props;
  return (
    <div
      className={`${
        active ? "bg-blue-500 rounded-xl" : "bg-red-500"
      } text-white px-3 py-1 m-1 cursor-pointer`}
      title={format}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Button;
