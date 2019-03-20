import * as HttpClientHelper from '../util/HttpClientHelper';

const categoryUrl = '/api/json/category';

export default class CategoryService {

  static  queryAll = (params = {}) => {
    return HttpClientHelper.postWithFn(categoryUrl, 'queryAll', params);
  };

  static queryAllWithBlogCount = (params = {}) => {
    return HttpClientHelper.postWithFn(categoryUrl, 'queryAllWithBlogCount', params);
  };

  /**
   *
   * @param name
   */
  static insert = (name) => {
    return HttpClientHelper.postWithFn(categoryUrl, 'insert', {name});
  };

  /**
   *
   * @param id
   */
  static del = (id) => {
    return HttpClientHelper.postWithFn(categoryUrl, 'del', {id});
  };

}
