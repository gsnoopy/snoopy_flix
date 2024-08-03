import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import Menu from './components/Menu/Menu';
import Header from './components/Header/Header';
import { useMediaQuery } from 'react-responsive';
import axios from 'axios';

const ContentWrapper = styled.div`
  margin-top: 60px;
  margin-left: ${props => (props.isMobile ? '0' : '270px')}; 
  padding: 50px 20px 20px 20px;
  box-sizing: border-box; 
  transition: margin-left 0.3s;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 25px;
  max-width: 100vw;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    padding: 60px 10px 10px 10px;
    gap: 15px;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    padding: 60px 5px 5px 5px;
    gap: 10px;
    margin-left: 20px;
  }
`;

const MovieCover = styled.div`
  background-image: url(${props => props.imageUrl}); 
  background-color: #1F1D2B;
  border-radius: 8px;
  width: 200px;
  height: 300px;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
  text-align: center;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    width: 120px;
    height: 180px;
    font-size: 14px;
  }
  
  @media (max-width: 480px) {
    width: 100px;
    height: 150px;
    font-size: 12px;
  }
`;

const App = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const loadMovies = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const response = await axios.get('http://127.0.0.1:8080/api/movies', { 
        params: { page, per_page: 20, search: searchQuery } 
      });
      if (page === 1) {
        setMovies(response.data.data);
      } else {
        setMovies(prevMovies => [...prevMovies, ...response.data.data]);
      }
      setHasMore(response.data.data.length > 0 && response.data.data.length === 20);
      setPage(prevPage => prevPage + 1);
    } catch (error) {
      console.error('Error loading movies:', error);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, page, searchQuery]);

  useEffect(() => {
    setPage(1);
    setMovies([]);
    setHasMore(true);
    loadMovies();
  }, [searchQuery]);

  useEffect(() => {
    loadMovies();
  }, [loadMovies]);

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loading) return;
    loadMovies();
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  return (
    <div>
      <Menu isMobile={isMobile} isMenuVisible={isMenuVisible} />
      <Header 
        isMobile={isMobile} 
        isMenuVisible={isMenuVisible} 
        toggleMenu={toggleMenu} 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
      />
      <ContentWrapper isMobile={isMobile}>
        {movies.map((movie, index) => (
            <MovieCover key={index} imageUrl={movie.capa}></MovieCover>
          ))
        }
        {loading && <div style={{ width: '100%', textAlign: 'center' }}>Loading...</div>}
      </ContentWrapper>
    </div>
  );
};

export default App;
