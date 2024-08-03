import React from 'react';
import { 
  HeaderContainer, 
  SearchContainer, 
  SearchBar, 
  UserSection, 
  UserPhoto, 
  UserName, 
  MenuToggle 
} from './styles';

const Header = ({ isMobile, isMenuVisible, toggleMenu, searchQuery, setSearchQuery }) => {
  return (
    <HeaderContainer isMobile={isMobile}>
      <MenuToggle isMobile={isMobile} onClick={toggleMenu}>
        &#9776;
      </MenuToggle>
      <SearchContainer>
        <SearchBar 
          type="text" 
          placeholder="Search" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </SearchContainer>
      <UserSection>
        <UserPhoto />
        <UserName>Awk</UserName>
      </UserSection>
    </HeaderContainer>
  );
};

export default Header;