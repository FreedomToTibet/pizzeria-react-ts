import {useState, createContext, FC} from 'react';
import {Outlet} from 'react-router-dom';
import Header from '../components/Header';

interface ISearchContextProps {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

export const SearchContext = createContext<ISearchContextProps | undefined>(undefined);

const AppLayout: FC = () => {
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
