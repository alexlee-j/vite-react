import React from "react";
import "./iconFont.less";
/***
 * name: 去图标库查看
 * iconfont 字体图标封装。图标库：xxxx
 */
const IconFont: React.FC<{
  name: string;
  onClick?: React.MouseEventHandler<SVGSVGElement>;
  style?: React.CSSProperties;
}> = ({ name, onClick, ...p }) => {
  return (
    <svg
      className="icon-font"
      {...p}
      fill="#fff"
      aria-hidden="true"
      onClick={onClick}
    >
      <use xlinkHref={"#icon-" + name} />
    </svg>
  );
};

export default IconFont;
