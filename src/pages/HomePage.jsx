import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getEscuelasThunk } from '../store/slices/escuelas.slice';
import Map from '../components/mapComponents/Map';
import SearchBar from '../components/mapComponents/SearchBar';
import CategoryFilter from '../components/mapComponents/CategoryFilter';
import Pagination from '../components/pagination/Pagination';
import './styles/HomePage.css'

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const dispatch = useDispatch();
  const resultsContainerRef = useRef();
  const bannerRef = useRef();
  const [showScrollCue, setShowScrollCue] = useState(false);

  
  // Access escuelas state from Redux
  const { data, loading, error } = useSelector((state) => state.escuelas);
  const escuelasData = data?.data || []; // Extract schools from API response
  const totalPages = data?.total_pages || 1;  // Get total pages from API
  const totalEscuelas = data?.total || []; // Get total elements required form API

  useEffect(() => {
    dispatch(getEscuelasThunk(selectedCategory, searchTerm, currentPage));
  }, [dispatch, selectedCategory, currentPage]);

  const handleSearch = () => {
    setCurrentPage(1);  // this change triggers the useEffect above
    dispatch(getEscuelasThunk(selectedCategory, searchTerm, 1)); // Fetch results only when user submits in SearchBar
  };

  useEffect(() => {  //  Makes a new API call when the searchTerm value is reset in the input in SearchBar.jsx
    if (searchTerm === "") {
      handleSearch(); // Only trigger when searchTerm is cleared
    }
  }, [searchTerm]);

  const validEscuelas = Array.isArray(escuelasData)
  ? escuelasData.filter((escuela) => 
      escuela.latitud !== undefined &&
      escuela.longitud !== undefined &&
      typeof escuela.latitud === "number" &&
      typeof escuela.longitud === "number"
  )
  : [];

  const currentItems = validEscuelas;
 
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  
  const handleCardClick = (index) => {
    setSelectedMarker((selectedMarker) => (
      selectedMarker === index ? null : index
    ));
  };

  const scrollResults = (direction) => {
    const scrollContainer = resultsContainerRef.current;
    const scrollAmount = 200; // Adjust this value as needed
    scrollContainer.scrollLeft += direction * scrollAmount;
  };

  // Scroll to selected card when validEscuelas or selectedMarker changes
  useEffect(() => {
    if (selectedMarker !== null && resultsContainerRef.current) {
      // Ensure the DOM has updated before scrolling
      requestAnimationFrame(() => {
        const itemIndex = validEscuelas.findIndex((_, idx) => idx === selectedMarker);
        if (itemIndex !== -1) {
          const selectedCard = resultsContainerRef.current.querySelector(
            `.escuela__card:nth-child(${itemIndex + 1})`
          );
          if (selectedCard) {
            const container = resultsContainerRef.current;
            const cardOffset = selectedCard.offsetLeft;
            const offset = 105; // space from the left (can adjust as needed)
          
            container.scrollTo({
              left: cardOffset - offset,
              behavior: 'smooth',
            });

              // Vertical scroll of the entire banner to top with offset
            const bannerTop = bannerRef.current.getBoundingClientRect().top + window.scrollY;
            const offsetY = 15; // push 1px below the top
            window.scrollTo({
              top: bannerTop - offsetY,
              behavior: 'smooth',
            });
          }
        }
      });
    }
  }, [selectedMarker]);  

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          // It's scrolled too far off-screen — scroll it back gently
          const topOffset = bannerRef.current.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({
            top: topOffset - 10,
            behavior: 'smooth',
          });
        }
      },
      {
        root: null,
        threshold: 0.1,
      }
    );
  
    if (bannerRef.current) {
      observer.observe(bannerRef.current);
    }
  
    return () => {
      if (bannerRef.current) {
        observer.unobserve(bannerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!bannerRef.current) return;

      const rect = bannerRef.current.getBoundingClientRect();
      const isNearTop = rect.top >= 20; // distance from the top os the screen
      setShowScrollCue(!isNearTop);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className='homepage__main'>
      <div className='category__component-container'>
        <CategoryFilter 
          selectedCategory={selectedCategory} 
          setSelectedCategory={setSelectedCategory}
          setCurrentPage={setCurrentPage}
        />
      </div>
      
      <div className='searchbar__component-container'>
        <SearchBar 
          setSearchTerm={setSearchTerm} 
          handleSearch={handleSearch}
          searchTerm={searchTerm}
        />
      </div>

       {/* Show loading and error messages */}
       {loading && <p>Cargando datos...</p>}
      {error && <p className="error-message">Error: {error}</p>}

      <div className='results-info'>
        <section className='results__total'>
          <div className='results__total-category'>
            <span>
              <h3>{totalEscuelas} resultados </h3>
            </span>
            <span>
              <h3> "{selectedCategory || "Todas las categorías"}"</h3>
            </span>
          </div>
          <div className='results__total-thispage'>
            <span>
              Mostrando {currentItems.length} resultados en esta página
            </span>
          </div>
        </section>
        <div className='pagination__component'>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}  // Total pages from API
            handlePageChange={handlePageChange}
          />
        </div>
        <div className='escuelas__map'>
          <div className='card__banner-container'  ref={bannerRef}>
            <div className="banner__navigation">
              <button className="prev-button" onClick={() => scrollResults(-1)}>{"<<"}</button>
  
                <ul className='cards__container' ref={resultsContainerRef}>
                  {currentItems.map((escuela, index) => (
                    <li className={`escuela__card ${selectedMarker === index ? 'selected' : ''}`}
                      key={escuela.id}
                      onClick={() => handleCardClick(index)}
                    >
                      <span className='escuela__name'><strong>{escuela.nombre}</strong></span>
                      <span className='escuela__address'>{escuela.domicilio}</span>
                    </li>
                  ))}
                </ul>

              <button className="next-button" onClick={() => scrollResults(1)}>{">>"}</button>
            </div>
            {showScrollCue && (
              <div className="scroll-cue-arrow">
                <button
                  className="scroll-cue-btn"
                  onClick={scrollToTop}
                  aria-label="Volver al inicio"
                  >
                          
                  ↓

                </button>
              </div>
            )}
            
          </div>
          
          <div className='results__map'>
            <Map validEscuelas={validEscuelas}
              selectedMarker={selectedMarker}
              setSelectedMarker={setSelectedMarker}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;