import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ image, toggleModal }) => {
  const onClick = () => {
    toggleModal({
      status: true,
      src: image.largeImageURL,
      alt: image.tags,
    });
  };
  return (
    <li className={s.item}>
      <img
        src={image.webformatURL}
        alt={image.tags}
        className={s.image}
        onClick={onClick}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.object.isRequired,
  toggleModal: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
