import React from 'react';
import { routerRedux, Route, Switch } from 'dva/router';
import { LocaleProvider, Spin } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import dynamic from 'dva/dynamic';
import { getRouterData } from './common/router';
import Authorized from './utils/Authorized';
import styles from './index.less';

const { ConnectedRouter } = routerRedux;
const { AuthorizedRoute } = Authorized;
dynamic.setDefaultLoadingComponent(() => {
  return <Spin size="large" className={styles.globalSpin} />;
});

function RouterConfig({ history, app }) {
  const routerData = getRouterData(app);
  const UserLayout = routerData['/user'].component;
  const BasicLayout = routerData['/'].component;
  // TODO: need dynamic generate routes with authentication.
  return (
    <LocaleProvider locale={zhCN}>
      <ConnectedRouter history={history}>
        <Switch>
          <AuthorizedRoute
            path="/user"
            render={props => <UserLayout {...props} />}
            authority="guest"
            redirectPath="/"
          />
          <AuthorizedRoute
            path="/"
            render={props => <BasicLayout {...props} />}
            authority={genAuths([
              'du856thfk3fto95_mnf',
              'du85ep8nvjhtvyrdb6d',
              'du85hvovbb6toeslhfk',
              'du8dbqakyl5tvm3m7oz',
              'du8dyhkb83etve_agdh',
              'dugkarn8vzmr9djej9e'
            ])}
            redirectPath="/user/login"
          />
        </Switch>
      </ConnectedRouter>
    </LocaleProvider>
  );
}

function genAuths(authoritiy) {
  return currentAuthority => 
    !!((currentAuthority || 'guest').split(',').filter(
      ca => authoritiy.indexOf(ca) !== -1).length);
}

export default RouterConfig;
