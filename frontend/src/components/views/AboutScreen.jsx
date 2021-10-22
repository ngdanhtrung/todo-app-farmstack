import React from 'react';
import { Row, Col, Card, Avatar, Typography} from "antd";

export const AboutScreen = () => {
  const { Text } = Typography;
  return (
    <>
      <Row>
        <Col span={12} offset={6}>
          <Card title='About Me'>
            <Text
              strong
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              NGUYỄN DANH TRUNG
            </Text>
            <br />
            <Text
              strong
              italic
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              4501104260
            </Text>
            <br />
            <Text
              strong
              italic
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Đây là bài tập môn công nghệ Web của trường Đại học Sư Phạm Thành
              Phố Hồ Chí Minh
            </Text>
          </Card>
        </Col>
      </Row>
    </>
  );
}

