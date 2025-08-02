import React from 'react';

export default function StarsRating({ rating }) {
  const maxStars = 5;
  const fullStar = '★';
  const emptyStar = '☆';

  // Garante que rating seja um número entre 0 e 5
  const safeRating = Math.min(Math.max(Number(rating) || 0, 0), maxStars);

  const fullStars = fullStar.repeat(Math.floor(safeRating));
  const emptyStars = emptyStar.repeat(maxStars - Math.floor(safeRating));

  return (
    <span style={{ color: '#ffa500', fontSize: '16px', fontWeight: 'bold' }}>
      {fullStars}{emptyStars} ({safeRating.toFixed(1)}/5)
    </span>
  );
}
