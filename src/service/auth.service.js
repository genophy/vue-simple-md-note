import Constants      from '../util/Constants';
import CookieUtil     from '../util/CookieUtil';
import AccountService from './account.service';

export default class AuthService {

  static logIn(username, password) {
    return AccountService.login(username, password).then(data => {
      if (data && data['token']) {

        CookieUtil.cookie(Constants.COOKIE_USER_TOKEN, data['token']);
        CookieUtil.cookie(Constants.COOKIE_USER_INFO,
          JSON.stringify({
            id      : data['id'],
            name    : data['name'],
            gender  : data['gender'],
            image_id: data['image_id'],
            is_admin: 1 === data['is_admin'],
          }));
      } else {
        throw new Error('login error');
      }
      return data;
    });
  }

  static logOut() {
    return AccountService.logout(CookieUtil.cookie(Constants.COOKIE_USER_TOKEN)).then(() => {
      CookieUtil.cookie(Constants.COOKIE_USER_INFO, '');
      CookieUtil.cookie(Constants.COOKIE_USER_TOKEN, '');
      return '';
    });
  }
}


