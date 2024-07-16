import React from 'react';
import { Box, Container } from '@mui/system';
import { Link } from 'react-router-dom';
import { Smile } from '../Smile';
import styles from './notFound.module.css';
import { Paths } from '../../utils/consts'

export const NotFound = () => {
	return (
		<Container maxWidth='xl'>
			<Box>
				<div className={styles.smileWrapper}>
					<Link
						to={Paths.homePage}
						tabIndex={-1}
						style={{
							textDecoration: 'none',
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
						}}
					>
						<Smile happy={false} />
					</Link>
				</div>
			</Box>
		</Container>
	);
};
