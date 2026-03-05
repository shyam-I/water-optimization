'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';

const forecastData = [
  { date: 'Mon', actual: 1200, predicted: 1150, upper: 1350, lower: 950 },
  { date: 'Tue', actual: 1350, predicted: 1300, upper: 1500, lower: 1100 },
  { date: 'Wed', actual: 1450, predicted: 1420, upper: 1620, lower: 1220 },
  { date: 'Thu', actual: 1320, predicted: 1380, upper: 1580, lower: 1180 },
  { date: 'Fri', actual: 1500, predicted: 1480, upper: 1680, lower: 1280 },
  { date: 'Sat', actual: 1100, predicted: 1120, upper: 1320, lower: 920 },
  { date: 'Sun', actual: 980, predicted: 1050, upper: 1250, lower: 850 },
  { date: 'Mon+1', predicted: 1180, upper: 1380, lower: 980 },
  { date: 'Tue+1', predicted: 1250, upper: 1450, lower: 1050 },
  { date: 'Wed+1', predicted: 1380, upper: 1580, lower: 1180 },
];

const anomalyData = [
  { timestamp: '2024-01-15 14:30', region: 'Region A', usage: 2800, expected: 1200, severity: 'high' },
  { timestamp: '2024-01-14 09:15', region: 'Region C', usage: 450, expected: 290, severity: 'medium' },
  { timestamp: '2024-01-13 18:45', region: 'Region B', usage: 520, expected: 380, severity: 'low' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

export default function Predictions() {
  return (
    <motion.div
      className="p-8 space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Prediction Insights</h1>
        <p className="text-muted-foreground">AI-powered forecasts and anomaly detection</p>
      </div>

      {/* Forecast Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div variants={itemVariants}>
          <motion.div
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card className="bg-card border-border backdrop-blur-sm cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">7-Day Forecast</CardTitle>
                <TrendingUp className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">8,428 ML</div>
                <p className="text-xs text-muted-foreground mt-1">Average daily usage</p>
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
                <CardTitle className="text-sm font-medium">Model Accuracy</CardTitle>
                <TrendingUp className="h-4 w-4 text-accent" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">94.2%</div>
                <p className="text-xs text-muted-foreground mt-1">MAPE prediction error</p>
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
                <CardTitle className="text-sm font-medium">Peak Prediction</CardTitle>
                <TrendingDown className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">Wed+1 @ 1.5K</div>
                <p className="text-xs text-muted-foreground mt-1">Next week's peak</p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>

      {/* Forecast Chart */}
      <motion.div variants={itemVariants}>
        <Card className="bg-card border-border backdrop-blur-sm">
          <CardHeader>
            <CardTitle>10-Day Forecast with Confidence Interval</CardTitle>
            <CardDescription>Predicted water usage with upper and lower bounds</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={forecastData}>
                <defs>
                  <linearGradient id="colorUpper" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }} />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="upper"
                  stroke="hsl(var(--accent))"
                  fill="url(#colorUpper)"
                  fillOpacity={1}
                  name="Upper Bound"
                />
                <Area
                  type="monotone"
                  dataKey="lower"
                  stroke="hsl(var(--muted-foreground))"
                  fill="none"
                  name="Lower Bound"
                />
                <Line type="monotone" dataKey="actual" stroke="hsl(var(--primary))" strokeWidth={2} name="Actual" />
                <Line type="monotone" dataKey="predicted" stroke="hsl(var(--chart-2))" strokeWidth={2} strokeDasharray="5 5" name="Predicted" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Anomalies Section */}
      <motion.div variants={itemVariants}>
        <Card className="bg-card border-border backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-500" />
              Detected Anomalies
            </CardTitle>
            <CardDescription>Unusual water usage patterns detected by AI model</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {anomalyData.map((anomaly, idx) => (
                <motion.div
                  key={idx}
                  className={`p-4 rounded-lg border ${
                    anomaly.severity === 'high'
                      ? 'bg-destructive/10 border-destructive/30'
                      : anomaly.severity === 'medium'
                      ? 'bg-yellow-500/10 border-yellow-500/30'
                      : 'bg-blue-500/10 border-blue-500/30'
                  }`}
                  whileHover={{ x: 4, scale: 1.01 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <p className="font-semibold text-foreground">{anomaly.region}</p>
                        <Badge
                          variant={
                            anomaly.severity === 'high'
                              ? 'destructive'
                              : anomaly.severity === 'medium'
                              ? 'secondary'
                              : 'outline'
                          }
                        >
                          {anomaly.severity.charAt(0).toUpperCase() + anomaly.severity.slice(1)}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{anomaly.timestamp}</p>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-muted-foreground">Detected Usage</p>
                          <p className="text-lg font-bold text-foreground">{anomaly.usage} ML</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Expected Usage</p>
                          <p className="text-lg font-bold text-foreground">{anomaly.expected} ML</p>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-destructive">
                        +{Math.round(((anomaly.usage - anomaly.expected) / anomaly.expected) * 100)}%
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Model Information */}
      <motion.div variants={itemVariants}>
        <Card className="bg-card border-border backdrop-blur-sm">
          <CardHeader>
            <CardTitle>AI Model Information</CardTitle>
            <CardDescription>Details about the prediction system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-muted-foreground">Algorithm</p>
                <p className="text-lg font-semibold text-foreground mt-1">LSTM Neural Network</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Training Data</p>
                <p className="text-lg font-semibold text-foreground mt-1">24 Months Historical</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Update Frequency</p>
                <p className="text-lg font-semibold text-foreground mt-1">Every 6 Hours</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
