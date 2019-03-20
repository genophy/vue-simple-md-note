import * as HttpClientHelper from '../util/HttpClientHelper';
import Utils                 from '../util/Utils';

const accountUrl = '/api/json/account';

export default class AccountService {

  /**
   *
   * @param params (pageSize,pageNum)
   */
  static queryAll(params) {
    return HttpClientHelper.postWithFn(accountUrl, 'queryAll', params);
  }

  /**
   *
   * @param name
   * @param pwd
   */
  static queryByNamePwd(name, pwd) {
    return HttpClientHelper.postWithFn(accountUrl, 'queryByNamePwd', {name, pwd});
  }

  /**
   *
   * @param name
   * @param pwd
   */
  static login(name, pwd) {
    return HttpClientHelper.postWithFn(accountUrl, 'login', {name, pwd});
  }

  /**
   *
   * @param token
   */
  static logout(token) {
    return HttpClientHelper.postWithFn(accountUrl, 'logout', {token: token});
  }

  /**
   *
   * @param name
   */
  static queryByName(name) {
    return HttpClientHelper.postWithFn(accountUrl, 'queryByName', {name});
  }

  /**
   *
   * @param name
   * @param pwd
   * @param img_id
   */
  static accountInsert(name, pwd, img_id) {
    return HttpClientHelper.postWithFn(accountUrl, 'accountInsert', {name, pwd, img_id});
  }

  /**
   *
   * @param id
   * @param params (name,pwd,img_id)
   */
  static update(token, params) {
    return HttpClientHelper.postWithFn(accountUrl, 'update', Utils.objConcat(params, {token: token}));
  }

  static del(id) {
    return HttpClientHelper.postWithFn(accountUrl, 'del', {id});
  }
}
