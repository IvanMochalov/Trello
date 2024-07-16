import { Box, Container } from '@mui/system'
import { Link } from 'react-router-dom'
import { Paths } from '../../utils/constants'
import { Smile } from '../Smile'
import styles from './notFound.module.css'

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
	)
}
