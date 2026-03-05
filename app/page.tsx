'use client';

import { useEffect, useState } from "react";
import { useAuth } from '@/hooks/useAuth';
import { apiFetch } from '@/lib/api';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Droplet, TrendingUp, AlertCircle, Leaf } from 'lucide-react';

/* AI prediction demo data */
const predictionData = [
  { date: 'Mon', predicted: 85, historical: 80 },
  { date: 'Tue', predicted: 88, historical: 82 },
  { date: 'Wed', predicted: 92, historical: 88 },
  { date: 'Thu', predicted: 78, historical: 75 },
  { date: 'Fri', predicted: 95, historical: 90 },
  { date: 'Sat', predicted: 72, historical: 70 },
  { date: 'Sun', predicted: 68, historical: 65 },
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
      type: 'spring' as const,
      stiffness: 100,
      damping: 15,
    },
  },
} as const;

export default function Dashboard() {
  const { user } = useAuth();

  /* MongoDB data state */
  const [waterUsageData, setWaterUsageData] = useState<any[]>([]);

  const [predictions, setPredictions] = useState<any[]>([]);
  const [alertsCount, setAlertsCount] = useState<number>(0);

  /* Fetch backend API */
  useEffect(() => {
    apiFetch('/water')
      .then(data => {
        const formatted = data.map((item: any) => ({
          time: new Date(item.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          }),
          usage: item.usage
        }));
        setWaterUsageData(formatted);
      })
      .catch(err => console.log("API Error:", err));

    apiFetch('/predictions')
      .then(data => setPredictions(data))
      .catch(console.error);

    apiFetch('/alerts')
      .then(data => setAlertsCount(data.filter((a:any)=>a.status==='active').length))
      .catch(console.error);
  }, []);

  return (
    <motion.div
      className="p-8 space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Real-time water monitoring and AI insights
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Total Water Usage</CardTitle>
              <Droplet className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{waterUsageData.reduce((acc,cur)=>acc+cur.usage,0)} ML</div>
              <p className="text-xs text-muted-foreground">↑ 12% from yesterday</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>AI Prediction</CardTitle>
              <TrendingUp className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Math.round(predictions.length>0?predictions[0].predictedUsage:0)} ML</div>
              <p className="text-xs text-muted-foreground">Next 24 hours</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Active Alerts</CardTitle>
              <AlertCircle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{alertsCount}</div>
              <p className="text-xs text-muted-foreground">Requires attention</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Irrigation Efficiency</CardTitle>
              <Leaf className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87%</div>
              <p className="text-xs text-muted-foreground">↑ 5% this week</p>
            </CardContent>
          </Card>
        </motion.div>

      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Water Usage Chart */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle>Water Usage Trends</CardTitle>
              <CardDescription>Live MongoDB data</CardDescription>
            </CardHeader>

            <CardContent>

              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={waterUsageData}>

                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="time" />

                  <YAxis />

                  <Tooltip />

                  <Area
                    type="monotone"
                    dataKey="usage"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                  />

                </AreaChart>
              </ResponsiveContainer>

            </CardContent>
          </Card>
        </motion.div>


        {/* Prediction Chart */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle>Predictions vs Historical</CardTitle>
              <CardDescription>7-day forecast</CardDescription>
            </CardHeader>

            <CardContent>

              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={predictionData}>

                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="date" />

                  <YAxis />

                  <Tooltip />

                  <Line
                    type="monotone"
                    dataKey="historical"
                    stroke="#8884d8"
                    strokeWidth={2}
                  />

                  <Line
                    type="monotone"
                    dataKey="predicted"
                    stroke="#22c55e"
                    strokeWidth={2}
                  />

                </LineChart>
              </ResponsiveContainer>

            </CardContent>
          </Card>
        </motion.div> 

      </div>

    </motion.div>
  );
}