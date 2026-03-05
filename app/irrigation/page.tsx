'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { apiFetch } from '@/lib/api';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Droplet, Leaf, Cloud, Wind, CheckCircle } from 'lucide-react';



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
      stiffness: 100,
      damping: 15,
    },
  },
};

export default function Irrigation() {
  const { user } = useAuth();
  const [regions, setRegions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [scheduledRegions, setScheduledRegions] = useState<Set<string>>(new Set());

  // computed data
  const irrigationRecommendations = regions.map((r) => {
    const moisture = Math.round(Math.random() * 50 + 25);
    const rec = moisture < 40 ? 'Irrigate Now' : moisture < 55 ? 'Wait 2 days' : 'Wait 3 days';
    return {
      region: r.name,
      soilMoisture: moisture,
      recommended: rec,
      duration: rec === 'Irrigate Now' ? '4 hours' : 'N/A',
      saving: `${Math.floor(Math.random() * 20) + 5}%`,
      isScheduled: scheduledRegions.has(r.name)
    };
  });

  const soilMoistureData = regions.map((r, idx) => ({
    region: r.name,
    current: irrigationRecommendations[idx]?.soilMoisture || 0,
    optimal: 50,
    capacity: 100
  }));

  const weatherForecastData = [
    { day: 'Today', rainfall: 0, temp: 28, humidity: 65, windSpeed: 12 },
    { day: 'Tomorrow', rainfall: 5, temp: 26, humidity: 72, windSpeed: 10 },
    { day: 'Day 3', rainfall: 15, temp: 24, humidity: 80, windSpeed: 8 },
    { day: 'Day 4', rainfall: 8, temp: 25, humidity: 75, windSpeed: 11 },
    { day: 'Day 5', rainfall: 0, temp: 27, humidity: 68, windSpeed: 14 },
  ];

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const data = await apiFetch('/regions');
        setRegions(data);
      } catch (err) {
        console.error('Error fetching regions', err);
      } finally {
        setLoading(false);
      }
    };
    fetchRegions();
  }, []);

  const handleSchedule = (regionName: string) => {
    setScheduledRegions(prev => new Set([...prev, regionName]));
    // Here you could also make an API call to save the schedule to the backend
    console.log(`Scheduled irrigation for ${regionName}`);
  };

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

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
                      <Button
                        size="sm"
                        className={`w-full ${rec.isScheduled ? 'bg-green-500 hover:bg-green-600' : 'bg-primary hover:bg-primary/90'}`}
                        onClick={() => handleSchedule(rec.region)}
                        disabled={rec.isScheduled}
                      >
                        {rec.isScheduled ? (
                          <>
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Scheduled
                          </>
                        ) : (
                          'Schedule'
                        )}
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
