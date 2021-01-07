import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import s from './Modal.module.css';

function Modal({ alt, src, toggleModal }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = event => {
    if (event.code === 'Escape') {
      toggleModal({ status: false });
    }
  };

  const backdropClick = event => {
    if (event.target === event.currentTarget) {
      toggleModal({ status: false });
    }
  };
  return (
    <div className={s.overlay} onClick={backdropClick}>
      <div className={s.modal}>
        <img className={s.img} src={src} alt={alt} />
      </div>
    </div>
  );
}

Modal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  alt: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
};
export default Modal;

// class Modal2 extends Component {
// componentDidMount() {
//   window.addEventListener('keydown', this.handleKeyDown);
// }

// componentWillUnmount() {
//   window.removeEventListener('keydown', this.handleKeyDown);
// }

// handleKeyDown = event => {
//   if (event.code === 'Escape') {
//     this.props.toggleModal({ status: false });
//   }
// };

// handleBackdropClick = event => {
//   if (event.target === event.currentTarget) {
//     this.props.toggleModal({ status: false });
//   }
// };

//   render() {
//     const { src, alt } = this.props;
//     return (
//       <div className={s.overlay} onClick={backdropClick}>
//         <div className={s.modal}>
//           <img className={s.img} src={src} alt={alt} />
//         </div>
//       </div>
//     );
//   }
// }
