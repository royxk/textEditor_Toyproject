import { BaseEditor, BaseElement } from "slate";
import { ReactEditor } from "slate-react";
import { HistoryEditor } from "slate-history";

export type CustomElement = {
  type: string;
  children: CustomText[];
} & BaseElement;

export type CustomText = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  superscript?: boolean;
  subscript?: boolean;
  color?: string;
  bgColor?: string;
  fontSize?: string;
  fontFamily?: string;
};

export type ToolbarOption = {
  text: string;
  value: string;
};

export type ToolbarElement = {
  id: number;
  format: string;
  type: "dropdown" | "mark" | "color-picker" | "block" | "embed";
  options?: ToolbarOption[];
};

export type ToolbarGroup = ToolbarElement[];

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}
