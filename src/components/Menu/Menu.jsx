import React, { useState } from 'react';
import { MenuWrapper, Logo, MenuItem, ItemIcon } from './styles';
import logo from '../../assets/snoopyPlay.png';

const iconList = [
  '🤯', '🔥', '🎉', '🚀', '✨', '🌟', '💎', '🛠️', '🧩', '🎲', '🎯', '🏆'
];

const Menu = ({ isMobile, isMenuVisible }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <MenuWrapper isMobile={isMobile} isMenuVisible={isMenuVisible}>
      <Logo>
        <img src={logo} alt="Logo" />
      </Logo>
      <MenuItem
        isSelected={selectedItem === 'home'}
        onClick={() => handleClick('home')}
      >
        <ItemIcon isSelected={selectedItem === 'home'} />
        Home
      </MenuItem>
      <MenuItem
        isSelected={selectedItem === 'filmes'}
        onClick={() => handleClick('filmes')}
      >
        <ItemIcon isSelected={selectedItem === 'filmes'} />
        Filmes
      </MenuItem>
      <MenuItem
        isSelected={selectedItem === 'series'}
        onClick={() => handleClick('series')}
      >
        <ItemIcon isSelected={selectedItem === 'series'} />
        Séries
      </MenuItem>
      <MenuItem
        isSelected={selectedItem === 'favoritos'}
        onClick={() => handleClick('favoritos')}
      >
        <ItemIcon isSelected={selectedItem === 'favoritos'} />
        Favoritos
      </MenuItem>
      <MenuItem
        isSelected={selectedItem === 'assistidos'}
        onClick={() => handleClick('assistidos')}
      >
        <ItemIcon isSelected={selectedItem === 'assistidos'} />
        Assistidos
      </MenuItem>
      <MenuItem
        isSelected={selectedItem === 'report'}
        onClick={() => handleClick('report')}
      >
        <ItemIcon isSelected={selectedItem === 'report'} />
        Report
      </MenuItem>
      {iconList.map((icon, index) => (
        <MenuItem
          key={index}
          isSelected={selectedItem === `categoria${index + 1}`}
          onClick={() => handleClick(`categoria${index + 1}`)}
        >
          <ItemIcon isSelected={selectedItem === `categoria${index + 1}`}>
            {icon}
          </ItemIcon>
          Categoria{index + 1}
        </MenuItem>
      ))}
    </MenuWrapper>
  );
};

export default Menu;
