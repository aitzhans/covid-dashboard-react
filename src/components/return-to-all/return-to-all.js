import React from 'react';

const ReturnToAll = ({ onClick }) => {
  return (
    <div
      className="content__to-all"
      onClick={onClick}
    >
      Return to all countries
    </div>
  );
};

export default ReturnToAll;
