import { Tooltip } from '@mui/material'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { TOutletContext } from '../../type'
import { Paths } from '../../utils/constants'
import { ItemActions } from '../ItemActions'
import styles from './boardsList.module.css'

export const BoardsList = () => {
	const { data } = useOutletContext<TOutletContext>()
	const navigate = useNavigate()

	return (
		<ul className={styles.boardsListWrapper}>
			{data.boardOrder &&
				data.boardOrder.map((boardId: string) => {
					const board = data.boards[boardId]

					return (
						board && (
							<Tooltip title={`Перейти к ${board.title}`} placement='top-end'>
								<li className={styles.boardWrapper} tabIndex={0} key={board.id}>
									<p
										className={styles.boardItemLink}
										onClick={() => navigate(Paths.boardPageRoute(board.id))}
									>
										{board.title}
									</p>
									<ItemActions type='доска' item={board} />
								</li>
							</Tooltip>
						)
					)
				})}
		</ul>
	)
}
