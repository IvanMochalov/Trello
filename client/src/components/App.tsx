import { Routes, Route } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path='/boards' element={<h1>Trello</h1>}/>
    </Routes>
  )
}

export { App }