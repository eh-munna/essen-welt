import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useState } from 'react';

const notificationsData = [
  { id: 1, title: 'New Message', message: 'Hey! How are you?' },
  {
    id: 2,
    title: 'Update Available',
    message: 'iOS 17.4 is ready to install.',
  },
  { id: 3, title: 'Reminder', message: 'Meeting at 3 PM.' },
];

export default function NotificationStack() {
  const [notifications, setNotifications] = useState(notificationsData);
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <section className="relative z-50">
      <div className="fixed top-5 right-5 flex flex-col items-end w-80 bg-red-500">
        <AnimatePresence>
          {notifications.map((notification, index) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, y: -index * 15, scale: 0.95 }}
              animate={{
                opacity: 1,
                y: expanded ? index * 70 : -index * 15,
                scale: expanded ? 1 : 0.95,
              }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="bg-white shadow-xl rounded-2xl p-4 flex items-start gap-3 w-72 relative cursor-pointer"
              onClick={toggleExpand}
              style={{
                position: 'absolute',
                top: expanded ? index * 75 : 0,
                right: 0,
              }}
            >
              <div className="flex-1">
                <h4 className="text-lg font-semibold">{notification.title}</h4>
                <p className="text-sm text-gray-600">{notification.message}</p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeNotification(notification.id);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
