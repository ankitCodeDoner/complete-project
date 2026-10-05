import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
  itemIndex: number;
}

export const TableRow = ({ children, itemIndex }: Props) => {
  return (
    <motion.tr
      className={`hover:bg-blue-100 transition-colors duration-300 ${
        itemIndex % 2 === 0 ? "bg-white" : "bg-blue-50"
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, delay: itemIndex * 0.1 }}
    >
      {children}
    </motion.tr>
  );
};
