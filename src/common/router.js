import { createElement } from 'react';
import dynamic from 'dva/dynamic';
import { getMenuData } from './menu';

let routerDataCache;

const modelNotExisted = (app, model) => (
  // eslint-disable-next-line
  !app._models.some(({ namespace }) => {
    return namespace === model.substring(model.lastIndexOf('/') + 1);
  })
);

// wrapper of dynamic
const dynamicWrapper = (app, models, component) => {
  // () => require('module')
  // transformed by babel-plugin-dynamic-import-node-sync
  if (component.toString().indexOf('.then(') < 0) {
    models.forEach((model) => {
      if (modelNotExisted(app, model)) {
        // eslint-disable-next-line
        app.model(require(`../models/${model}`).default);
      }
    });
    return (props) => {
      if (!routerDataCache) {
        routerDataCache = getRouterData(app);
      }
      return createElement(component().default, {
        ...props,
        routerData: routerDataCache,
      });
    };
  }
  // () => import('module')
  return dynamic({
    app,
    models: () => models.filter(
      model => modelNotExisted(app, model)).map(m => import(`../models/${m}.js`)
    ),
    // add routerData prop
    component: () => {
      if (!routerDataCache) {
        routerDataCache = getRouterData(app);
      }
      return component().then((raw) => {
        const Component = raw.default || raw;
        return props => createElement(Component, {
          ...props,
          routerData: routerDataCache,
        });
      });
    },
  });
};

function getFlatMenuData(menus) {
  let keys = {};
  menus.forEach((item) => {
    if (item.children) {
      keys[item.path] = { ...item };
      keys = { ...keys, ...getFlatMenuData(item.children) };
    } else {
      keys[item.path] = { ...item };
    }
  });
  return keys;
}

function getRouterTable() {

  // (function (ctx) {
  //   console.log(ctx.keys());
  // })(require.context('../routes', true, /\.js$/));

  return [{
      router_name: null,
      router_path: '/',
      component_path: 'layouts/BasicLayout',
      ref_models: ['user', 'login'],
      authority: null
    }, {
      router_name: null,
      router_path: '/dashboard/analysis',
      component_path: 'routes/Dashboard/Analysis',
      ref_models: ['chart'],
      authority: null
    }, {
      router_name: null,
      router_path: '/dashboard/monitor',
      component_path: 'routes/Dashboard/Monitor',
      ref_models: ['monitor'],
      authority: null
    }, {
      router_name: null,
      router_path: '/dashboard/workplace',
      component_path: 'routes/Dashboard/Workplace',
      ref_models: ['project', 'activities', 'chart'],
      authority: null
    }, {
      router_name: null,
      router_path: '/form/basic-form',
      component_path: 'routes/Forms/BasicForm',
      ref_models: ['form'],
      authority: null
    }, {
      router_name: null,
      router_path: '/user',
      component_path: 'layouts/UserLayout',
      ref_models: [],
      authority: null
    }, {
      router_name: null,
      router_path: '/user/login',
      component_path: 'routes/User/Login',
      ref_models: ['login'],
      authority: null
    }, {
      router_name: null,
      router_path: '/user/register',
      component_path: 'routes/User/Register',
      ref_models: ['register'],
      authority: null
    }, {
      router_name: null,
      router_path: '/user/register-result',
      component_path: 'routes/User/RegisterResult',
      ref_models: [],
      authority: null
    }, {
      router_name: null,
      router_path: '/request-test',
      component_path: 'routes/RequestTest',
      ref_models: ['request-test'],
      authority: null
    },];
}

export const getRouterData = (app) => {
  const routerConfig = {};
  getRouterTable().forEach(({router_path, component_path, ref_models, authority, router_name}) => {
    let com = component_path.indexOf('layouts') === 0 ? 
      () => import(`../layouts${component_path.substr(7)}.js`) :
      () => import(`../routes${component_path.substr(6)}.js`);
    routerConfig[router_path] = {
      component: dynamicWrapper(app, ref_models, com),
      name: router_name, authority, 
    }
  });
  
  // Get name from ./menu.js or just set it in the router data.
  const menuData = getFlatMenuData(getMenuData());
  const routerData = {};
  Object.keys(routerConfig).forEach((item) => {
    const menuItem = menuData[item.replace(/^\//, '')] || {};
    routerData[item] = {
      ...routerConfig[item],
      name: routerConfig[item].name || menuItem.name,
      authority: routerConfig[item].authority || menuItem.authority,
    };
  });
  return routerData;
};
