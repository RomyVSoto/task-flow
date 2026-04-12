import React from 'react'

interface createTableModalProps{
    isOpen: boolean;
    onClose: () => void;
}

export default function CreateTaskModal({isOpen, onClose}: createTableModalProps) {
  return (
    <div>CreateTaskModal</div>
  )
}
