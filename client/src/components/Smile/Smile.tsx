import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { IconButton } from '@mui/material';

interface ISmile {
  happy: boolean;
}

export const Smile = ({ happy }: ISmile) => {
  return (
    <IconButton aria-label="Example" >
      {happy ? (
        <InsertEmoticonIcon sx={{ fontSize: 60, color: '#39bd3f' }}/>
      ) : (
        <SentimentVeryDissatisfiedIcon sx={{ fontSize: 60, color: '#5a41c8' }}/>
      )}
    </IconButton>
  )
}