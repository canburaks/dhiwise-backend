/**
 * seeder.js
 * @description :: functions that seeds mock data to run the application
 */
const model = require('../model');
const dbService = require('../utils/dbService');
const bcrypt = require('bcrypt');
const authConstant = require('../constants/authConstant');
const { replaceAll } = require('../utils/common');

/* seeds default users */
async function seedUser () {
  try {
    let userToBeInserted = {};
    userToBeInserted = await dbService.findOne(model.user,{ 'username':'Nikita_Schumm43' });
    if (!userToBeInserted) {  
      userToBeInserted = {
        'password':'H9uXiGZ9E6IoMXw',
        'isDeleted':false,
        'username':'Nikita_Schumm43',
        'email':'Marcia_Kunze25@hotmail.com',
        'isActive':true,
        'userType':authConstant.USER_TYPES.User
      };
      await dbService.createOne(model.user,userToBeInserted);
    } else {
      userToBeInserted = {
        'password':'H9uXiGZ9E6IoMXw',
        'isDeleted':false,
        'username':'Nikita_Schumm43',
        'email':'Marcia_Kunze25@hotmail.com',
        'isActive':true,
        'userType':authConstant.USER_TYPES.User
      };
      userToBeInserted.password = await bcrypt.hash(userToBeInserted.password, 8);
      await dbService.update(model.user, { 'username':'Nikita_Schumm43' }, userToBeInserted);
    }
    userToBeInserted = await dbService.findOne(model.user,{ 'username':'Norval.Watsica' });
    if (!userToBeInserted) {  
      userToBeInserted = {
        'password':'QouiEMqKSWNFyyO',
        'isDeleted':false,
        'username':'Norval.Watsica',
        'email':'Everett49@gmail.com',
        'isActive':true,
        'userType':authConstant.USER_TYPES.Admin
      };
      await dbService.createOne(model.user,userToBeInserted);
    } else {
      userToBeInserted = {
        'password':'QouiEMqKSWNFyyO',
        'isDeleted':false,
        'username':'Norval.Watsica',
        'email':'Everett49@gmail.com',
        'isActive':true,
        'userType':authConstant.USER_TYPES.Admin
      };
      userToBeInserted.password = await bcrypt.hash(userToBeInserted.password, 8);
      await dbService.update(model.user, { 'username':'Norval.Watsica' }, userToBeInserted);
    }
    console.info('User model seeded ????');
  } catch (error){
    console.log('User seeder failed due to ', error.message);
  }
}
  
/* seeds roles */
async function seedRole () {
  try {
    const roles = [ 'User', 'Admin', 'System_User' ];
    const insertedRoles = await dbService.findAll(model.role, { code: { $in: roles.map(role => role.toUpperCase()) } });
    const rolesToInsert = [];
    roles.forEach(role => {
      if (!insertedRoles.find(insertedRole => insertedRole.code === role.toUpperCase())) {
        rolesToInsert.push({
          name: role,
          code: role.toUpperCase(),
          weight: 1
        });
      }
    });
    if (rolesToInsert.length) {
      const result = await dbService.createMany(model.role, rolesToInsert);
      if (result) console.log('Role seeded ????');
      else console.log('Role seeder failed!');
    } else {
      console.log('Role is upto date ????');
    }
  } catch (error) {
    console.log('Role seeder failed due to ', error.message);
  }
}

/* seeds routes of project */
async function seedProjectRoutes (routes) {
  try {
    if (routes) {
      let routeName = '';
      const dbRoutes = await dbService.findAll(model.projectRoute, {});
      let routeArr = [];
      let routeObj = {};
      routes.forEach(route => {
        routeName = `${replaceAll((route.path).toLowerCase(), '/', '_')}`;
        route.methods.forEach(method => {
          routeObj = dbRoutes.find(dbRoute => dbRoute.route_name === routeName && dbRoute.method === method);
          if (!routeObj) {
            routeArr.push({
              'uri': route.path.toLowerCase(),
              'method': method,
              'route_name': routeName,
            });
          }
        });
      });
      if (routeArr.length) {
        const result = await dbService.createMany(model.projectRoute, routeArr);
        if (result) console.info('ProjectRoute model seeded ????');
        else console.info('ProjectRoute seeder failed.');
      } else {
        console.info('ProjectRoute is upto date ????');
      }
    }
  } catch (error) {
    console.log('ProjectRoute seeder failed due to ', error.message);
  }
}

