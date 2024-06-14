import React, { useEffect, useState } from "react";
import { useSlate } from "slate-react";
import Button from "./Button";
import Icon from "./Icon";
import useTable from "../utils/useTable";
import defaultToolbarGroups from "../utils/toolbarGroups";
import "./styles.css";
import { ToolbarGroup, ToolbarElement } from "../type/custon-types";
import {
  toggleBlock,
  toggleMark,
  isMarkActive,
  addMarkData,
  isBlockActive,
  activeMark,
} from "../utils/SlateUtilityFunction";

type MarkFormat =
  | "bold"
  | "italic"
  | "underline"
  | "strikethrough"
  | "superscript"
  | "subscript"
  | "color"
  | "bgColor"
  | "fontSize"
  | "fontFamily";

type BlockFormat =
  | "alignLeft"
  | "alignCenter"
  | "alignRight"
  | "orderedList"
  | "unorderedList";

type EmbedFormat = "image" | "video";

type ToolbarFormat = MarkFormat | BlockFormat | EmbedFormat;

const Toolbar: React.FC = () => {
  const editor = useSlate();
  const isTable = useTable(editor);
  const [toolbarGroups, setToolbarGroups] =
    useState<ToolbarGroup[]>(defaultToolbarGroups);

  useEffect(() => {
    let filteredGroups = [...defaultToolbarGroups];
    if (isTable) {
      filteredGroups = toolbarGroups.map((grp) =>
        grp.filter((element) => element.type !== "block")
      );
      filteredGroups = filteredGroups.filter((elem) => elem.length);
    }
    setToolbarGroups(filteredGroups);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTable]);

  const BlockButton: React.FC<{ format: BlockFormat }> = ({ format }) => (
    <Button
      active={isBlockActive(editor, format)}
      format={format}
      onMouseDown={(e) => {
        e.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      <Icon icon={format} />
    </Button>
  );

  const MarkButton: React.FC<{ format: MarkFormat }> = ({ format }) => (
    <Button
      active={isMarkActive(editor, format)}
      format={format}
      onMouseDown={(e) => {
        e.preventDefault();
        toggleMark(editor, format);
      }}
    >
      <Icon icon={format} />
    </Button>
  );

  const Dropdown: React.FC<{
    format: MarkFormat;
    options: { value: string; text: string }[];
  }> = ({ format, options }) => (
    <select
      value={activeMark(editor, format)}
      onChange={(e) => changeMarkData(e, format)}
    >
      {options.map((item, index) => (
        <option key={index} value={item.value}>
          {item.text}
        </option>
      ))}
    </select>
  );

  const changeMarkData = (
    event: React.ChangeEvent<HTMLSelectElement>,
    format: MarkFormat
  ) => {
    event.preventDefault();
    const value = event.target.value;
    addMarkData(editor, { format, value });
  };

  return (
    <div className="toolbar">
      {toolbarGroups.map((group, index) => (
        <span key={index} className="toolbar-grp">
          {group.map((element: ToolbarElement) => {
            switch (element.type) {
              case "dropdown":
                return (
                  <Dropdown
                    key={element.id}
                    format={element.format as MarkFormat}
                    options={
                      element.options as { value: string; text: string }[]
                    }
                  />
                );

              case "block":
                return (
                  <BlockButton
                    key={element.id}
                    format={element.format as BlockFormat}
                  />
                );
              case "mark":
                return (
                  <MarkButton
                    key={element.id}
                    format={element.format as MarkFormat}
                  />
                );

              default:
                return <button key={element.id}>Invalid Button</button>;
            }
          })}
        </span>
      ))}
    </div>
  );
};

export default Toolbar;
