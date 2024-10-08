import {useState, createContext} from 'react';
import {Outlet} from 'react-router-dom';
import Header from '../components/Header';

export const SearchContext = createContext();

const AppLayout = () => {
  const [searchValue, setSearchValue] = useState('');

  return (
    <SearchContext.Provider value={{searchValue, setSearchValue}}>
      <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container">
            <Outlet />
          </div>
        </div>
      </div>
    </SearchContext.Provider>
  );
};

export default AppLayout;
