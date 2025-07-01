import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import ExpenseChart from './components/ExpenseChart';
import ExpenseSummary from './components/ExpenseSummary';
import Footer from './components/Footer';

export interface Expense {
  id: string;
  amount: number;
  category: string;
  note: string;
  date: string;
}

function App() {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  // Load expenses from localStorage on mount
  useEffect(() => {
    const savedExpenses = localStorage.getItem('spendy-expenses');
    if (savedExpenses) {
      setExpenses(JSON.parse(savedExpenses));
    }
  }, []);

  // Save expenses to localStorage whenever expenses change
  useEffect(() => {
    localStorage.setItem('spendy-expenses', JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (expense: Omit<Expense, 'id' | 'date'>) => {
    const newExpense: Expense = {
      ...expense,
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
    };
    setExpenses(prev => [newExpense, ...prev]);
  };

  const deleteExpense = (id: string) => {
    setExpenses(prev => prev.filter(expense => expense.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50" style={{ backgroundColor: '#fdf6f0' }}>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Animated Spendy Title */}
          <div className="relative mb-4">
            <motion.h1 
              className="text-5xl md:text-7xl font-bold text-gray-800 inline-block"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                duration: 0.8, 
                type: "spring", 
                stiffness: 100,
                delay: 0.2 
              }}
            >
              <motion.span
                className="inline-block"
                animate={{ 
                  rotate: [0, -5, 5, -5, 0],
                  scale: [1, 1.1, 1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3,
                  ease: "easeInOut"
                }}
              >
                💸
              </motion.span>
              {' '}
              <motion.span
                className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent"
                animate={{ 
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{ 
                  backgroundSize: '200% 200%'
                }}
              >
                Spendy
              </motion.span>
            </motion.h1>
            
            {/* Floating sparkles around title */}
            <motion.div
              className="absolute -top-2 -right-2 text-2xl"
              animate={{ 
                y: [-5, 5, -5],
                rotate: [0, 180, 360],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              ✨
            </motion.div>
            
            <motion.div
              className="absolute -bottom-2 -left-2 text-xl"
              animate={{ 
                y: [5, -5, 5],
                rotate: [360, 180, 0],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ 
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            >
              💫
            </motion.div>
          </div>

          <motion.p 
            className="text-xl md:text-2xl text-gray-600 mb-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.span
              animate={{ 
                color: ['#6B7280', '#EC4899', '#8B5CF6', '#6B7280']
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              Where'd my money go?
            </motion.span>
          </motion.p>
          
          <motion.p 
            className="text-lg text-gray-500"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Track your spending like the financial queen/king you are{' '}
            <motion.span
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 2
              }}
              className="inline-block"
            >
              ✨
            </motion.span>
          </motion.p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Form and Summary */}
          <div className="lg:col-span-1 space-y-6">
            <ExpenseForm onAddExpense={addExpense} />
            <ExpenseSummary expenses={expenses} />
          </div>

          {/* Middle Column - Chart */}
          <div className="lg:col-span-1">
            <ExpenseChart expenses={expenses} />
          </div>

          {/* Right Column - Expense List */}
          <div className="lg:col-span-1">
            <ExpenseList expenses={expenses} onDeleteExpense={deleteExpense} />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default App;