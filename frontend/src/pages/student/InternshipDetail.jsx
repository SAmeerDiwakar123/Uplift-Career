import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'

const InternshipDetail = () => {
  const params = useParams();
  const internshipId = params.id;

  const { user } = useSelector(store => store.auth);
  const { singleInternship } = useSelector(store => store.internship);
  

  const { id } = useParams();
  return (
    <div>{id}</div>
  )
}
  
export default InternshipDetail