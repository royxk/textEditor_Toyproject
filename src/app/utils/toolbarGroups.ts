// toolbarGroups.ts
import { ToolbarGroup } from "../type/custom-types";
import black from "../assets/black.svg";

const toolbarGroups: ToolbarGroup[] = [
  [
    {
      id: 1,
      format: "fontSize",
      type: "dropdown",
      options: [
        { text: "본문", value: "16px" },
        { text: "제목 1", value: "150px" },
        { text: "제목 2", value: "120px" },
        { text: "제목 3", value: "100px" },
      ],
    },
  ],
  [
    {
      id: 2,
      format: "color",
      type: "dropdown",
      options: [
        { text: "검정", value: "black", image: black },
        { text: "빨강", value: "red" },
        { text: "파랑", value: "blue" },
        { text: "회색", value: "gray" },
      ],
    },
    {
      id: 11,
      format: "color",
      type: "popover",
      options: [
        { text: "검정", value: "black" },
        { text: "빨강", value: "red" },
        { text: "파랑", value: "blue" },
        { text: "회색", value: "gray" },
      ],
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
