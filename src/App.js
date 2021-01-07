import { useState, useEffect } from 'react';
import LoaderView from './components/Loader';
import { ToastContainer, toast } from 'react-toastify';
import fetchImage from './services/imagesApi';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import Modal from './components/Modal';
import Button from './components/Button';
import 'react-toastify/dist/ReactToastify.css';
import s from './App.module.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState({
    status: false,
    targetImage: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    setPage(1);
    searchImages(searchQuery, 1);
  }, [searchQuery]);

  function searchImages(searchQuery, page) {
    if (!searchQuery) {
      setImages([]);
      setShowButton(false);
      return;
    }

    setIsLoading(true);

    fetchImage(searchQuery, page)
      .then(data => {
        if (page === 1) {
          setImages(data.hits);
        } else {
          setImages(prevState => [...prevState, ...data.hits]);
          onScrollPage();
        }
        onCheckButton(data.totalHits, images.length + data.hits.length);
        setPage(page => page + 1);
      })
      .catch(error => toast.error('Smth went wrong:( please try again'))
      .finally(() => setIsLoading(false));
  }

  function onCheckButton(totalHits, current) {
    if (totalHits > current) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
    if (!totalHits) {
      toast.error('No result:( try smth else');
      return;
    }
  }

  function toggleModal({ status, src, alt }) {
    if (status) {
      setShowModal({
        targetImage: { src, alt },
        status: true,
      });
    } else {
      setShowModal({
        targetImage: null,
        status: false,
      });
    }
  }

  const onSubmit = value => {
    setSearchQuery(value);
  };

  const onScrollPage = () => {
    setTimeout(() => {
      window.scrollTo({
        top: document.documentElement.clientHeight,
        behavior: 'smooth',
      });
    }, 1200);
  };
  return (
    <div className={s.app}>
      <Searchbar onSubmit={onSubmit} />
      {isLoading && <LoaderView />}
      {images.length > 0 && (
        <ImageGallery images={images} toggleModal={toggleModal} />
      )}
      {showModal.status && (
        <Modal
          src={showModal.targetImage.src}
          alt={showModal.targetImage.alt}
          toggleModal={toggleModal}
        />
      )}
      {showButton && <Button onClick={() => searchImages(searchQuery, page)} />}

      <ToastContainer autoClose={3000} />
    </div>
  );
}

export default App;

// class App extends Component {
// state = {
//   searchQuery: '',
//   images: [],
//   totalHits: 0,
//   largeImageURL: '',
//   page: 1,
//   error: null,
//   isLoading: false,
//   showModal: false,
//   showButton: false,
//   message: '',
//   targetImage: null,
// };

// componentDidMount() {
//   this.searchImages();
// }

// componentDidUpdate(prevProps, prevState) {
//   const { searchQuery, page } = this.state;
//   if (prevState.searchQuery !== searchQuery) {
//     this.searchImages(searchQuery, 1);
//     this.setState({ page: 1 });
//   }
//   if (prevState.page !== page) {
//     this.searchImages(searchQuery, page);
//   }
// }

// searchImages(searchQuery = '', page = 1) {
//   if (searchQuery !== '') {
//     this.setState({
//       isLoading: true,
//     });

//     fetchImage(searchQuery, page)
//       .then(data => {
//         if (page === 1) {
//           this.setState({ totalHits: data.totalHits, images: data.hits });
//         } else {
//           this.setState(prevState => ({
//             images: [...prevState.images, ...data.hits],
//           }));
//           this.onScrollPage();
//         }
//         this.onCheckButton();
//       })
//       .catch(error =>
//         this.setState({ error: 'Smth went wrong:( please try again' }),
//       )
//       .finally(() => this.setState({ isLoading: false }));
//   } else {
//     this.setState({
//       images: [],
//       showButton: false,
//     });
//   }
// }

// onSubmit = value => {
//   this.setState({ searchQuery: value });
// };

// onIncrementPage = () => {
//   this.setState(prevState => ({ page: prevState.page + 1 }));
// };

// onScrollPage = () => {
//   setTimeout(() => {
//     window.scrollTo({
//       top: document.documentElement.clientHeight,
//       behavior: 'smooth',
//     });
//   }, 1200);
// };

// onCheckButton = () => {
//   const { totalHits, images } = this.state;
//   if (totalHits > images.length) {
//     this.setState({ showButton: true });
//   } else {
//     this.setState({ showButton: false });
//   }
//   if (!totalHits) {
//     toast.error('No result:( try smth else');
//     return;
//   }
// };

// toggleModal = ({ status, src, alt }) => {
//   if (status) {
//     this.setState({
//       targetImage: { src, alt },
//       showModal: true,
//     });
//   } else {
//     this.setState({
//       targetImage: null,
//       showModal: false,
//     });
//   }
// };

//   render() {
//     const {
//       images,
//       isLoading,
//       showModal,
//       targetImage,
//       showButton,
//     } = this.state;
//     return (
//       <div className={s.app}>
//         <Searchbar onSubmit={this.onSubmit} />
//         {isLoading && <LoaderView />}
//         {images.length > 0 && (
//           <ImageGallery images={images} toggleModal={this.toggleModal} />
//         )}
//         {showModal && (
//           <Modal
//             src={targetImage.src}
//             alt={targetImage.alt}
//             toggleModal={this.toggleModal}
//           />
//         )}
//         {showButton && <Button onClick={this.onIncrementPage} />}
//         <ToastContainer autoClose={3000} />
//       </div>
//     );
//   }
// }
