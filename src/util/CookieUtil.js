const hostNames = location.hostname.match(/[^.]*.com$/) || [];
const ROOT_DOMAIN = hostNames[0] || location.hostname;

export default class CookieUtil {

  // 配置
  static config = {
    defaults: {},
  };
  static pluses = /\\+/g;

  /**
   * @param key
   * @param value
   * @param options
   */
  static cookie(key, value = undefined, options = undefined) {

    if (value !== undefined && !CookieUtil.isFunction(value)) {
      const opt = Object.assign({}, CookieUtil.config.defaults, options);

      // const docCookieStr =
      (document.cookie = [
        CookieUtil.encode(key), '=', CookieUtil.stringifyCookieValue(value),
        opt['max-age'] ? '; max-age=' + opt['max-age'] : '; max-age=72000', // use max-age , but is not supported by IE ，默认10小时
        opt.path ? '; path=' + opt.path : '; path=/',
        opt.domain ? '; domain=' + opt.domain : `; domain=${ROOT_DOMAIN}`,
        opt.secure ? '; secure' : '',
      ].join(''));
      return '';
    }

    // Read

    let result = key ? undefined : '';

    // To prevent the for loop in the first place assign an empty array
    // in case there are no cookies at all. Also prevents odd result when
    // calling CookieUtils.cookie().
    const cookies = document.cookie ? document.cookie.split('; ') : [];

    for (let i = 0, l = cookies.length; i < l; i++) {
      const parts = cookies[i].split('=');
      const name = CookieUtil.decode(parts.shift());
      const cookie = parts.join('=');

      if (key && key === name) {
        // If second argument (value) is a function it's a converter...
        result = CookieUtil.read(cookie, value);
        result = 'null' === result ? null : result;
        break;
      }
    }

    return result;

  }

  /**
   *
   */
  static cookies() {
    const result = {};

    // To prevent the for loop in the first place assign an empty array
    // in case there are no cookies at all. Also prevents odd result when
    // calling CookieUtils.cookie().
    const cookies = document.cookie ? document.cookie.split('; ') : [];

    for (let i = 0, l = cookies.length; i < l; i++) {
      const parts = cookies[i].split('=');
      const name = CookieUtil.decode(parts.shift());
      let cookie = parts.join('=');
      if ((cookie = CookieUtil.read(cookie)) !== undefined) {
        result[name] = cookie;
      }
    }

    return result;
  }

  static removeCookie(key, options) {
    if (CookieUtil.cookie(key) === undefined) {
      return false;
    }

    // Must not alter options, thus extending a fresh object...
    CookieUtil.cookie(key, '', Object.assign({}, options, {'max-age': 0}));
    return !CookieUtil.cookie(key);
  }

  /**
   *
   * @param fn
   */
  static isFunction(fn) {
    return 'function' === typeof fn;

  }

  static encode(s) {
    return CookieUtil.config['raw'] ? s : encodeURIComponent(s);
  }

  static decode(s) {
    return CookieUtil.config['raw'] ? s : decodeURIComponent(s);
  }

  static stringifyCookieValue(value) {
    return CookieUtil.encode(CookieUtil.config['json'] ? JSON.stringify(value) : String(value));
  }

  static parseCookieValue(s) {
    if (s.indexOf('"') === 0) {
      // This is a quoted cookie as according to RFC2068, unescape...
      s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
    }

    try {
      s = decodeURIComponent(s.replace(CookieUtil.pluses, ' '));
      return CookieUtil.config['json'] ? JSON.parse(s) : s;
    } catch (e) {
      console.error(e);
    }
  }

  static read(s, converter = undefined) {
    const value = CookieUtil.config['raw'] ? s : CookieUtil.parseCookieValue(s);
    return CookieUtil.isFunction(converter) ? converter(value) : value;
  }

}
