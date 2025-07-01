import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PlusCircle, DollarSign } from 'lucide-react';

interface ExpenseFormProps {
  onAddExpense: (expense: { amount: number; category: string; note: string }) => void;
}

const categories = [
  { name: 'Food & Drinks', emoji: '🍕', color: 'bg-pink-200' },
  { name: 'Shopping', emoji: '🛍️', color: 'bg-yellow-200' },
  { name: 'Transport', emoji: '🚕', color: 'bg-blue-200' },
  { name: 'Entertainment', emoji: '🎬', color: 'bg-purple-200' },
  { name: 'Bills', emoji: '📄', color: 'bg-red-200' },
  { name: 'Other', emoji: '💸', color: 'bg-green-200' },
];

const ExpenseForm: React.FC<ExpenseFormProps> = ({ onAddExpense }) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [note, setNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !category) return;

    setIsSubmitting(true);
    
    // Add a small delay for the animation effect
    await new Promise(resolve => setTimeout(resolve, 200));
    
    onAddExpense({
      amount: parseFloat(amount),
      category,
      note: note || 'No notes added',
    });

    // Reset form
    setAmount('');
    setCategory('');
    setNote('');
    setIsSubmitting(false);
  };

  return (
    <motion.div
      className="bg-white rounded-3xl p-6 shadow-lg border border-pink-100"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-pink-100 rounded-full">
          <PlusCircle className="w-6 h-6 text-pink-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Add Damage 💥</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Amount Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            How much? 💰
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-pink-300 focus:outline-none transition-colors"
              placeholder="0.00"
              required
            />
          </div>
        </div>

        {/* Category Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            What for? 🤔
          </label>
          <div className="grid grid-cols-2 gap-2">
            {categories.map((cat) => (
              <motion.label
                key={cat.name}
                className={`
                  flex items-center gap-2 p-3 rounded-2xl cursor-pointer transition-all
                  ${category === cat.name 
                    ? `${cat.color} ring-2 ring-pink-300` 
                    : 'bg-gray-50 hover:bg-gray-100'
                  }
                `}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <input
                  type="radio"
                  name="category"
                  value={cat.name}
                  checked={category === cat.name}
                  onChange={(e) => setCategory(e.target.value)}
                  className="sr-only"
                />
                <span className="text-lg">{cat.emoji}</span>
                <span className="text-sm font-medium text-gray-700">{cat.name}</span>
              </motion.label>
            ))}
          </div>
        </div>

        {/* Note Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Any tea? ☕ (optional)
          </label>
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-pink-300 focus:outline-none transition-colors"
            placeholder="Spill the details..."
          />
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={!amount || !category || isSubmitting}
          className="w-full bg-gradient-to-r from-pink-400 to-pink-500 text-white font-bold py-4 px-6 rounded-2xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          animate={isSubmitting ? { scale: [1, 1.05, 1] } : {}}
          transition={{ duration: 0.2 }}
        >
          {isSubmitting ? 'Adding... 🚀' : 'Track This Expense ✨'}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default ExpenseForm;