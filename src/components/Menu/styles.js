import styled from 'styled-components';

export const MenuWrapper = styled.div`
  position: fixed;
  top: 0;
  left: ${props => (props.isMobile && !props.isMenuVisible ? '-250px' : '0')};
  width: 250px;
  height: 100%;
  background-color: #1F1D2B;
  transition: left 0.3s;
  z-index: 1000;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #191922 #1F1D2B;
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
  padding: 10px 0;
  margin-top: 25px;
  margin-bottom: 20px;

  img {
    max-height: 150px;
    max-width: 100%;
    object-fit: contain;
  }

  @media (max-width: 768px) {
    margin-top: 105px;
    margin-bottom: 20px;
    img {
    max-height: 150px;
    max-width: 100%;
    object-fit: contain;
  }
  }
  
  @media (max-width: 480px) {
    margin-top: 105px;
  margin-bottom: 20px;
  img {
    max-height: 150px;
    max-width: 100%;
    object-fit: contain;
  }
  }

`;

export const MenuItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 45px 10px;
  color: #fff;
  cursor: pointer;
  position: relative;
`;

export const ItemIcon = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  background-color: ${props => (props.isSelected ? '#B251FF' : '#333')};
  border-radius: 10px;
  margin-right: 20px;
  transition: background-color 0.3s;
  align-items: center;
  justify-content: center;

  ${MenuItem}:hover & {
    background-color: #B251FF;
  }

  svg {
    display: block;
  }
`;
