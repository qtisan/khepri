import React, { Component } from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Icon,
  Card,
  Tabs,
  Table,
  Radio,
  DatePicker,
  Tooltip,
  Menu,
  Dropdown,
} from 'antd';
import numeral from 'numeral';
import {
  ChartCard,
  yuan,
  MiniArea,
  MiniBar,
  MiniProgress,
  Field,
  Bar,
  Pie,
  TimelineChart,
} from '../components/Charts';
import Trend from '../components/Trend';
import NumberInfo from '../components/NumberInfo';
import { getTimeDistance } from '../utils/utils';

const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

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
      </div>
    );
  }
}
