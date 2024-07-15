import {$get, $post} from "@/utils/request.js";

export let $adminsList = async (params) => {
    try {
        let res = await $get('user/showAllusers', params);
        if (res.success) {
            return res.data;
        } else {
            // 如果接口返回不成功的情况，根据需要进行处理
            throw new Error("Failed to fetch admins list.");
        }
    } catch (error) {
        // 处理异常
        if (error.message === "Token expired or unauthorized.") {
            // 显示消息给用户
            message.error('Session expired. Please log in again.');
            // 可以选择在这里进行额外的处理，比如清除用户信息等操作
        }
        throw error; // 继续向上层抛出异常
    }
}

export let $personalInformation = async (params) => {
    try {
        let res = await $post('user/personalInformation', params);
        if (res.success) {
            return res.data;
        } else {
            throw new Error("Failed to fetch personal information.");
        }
    } catch (error) {
        if (error.message === "Token expired or unauthorized.") {
            message.error('Session expired. Please log in again.');
        }
        throw error;
    }
}

export let $log = async (params) => {
    try {
        let res = await $get('user/logs', params);
        console.log("日志获取成功");
        if (res.success) {
            return res.data;
        } else {
            throw new Error("Failed to fetch logs.");
        }
    } catch (error) {
        if (error.message === "Token expired or unauthorized.") {
            message.error('Session expired. Please log in again.');
        }
        throw error;
    }
}