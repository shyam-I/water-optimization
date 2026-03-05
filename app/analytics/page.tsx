'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { apiFetch } from '@/lib/api';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const COLORS = ['hsl(var(--primary))', 'hsl(var(--accent))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))'];

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

export default function Analytics() {
  const { user } = useAuth();
  const [regions, setRegions] = useState<any[]>([]);
  const [waterData, setWaterData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const regionsData = await apiFetch('/regions');
        const waterData = await apiFetch('/water');
        setRegions(regionsData);
        setWaterData(waterData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Transform data for charts
  const regionWiseData = regions.map(region => ({
    region: region.name,
    usage: region.allocation
  }));

  const monthlyUsageData = waterData.map((d, idx) => ({
    month: `M${idx+1}`,
    consumption: d.usage,
    target: 1000,
  }));

  const usageBySourceData = [
    { name: 'Agriculture', value: 45 },
    { name: 'Industrial', value: 25 },
    { name: 'Municipal', value: 20 },
    { name: 'Domestic', value: 10 },
  ];

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
        <h1 className="text-3xl font-bold text-foreground mb-2">Water Analytics</h1>
        <p className="text-muted-foreground">Comprehensive analysis of water usage patterns and trends</p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-card border-border">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="regional">Regional</TabsTrigger>
          <TabsTrigger value="sources">Sources</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div variants={itemVariants}>
              <Card className="bg-card border-border backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Monthly Consumption Trend</CardTitle>
                  <CardDescription>Actual vs target usage</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={350}>
                    <AreaChart data={monthlyUsageData}>
                      <defs>
                        <linearGradient id="colorConsumption" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }} />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="consumption"
                        stroke="hsl(var(--primary))"
                        fillOpacity={1}
                        fill="url(#colorConsumption)"
                      />
                      <Area
                        type="monotone"
                        dataKey="target"
                        stroke="hsl(var(--muted-foreground))"
                        fill="none"
                        strokeDasharray="5 5"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="bg-card border-border backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Usage Distribution by Source</CardTitle>
                  <CardDescription>Current allocation percentage</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-center">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={usageBySourceData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {usageBySourceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </TabsContent>

        {/* Regional Tab */}
        <TabsContent value="regional" className="space-y-6">
          <motion.div variants={itemVariants}>
            <Card className="bg-card border-border backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Region-wise Water Distribution</CardTitle>
                <CardDescription>Water usage by region (in Million Liters)</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={regionWiseData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="region" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }} />
                    <Bar dataKey="usage" fill="hsl(var(--accent))" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Regional Stats */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {regionWiseData.map((region, idx) => (
              <motion.div key={idx} variants={itemVariants}>
                <motion.div
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card className="bg-card border-border backdrop-blur-sm cursor-pointer hover:bg-card/80">
                    <CardContent className="pt-6">
                      <p className="text-sm text-muted-foreground">{region.region}</p>
                      <p className="text-2xl font-bold text-foreground mt-2">{region.usage} ML</p>
                      <p className="text-xs text-primary mt-2">↑ {Math.floor(Math.random() * 20)}% from last month</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* Sources Tab */}
        <TabsContent value="sources" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div variants={itemVariants}>
              <Card className="bg-card border-border backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Usage by Sector</CardTitle>
                  <CardDescription>Breakdown of water consumption</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {usageBySourceData.map((source, idx) => (
                      <motion.div
                        key={idx}
                        className="flex items-center gap-3"
                        whileHover={{ x: 4 }}
                      >
                        <div
                          className="w-3 h-3 rounded-full flex-shrink-0"
                          style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-foreground">{source.name}</p>
                          <div className="w-full bg-card/50 rounded-full h-2 mt-1">
                            <div
                              className="h-2 rounded-full"
                              style={{
                                width: `${source.value}%`,
                                backgroundColor: COLORS[idx % COLORS.length],
                              }}
                            />
                          </div>
                        </div>
                        <span className="text-sm font-semibold text-foreground">{source.value}%</span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="bg-card border-border backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Key Insights</CardTitle>
                  <CardDescription>Data analysis highlights</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <motion.div
                    className="p-3 rounded-lg bg-primary/10 border border-primary/30"
                    whileHover={{ scale: 1.02 }}
                  >
                    <p className="text-sm font-semibold text-foreground">Peak Usage</p>
                    <p className="text-xs text-muted-foreground mt-1">Usage peaks during June at 1,800 ML</p>
                  </motion.div>
                  <motion.div
                    className="p-3 rounded-lg bg-accent/10 border border-accent/30"
                    whileHover={{ scale: 1.02 }}
                  >
                    <p className="text-sm font-semibold text-foreground">Agriculture Dominance</p>
                    <p className="text-xs text-muted-foreground mt-1">Agriculture accounts for 45% of total usage</p>
                  </motion.div>
                  <motion.div
                    className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/30"
                    whileHover={{ scale: 1.02 }}
                  >
                    <p className="text-sm font-semibold text-foreground">Efficiency Opportunity</p>
                    <p className="text-xs text-muted-foreground mt-1">Industrial sector can reduce usage by 15%</p>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
