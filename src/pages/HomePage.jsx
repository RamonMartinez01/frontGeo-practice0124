import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getEscuelasThunk } from '../store/slices/escuelas.slice';
import Map from '../components/mapComponents/Map';
import SearchBar from '../components/mapComponents/SearchBar';
import CategoryFilter from '../components/mapComponents/CategoryFilter';
import Pagination from '../components/pagination/Pagination';
import './styles/HomePage.css'

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;
  const [selectedMarker, setSelectedMarker] = useState(null);
  const escuelas = useSelector((state) => state.escuelas);
  const dispatch = useDispatch();
  const resultsContainerRef = useRef();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    dispatch(getEscuelasThunk());
  }, [dispatch]);



  const filteredEscuelas = Array.isArray(escuelas) ? escuelas?.filter((escuela) => {
    const nombre = escuela?.Nombre?.toLowerCase() || '';
    const domicilio = escuela?.Domicilio?.toLowerCase() || '';
    const searchTermLower = searchTerm.toLowerCase();
    return (
      (selectedCategory === '' || escuela.categoria === selectedCategory) &&
      (nombre.includes(searchTermLower) || domicilio.includes(searchTermLower))
    );
  }) : [];

  const validEscuelas = filteredEscuelas.filter((escuela) => escuela.Latitud && escuela.Longitud);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = validEscuelas.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(validEscuelas.length / itemsPerPage);

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

  // Scroll to selected card when currentItems or selectedMarker changes
  useEffect(() => {
    if (selectedMarker !== null && resultsContainerRef.current) {
      // Ensure the DOM has updated before scrolling
      requestAnimationFrame(() => {
        const itemIndex = currentItems.findIndex((escuela, idx) => idx === selectedMarker);
        if (itemIndex !== -1) {
          const selectedCard = resultsContainerRef.current.querySelector(
            `.results__card:nth-child(${itemIndex + 1})`
          );
          if (selectedCard) {
            selectedCard.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
          }
        }
      });
    }
  }, [selectedMarker, currentItems]);

  return (
    <div>
      <CategoryFilter selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      <SearchBar setSearchTerm={setSearchTerm} />
      <div className='results-info'>
        <div className='results__total-category'>
          <span>
            <h3>{filteredEscuelas.length} resultados </h3>
          </span>
          <span>
            <h3> de "{selectedCategory || "Todas las categorías"}"</h3>
          </span>
        </div>
        <div>
          <span>
            Mostrando {currentItems.length} resultados en esta página
          </span>
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
          setSelectedMarker={setSelectedMarker}
        />
        <div className='resuts__map-ul'>
          <div className='results__ul-div'>
            <div className="results__navigation">
              <button className="prev-button" onClick={() => scrollResults(-1)}>{"<<"}</button>
  
                <ul className='results__ul' ref={resultsContainerRef}>
                  {currentItems.map((escuela, index) => (
                    <li className={`results__card ${selectedMarker === index ? 'selected' : ''}`}
                      key={escuela.id}
                      onClick={() => handleCardClick(index)}
                    >
                      <span className='results__name'><strong>{escuela.Nombre}</strong></span>
                      <span className='results__address'>{escuela.Domicilio}</span>
                    </li>
                  ))}
                </ul>

              <button className="next-button" onClick={() => scrollResults(1)}>{">>"}</button>
            </div>  
          </div>
          <div className='results__map'>
            <Map escuelas={currentItems}
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