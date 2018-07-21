import React from 'react';
import { routerRedux, Route, Switch } from 'dva/router';
import { LocaleProvider, Spin } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import dynamic from 'dva/dynamic';
import { getRouterData } from './common/router';
import Authorized from './utils/Authorized';
import { checkAuthority } from './utils/authority';
import styles from './index.less';

const { ConnectedRouter } = routerRedux;
const { AuthorizedRoute } = Authorized;
dynamic.setDefaultLoadingComponent(() => {
  return <Spin size="large" className={styles.globalSpin} />;
});

function RouterConfig({ history, app }) {
  const routerData = getRouterData(app);
  const UserLayout = routerData['/passport'].component;
  const BasicLayout = routerData['/'].component;
  // TODO: need dynamic generate routes with authentication.
  return (
    <LocaleProvider locale={zhCN}>
      <ConnectedRouter history={history}>
        <Switch>
          <AuthorizedRoute
            path="/passport"
            render={props => <UserLayout {...props} />}
            authority="guest"
            redirectPath="/"
          />
          <AuthorizedRoute
            path="/"
            render={props => <BasicLayout {...props} />}
            authority={checkAuthority(
              'du856thfk3fto95_mnf,' +
              'du85ep8nvjhtvyrdb6d,' +
              'du85hvovbb6toeslhfk,' +
              'du8dbqakyl5tvm3m7oz,' +
              'du8dyhkb83etve_agdh,' +
              'dugkarn8vzmr9djej9e,'
            )}
            redirectPath="/passport/login"
          />
        </Switch>
      </ConnectedRouter>
    </LocaleProvider>
  );
}

export default RouterConfig;
