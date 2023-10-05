import React from 'react'
import { useOutletContext, useParams } from 'react-router-dom'
import { Board } from '../../type'

export const BoardPage = () => {
  const { board_id } = useParams<{ board_id: string }>();

  const [boardsList]: [Board[]] = useOutletContext();

  return (
    <div>
      {board_id && boardsList.find(board => board.id === parseInt(board_id))?.name}
    </div>
  )
}