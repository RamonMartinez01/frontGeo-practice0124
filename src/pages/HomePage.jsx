import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getEscuelasThunk } from '../store/slices/escuelas.slice';
import Map from '../components/mapComponents/Map';
import SearchBar from '../components/mapComponents/SearchBar';
import CategoryFilter from '../components/mapComponents/CategoryFilter';
import Pagination from '../components/pagination/Pagination';

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;

  const escuelas = useSelector((state) => state.escuelas);
  const dispatch = useDispatch();

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

  return (
    <div>
      <CategoryFilter selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      <SearchBar setSearchTerm={setSearchTerm} />
      <div className='results-info'>
        <h3>Results: {filteredEscuelas.length}</h3>
        <ul>
          {currentItems.map((escuela) => (
            <li key={escuela.id}>
              <strong>{escuela.Nombre}</strong> - {escuela.Domicilio}
            </li>
          ))}
        </ul>
      </div>
      <div>
        Showing {currentItems.length} of {filteredEscuelas.length} results
      </div>
      <Map escuelas={currentItems} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

export default HomePage;