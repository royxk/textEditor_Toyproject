"use client";
import React, { useCallback, useMemo, useState } from "react";
import { createEditor, Descendant, Text, Transforms, Editor } from "slate";
import { withHistory } from "slate-history";
import {
  Slate,
  Editable,
  withReact,
  RenderElementProps,
  RenderLeafProps,
  ReactEditor,
} from "slate-react";

import Toolbar from "./components/Toolbar";

// Define custom element types
interface CustomElement {
  type: string;
  children: Descendant[];
  [key: string]: any;
}

interface CustomLeaf {
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
    case "list-item":
      return <li {...attributes}>{children}</li>;
    case "orderedList":
      return (
        <ol type="1" {...attributes}>
          {children}
        </ol>
      );
    case "unorderedList":
      return <ul {...attributes}>{children}</ul>;
    // case "link":
    //   return (
    //     <Link {...(element as any)} {...attributes}>
    //       {children}
    //     </Link>
    //   );
    case "table":
      return (
        <table>
          <tbody {...attributes}>{children}</tbody>
        </table>
      );
    case "table-row":
      return <tr {...attributes}>{children}</tr>;
    case "table-cell":
      return <td {...attributes}>{children}</td>;
    // case "image":
    //   return <Image {...(element as any)} {...attributes} />;
    // case "video":
    //   return <Video {...(element as any)} {...attributes} />;
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
  if (leaf.bgColor) {
    children = (
      <span style={{ backgroundColor: leaf.bgColor }}>{children}</span>
    );
  }
  // if (leaf.fontSize) {
  //   const size = sizeMap[leaf.fontSize];
  //   children = <span style={{ fontSize: size }}>{children}</span>;
  // }
  // if (leaf.fontFamily) {
  //   const family = fontFamilyMap[leaf.fontFamily];
  //   children = <span style={{ fontFamily: family }}>{children}</span>;
  // }
  return <span {...attributes}>{children}</span>;
};

const serialize = (node: Descendant[]): string => {
  return node.map((n) => serializeNode(n)).join("");
};

const serializeNode = (node: any): string => {
  if (Text.isText(node)) {
    let text = escapeHtml(node.text);
    text = text.replace(/\n/g, "<br>");
    if (node.bold) {
      text = `<strong>${text}</strong>`;
    }
    if (node.italic) {
      text = `<em>${text}</em>`;
    }
    if (node.underline) {
      text = `<u>${text}</u>`;
    }
    if (node.strikethrough) {
      text = `<del>${text}</del>`;
    }
    if (node.superscript) {
      text = `<sup>${text}</sup>`;
    }
    if (node.subscript) {
      text = `<sub>${text}</sub>`;
    }
    if (node.color) {
      text = `<span style="color: ${node.color}">${text}</span>`;
    }
    if (node.bgColor) {
      text = `<span style="background-color: ${node.bgColor}">${text}</span>`;
    }
    if (node.fontSize) {
      text = `<span style="font-size: ${node.fontSize}">${text}</span>`;
    }
    if (node.fontFamily) {
      text = `<span style="font-family: ${node.fontFamily}">${text}</span>`;
    }
    return text;
  }

  const children = node.children.map((n: any) => serializeNode(n)).join("");
  switch (node.type) {
    case "paragraph":
      return `<p>${children}</p>`;
    case "headingOne":
      return `<h1>${children}</h1>`;
    case "headingTwo":
      return `<h2>${children}</h2>`;
    case "headingThree":
      return `<h3>${children}</h3>`;
    case "blockquote":
      return `<blockquote>${children}</blockquote>`;
    case "orderedList":
      return `<ol>${children}</ol>`;
    case "unorderedList":
      return `<ul>${children}</ul>`;
    case "list-item":
      return `<li>${children}</li>`;
    case "table":
      return `<table>${children}</table>`;
    case "table-row":
      return `<tr>${children}</tr>`;
    case "table-cell":
      return `<td>${children}</td>`;
    default:
      return `<div>${children}</div>`;
  }
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

  const [value, setValue] = useState<Descendant[]>([
    {
      type: "paragraph",
      children: [{ text: "글을 작성해보세요:)." }],
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

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={(newValue) => setValue(newValue)}
    >
      <Toolbar />
      <input className="p-15"></input>
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
      <div>
        {/* <h2>HTML Output:</h2>
        <div dangerouslySetInnerHTML={{ __html: serialize(value) }} /> */}
        <div>{serialize(value)}</div>
      </div>
    </Slate>
  );
};

export default SlateEditor;
