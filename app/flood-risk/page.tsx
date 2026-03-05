'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { apiFetch } from '@/lib/api';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AlertTriangle, TrendingUp, Cloud, Zap } from 'lucide-react';

// placeholder arrays will be computed dynamically below

const riverSystemData = [
  { location: 'River Outlet', level: 520, capacity: 600, status: 'Critical' },
  { location: 'Dam Gate A', level: 580, capacity: 600, status: 'High Risk' },
  { location: 'Tributary Junction', level: 420, capacity: 500, status: 'Moderate' },
  { location: 'River Mid-Point', level: 380, capacity: 450, status: 'Normal' },
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
      stiffness: 100,
      damping: 15,
    },
  },
};

const getRiskColor = (level: number) => {
  if (level >= 70) return { bg: 'bg-destructive/10 border-destructive/30', text: 'text-destructive' };
  if (level >= 50) return { bg: 'bg-yellow-500/10 border-yellow-500/30', text: 'text-yellow-600' };
  return { bg: 'bg-green-500/10 border-green-500/30', text: 'text-green-600' };
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Critical':
      return 'bg-destructive/10 border-destructive/30 text-destructive';
    case 'High Risk':
      return 'bg-yellow-500/10 border-yellow-500/30 text-yellow-600';
    case 'Moderate':
      return 'bg-blue-500/10 border-blue-500/30 text-blue-600';
    default:
      return 'bg-green-500/10 border-green-500/30 text-green-600';
  }
};

export default function FloodRisk() {
  const { user } = useAuth();
  const [waterLevels, setWaterLevels] = useState<any[]>([]);
  const [regions, setRegions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const levels = await apiFetch('/water');
        const regionsData = await apiFetch('/regions');
        setWaterLevels(levels);
        setRegions(regionsData);
      } catch (err) {
        console.error('Error fetching flood data', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  // compute chart data
  const floodRiskData = waterLevels.slice(0, 8).map((w, idx) => ({
    hour: `${idx * 6}:00`,
    waterLevel: w.usage,
    threshold: 600,
    rainfall: Math.round(Math.random() * 50),
  }));

  const riskAssessmentData = regions.map(r => ({
    region: r.name,
    riskLevel: Math.round(Math.random() * 100),
    predictedPeak: 'Tomorrow 18:00',
    capacity: `${Math.round(Math.random() * 50 + 50)}%`,
  }));

  return (
    <motion.div
      className="p-8 space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Flood Risk Monitoring</h1>
        <p className="text-muted-foreground">Real-time flood prediction and water level alerts</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div variants={itemVariants}>
          <motion.div whileHover={{ y: -4, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Card className="bg-card border-border backdrop-blur-sm cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Areas at Risk</CardTitle>
                <AlertTriangle className="h-4 w-4 text-destructive" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">2</div>
                <p className="text-xs text-muted-foreground mt-1">High risk zones identified</p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <motion.div whileHover={{ y: -4, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Card className="bg-card border-border backdrop-blur-sm cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Current Peak Level</CardTitle>
                <TrendingUp className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">595 cm</div>
                <p className="text-xs text-muted-foreground mt-1">99% of capacity (600 cm)</p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <motion.div whileHover={{ y: -4, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Card className="bg-card border-border backdrop-blur-sm cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Peak Rainfall</CardTitle>
                <Cloud className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">40 mm</div>
                <p className="text-xs text-muted-foreground mt-1">Expected today</p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>

      {/* Water Level Forecast */}
      <motion.div variants={itemVariants}>
        <Card className="bg-card border-border backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Water Level & Rainfall Forecast</CardTitle>
            <CardDescription>48-hour prediction with critical threshold</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={floodRiskData}>
                <defs>
                  <linearGradient id="colorLevel" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="hour" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }} />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="waterLevel"
                  stroke="hsl(var(--primary))"
                  fillOpacity={1}
                  fill="url(#colorLevel)"
                  name="Water Level (cm)"
                />
                <Line
                  type="monotone"
                  dataKey="threshold"
                  stroke="hsl(var(--destructive))"
                  strokeDasharray="5 5"
                  name="Critical Threshold"
                />
                <Line type="monotone" dataKey="rainfall" stroke="hsl(var(--chart-2))" name="Rainfall (mm)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Risk Assessment */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={itemVariants}>
          <Card className="bg-card border-border backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Basin Risk Assessment</CardTitle>
              <CardDescription>Flood risk evaluation by region</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {riskAssessmentData.map((basin, idx) => {
                const { bg, text } = getRiskColor(basin.riskLevel);
                return (
                  <motion.div
                    key={idx}
                    className={`p-4 rounded-lg border ${bg}`}
                    whileHover={{ x: 4, scale: 1.01 }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <p className="font-semibold text-foreground">{basin.region}</p>
                      <Badge variant="secondary" className={text}>
                        {basin.riskLevel}%
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">Peak: {basin.predictedPeak}</p>
                    <div className="w-full bg-card/50 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          basin.riskLevel >= 70
                            ? 'bg-destructive'
                            : basin.riskLevel >= 50
                            ? 'bg-yellow-500'
                            : 'bg-green-500'
                        }`}
                        style={{ width: `${basin.riskLevel}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">Capacity: {basin.capacity}</p>
                  </motion.div>
                );
              })}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="bg-card border-border backdrop-blur-sm">
            <CardHeader>
              <CardTitle>River System Status</CardTitle>
              <CardDescription>Water levels at key monitoring points</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {riverSystemData.map((point, idx) => (
                <motion.div
                  key={idx}
                  className={`p-4 rounded-lg border ${getStatusColor(point.status)}`}
                  whileHover={{ x: 4, scale: 1.01 }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <p className="font-semibold text-foreground">{point.location}</p>
                    <Badge variant="secondary">{point.status}</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-2">
                    <div>
                      <p className="text-xs text-muted-foreground">Current Level</p>
                      <p className="font-bold text-foreground">{point.level} cm</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Capacity</p>
                      <p className="font-bold text-foreground">{point.capacity} cm</p>
                    </div>
                  </div>
                  <div className="w-full bg-card/50 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        point.status === 'Critical'
                          ? 'bg-destructive'
                          : point.status === 'High Risk'
                          ? 'bg-yellow-500'
                          : point.status === 'Moderate'
                          ? 'bg-blue-500'
                          : 'bg-green-500'
                      }`}
                      style={{ width: `${(point.level / point.capacity) * 100}%` }}
                    />
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Early Warning System */}
      <motion.div variants={itemVariants}>
        <Card className="bg-card border-border backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-500" />
              Early Warning System
            </CardTitle>
            <CardDescription>Automated alerts and recommendations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <motion.div
              className="p-4 rounded-lg bg-destructive/10 border border-destructive/30"
              whileHover={{ scale: 1.02 }}
            >
              <p className="font-semibold text-destructive mb-1">⚠ Critical Alert - Basin A</p>
              <p className="text-sm text-muted-foreground">Water level will exceed critical threshold in 6 hours. Recommend immediate evacuation procedures.</p>
              <p className="text-xs text-muted-foreground mt-2">Action recommended: Open spillway gates, notify downstream communities</p>
            </motion.div>
            <motion.div
              className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30"
              whileHover={{ scale: 1.02 }}
            >
              <p className="font-semibold text-yellow-600 mb-1">⚠ Warning - Basin C</p>
              <p className="text-sm text-muted-foreground">High rainfall expected. Monitor water levels closely over next 24 hours.</p>
              <p className="text-xs text-muted-foreground mt-2">Action recommended: Prepare emergency response teams, increase monitoring frequency</p>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
