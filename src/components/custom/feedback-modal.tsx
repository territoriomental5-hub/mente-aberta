'use client';

import { useState } from 'react';
import { MessageSquare, Star, Send } from 'lucide-react';
import { COLORS } from '@/lib/constants';
import type { Feedback } from '@/lib/types';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  userEmail: string;
  userId: string;
}

export function FeedbackModal({ isOpen, onClose, userEmail, userId }: FeedbackModalProps) {
  const [type, setType] = useState<Feedback['type']>('general');
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // TODO: Send to database
    const feedback: Omit<Feedback, 'id'> = {
      userId,
      userEmail,
      type,
      message,
      rating: rating > 0 ? rating : undefined,
      createdAt: new Date(),
      status: 'pending'
    };

    console.log('Feedback enviado:', feedback);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setMessage('');
    setRating(0);
    setType('general');
    
    alert('Feedback enviado com sucesso! Obrigado pela sua contribuição.');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <MessageSquare className="w-6 h-6 text-[#7FCCFF]" />
            <h2 className="text-2xl font-bold text-gray-800">Enviar Feedback</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Type Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Tipo de Feedback
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: 'bug', label: '🐛 Bug', color: '#FF6B6B' },
                { value: 'feature', label: '✨ Sugestão', color: '#7FCCFF' },
                { value: 'improvement', label: '🚀 Melhoria', color: '#A88BEB' },
                { value: 'general', label: '💬 Geral', color: '#F5E77A' }
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setType(option.value as Feedback['type'])}
                  className={`p-3 rounded-xl font-semibold transition-all ${
                    type === option.value
                      ? 'bg-[#7FCCFF] text-white shadow-lg scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Rating */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Avaliação (opcional)
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-8 h-8 ${
                      star <= rating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Sua Mensagem
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Conte-nos sua experiência, sugestão ou problema..."
              rows={5}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7FCCFF] resize-none"
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-6 py-4 rounded-xl font-semibold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 flex items-center justify-center gap-2"
            style={{
              background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondary})`
            }}
          >
            {isSubmitting ? (
              'Enviando...'
            ) : (
              <>
                <Send className="w-5 h-5" />
                Enviar Feedback
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
