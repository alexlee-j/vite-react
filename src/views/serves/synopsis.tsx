import React from "react";
import { Col, Row, Flex, Popover } from "antd";
import "./synopsis.scss";
import { InformationData } from "@/types/synopsis";
import { QuestionCircleOutlined } from "@ant-design/icons";

const infomationData: InformationData[] = [
  {
    key: "1",
    label: "实例ID",
    value: (Math.random() * 1000).toString(),
  },
  {
    key: "2",
    label: "实例名称",
    value: "CentOS7.6-Docker26-XGsb",
  },
  {
    key: "3",
    label: "实例状态",
    value: "运行中",
  },
  {
    key: "4",
    label: "地域和可用区",
    value: "广州   |   广州七区",
  },
  {
    key: "5",
    label: "套餐类型",
    value: "新客专享型",
  },
  {
    key: "6",
    label: "实例规格",
    value: "CPU - 2核 内存 - 2GB<br />系统盘 - SSD云硬盘 40GB",
    icon: <QuestionCircleOutlined />,
    popOverContent: (
      <ul>
        <li>独享100%CPU；</li>
        <li>
          云硬盘采用多副本冗余机制对数据进行存储，提供99.9999999%的数据可靠性，支持使用快照进行备份；
        </li>
        <li>流量包仅对实例的出流量进行统计。</li>
      </ul>
    ),
  },
  {
    key: "7",
    label: "密钥",
    value: "暂未绑定",
  },
  {
    key: "8",
    label: "到期时间",
    value: "2030-01-01 00:00:00",
  },
];

const Information: React.FC = () => (
  <div className="lighthouse-card">
    <div className="title">实例信息</div>
    <div>
      {infomationData.map((item) => {
        return (
          <Flex key={item.key} align="center">
            <div className="information-left">
              {item.label}
              <Popover content={item.popOverContent} className="popOverContent">
                <span>{item.icon}</span>
              </Popover>
            </div>
            <div className="information-right">{item.value}</div>
          </Flex>
        );
      })}
    </div>
  </div>
);
const Synopsis: React.FC = () => (
  <Row gutter={16}>
    <Col span={12}>
      <Information />
    </Col>
    <Col span={12}>
      <Information />
    </Col>
  </Row>
);

export default Synopsis;
