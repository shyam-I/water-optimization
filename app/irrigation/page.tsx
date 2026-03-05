'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Droplet, Leaf, Cloud, Wind } from 'lucide-react';

const irrigationRecommendations = [
  { region: 'Region A', soilMoisture: 35, recommended: 'Irrigate Now', duration: '4 hours', saving: '12%' },
  { region: 'Region B', soilMoisture: 62, recommended: 'Wait 2 days', duration: 'N/A', saving: '18%' },
  { region: 'Region C', soilMoisture: 28, recommended: 'Urgent', duration: '6 hours', saving: '8%' },
  { region: 'Region D', soilMoisture: 45, recommended: 'Wait 1 day', duration: 'N/A', saving: '22%' },
  { region: 'Region E', soilMoisture: 52, recommended: 'Wait 3 days', duration: 'N/A', saving: '15%' },
];

const soilMoistureData = [
  { region: 'Region A', current: 35, optimal: 50, capacity: 100 },
  { region: 'Region B', current: 62, optimal: 50, capacity: 100 },
  { region: 'Region C', current: 28, optimal: 50, capacity: 100 },
  { region: 'Region D', current: 45, optimal: 50, capacity: 100 },
  { region: 'Region E', current: 52, optimal: 50, capacity: 100 },
];

const weatherForecastData = [
  { day: 'Today', rainfall: 0, temp: 28, humidity: 65, windSpeed: 12 },
  { day: 'Tomorrow', rainfall: 5, temp: 26, humidity: 72, windSpeed: 10 },
  { day: 'Day 3', rainfall: 15, temp: 24, humidity: 80, windSpeed: 8 },
  { day: 'Day 4', rainfall: 8, temp: 25, humidity: 75, windSpeed: 11 },
  { day: 'Day 5', rainfall: 0, temp: 27, humidity: 68, windSpeed: 14 },
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

export default function Irrigation() {
  return (
    <motion.div
      className="p-8 space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Irrigation Planning</h1>
        <p className="text-muted-foreground">AI-optimized irrigation recommendations based on soil and weather</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div variants={itemVariants}>
          <motion.div whileHover={{ y: -4, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Card className="bg-card border-border backdrop-blur-sm cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Soil Moisture</CardTitle>
                <Droplet className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">44.4%</div>
                <p className="text-xs text-muted-foreground mt-1">Across all regions</p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <motion.div whileHover={{ y: -4, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Card className="bg-card border-border backdrop-blur-sm cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Regions Needing Water</CardTitle>
                <Leaf className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">2</div>
                <p className="text-xs text-muted-foreground mt-1">Urgent irrigation needed</p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <motion.div whileHover={{ y: -4, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Card className="bg-card border-border backdrop-blur-sm cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Rainfall Expected</CardTitle>
                <Cloud className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">28 mm</div>
                <p className="text-xs text-muted-foreground mt-1">Next 5 days</p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <motion.div whileHover={{ y: -4, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Card className="bg-card border-border backdrop-blur-sm cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Water Savings</CardTitle>
                <Wind className="h-4 w-4 text-accent" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">75 ML</div>
                <p className="text-xs text-muted-foreground mt-1">This month (vs no optimization)</p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>

      {/* Recommendations */}
      <motion.div variants={itemVariants}>
        <Card className="bg-card border-border backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Smart Irrigation Recommendations</CardTitle>
            <CardDescription>AI-powered schedule based on soil moisture and weather forecast</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {irrigationRecommendations.map((rec, idx) => (
                <motion.div
                  key={idx}
                  className="p-4 rounded-lg border border-border bg-card/50 hover:bg-card/80 transition-colors"
                  whileHover={{ x: 4, scale: 1.01 }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-semibold text-foreground">{rec.region}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center gap-1">
                          <Droplet className="w-3 h-3 text-primary" />
                          <span className="text-sm text-muted-foreground">Moisture: {rec.soilMoisture}%</span>
                        </div>
                      </div>
                    </div>
                    <Badge
                      variant={
                        rec.recommended === 'Urgent'
                          ? 'destructive'
                          : rec.recommended === 'Irrigate Now'
                          ? 'secondary'
                          : 'outline'
                      }
                    >
                      {rec.recommended}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Duration</p>
                      <p className="font-semibold text-foreground">{rec.duration}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Water Saving</p>
                      <p className="font-semibold text-green-500">{rec.saving}</p>
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button size="sm" className="w-full bg-primary hover:bg-primary/90">
                        Schedule
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={itemVariants}>
          <Card className="bg-card border-border backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Soil Moisture Levels</CardTitle>
              <CardDescription>Current moisture vs optimal level</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={soilMoistureData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="region" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }} />
                  <Legend />
                  <Bar dataKey="current" fill="hsl(var(--primary))" name="Current" />
                  <Bar dataKey="optimal" fill="hsl(var(--accent))" name="Optimal" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="bg-card border-border backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Weather Forecast</CardTitle>
              <CardDescription>5-day rainfall prediction</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weatherForecastData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }} />
                  <Bar dataKey="rainfall" fill="hsl(var(--chart-2))" name="Rainfall (mm)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
