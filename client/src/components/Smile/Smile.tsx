import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { IconButton, Tooltip } from '@mui/material';

interface ISmile {
  happy: boolean;
}

export const Smile = ({ happy }: ISmile) => {
  return (
    <IconButton aria-label="go to main" >
      {happy ? (
        <Tooltip title="Go to Main">
          <InsertEmoticonIcon sx={{ fontSize: 60, color: '#39bd3f' }}/>
        </Tooltip>
      ) : (
        <Tooltip title="Not Found. Go to Main">
          <SentimentVeryDissatisfiedIcon sx={{ fontSize: 60, color: '#5a41c8' }}/>
        </Tooltip>
      )}
    </IconButton>
  )
}