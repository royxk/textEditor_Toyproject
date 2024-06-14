// toolbarGroups.ts
import { ToolbarGroup } from "../type/custon-types";

const toolbarGroups: ToolbarGroup[] = [
  [
    {
      id: 1,
      format: "fontSize",
      type: "dropdown",
      options: [
        { text: "Small", value: "small" },
        { text: "Normal", value: "normal" },
        { text: "Medium", value: "medium" },
        { text: "Huge", value: "huge" },
      ],
    },
  ],
  [
    {
      id: 2,
      format: "color",
      type: "color-picker",
    },
    {
      id: 3,
      format: "bgColor",
      type: "color-picker",
    },
  ],
  [
    {
      id: 4,
      format: "bold",
      type: "mark",
    },
    {
      id: 5,
      format: "italic",
      type: "mark",
    },
    {
      id: 6,
      format: "underline",
      type: "mark",
    },
  ],

  [
    {
      id: 7,
      format: "alignLeft",
      type: "block",
    },
    {
      id: 8,
      format: "alignCenter",
      type: "block",
    },
    {
      id: 9,
      format: "alignRight",
      type: "block",
    },
  ],
  [
    {
      id: 10,
      format: "image",
      type: "embed",
    },
  ],
];

export default toolbarGroups;
