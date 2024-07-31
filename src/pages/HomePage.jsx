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

  useEffect(() => {
    dispatch(getEscuelasThunk());
  }, [dispatch]);

  useEffect(() => {
    if (selectedMarker !== null && resultsContainerRef.current) {
      const selectedCard = resultsContainerRef.current.querySelector(
        `.results__card:nth-child(${selectedMarker + 1})`
      );
      if (selectedCard) {
        selectedCard.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' })
      }
    }
  }, [selectedMarker])

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

  return (
    <div>
      <CategoryFilter selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      <SearchBar setSearchTerm={setSearchTerm} />
      <div className='results-info'>
        <h3>{filteredEscuelas.length} resultados</h3>
        <ul className='results__ul' ref={resultsContainerRef}>
          {currentItems.map((escuela, index) => (
            <li className={`results__card ${selectedMarker === index  ? 'selected' : ''}`}
            key={escuela.id}
            onClick={() => handleCardClick(index)}
            >
              <span className='results__name'><strong>{escuela.Nombre}</strong></span>
              <span className='results__address'>{escuela.Domicilio}</span>
            </li>
          ))}
        </ul>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
        setSelectedMarker={setSelectedMarker}
      />
      <div>
        Mostrando {currentItems.length} de {filteredEscuelas.length} resultados
      </div>
      <Map escuelas={currentItems}
      selectedMarker={selectedMarker}
      setSelectedMarker={setSelectedMarker}
      />
      
    </div>
  );
};

export default HomePage;