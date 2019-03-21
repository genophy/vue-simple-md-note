import axios      from 'axios';
import ApiUtil    from './ApiUtil';
import Constants  from './Constants';
import CookieUtil from './CookieUtil';

axios.defaults.timeout = 30000;
axios.defaults.baseURL = '';

//http request 拦截器
axios.interceptors.request.use(
  config => {
    // const token = getCookie('名称');注意使用的时候需要引入cookie方法，推荐js-cookie
    // config.data = JSON.stringify(config.data);
    config.headers = {
      'token': CookieUtil.cookie('token'),
    };
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export function getWithFn(url, fnName, params = {}) {
  return get(url, {fn: fnName, data: params});
}

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params,
    })
    .then(response => {
      resolve(response.data);
    })
    .catch(err => {
      reject(err);
    });
  });
}

export function postWithFn(url, fnName, params = {}) {
  return post(url, {fn: fnName, data: params});
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data = {}) {

  return new Promise((resolve, reject) => {
    axios.post(url, data)
    .then(response => {
      const value = response.data;
      const res = ApiUtil.responseStatus(value);

      if (res.isSuccess) {
        resolve(res.data);
      } else {

        // not auth
        if (0 === res.code) {
          CookieUtil.cookie(Constants.COOKIE_USER_INFO, '');
          CookieUtil.cookie(Constants.COOKIE_USER_TOKEN, '');
        } else {
          reject(res.data);
        }

      }
    }, err => {
      reject(err);
    });
  });
}
