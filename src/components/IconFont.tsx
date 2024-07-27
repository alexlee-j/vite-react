import React from "react";
import "./iconFont.less";
/***
 * name: 去图标库查看
 * iconfont 字体图标封装。图标库：xxxx
 */
const IconFont: React.FC<{ name: string; style?: React.CSSProperties }> = ({
  name,
  ...p
}) => {
  return (
    <svg className="icon-font" {...p} aria-hidden="true">
      <use xlinkHref={"#icon-" + name} />
    </svg>
  );
};

export default IconFont;
