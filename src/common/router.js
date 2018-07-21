import { createElement } from 'react';
import dynamic from 'dva/dynamic';
import { getMenuData } from './menu';

let routerDataCache;

const routerDefault = [
  {
    "router_name": "仪表盘",
    "router_path": "/home/dashboard",
    "component_path": "routes/Dashboard/Analysis",
    "ref_models": [
      "chart"
    ],
    "authority": "dugkarn8vzmr9djej9e,du85ep8nvjhtvyrdb6d"
  },
  {
    "router_name": "首页",
    "router_path": "/",
    "component_path": "layouts/BasicLayout",
    "ref_models": [
      "user",
      "login"
    ],
    "authority": "dugkarn8vzmr9djej9e,du85ep8nvjhtvyrdb6d"
  },
  {
    "router_name": "所有用户",
    "router_path": "/system/user/users",
    "component_path": "routes/Dashboard/Analysis",
    "ref_models": [
      "chart"
    ],
    "authority": "du85ep8nvjhtvyrdb6d,du8dyhkb83etve_agdh"
  },
  {
    "router_name": "用户组",
    "router_path": "/system/user/group",
    "component_path": "routes/Dashboard/Analysis",
    "ref_models": [
      "chart"
    ],
    "authority": "du85ep8nvjhtvyrdb6d,du8dyhkb83etve_agdh"
  },
  {
    "router_name": "菜单管理",
    "router_path": "/system/privilege/menu",
    "component_path": "routes/Dashboard/Analysis",
    "ref_models": [
      "chart"
    ],
    "authority": "du85ep8nvjhtvyrdb6d,du856thfk3fto95_mnf"
  },
  {
    "router_name": "系统角色",
    "router_path": "/system/privilege/role",
    "component_path": "routes/Dashboard/Analysis",
    "ref_models": [
      "chart"
    ],
    "authority": "du85ep8nvjhtvyrdb6d,du856thfk3fto95_mnf"
  },
  {
    "router_name": "用户概要",
    "router_path": "/user/dashboard",
    "component_path": "routes/Dashboard/Analysis",
    "ref_models": [
      "chart"
    ],
    "authority": "dugkarn8vzmr9djej9e,du85ep8nvjhtvyrdb6d"
  },
  {
    "router_name": "更新信息",
    "router_path": "/user/info/update",
    "component_path": "routes/Dashboard/Analysis",
    "ref_models": [
      "chart"
    ],
    "authority": "dugkarn8vzmr9djej9e,du85ep8nvjhtvyrdb6d"
  },
  {
    "router_name": "修改密码",
    "router_path": "/user/info/password",
    "component_path": "routes/Dashboard/Analysis",
    "ref_models": [
      "chart"
    ],
    "authority": "dugkarn8vzmr9djej9e,du85ep8nvjhtvyrdb6d"
  },
  {
    "router_name": "收件箱",
    "router_path": "/user/message/inbox",
    "component_path": "routes/Dashboard/Analysis",
    "ref_models": [
      "chart"
    ],
    "authority": "dugkarn8vzmr9djej9e,du85ep8nvjhtvyrdb6d"
  },
  {
    "router_name": "已发送",
    "router_path": "/user/message/sent",
    "component_path": "routes/Dashboard/Analysis",
    "ref_models": [
      "chart"
    ],
    "authority": "dugkarn8vzmr9djej9e,du85ep8nvjhtvyrdb6d"
  },
  {
    "router_name": "标签分类",
    "router_path": "/user/message/tag",
    "component_path": "routes/Dashboard/Analysis",
    "ref_models": [
      "chart"
    ],
    "authority": "dugkarn8vzmr9djej9e,du85ep8nvjhtvyrdb6d"
  },
  {
    "router_name": "联系人",
    "router_path": "/user/contact",
    "component_path": "routes/Dashboard/Analysis",
    "ref_models": [
      "chart"
    ],
    "authority": "dugkarn8vzmr9djej9e,du85ep8nvjhtvyrdb6d"
  },
  {
    "router_name": "我的文件",
    "router_path": "/user/attach",
    "component_path": "routes/Dashboard/Analysis",
    "ref_models": [
      "chart"
    ],
    "authority": "dugkarn8vzmr9djej9e,du85ep8nvjhtvyrdb6d"
  },
  {
    "router_name": "系统通知",
    "router_path": "/user/notice",
    "component_path": "routes/Dashboard/Analysis",
    "ref_models": [
      "chart"
    ],
    "authority": "dugkarn8vzmr9djej9e,du85ep8nvjhtvyrdb6d"
  },
  {
    "router_name": "我的设置",
    "router_path": "/user/setting",
    "component_path": "routes/Dashboard/Analysis",
    "ref_models": [
      "chart"
    ],
    "authority": "dugkarn8vzmr9djej9e,du85ep8nvjhtvyrdb6d"
  }
];

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

  const rs = routerDefault;
  rs.push({
    router_name: '授权',
    router_path: '/passport',
    component_path: 'layouts/UserLayout',
    ref_models: [],
    authority: null
  }, {
      router_name: '登陆',
      router_path: '/passport/login',
      component_path: 'routes/User/Login',
      ref_models: ['login'],
      authority: null
    }, {
      router_name: '注册',
      router_path: '/passport/register',
      component_path: 'routes/User/Register',
      ref_models: ['register'],
      authority: null
    }, {
      router_name: '注册结果',
      router_path: '/passport/register-result',
      component_path: 'routes/User/RegisterResult',
      ref_models: [],
      authority: null
    }, {
      router_name: '请求测试',
      router_path: '/request-test',
      component_path: 'routes/RequestTest',
      ref_models: ['request-test'],
      authority: null
    });

  return rs;
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
    const menuItem = menuData[item] || {};
    routerData[item] = {
      ...routerConfig[item],
      name: routerConfig[item].name || menuItem.name,
      authority: routerConfig[item].authority || menuItem.authority,
    };
  });
  return routerData;
};
