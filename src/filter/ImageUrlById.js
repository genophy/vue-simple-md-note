import Vue   from 'vue';
import Utils from '../util/Utils';

Vue.filter('imageUrlById', function(value) {
  return value && Utils.getImageUrl(value);
});