/* seeds role for routes */
async function seedRouteRole () {
  try {
    const routeRoles = [ 
      {
        route: '/admin/user/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/user/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/user/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/user/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/user/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/user/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/user/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/user/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/user/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/user/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/user/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/user/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/user/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/user/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/user/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/user/update/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/user/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/user/update/:id',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/user/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/user/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/user/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/user/updatebulk',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/user/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/user/updatebulk',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/user/softdelete/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/user/softdelete/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/user/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/user/softdeletemany',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/user/softdeletemany',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/user/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/user/delete/:id',
        role: 'User',
        method: 'DELETE' 
      },
      {
        route: '/admin/user/delete/:id',
        role: 'Admin',
        method: 'DELETE' 
      },
      {
        route: '/admin/user/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/user/deletemany',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/user/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/user/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/variant/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/variant/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/variant/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/variant/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/variant/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/variant/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/variant/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/variant/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/variant/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/variant/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/variant/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/variant/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/artist/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/artist/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/artist/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/artist/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/artist/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/artist/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/artist/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/artist/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/artist/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/artist/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/artist/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/artist/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/tag/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/tag/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/tag/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/tag/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/tag/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/tag/update/:id',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/tag/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/tag/updatebulk',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/tag/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/tag/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/tag/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/tag/deletemany',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/collection/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/collection/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/collection/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/collection/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/collection/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/collection/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/collection/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/collection/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/collection/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/collection/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/collection/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/collection/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/image/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/image/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/image/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/image/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/image/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/image/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/image/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/image/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/image/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/image/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/image/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/image/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/product/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/product/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/product/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/product/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/product/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/product/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/product/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/product/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/product/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/product/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/product/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/product/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userauthsettings/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userauthsettings/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userauthsettings/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userauthsettings/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/userauthsettings/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userauthsettings/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userauthsettings/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userauthsettings/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userauthsettings/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userauthsettings/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userauthsettings/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/userauthsettings/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/usertokens/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/usertokens/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/role/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/role/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/role/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/role/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/role/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/role/update/:id',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/role/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/role/updatebulk',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/role/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/role/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/role/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/role/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/projectroute/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/projectroute/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/routerole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/routerole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/routerole/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/routerole/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/routerole/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/routerole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/routerole/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userrole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userrole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userrole/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/userrole/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/userrole/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/userrole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/userrole/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/user/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/desktop/api/v1/user/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/desktop/api/v1/user/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/desktop/api/v1/user/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/user/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/desktop/api/v1/user/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/desktop/api/v1/user/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/desktop/api/v1/user/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/desktop/api/v1/user/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/desktop/api/v1/user/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/desktop/api/v1/user/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/user/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/user/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/user/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/user/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/user/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/user/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/user/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/user/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/user/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/desktop/api/v1/user/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/desktop/api/v1/user/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/desktop/api/v1/user/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/desktop/api/v1/user/deletemany',
        role: 'Admin',
        method: 'POST'
      },

    ];
    if (routeRoles && routeRoles.length) {
      const routes = [...new Set(routeRoles.map(routeRole => routeRole.route.toLowerCase()))];
      const routeMethods = [...new Set(routeRoles.map(routeRole => routeRole.method))];
      const roles = [ 'User', 'Admin', 'System_User' ];
      const insertedProjectRoute = await dbService.findAll(model.projectRoute, {
        uri: { $in: routes },
        method: { $in: routeMethods },
        'isActive': true,
        'isDeleted': false
      });
      const insertedRoles = await dbService.findAll(model.role, {
        code: { $in: roles.map(role => role.toUpperCase()) },
        'isActive': true,
        'isDeleted': false
      });
      let projectRouteId = '';
      let roleId = '';
      let createRouteRoles = routeRoles.map(routeRole => {
        projectRouteId = insertedProjectRoute.find(pr => pr.uri === routeRole.route.toLowerCase() && pr.method === routeRole.method);
        roleId = insertedRoles.find(r => r.code === routeRole.role.toUpperCase());
        if (projectRouteId && roleId) {
          return {
            roleId: roleId.id,
            routeId: projectRouteId.id
          };
        }
      });
      createRouteRoles = createRouteRoles.filter(Boolean);
      const routeRolesToBeInserted = [];
      let routeRoleObj = {};
    
      await Promise.all(
        createRouteRoles.map(async routeRole => {
          routeRoleObj = await dbService.findOne(model.routeRole, {
            routeId: routeRole.routeId,
            roleId: routeRole.roleId,
          });
          if (!routeRoleObj) {
            routeRolesToBeInserted.push({
              routeId: routeRole.routeId,
              roleId: routeRole.roleId,
            });
          }
        })
      );
      if (routeRolesToBeInserted.length) {
        const result = await dbService.createMany(model.routeRole, routeRolesToBeInserted);
        if (result) console.log('RouteRole seeded ????');
        else console.log('RouteRole seeder failed!');
      } else {
        console.log('RouteRole is upto date ????');
      }
    }
  } catch (error){
    console.log('RouteRole seeder failed due to ', error.message);
  }
}

/* seeds roles for users */
async function seedUserRole (){
  try {
    const userRoles = [{
      'username':'Nikita_Schumm43',
      'password':'H9uXiGZ9E6IoMXw'
    },{
      'username':'Norval.Watsica',
      'password':'QouiEMqKSWNFyyO'
    }];
    const defaultRole = await dbService.findOne(model.role, { code: 'SYSTEM_USER' });
    const insertedUsers = await dbService.findAll(model.user, { username: { $in: userRoles.map(userRole => userRole.username) } });
    let user = {};
    const userRolesArr = [];
    userRoles.map(userRole => {
      user = insertedUsers.find(user => user.username === userRole.username && user.isPasswordMatch(userRole.password) && user.isActive && !user.isDeleted);
      if (user) {
        userRolesArr.push({
          userId: user.id,
          roleId: defaultRole.id
        });
      }
    });
    let userRoleObj = {};
    const userRolesToBeInserted = [];
    if (userRolesArr.length) {
      await Promise.all(
        userRolesArr.map(async userRole => {
          userRoleObj = await dbService.findOne(model.userRole, {
            userId: userRole.userId,
            roleId: userRole.roleId
          });
          if (!userRoleObj) {
            userRolesToBeInserted.push({
              userId: userRole.userId,
              roleId: userRole.roleId
            });
          }
        })
      );
      if (userRolesToBeInserted.length) {
        const result = await dbService.createMany(model.userRole, userRolesToBeInserted);
        if (result) console.log('UserRole seeded ????');
        else console.log('UserRole seeder failed');
      } else {
        console.log('UserRole is upto date ????');
      }
    }
  } catch (error){
    console.log('UserRole seeder failed due to ', error.message);
  }
}

/* calls of functions to seed mock data into multiple collections */
async function seedData (allRegisterRoutes){
  await seedUser();
  await seedRole();
  await seedProjectRoutes(allRegisterRoutes);
  await seedRouteRole();
  await seedUserRole();
};
module.exports = seedData;