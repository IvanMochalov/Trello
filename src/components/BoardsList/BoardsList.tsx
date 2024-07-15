import { Tooltip } from '@mui/material';
import { Link, useOutletContext } from 'react-router-dom';
import { TOutletContext } from '../../type';
import { ItemActions } from '../ItemActions';
import styled from 'styled-components';
import styles from './boardsList.module.css';

const BoardsListWrapper = styled.ul`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: start;
	width: 50%;
	min-width: 288px;
`;

const BoardWrapper = styled.li`
	display: flex;
	box-sizing: border-box;
	align-items: center;
	justify-content: start;
	overflow: hidden;
	width: 100%;
	overflow-wrap: break-word;
	transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
	border-radius: 4px;
	box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
		0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
	background-color: #fff;
	font-weight: 600;
	font-size: 1.2em;
	line-height: 1.43;
	letter-spacing: 0.01071em;
	padding: 8px;

	&:not(:last-child) {
		margin-bottom: 15px;
	}

	&:active {
		box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2),
			0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);
	}
	&:hover {
		-webkit-text-decoration: none;
		text-decoration: none;
		background-color: #eaeaea;
		box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
			0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
	}
	&:focus-visible {
		outline: none;
		-webkit-text-decoration: none;
		text-decoration: none;
		background-color: #eaeaea;
		box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
			0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
	}
`;

export const BoardsList = () => {
	const { data } = useOutletContext<TOutletContext>();

	return (
		<BoardsListWrapper>
			{data.boardOrder &&
				data.boardOrder.map((boardId: string) => {
					const board = data.boards[boardId];

					return (
						board && (
							<BoardWrapper tabIndex={0} key={board.id}>
								<Tooltip title={`Перейти к ${board.title}`} placement='top-end'>
									<Link
										className={styles.boardItemLink}
										to={`/boards/${board.id}`}
										tabIndex={-1}
									>
										{board.title}
									</Link>
								</Tooltip>
								<ItemActions type='доска' item={board} />
							</BoardWrapper>
						)
					);
				})}
		</BoardsListWrapper>
	);
};
