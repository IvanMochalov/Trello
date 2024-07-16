import { useOutletContext, useParams } from 'react-router-dom'
import { TOutletContext } from '../../type'
import { BoardTasksList } from '../BoardTasksList/BoardTasksList'
import styles from './boardPage.module.css'
import { NewTask } from '../NewTask'

export const BoardPage = () => {
	const { data } = useOutletContext<TOutletContext>()
	const { board_id } = useParams<{ board_id: string }>()
	const currentBoard = data.boards[board_id || '']

	return (
		<div className={styles.container}>
			{currentBoard && (
				<>
					<div className={styles.actionsWrapper}>
						<div className={styles.boardTitleBox}>
							<h2 className={styles.title}>{currentBoard.title}</h2>
						</div>
						<div className={styles.buttonWrapper}>
							<NewTask currBoard={currentBoard} />
						</div>
					</div>
					<BoardTasksList board={currentBoard} />
				</>
			)}
		</div>
	)
}
