'use client';

import { motion } from 'framer-motion';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

type Props = {
  message: string;
};

export const ErrorMessage = ({ message }: Props) => {
  if (!message) return null;

  return (
    <motion.div
      className="bg-red-100 text-red-700 border border-red-300 px-4 py-2 rounded-md mt-4 mb-4"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
      {message}
    </motion.div>
  );
};
