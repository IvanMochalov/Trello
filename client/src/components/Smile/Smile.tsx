import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { IconButton, Tooltip } from '@mui/material';
import styled from 'styled-components';

interface ISmile {
	happy: boolean;
}

const Title = styled.h3`
	color: #5a41c8;
	text-transform: uppercase;
	font-size: 1.3rem;
	text-decoration: none;
`;

export const Smile = ({ happy }: ISmile) => {
	return (
		<>
			<IconButton aria-label='go to main' sx={{ flexDirection: 'column' }}>
				{happy ? (
					<Tooltip title='На Главную' placement='left'>
						<InsertEmoticonIcon sx={{ fontSize: 60, color: '#39bd3f' }} />
					</Tooltip>
				) : (
					<>
						<Tooltip title='Страница не найдена. На главную' placement='left'>
							<SentimentVeryDissatisfiedIcon
								sx={{ fontSize: 60, color: '#5a41c8' }}
							/>
						</Tooltip>
					</>
				)}
			</IconButton>
			{!happy && <Title>not found</Title>}
		</>
	);
};
