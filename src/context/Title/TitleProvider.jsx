import { createContext, useContext, useEffect, useState } from 'react';

export const TitleContext = createContext(null);

export const useTitleContext = () => {
  return useContext(TitleContext);
};

export default function TitleProvider({ children }) {
  const [title, setTitle] = useState('Essen Welt');

  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <>
      <TitleContext.Provider value={{ title, setTitle }}>
        {children}
      </TitleContext.Provider>
    </>
  );
}

// Props Validation

import { PropTypes } from 'prop-types';
TitleProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
