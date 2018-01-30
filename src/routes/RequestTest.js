import React, { Component } from 'react';
import { connect } from 'dva';
import { Bind } from 'lodash-decorators';
import {
  Row,
  Col, Button,
  Icon, Card,
  Input, Form,
  Select
} from 'antd';
import numeral from 'numeral';
import Trend from '../components/Trend';
import NumberInfo from '../components/NumberInfo';
import { getTimeDistance } from '../utils/utils';
import prism from 'prismjs';

const InputGroup = Input.Group;
const TextArea = Input.TextArea;
const Option = Select.Option;

@connect((p) => ({
  responseJson: p['request-test'].responseJson,
  loading: p.loading.effects['request-test/submit'],
}))
@Form.create()
export default class RequestTest extends Component {

  @Bind()
  submitRequest() {
    const { getFieldValue } = this.props.form;
    this.props.dispatch({
      type: 'request-test/submit',
      payload: {
        url: getFieldValue('url'),
        method: getFieldValue('method'),
        body: getFieldValue('body'),
        headers: getFieldValue('headers')
      }
    });
  }

  render() {

    const { responseJson, form } = this.props;
    const { getFieldDecorator } = form;
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
              {getFieldDecorator('method', {
                initialValue: 'GET'
              })(
                <Select>
                  <Option value="GET">GET</Option>
                  <Option value="POST">POST</Option>
                  <Option value="PUT">PUT</Option>
                  <Option value="DELETE">DELETE</Option>
                  <Option value="HEAD">HEAD</Option>
                </Select>
              )}
              {getFieldDecorator('url', {
                initialValue: '/data/users'
              })(
                <Input style={{ width: '50%' }} />
              )}
              <Button type="primary" onClick={this.submitRequest}>Request!</Button>
            </InputGroup>
          </Col>
        </Row>
        <Row gutter={16} style={{ padding: 5 }}>
          <Col span={16}>
            {getFieldDecorator('body')(
              <TextArea rows={4} placeholder="request body..."></TextArea>
            )}
          </Col>
          <Col span={8}>
            {getFieldDecorator('headers')(
              <TextArea rows={4} placeholder="request headers..."></TextArea>
            )}
          </Col>
        </Row>
        <Row gutter={16} style={{ padding: 5 }}>
          <Col span={24}>
            <Card title="Response">
              <pre className="language-js">
                <code dangerouslySetInnerHTML={{
                  __html: prism.highlight(responseJson, prism.languages.javascript)
                }}></code>
              </pre>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
