import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Doughnut } from 'react-chartjs-2';
import { PieChart } from 'lucide-react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import { Expense } from '../App';

ChartJS.register(ArcElement, Tooltip, Legend);

interface ExpenseChartProps {
  expenses: Expense[];
}

const ExpenseChart: React.FC<ExpenseChartProps> = ({ expenses }) => {
  const chartRef = useRef<ChartJS<'doughnut'>>(null);

  // Calculate category totals
  const categoryTotals = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as { [key: string]: number });

  const categories = Object.keys(categoryTotals);
  const amounts = Object.values(categoryTotals);

  // Pastel colors for the chart
  const colors = [
    '#FFB6C1', // Light Pink
    '#FFFFE0', // Light Yellow  
    '#ADD8E6', // Light Blue
    '#DDA0DD', // Plum
    '#F0E68C', // Khaki
    '#98FB98', // Pale Green
    '#FFA07A', // Light Salmon
    '#F5DEB3', // Wheat
  ];

  const data = {
    labels: categories,
    datasets: [
      {
        data: amounts,
        backgroundColor: colors.slice(0, categories.length),
        borderColor: colors.slice(0, categories.length).map(color => color + '80'),
        borderWidth: 2,
        hoverOffset: 4,
      },
    ],
  };

  const options: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          usePointStyle: true,
          font: {
            size: 12,
            weight: '500',
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.parsed;
            const total = amounts.reduce((sum, amount) => sum + amount, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: $${value.toFixed(2)} (${percentage}%)`;
          },
        },
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        titleColor: '#374151',
        bodyColor: '#374151',
        borderColor: '#E5E7EB',
        borderWidth: 1,
        cornerRadius: 8,
      },
    },
    animation: {
      animateRotate: true,
      animateScale: true,
      duration: 1000,
    },
  };

  // Animate chart when data changes
  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.update('active');
    }
  }, [expenses]);

  return (
    <motion.div
      className="bg-white rounded-3xl p-6 shadow-lg border border-pink-100"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-yellow-100 rounded-full">
          <PieChart className="w-6 h-6 text-yellow-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Spending Vibes 📊</h2>
      </div>

      <div className="relative h-80">
        {expenses.length === 0 ? (
          <motion.div
            className="flex flex-col items-center justify-center h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="text-6xl mb-4">📈</div>
            <p className="text-gray-500 text-lg text-center">
              Add some expenses to see the magic! ✨
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Your spending breakdown will appear here
            </p>
          </motion.div>
        ) : (
          <motion.div
            className="h-full"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Doughnut 
              ref={chartRef}
              data={data} 
              options={options} 
            />
          </motion.div>
        )}
      </div>

      {expenses.length > 0 && (
        <motion.div
          className="mt-4 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-sm text-gray-500">
            {categories.length} categories • ${amounts.reduce((sum, amount) => sum + amount, 0).toFixed(2)} total
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ExpenseChart;