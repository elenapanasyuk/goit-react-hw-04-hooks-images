import PropTypes from 'prop-types';
import s from './Button.module.css';

const Button = ({ onClick }) => {
  return (
    <div className={s.btnContainer}>
      <button type="button" className={s.loadmorebtn} onClick={onClick}>
        Load More
      </button>
    </div>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button;
