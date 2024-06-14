import React from "react";
import {
  MdFormatBold,
  MdFormatItalic,
  MdStrikethroughS,
  MdFormatUnderlined,
  MdFormatQuote,
  MdFormatAlignLeft,
  MdFormatAlignCenter,
  MdFormatAlignRight,
  MdFormatListNumbered,
  MdFormatListBulleted,
  MdImage,
  MdAdd,
} from "react-icons/md";
import { FaSuperscript, FaSubscript } from "react-icons/fa";
import bold from "../assets/bold.svg";
import italic from "../assets/italic.svg";
import underline from "../assets/underline.svg";
import alignCenter from "../assets/alignCenter.svg";
import alignLeft from "../assets/alignLeft.svg";
import alignRight from "../assets/alignRight.svg";
import image from "../assets/image.svg";

const iconList: { [key: string]: JSX.Element } = {
  bold: <MdFormatBold size={20} />,
  italic: <MdFormatItalic size={20} />,
  strikethrough: <MdStrikethroughS size={20} />,
  underline: <MdFormatUnderlined size={20} />,
  blockquote: <MdFormatQuote size={20} />,
  superscript: <FaSuperscript size={15} />,
  subscript: <FaSubscript size={15} />,
  alignLeft: <MdFormatAlignLeft size={20} />,
  alignCenter: <MdFormatAlignCenter size={20} />,
  alignRight: <MdFormatAlignRight size={20} />,
  orderedList: <MdFormatListNumbered size={20} />,
  unorderedList: <MdFormatListBulleted size={20} />,
  image: <MdImage size={20} />,
  add: <MdAdd size={20} />,
};

interface IconProps {
  icon: keyof typeof iconList;
}

const Icon: React.FC<IconProps> = ({ icon }) => {
  return iconList[icon] || null;
};

export default Icon;
