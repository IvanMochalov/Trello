import { Routes, Route } from 'react-router-dom';
import { Layout } from './Layout';
import { MainContent } from './MainContent'

const App: React.FC = () => {
  return (
    <Routes>
      <Route path='/boards' element={<Layout />}>
        <Route index element={<MainContent />} />
        <Route path='/boards/:board_id' element={<h2>board_1</h2>} />
      </Route>
    </Routes>
  )
}

export { App }