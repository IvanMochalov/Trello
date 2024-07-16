import { Route, Routes } from 'react-router-dom'
import { BoardPage } from './components/BoardPage'
import { Layout } from './components/Layout'
import { MainContent } from './components/MainContent'
import { NotFound } from './components/NotFound'
import { Paths } from './utils/constants'

const App: React.FC = () => {
	return (
		<Routes>
			<Route path={Paths.homePage} element={<Layout />}>
				<Route index element={<MainContent />} />
				<Route path={Paths.boardPage} element={<BoardPage />} />
			</Route>
			<Route path='*' element={<NotFound />} />
		</Routes>
	)
}

export { App }
