import React, { createContext, useContext, useState, useMemo } from 'react';
import PropTypes from 'prop-types';

export const WinetrakContext = createContext(null);

// Create a hook to
export const useWinetrakContext = () => {
  const context = useContext(WinetrakContext);

  if (!context) throw new Error('useWinetrakContext must be use inside WinetrakCellarProvider');

  return context;
};

export const WinetrakContextProvider = ({ children }) => {
  // const [bottleSelected, setBottleSelected] = useState({});
  const [selected, setSelected] = useState({});
  const [menuSelect, setMenuSelect] = useState('');
  const [userInfo, setUserInfo] = useState('C');

  const memoizedValue = useMemo(
    () => ({
      userInfo,
      setUserInfo,
      menuSelect,
      setMenuSelect,
      selected, // Bottle or Wine
      setSelected,
    }),
    [userInfo, setUserInfo, menuSelect, setMenuSelect, selected, setSelected]
  );

  return <WinetrakContext.Provider value={memoizedValue}> {children} </WinetrakContext.Provider>;
};

WinetrakContextProvider.propTypes = {
  children: PropTypes.node,
};
