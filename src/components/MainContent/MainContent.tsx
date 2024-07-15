import { BoardsList } from '../BoardsList';
import { NewBoard } from '../NewBoard';
import styles from './mainContent.module.css';

export const MainContent = () => {
	return (
		<div className={styles.mainContentWrapper}>
			<div className={styles.boardWrapper}>
				<NewBoard />
			</div>
			<BoardsList />
		</div>
	);
};
