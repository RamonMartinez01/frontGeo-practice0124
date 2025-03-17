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
  //const escuelas = useSelector((state) => state.escuelas);
  const dispatch = useDispatch();
  const resultsContainerRef = useRef();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  // Access escuelas state from Redux
  const { data, loading, error } = useSelector((state) => state.escuelas);
  const escuelasData = data?.data || []; // Extract schools from API response
  const totalPages = data?.total_pages || 1;  // Get total pages from API

  useEffect(() => {
    dispatch(getEscuelasThunk(selectedCategory, searchTerm));
  }, [dispatch, selectedCategory, searchTerm]);


  const validEscuelas = Array.isArray(escuelasData)
  ? escuelasData.filter((escuela) => {
    console.log("Checking escuela:", escuela); // Debugging
    return (
      escuela.latitud !== undefined &&
      escuela.longitud !== undefined &&
      typeof escuela.latitud === "number" &&
      typeof escuela.longitud === "number"
    );
  })
  : [];
 
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = validEscuelas.slice(indexOfFirstItem, indexOfLastItem);
 // const totalPages = Math.ceil(validEscuelas.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    dispatch(getEscuelasThunk(selectedCategory, searchTerm, pageNumber)); // Fetch the new page
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
        const itemIndex = currentItems.findIndex((_, idx) => idx === selectedMarker);
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
  //console.log(data)
  console.log(currentPage)
  return (
    <div>
      <CategoryFilter selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      <SearchBar setSearchTerm={setSearchTerm} />

       {/* Show loading and error messages */}
       {loading && <p>Cargando datos...</p>}
      {error && <p className="error-message">Error: {error}</p>}

      <div className='results-info'>
        <div className='results__total-category'>
          <span>
            <h3>{validEscuelas.length} resultados </h3>
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
          totalPages={totalPages}  // Now uses total pages from API
          handlePageChange={handlePageChange}
          setSelectedMarker={setSelectedMarker}
          selectedCategory={selectedCategory}  // Pass selected category
          searchTerm={searchTerm}  // Pass search term
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
                      <span className='results__name'><strong>{escuela.nombre}</strong></span>
                      <span className='results__address'>{escuela.domicilio}</span>
                    </li>
                  ))}
                </ul>

              <button className="next-button" onClick={() => scrollResults(1)}>{">>"}</button>
            </div>  
          </div>
          <div className='results__map'>
            <Map currentItems={currentItems}
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