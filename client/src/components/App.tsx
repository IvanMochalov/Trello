import { Routes, Route } from 'react-router-dom';
import { Layout } from './Layout'

const App: React.FC = () => {
  return (
    <Routes>
      <Route path='/boards' element={<Layout />}/>
    </Routes>
  )
}

export { App }