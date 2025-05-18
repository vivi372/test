import './App.css';
import Main from './Main.js';
import List from './board/list.js';
import View from './board/view.js';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Write from './board/write.js';
import Update from './board/update.js';
import Header from './components/common/Header.js';
import Footer from './components/common/Footer.js';

function App() {
  return (
    <>
      <Header/>
      <div className="container flex-grow-1 py-4 pb-5 mb-5">
        <BrowserRouter>
            <Routes>
              <Route path="/" element={
                <Main />
              } />
              <Route path="/board/list" element={
                <List />
              } />
              <Route path="/board/view" element={
                <View />
              } />
              <Route path="/board/write" element={
                <Write />
              } />
              <Route path="/board/update" element={
                <Update />
              } />
            </Routes>
        </BrowserRouter>   
      </div>
      <Footer/>
    </>
  );
}

export default App;
