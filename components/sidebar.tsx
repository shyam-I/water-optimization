'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  BarChart3,
  Droplet,
  Brain,
  AlertTriangle,
  Sprout,
  Map,
  Home,
} from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/', icon: Home },
  { label: 'Analytics', href: '/analytics', icon: BarChart3 },
  { label: 'Predictions', href: '/predictions', icon: Brain },
  { label: 'Alerts', href: '/alerts', icon: AlertTriangle },
  { label: 'Irrigation', href: '/irrigation', icon: Sprout },
  { label: 'Flood Risk', href: '/flood-risk', icon: Droplet },
  { label: 'Equity Map', href: '/equity-map', icon: Map },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border h-screen sticky top-0 overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Droplet className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-sidebar-foreground">GEN-ORA</h1>
            <p className="text-xs text-sidebar-accent-foreground">Water Optimization</p>
          </div>
        </div>
      </div>

      <nav className="space-y-1 px-3">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                className={`relative px-4 py-3 rounded-lg flex items-center gap-3 cursor-pointer transition-colors ${
                  isActive
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                    : 'text-sidebar-accent-foreground hover:bg-sidebar-accent'
                }`}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.label}</span>
                {isActive && (
                  <motion.div
                    className="absolute left-0 top-0 bottom-0 w-1 bg-accent rounded-r"
                    layoutId="sidebar-indicator"
                    transition={{ type: 'spring', stiffness: 380, damping: 40 }}
                  />
                )}
              </motion.div>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
