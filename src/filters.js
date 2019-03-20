import Utils from './util/Utils';

const imageUrlById = value => {
  return value && Utils.getImageUrl(value);
};

export {
  imageUrlById,
};
