import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import s from './Searchbar.module.css';

function Searchbar({ onSubmit }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = event => {
    setSearchQuery(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (searchQuery.trim() === '') {
      toast.error('Please add search query');
      return;
    }

    onSubmit(searchQuery);
    setSearchQuery('');
  };
  return (
    <header className={s.header}>
      <form className={s.form} onSubmit={handleSubmit}>
        <button type="submit" className={s.searchbutton}>
          <span className={s.label}>Search</span>
        </button>

        <input
          className={s.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchQuery}
          onChange={handleInputChange}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  value: PropTypes.string,
  handleSubmit: PropTypes.func,
  handleInputChange: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;

// class Searchbar1 extends Component {
// state = {
//   searchQuery: '',
// };

// handleInputChange = event => {
//   this.setState({ searchQuery: event.currentTarget.value.toLowerCase() });
// };

// handleSubmit = event => {
//   event.preventDefault();

//   if (this.state.searchQuery.trim() === '') {
//     toast.error('Please add search query');
//     return;
//   }

//   this.props.onSubmit(this.state.searchQuery);
//   this.setState({ searchQuery: '' });
// };

//   render() {
//     const { searchQuery } = this.state;
//     return (
//       <header className={s.header}>
//         <form className={s.form} onSubmit={this.handleSubmit}>
//           <button type="submit" className={s.searchbutton}>
//             <span className={s.label}>Search</span>
//           </button>

//           <input
//             className={s.input}
//             type="text"
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//             value={searchQuery}
//             onChange={this.handleInputChange}
//           />
//         </form>
//       </header>
//     );
//   }
// }
