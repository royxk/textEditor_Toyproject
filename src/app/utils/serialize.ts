import { Descendant, Text } from "slate";

const escapeHtml = (str: string): string => {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
};

export const serialize = (node: Descendant[]): string => {
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
