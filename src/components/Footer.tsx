import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/Piyush64-bit',
      icon: Github,
      color: 'hover:bg-gray-100 hover:text-gray-800',
      bgColor: 'bg-gray-50'
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/piyush64bit/',
      icon: Linkedin,
      color: 'hover:bg-blue-100 hover:text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      name: 'Email',
      url: 'mailto:piiyush.sonii@outlook.com',
      icon: Mail,
      color: 'hover:bg-pink-100 hover:text-pink-600',
      bgColor: 'bg-pink-50'
    }
  ];

  return (
    <motion.footer
      className="mt-16 py-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1 }}
    >
      {/* Social Media Buttons */}
      <motion.div
        className="flex justify-center gap-4 mb-6"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1.2 }}
      >
        {socialLinks.map((link, index) => (
          <motion.a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`
              p-3 rounded-2xl ${link.bgColor} ${link.color} 
              transition-all duration-300 shadow-sm hover:shadow-md
              border border-gray-200 hover:border-gray-300
            `}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.4, 
              delay: 1.3 + (index * 0.1),
              type: "spring",
              stiffness: 100
            }}
            whileHover={{ 
              scale: 1.1,
              rotate: [0, -5, 5, 0],
              transition: { duration: 0.3 }
            }}
            whileTap={{ scale: 0.95 }}
          >
            <link.icon className="w-6 h-6" />
          </motion.a>
        ))}
      </motion.div>

      {/* Main Footer Text */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.4 }}
      >
        <motion.div
          className="flex items-center justify-center gap-2 text-lg flex-wrap"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <span className="text-gray-600">© 2025 coded with</span>
          <motion.span
            className="text-2xl"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            🤙
          </motion.span>
          <span className="text-gray-600">by</span>
          <motion.span
            className="font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent tracking-widest"
            style={{ fontFamily: 'monospace' }}
            animate={{ 
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.2 }
            }}
          >
            P I Y U $ H
          </motion.span>
        </motion.div>

        {/* Fun tagline */}
        <motion.p
          className="text-sm text-gray-500 mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
        >
          <motion.span
            animate={{ 
              color: ['#9CA3AF', '#EC4899', '#8B5CF6', '#9CA3AF']
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          >
            Building digital experiences that don't break the bank
          </motion.span>
          {' '}
          <motion.span
            animate={{ 
              rotate: [0, 15, -15, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatDelay: 4
            }}
            className="inline-block"
          >
            💰
          </motion.span>
        </motion.p>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;