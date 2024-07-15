import {$post,$setToken} from  '../utils/request'
import {message} from "ant-design-vue";

// 登录接口
export const $login = async (params) => {
      //此处后续或许对密码加密
      let { statusCode, success, message: statusMessage, data, token } = await $post('/user/login', params);
      if (success) {
            // 提取管理员信息和菜单数据
            const { adminInfo, menuDetails } = data;
            const { username, email, role_permission_id } = adminInfo;
            let user ={ username, email, role_permission_id };
            // 将用户信息保存到浏览器的缓存中
            sessionStorage.setItem('user', JSON.stringify(user));
            // 将token保存到浏览器的缓存中
            sessionStorage.setItem('token', token);
            // 将菜单数据保存到浏览器的缓存中
            sessionStorage.setItem('mineMenus', JSON.stringify(menuDetails));
            // 在请求头中更新token信息
            $setToken(token);
            message.success(statusMessage);
      } else {
            message.error(statusMessage);
      }
      return success;
};

export  const $register = async (params) => {
      let {statusCode, success, message: statusMessage, data,token} = await $post('user/register',params);
      if(success){
            message.success(statusMessage);
      }else{
            message.error(statusMessage);
      }
}