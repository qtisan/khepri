import React, { Component } from 'react';
import { connect } from 'dva';
import {
  Row,
  Col, Button,
  Icon, Card,
  Input,
  Select
} from 'antd';
import numeral from 'numeral';
import Trend from '../components/Trend';
import NumberInfo from '../components/NumberInfo';
import { getTimeDistance } from '../utils/utils';

const InputGroup = Input.Group;
const TextArea = Input.TextArea;
const Option = Select.Option;

const defaultResponse = {
  success: true,
  message: 'success',
  body: {
    foo: 'hello, it is the default!'
  }
};

@connect(({ chart, loading }) => ({
  chart,
  loading: loading.effects['chart/fetch'],
}))
export default class RequestTest extends Component {

  componentDidMount() {
    
  }

  componentWillUnmount() {
    
  }

  render() {

    return (
      <div>
        <Row gutter={16}>
          <Col span={24}>
            <h1>请求测试</h1>
          </Col>
        </Row>
        <Row gutter={16} style={{padding: 5}}>
          <Col span={24}>
            <InputGroup compact>
              <Select defaultValue="GET">
                <Option value="GET">GET</Option>
                <Option value="POST">POST</Option>
                <Option value="PUT">PUT</Option>
                <Option value="DELETE">DELETE</Option>
                <Option value="HEAD">HEAD</Option>
              </Select>
              <Input style={{ width: '50%' }} defaultValue="/data/test" />
              <Button type="primary">Request!</Button>
            </InputGroup>
          </Col>
        </Row>
        <Row gutter={16} style={{ padding: 5 }}>
          <Col span={16}>
            <TextArea rows={4} placeholder="request body..."></TextArea>
          </Col>
          <Col span={8}>
            <TextArea rows={4} placeholder="request header..."></TextArea>
          </Col>
        </Row>
        <Row gutter={16} style={{ padding: 5 }}>
          <Col span={24}>
            <Card title="Response">
              <code>
                {JSON.stringify(defaultResponse)}
              </code>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
