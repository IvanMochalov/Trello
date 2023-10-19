import { Route, Routes } from 'react-router-dom';
import { BoardPage } from './components/BoardPage';
import { Layout } from './components/Layout';
import { MainContent } from './components/MainContent';
import { NotFound } from './components/NotFound';

const App: React.FC = () => {
	return (
		<Routes>
			<Route path='/boards' element={<Layout />}>
				<Route index element={<MainContent />} />
				<Route path='/boards/:board_id' element={<BoardPage />} />
			</Route>
			<Route path='*' element={<NotFound />} />
		</Routes>
	);
};

export { App };
