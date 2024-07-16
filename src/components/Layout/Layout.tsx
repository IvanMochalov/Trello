import { Box } from '@mui/material'
import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { Paths } from '../../utils/constants'
import { Smile } from '../Smile'
import styles from './layout.module.css'
import { useMainLogic } from '../../hooks/useMainLogic'

export const Layout = () => {
	const { context, isHappy } = useMainLogic()

	return (
		<Box sx={{ padding: { xs: '0 20px', lg: '0 30px' } }}>
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
					<Smile happy={isHappy} />
				</Link>
			</div>
			<Outlet context={context} />
		</Box>
	)
}
