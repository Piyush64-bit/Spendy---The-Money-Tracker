import React from 'react';
import { motion } from 'framer-motion';
import { TrendingDown, DollarSign, Calendar, Target } from 'lucide-react';
import { Expense } from '../App';

interface ExpenseSummaryProps {
  expenses: Expense[];
}

const ExpenseSummary: React.FC<ExpenseSummaryProps> = ({ expenses }) => {
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  
  // Calculate this month's expenses
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const thisMonthExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear;
  });
  const thisMonthTotal = thisMonthExpenses.reduce((sum, expense) => sum + expense.amount, 0);

  // Calculate today's expenses
  const today = new Date().toDateString();
  const todayExpenses = expenses.filter(expense => 
    new Date(expense.date).toDateString() === today
  );
  const todayTotal = todayExpenses.reduce((sum, expense) => sum + expense.amount, 0);

  // Calculate average expense
  const averageExpense = expenses.length > 0 ? totalExpenses / expenses.length : 0;

  const stats = [
    {
      icon: DollarSign,
      label: 'Total Damage',
      value: `$${totalExpenses.toFixed(2)}`,
      color: 'bg-pink-100 text-pink-600',
      emoji: '💸'
    },
    {
      icon: Calendar,
      label: 'This Month',
      value: `$${thisMonthTotal.toFixed(2)}`,
      color: 'bg-blue-100 text-blue-600',
      emoji: '📅'
    },
    {
      icon: TrendingDown,
      label: 'Today',
      value: `$${todayTotal.toFixed(2)}`,
      color: 'bg-yellow-100 text-yellow-600',
      emoji: '📍'
    },
    {
      icon: Target,
      label: 'Average Hit',
      value: `$${averageExpense.toFixed(2)}`,
      color: 'bg-purple-100 text-purple-600',
      emoji: '🎯'
    }
  ];

  const getVibeMessage = () => {
    if (totalExpenses === 0) return "You're doing great! No spending tracked yet 🌟";
    if (totalExpenses < 100) return "Light spender! Keep it up 😎";
    if (totalExpenses < 500) return "Moderate vibes! You're doing okay 👍";
    if (totalExpenses < 1000) return "Heavy spender alert! Maybe chill a bit? 🤔";
    return "Big spender energy! Time to budget? 😅💰";
  };

  return (
    <motion.div
      className="bg-white rounded-3xl p-6 shadow-lg border border-pink-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-green-100 rounded-full">
          <TrendingDown className="w-6 h-6 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">The Tea ☕</h2>
      </div>

      <div className="space-y-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full ${stat.color}`}>
                <stat.icon className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="font-bold text-gray-800">{stat.value}</p>
              </div>
            </div>
            <div className="text-2xl">{stat.emoji}</div>
          </motion.div>
        ))}
      </div>

      {/* Vibe Check */}
      <motion.div
        className="mt-6 p-4 bg-gradient-to-r from-pink-50 to-yellow-50 rounded-2xl border border-pink-100"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl">✨</span>
          <h3 className="font-bold text-gray-800">Vibe Check</h3>
        </div>
        <p className="text-gray-700 text-sm">
          {getVibeMessage()}
        </p>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        className="mt-4 flex justify-between text-xs text-gray-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <span>{expenses.length} transactions</span>
        <span>{thisMonthExpenses.length} this month</span>
        <span>{todayExpenses.length} today</span>
      </motion.div>
    </motion.div>
  );
};

export default ExpenseSummary;