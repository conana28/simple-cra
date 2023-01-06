import React, { createContext, useContext, useState, useMemo } from 'react';
import PropTypes from 'prop-types';

export const CellarContext = createContext(null);

// Create a hook to
export const useCellarContext = () => {
  const context = useContext(CellarContext);

  if (!context) throw new Error('useCellarContext must be use inside CellarProvider');

  return context;
};

export const CellarContextProvider = ({ children }) => {
  const [bottleSelected, setBottleSelected] = useState({});
  const [menuSelect, setMenuSelect] = useState('');
  const [userInfo, setUserInfo] = useState('C');

  const memoizedValue = useMemo(
    () => ({
      userInfo,
      setUserInfo,
      menuSelect,
      setMenuSelect,
      bottleSelected,
      setBottleSelected,
    }),
    [userInfo, setUserInfo, menuSelect, setMenuSelect, bottleSelected, setBottleSelected]
  );

  return <CellarContext.Provider value={memoizedValue}> {children} </CellarContext.Provider>;
};

CellarContextProvider.propTypes = {
  children: PropTypes.node,
};
