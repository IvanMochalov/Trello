import { Routes, Route } from 'react-router-dom';
import { Layout } from './Layout';
import { MainContent } from './MainContent'
import { BoardPage } from './BoardPage'

const App: React.FC = () => {
  return (
    <Routes>
      <Route path='/boards' element={<Layout />}>
        <Route index element={<MainContent />} />
        <Route path='/boards/:board_id' element={<BoardPage />} />
      </Route>
    </Routes>
  )
}

export { App }