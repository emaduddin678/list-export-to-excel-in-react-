import React from 'react'
import { useBoqContext } from './../../context/BoqContext';

const HistoryPage = () => {
  const boq = useBoqContext()
  console.log(boq)
  return (
    <div>HistoryPage</div>
  )
}

export default HistoryPage