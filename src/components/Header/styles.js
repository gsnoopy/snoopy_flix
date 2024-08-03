import styled from 'styled-components';

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background-color: #1F1D2B;
  color: white;
  position: fixed;
  top: 0;
  left: ${props => (props.isMobile ? '0' : '250px')}; 
  width: ${props => (props.isMobile ? '100%' : 'calc(100% - 250px)')}; 
  z-index: 1001;
  box-sizing: border-box;
`;

export const SearchContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

export const SearchBar = styled.input`
  width: 450px;
  padding: 8px;
  border-radius: 4px;
  border: none;
  outline: none;
  font-size: 16px;
  background-color: #262836;
  color: #808191;

  @media (max-width: 1200px) {
    width: 60%;
  }

  @media (max-width: 768px) {
    width: 80%;
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

export const UserSection = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  white-space: nowrap;

  @media (max-width: 768px) {
    flex-direction: row;
    align-items: center;
  }
`;

export const UserPhoto = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #555;
  margin-left: 10px;
`;

export const UserName = styled.span`
  font-size: 14px;
  margin-left: 10px;
  margin-right: 5px;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const MenuToggle = styled.div`
  cursor: pointer;
  margin-right: 20px;
  display: ${props => (props.isMobile ? 'block' : 'none')};
  font-size: 20px;
  padding: 10px;
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #ccc;
  }
`;
