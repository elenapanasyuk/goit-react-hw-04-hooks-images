import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem';
import s from './ImageGallery.module.css';

const ImageGallery = ({ images, toggleModal }) => {
  return (
    <ul className={s.list}>
      {images.map(image => (
        <ImageGalleryItem
          key={image.id}
          image={image}
          toggleModal={toggleModal}
        />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  toggleModal: PropTypes.func.isRequired,
};

export default ImageGallery;
