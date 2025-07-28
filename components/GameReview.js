import { useEffect, useState } from 'react';

export default function GameReview({ gameId }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [name, setName] = useState('');
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem(`reviews-${gameId}`);
    if (stored) {
      setReviews(JSON.parse(stored));
    }
  }, [gameId]);

  const submitReview = () => {
    const newReview = {
      name: name || 'Anônimo',
      rating,
      comment,
      date: new Date().toLocaleDateString()
    };

    const updated = [newReview, ...reviews];
    setReviews(updated);
    localStorage.setItem(`reviews-${gameId}`, JSON.stringify(updated));
    setRating(0);
    setComment('');
    setName('');
  };

  return (
    <div className="bg-gray-900 text-white p-4 rounded-lg mt-6 space-y-4">
      <h3 className="text-xl font-bold">Avaliações dos jogadores</h3>

      <div className="space-y-2">
        <input
          type="text"
          placeholder="Seu nome (opcional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 rounded bg-gray-800 text-white"
        />

        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((n) => (
            <span
              key={n}
              onClick={() => setRating(n)}
              className={`cursor-pointer text-2xl ${
                n <= rating ? 'text-yellow-400' : 'text-gray-500'
              }`}
            >
              ★
            </span>
          ))}
        </div>

        <textarea
          placeholder="Escreva seu comentário..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full p-2 rounded bg-gray-800 text-white"
        />

        <button
          onClick={submitReview}
          disabled={rating === 0 || comment.trim() === ''}
          className="bg-yellow-400 text-black font-bold px-4 py-2 rounded hover:bg-yellow-300 disabled:opacity-50"
        >
          Enviar Avaliação
        </button>
      </div>

      <div className="space-y-2 pt-4 border-t border-yellow-500">
        {reviews.length === 0 && <p className="text-gray-400">Nenhuma avaliação ainda.</p>}

        {reviews.map((r, idx) => (
          <div key={idx} className="bg-gray-800 p-3 rounded">
            <p className="text-yellow-300 font-bold">{r.name}</p>
            <p className="text-sm text-gray-400">{r.date}</p>
            <p className="text-yellow-400">
              {'★'.repeat(r.rating)}{' '}
              <span className="text-gray-500">{'★'.repeat(5 - r.rating)}</span>
            </p>
            <p className="text-white">{r.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

