import { useEffect, useState } from "react";
import { Editor, Element, Node } from "slate";
import { CustomElement } from "../type/custom-types";

const useTable = (editor: Editor): boolean => {
  const [isTable, setIsTable] = useState(false);

  useEffect(() => {
    if (editor.selection) {
      const [tableNode] = Editor.nodes(editor, {
        match: (n: Node) =>
          !Editor.isEditor(n) &&
          Element.isElement(n) &&
          (n as Element).type === "table",
      });

      setIsTable(!!tableNode);
    }
  }, [editor.selection, editor]);

  return isTable;
};

export default useTable;
