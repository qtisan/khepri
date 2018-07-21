import { checkAuthority } from '../utils/authority';

const menuData = [
  {
    "name": "首页",
    "icon": "home",
    "authority": "dugkarn8vzmr9djej9e,du85ep8nvjhtvyrdb6d",
    "path": "home",
    "menu_id": "home",
    "parent_id": null,
    "children": [
      {
        "name": "仪表盘",
        "icon": "dashboard",
        "authority": "dugkarn8vzmr9djej9e,du85ep8nvjhtvyrdb6d",
        "path": "dashboard",
        "menu_id": "home-dashboard",
        "parent_id": "home"
      }
    ]
  },
  {
    "name": "系统",
    "icon": "setting",
    "authority": "du85ep8nvjhtvyrdb6d,du856thfk3fto95_mnf,du8dyhkb83etve_agdh",
    "path": "system",
    "menu_id": "system",
    "parent_id": null,
    "children": [
      {
        "name": "用户管理",
        "icon": "team",
        "authority": "du85ep8nvjhtvyrdb6d,du8dyhkb83etve_agdh",
        "path": "user",
        "menu_id": "system-user",
        "parent_id": "system",
        "children": [
          {
            "name": "所有用户",
            "icon": null,
            "authority": "du85ep8nvjhtvyrdb6d,du8dyhkb83etve_agdh",
            "path": "users",
            "menu_id": "system-user-users",
            "parent_id": "system-user"
          },
          {
            "name": "用户组",
            "icon": null,
            "authority": "du85ep8nvjhtvyrdb6d,du8dyhkb83etve_agdh",
            "path": "group",
            "menu_id": "system-user-group",
            "parent_id": "system-user"
          }
        ]
      },
      {
        "name": "权限管理",
        "icon": "usb",
        "authority": "du85ep8nvjhtvyrdb6d,du856thfk3fto95_mnf",
        "path": "privilege",
        "menu_id": "system-privilege",
        "parent_id": "system",
        "children": [
          {
            "name": "菜单管理",
            "icon": null,
            "authority": "du85ep8nvjhtvyrdb6d,du856thfk3fto95_mnf",
            "path": "menu",
            "menu_id": "system-privilege-menu",
            "parent_id": "system-privilege"
          },
          {
            "name": "系统角色",
            "icon": null,
            "authority": "du85ep8nvjhtvyrdb6d,du856thfk3fto95_mnf",
            "path": "role",
            "menu_id": "system-privilege-role",
            "parent_id": "system-privilege"
          }
        ]
      }
    ]
  },
  {
    "name": "用户",
    "icon": "user",
    "authority": "dugkarn8vzmr9djej9e,du85ep8nvjhtvyrdb6d",
    "path": "user",
    "menu_id": "user",
    "parent_id": null,
    "children": [
      {
        "name": "用户概要",
        "icon": "dashboard",
        "authority": "dugkarn8vzmr9djej9e,du85ep8nvjhtvyrdb6d",
        "path": "dashboard",
        "menu_id": "user-dashboard",
        "parent_id": "user"
      },
      {
        "name": "个人信息",
        "icon": "idcard",
        "authority": "dugkarn8vzmr9djej9e,du85ep8nvjhtvyrdb6d",
        "path": "info",
        "menu_id": "user-info",
        "parent_id": "user",
        "children": [
          {
            "name": "更新信息",
            "icon": null,
            "authority": "dugkarn8vzmr9djej9e,du85ep8nvjhtvyrdb6d",
            "path": "update",
            "menu_id": "user-info-update",
            "parent_id": "user-info"
          },
          {
            "name": "修改密码",
            "icon": null,
            "authority": "dugkarn8vzmr9djej9e,du85ep8nvjhtvyrdb6d",
            "path": "password",
            "menu_id": "user-info-password",
            "parent_id": "user-info"
          }
        ]
      },
      {
        "name": "我的消息",
        "icon": "mail",
        "authority": "dugkarn8vzmr9djej9e,du85ep8nvjhtvyrdb6d",
        "path": "message",
        "menu_id": "user-message",
        "parent_id": "user",
        "children": [
          {
            "name": "收件箱",
            "icon": null,
            "authority": "dugkarn8vzmr9djej9e,du85ep8nvjhtvyrdb6d",
            "path": "inbox",
            "menu_id": "user-message-inbox",
            "parent_id": "user-message"
          },
          {
            "name": "已发送",
            "icon": null,
            "authority": "dugkarn8vzmr9djej9e,du85ep8nvjhtvyrdb6d",
            "path": "sent",
            "menu_id": "user-message-sent",
            "parent_id": "user-message"
          },
          {
            "name": "标签分类",
            "icon": null,
            "authority": "dugkarn8vzmr9djej9e,du85ep8nvjhtvyrdb6d",
            "path": "tag",
            "menu_id": "user-message-tag",
            "parent_id": "user-message"
          }
        ]
      },
      {
        "name": "联系人",
        "icon": "contacts",
        "authority": "dugkarn8vzmr9djej9e,du85ep8nvjhtvyrdb6d",
        "path": "contact",
        "menu_id": "user-contact",
        "parent_id": "user"
      },
      {
        "name": "我的文件",
        "icon": "file",
        "authority": "dugkarn8vzmr9djej9e,du85ep8nvjhtvyrdb6d",
        "path": "attach",
        "menu_id": "user-attach",
        "parent_id": "user"
      },
      {
        "name": "系统通知",
        "icon": "bulb",
        "authority": "dugkarn8vzmr9djej9e,du85ep8nvjhtvyrdb6d",
        "path": "notice",
        "menu_id": "user-notice",
        "parent_id": "user"
      },
      {
        "name": "我的设置",
        "icon": "setting",
        "authority": "dugkarn8vzmr9djej9e,du85ep8nvjhtvyrdb6d",
        "path": "setting",
        "menu_id": "user-setting",
        "parent_id": "user"
      }
    ]
  }
];

menuData.push({
  name: '账户',
  icon: 'user',
  path: 'user',
  authority: 'guest',
  children: [{
    name: '登录',
    path: 'login',
  }, {
    name: '注册',
    path: 'register',
  }, {
    name: '注册结果',
    path: 'register-result',
  }],
}, {
    name: '测试',
    icon: 'scan',
    path: 'request-test'
  });

function formatter(withAuth, data, parentPath = '/', parentAuthority) {
  return data.map((item) => {
    let au = item.authority || parentAuthority || null;
    const result = {
      ...item,
      path: `${parentPath}${item.path}`,
      authority: withAuth ? checkAuthority(au) : au,
    };
    if (item.children) {
      result.children = formatter(withAuth, item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = withAuth => formatter(withAuth, menuData);
