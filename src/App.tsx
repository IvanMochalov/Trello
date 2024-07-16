import { Route, Routes, BrowserRouter } from 'react-router-dom'
import { BoardPage } from './components/BoardPage'
import { Layout } from './components/Layout'
import { MainContent } from './components/MainContent'
import { NotFound } from './components/NotFound'
import { Paths } from './utils/consts'

const App: React.FC = () => {
	return (
		<BrowserRouter basename={Paths.browserHomePage}>
			<Routes>
				<Route path={Paths.homePage} element={<Layout />}>
					<Route index element={<MainContent />} />
					<Route path={Paths.boardPage} element={<BoardPage />} />
				</Route>
				<Route path='*' element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	)
}

export { App }
