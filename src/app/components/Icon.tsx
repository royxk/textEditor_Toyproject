import React from "react";
import BoldIcon from "../assets/bold.svg";
import ItalicIcon from "../assets/italic.svg";
import UnderlineIcon from "../assets/underline.svg";
import AlignCenterIcon from "../assets/alignCenter.svg";
import AlignLeftIcon from "../assets/alignLeft.svg";
import AlignRightIcon from "../assets/alignRight.svg";
import ImageIcon from "../assets/image.svg";

const iconList: {
  [key: string]: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
} = {
  bold: BoldIcon,
  italic: ItalicIcon,
  strikethrough: UnderlineIcon, // Update with the correct icon
  underline: UnderlineIcon,
  blockquote: UnderlineIcon, // Update with the correct icon
  superscript: UnderlineIcon, // Update with the correct icon
  subscript: UnderlineIcon, // Update with the correct icon
  alignLeft: AlignLeftIcon,
  alignCenter: AlignCenterIcon,
  alignRight: AlignRightIcon,
  orderedList: UnderlineIcon, // Update with the correct icon
  unorderedList: UnderlineIcon, // Update with the correct icon
  image: ImageIcon,
  add: UnderlineIcon, // Update with the correct icon
};

interface IconProps {
  icon: keyof typeof iconList;
}

const Icon: React.FC<IconProps> = ({ icon }) => {
  const SvgIcon = iconList[icon];
  return SvgIcon ? <SvgIcon /> : null;
};

export default Icon;
