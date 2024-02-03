import './App.css';
import { Header } from './components/Header/Header';
import { Main } from './components/Main/Main';
import { createContext, useState } from 'react';

export const myContext = createContext();

function App() {
  const [modalActive, setModalActive] = useState(false);
  return (
    <div className="App">
      <div className="container">
        <myContext.Provider value={{ modalActive, setModalActive }}>
          <Header />
          <Main />
        </myContext.Provider>
      </div>
    </div>
  );
}

export default App;
