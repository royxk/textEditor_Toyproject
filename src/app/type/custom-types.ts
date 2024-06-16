import { BaseEditor, BaseElement } from "slate";
import { ReactEditor } from "slate-react";
import { HistoryEditor } from "slate-history";
import { Descendant } from "slate";

// export type CustomElement = {
//   type: string;
//   children: CustomText[];
// } & BaseElement;

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

export interface CustomElement {
  type: string;
  children: Descendant[];
  [key: string]: any;
}

export interface CustomLeaf {
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
}

export type ToolbarOption = {
  text: string;
  value: string;
  //image has to be svg
  image?: string;
};

export type ToolbarElement = {
  id: number;
  format: string;
  type:
    | "dropdown"
    | "mark"
    | "block"
    | "embed"
    | "color-picker"
    | "test"
    | "popover";
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
