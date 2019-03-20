import * as HttpClientHelper from '../util/HttpClientHelper';

const blogUrl = '/api/json/blog';


export default class BlogService {

  static queryAll(params = {}) {
    return HttpClientHelper.postWithFn(blogUrl, 'queryAll', params);
  }

  /**
   *
   * @param title
   * @param content
   * @param category_id
   */
  static insert(title, content, category_id) {
    return HttpClientHelper.postWithFn(blogUrl, 'insert', {title, content, category_id});
  }

  /**
   *
   * @param params
   */
  static update(params = {}) {
    return HttpClientHelper.postWithFn(blogUrl, 'update', params);
  }

  /**
   *
   * @param params
   */
  static updateBlogWatched(params = {}) {
    return HttpClientHelper.postWithFn(blogUrl, 'updateBlogWatched', params);
  }

  /**
   *
   * @param id
   */
  static del(id) {
    return HttpClientHelper.postWithFn(blogUrl, 'del', {id: id});
  }

}
