"use client";
import React, { useCallback, useMemo, useState } from "react";
import { createEditor, Descendant, Text, Transforms, Editor } from "slate";
import { withHistory } from "slate-history";
import { sizeMap } from "./utils/SlateUtilityFunction";
import {
  Slate,
  Editable,
  withReact,
  RenderElementProps,
  RenderLeafProps,
  ReactEditor,
} from "slate-react";
import Toolbar from "./components/Toolbar";
import "./TextEditor.css";
import { CustomElement, CustomLeaf } from "./type/custom-types";
import { serialize } from "./utils/serialize";

const Element: React.FC<RenderElementProps> = ({
  attributes,
  children,
  element,
}) => {
  switch (element.type) {
    case "headingOne":
      return <h1 {...attributes}>{children}</h1>;
    case "headingTwo":
      return <h2 {...attributes}>{children}</h2>;
    case "headingThree":
      return <h3 {...attributes}>{children}</h3>;
    case "blockquote":
      return <blockquote {...attributes}>{children}</blockquote>;
    case "alignLeft":
      return (
        <div
          style={{ textAlign: "left", listStylePosition: "inside" }}
          {...attributes}
        >
          {children}
        </div>
      );
    case "alignCenter":
      return (
        <div
          style={{ textAlign: "center", listStylePosition: "inside" }}
          {...attributes}
        >
          {children}
        </div>
      );
    case "alignRight":
      return (
        <div
          style={{ textAlign: "right", listStylePosition: "inside" }}
          {...attributes}
        >
          {children}
        </div>
      );
    default:
      return <p {...attributes}>{children}</p>;
  }
};

const Leaf: React.FC<RenderLeafProps> = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }
  // if (leaf.code) {
  //   children = <code>{children}</code>;
  // }
  if (leaf.italic) {
    children = <em>{children}</em>;
  }
  if (leaf.strikethrough) {
    children = (
      <span style={{ textDecoration: "line-through" }}>{children}</span>
    );
  }
  if (leaf.underline) {
    children = <u>{children}</u>;
  }
  if (leaf.superscript) {
    children = <sup>{children}</sup>;
  }
  if (leaf.subscript) {
    children = <sub>{children}</sub>;
  }
  if (leaf.color) {
    children = <span style={{ color: leaf.color }}>{children}</span>;
  }
  // if (leaf.bgColor) {
  //   children = (
  //     <span style={{ backgroundColor: leaf.bgColor }}>{children}</span>
  //   );
  // }
  if (leaf.fontSize) {
    // const size = sizeMap[leaf.fontSize];
    children = <span style={{ fontSize: leaf.fontSize }}>{children}</span>;
  }
  return <span {...attributes}>{children}</span>;
};

const escapeHtml = (str: string): string => {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
};

const insertBreak = (editor: Editor) => {
  const { selection } = editor;
  if (selection) {
    Transforms.insertText(editor, "\n");
  }
};

const handleKeyDown = (
  event: React.KeyboardEvent<HTMLDivElement>,
  editor: Editor
) => {
  if (event.key === "Enter") {
    if (event.shiftKey) {
      event.preventDefault();
      insertBreak(editor);
    }
  }
};

const SlateEditor: React.FC = () => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const [serializedValue, setSerializedValue] = useState("");

  const [value, setValue] = useState<Descendant[]>([
    {
      type: "paragraph",
      children: [{ text: "" }],
    },
  ]);

  const renderElement = useCallback(
    (props: RenderElementProps) => <Element {...props} />,
    []
  );
  const renderLeaf = useCallback(
    (props: RenderLeafProps) => <Leaf {...props} />,
    []
  );

  const handleButtonClick = () => {
    setSerializedValue(serialize(value));
  };

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={(newValue) => setValue(newValue)}
    >
      <div className="wrapper">
        <Toolbar />
        <input placeholder="제목을 입력해주세요" className="input"></input>

        <div
          className="editor-wrapper"
          style={{ border: "1px solid #f3f3f3", padding: "0 10px" }}
        >
          <Editable
            placeholder="글을 작성해보세요"
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            onKeyDown={(event) => handleKeyDown(event, editor)}
          />
        </div>

        <div className="w-full">
          <button
            onClick={handleButtonClick}
            className="mt-4 p-2 bg-blue-500 text-white rounded"
          >
            Show HTML
          </button>
          <h2>HTML Output:</h2>
          <div>{serializedValue}</div>
          <div
            className="editorwrapper"
            dangerouslySetInnerHTML={{ __html: serializedValue }}
          />
        </div>
      </div>
    </Slate>
  );
};

export default SlateEditor;
