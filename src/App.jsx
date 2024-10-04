import React from 'react'
import Sidebar from './components/SideBar/SideBar';
import Main from './components/Main/Main';
import ContextProvider from './context/context';


const App = () => {

  return (
    <ContextProvider>
      <Sidebar/>
      <Main/>
    </ContextProvider>
  )
}

export default App;