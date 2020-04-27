import React from 'react';

function User({ details }) {
  return (
    <div className='user-container'>
      <h2>{details.name}</h2>
      <p>Email: {details.email}</p>
        </div>
  )
}
 export default User;