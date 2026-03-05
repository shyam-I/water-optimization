'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, AlertCircle, CheckCircle, X } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const alertsData = [
  {
    id: 1,
    type: 'anomaly',
    severity: 'high',
    title: 'Water Usage Spike Detected',
    description: 'Region A showing 150% higher usage than expected',
    time: '15 minutes ago',
    status: 'active',
  },
  {
    id: 2,
    type: 'flood',
    severity: 'high',
    title: 'Flood Risk Warning',
    description: 'Heavy rainfall predicted for next 48 hours with high flood probability',
    time: '2 hours ago',
    status: 'active',
  },
  {
    id: 3,
    type: 'shortage',
    severity: 'medium',
    title: 'Water Shortage Alert',
    description: 'Water levels in Reservoir B dropping below critical threshold',
    time: '4 hours ago',
    status: 'active',
  },
  {
    id: 4,
    type: 'maintenance',
    severity: 'low',
    title: 'Maintenance Alert',
    description: 'Irrigation system in Region D requires scheduled maintenance',
    time: '1 day ago',
    status: 'resolved',
  },
  {
    id: 5,
    type: 'anomaly',
    severity: 'medium',
    title: 'Minor Usage Fluctuation',
    description: 'Region E showing 25% variation from baseline',
    time: '2 days ago',
    status: 'resolved',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
};

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'high':
      return 'bg-destructive/10 border-destructive/30 text-destructive';
    case 'medium':
      return 'bg-yellow-500/10 border-yellow-500/30 text-yellow-600';
    case 'low':
      return 'bg-blue-500/10 border-blue-500/30 text-blue-600';
    default:
      return 'bg-muted/10 border-muted/30 text-muted-foreground';
  }
};

const getSeverityIcon = (severity: string) => {
  switch (severity) {
    case 'high':
      return AlertTriangle;
    case 'medium':
      return AlertCircle;
    default:
      return CheckCircle;
  }
};

export default function Alerts() {
  const [dismissedAlerts, setDismissedAlerts] = useState<number[]>([]);

  const handleDismiss = (id: number) => {
    setDismissedAlerts([...dismissedAlerts, id]);
  };

  const activeAlerts = alertsData.filter(alert => alert.status === 'active' && !dismissedAlerts.includes(alert.id));
  const resolvedAlerts = alertsData.filter(alert => alert.status === 'resolved');

  return (
    <motion.div
      className="p-8 space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Alerts & Notifications</h1>
        <p className="text-muted-foreground">System warnings and critical notifications</p>
      </div>

      {/* Alert Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div variants={itemVariants}>
          <motion.div
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card className="bg-card border-border backdrop-blur-sm cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
                <AlertTriangle className="h-4 w-4 text-destructive" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{activeAlerts.length}</div>
                <p className="text-xs text-muted-foreground mt-1">Requires immediate action</p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <motion.div
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card className="bg-card border-border backdrop-blur-sm cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Resolved This Week</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{resolvedAlerts.length}</div>
                <p className="text-xs text-muted-foreground mt-1">Successfully handled</p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <motion.div
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card className="bg-card border-border backdrop-blur-sm cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
                <CheckCircle className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">2.3 hrs</div>
                <p className="text-xs text-muted-foreground mt-1">↓ 15% from last week</p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="active" className="space-y-6">
        <TabsList className="bg-card border-border">
          <TabsTrigger value="active">
            Active ({activeAlerts.length})
          </TabsTrigger>
          <TabsTrigger value="resolved">
            Resolved ({resolvedAlerts.length})
          </TabsTrigger>
        </TabsList>

        {/* Active Alerts Tab */}
        <TabsContent value="active" className="space-y-4">
          {activeAlerts.length === 0 ? (
            <motion.div variants={itemVariants}>
              <Card className="bg-card border-border backdrop-blur-sm">
                <CardContent className="pt-12 pb-12 text-center">
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <p className="text-foreground font-semibold">All Systems Normal</p>
                  <p className="text-muted-foreground text-sm mt-2">No active alerts at the moment</p>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            activeAlerts.map((alert) => {
              const Icon = getSeverityIcon(alert.severity);
              return (
                <motion.div key={alert.id} variants={itemVariants}>
                  <motion.div
                    className={`p-4 rounded-lg border ${getSeverityColor(alert.severity)}`}
                    whileHover={{ x: 4, scale: 1.01 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <Icon className="w-5 h-5 mt-1 flex-shrink-0" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-foreground">{alert.title}</h3>
                            <Badge variant="secondary" className="text-xs">
                              {alert.severity.toUpperCase()}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{alert.description}</p>
                          <p className="text-xs text-muted-foreground">{alert.time}</p>
                        </div>
                      </div>
                      <motion.button
                        onClick={() => handleDismiss(alert.id)}
                        className="text-muted-foreground hover:text-foreground p-1"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <X className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })
          )}
        </TabsContent>

        {/* Resolved Alerts Tab */}
        <TabsContent value="resolved" className="space-y-4">
          {resolvedAlerts.map((alert) => {
            const Icon = getSeverityIcon(alert.severity);
            return (
              <motion.div key={alert.id} variants={itemVariants}>
                <motion.div
                  className={`p-4 rounded-lg border opacity-75 ${getSeverityColor(alert.severity)}`}
                  whileHover={{ x: 4, scale: 1.01 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <CheckCircle className="w-5 h-5 mt-1 flex-shrink-0 text-green-500" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-foreground line-through">{alert.title}</h3>
                          <Badge variant="outline" className="text-xs">
                            RESOLVED
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{alert.description}</p>
                        <p className="text-xs text-muted-foreground">{alert.time}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </TabsContent>
      </Tabs>

      {/* Alert Settings Card */}
      <motion.div variants={itemVariants}>
        <Card className="bg-card border-border backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Alert Preferences</CardTitle>
            <CardDescription>Configure notification settings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <motion.div
                className="flex items-center justify-between p-3 rounded-lg bg-card/50 hover:bg-card/70 transition-colors"
                whileHover={{ scale: 1.01 }}
              >
                <div>
                  <p className="font-medium text-foreground">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive alerts via email</p>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5 rounded" />
              </motion.div>
              <motion.div
                className="flex items-center justify-between p-3 rounded-lg bg-card/50 hover:bg-card/70 transition-colors"
                whileHover={{ scale: 1.01 }}
              >
                <div>
                  <p className="font-medium text-foreground">SMS Alerts (High Severity)</p>
                  <p className="text-sm text-muted-foreground">Get SMS for critical issues</p>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5 rounded" />
              </motion.div>
              <motion.div
                className="flex items-center justify-between p-3 rounded-lg bg-card/50 hover:bg-card/70 transition-colors"
                whileHover={{ scale: 1.01 }}
              >
                <div>
                  <p className="font-medium text-foreground">Push Notifications</p>
                  <p className="text-sm text-muted-foreground">Browser notifications</p>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5 rounded" />
              </motion.div>
            </div>
            <motion.div
              className="mt-6"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                Save Preferences
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
