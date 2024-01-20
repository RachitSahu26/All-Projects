import React from 'react';

function Badges({ genres }) {
  return (
    <>
      {genres.map((genre) => (
        <span
          key={genre.id}
          className={`bg-${genre.color}-100 text-${genre.color}-800 text-2xl font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-${genre.color}-900 dark:text-${genre.color}-300`}
        >
          {genre.name}
        </span>
      ))}
    </>
  );
}

export default Badges;
