import { motion } from 'framer-motion';
import { ReactNode } from 'react';

const PopupAnimation = ({
    className,
    children
} : {
    className? : string
    children? : ReactNode
}) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{  opacity: 0 }}
            transition={{duration : 0.2}}
            className={className}
        >
            {children}
        </motion.div>
    )
}
export default PopupAnimation