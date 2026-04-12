import React from 'react'

interface CreateBoardModalProps{
    isOpen: boolean;
    onClose: () => void;
}

export default function CreateBoardModal({isOpen, onClose}: CreateBoardModalProps) {
  return (
    <div>CreateBoardModal</div>
  )
}
