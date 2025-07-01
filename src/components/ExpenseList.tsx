import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeartCrack, Calendar } from 'lucide-react';
import { Expense } from '../App';

interface ExpenseListProps {
  expenses: Expense[];
  onDeleteExpense: (id: string) => void;
}

const getCategoryEmoji = (category: string) => {
  const emojiMap: { [key: string]: string } = {
    'Food & Drinks': '🍕',
    'Shopping': '🛍️',
    'Transport': '🚕',
    'Entertainment': '🎬',
    'Bills': '📄',
    'Other': '💸',
  };
  return emojiMap[category] || '💸';
};

const getCategoryColor = (category: string) => {
  const colorMap: { [key: string]: string } = {
    'Food & Drinks': 'bg-pink-100 border-pink-200',
    'Shopping': 'bg-yellow-100 border-yellow-200',
    'Transport': 'bg-blue-100 border-blue-200',
    'Entertainment': 'bg-purple-100 border-purple-200',
    'Bills': 'bg-red-100 border-red-200',
    'Other': 'bg-green-100 border-green-200',
  };
  return colorMap[category] || 'bg-gray-100 border-gray-200';
};

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, onDeleteExpense }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <motion.div
      className="bg-white rounded-3xl p-6 shadow-lg border border-pink-100 h-fit"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-100 rounded-full">
          <Calendar className="w-6 h-6 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Recent Damage 📋</h2>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        <AnimatePresence>
          {expenses.length === 0 ? (
            <motion.div
              className="text-center py-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="text-6xl mb-4">🎉</div>
              <p className="text-gray-500 text-lg">No expenses yet!</p>
              <p className="text-gray-400">You're either broke or responsible 😅</p>
            </motion.div>
          ) : (
            expenses.map((expense, index) => (
              <motion.div
                key={expense.id}
                className={`
                  relative p-4 rounded-2xl border-2 ${getCategoryColor(expense.category)}
                  hover:shadow-md transition-shadow group
                `}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ 
                  duration: 0.3, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100 
                }}
                layout
              >
                {/* Delete Button */}
                <motion.button
                  onClick={() => onDeleteExpense(expense.id)}
                  className="absolute top-2 right-2 p-1 rounded-full bg-white shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <HeartCrack className="w-4 h-4 text-red-500" />
                </motion.button>

                <div className="flex items-start gap-3">
                  {/* Category Emoji */}
                  <div className="text-2xl mt-1">
                    {getCategoryEmoji(expense.category)}
                  </div>

                  {/* Expense Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-gray-800 truncate">
                        {expense.category}
                      </h3>
                      <span className="text-lg font-bold text-gray-900">
                        ${expense.amount.toFixed(2)}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-2 break-words">
                      {expense.note}
                    </p>
                    
                    <div className="text-xs text-gray-500">
                      {formatDate(expense.date)}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {expenses.length > 0 && (
        <motion.div 
          className="mt-4 text-center text-sm text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {expenses.length} expense{expenses.length !== 1 ? 's' : ''} tracked 📊
        </motion.div>
      )}
    </motion.div>
  );
};

export default ExpenseList;