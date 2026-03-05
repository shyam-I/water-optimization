'use client';

import { motion } from 'framer-motion';
import { Bell, User, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Navbar() {
  return (
    <nav className="sticky top-0 z-40 w-full bg-background/95 backdrop-blur-md border-b border-border">
      <div className="flex items-center justify-between h-16 px-6">
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-foreground">Water Optimization Platform</h2>
        </div>

        <div className="flex items-center gap-4">
          <motion.button
            className="relative p-2 rounded-lg hover:bg-card text-muted-foreground hover:text-foreground transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
          </motion.button>

          <motion.button
            className="p-2 rounded-lg hover:bg-card text-muted-foreground hover:text-foreground transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Settings className="w-5 h-5" />
          </motion.button>

          <motion.div
            className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <User className="w-5 h-5 text-primary-foreground" />
          </motion.div>
        </div>
      </div>
    </nav>
  );
}
