'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter } from 'recharts';
import { Users, Droplet, TrendingUp, AlertTriangle } from 'lucide-react';

const equityData = [
  { region: 'Region A', population: 850000, allocation: 450, perCapita: 529, inequality: 'High', accessLevel: 'Adequate' },
  { region: 'Region B', population: 620000, allocation: 280, perCapita: 452, inequality: 'Medium', accessLevel: 'Adequate' },
  { region: 'Region C', population: 1200000, allocation: 290, perCapita: 242, inequality: 'Very High', accessLevel: 'Scarce' },
  { region: 'Region D', population: 450000, allocation: 200, perCapita: 444, inequality: 'Low', accessLevel: 'Adequate' },
  { region: 'Region E', population: 780000, allocation: 180, perCapita: 231, inequality: 'High', accessLevel: 'Scarce' },
];

const scarcityData = [
  { region: 'Region A', population: 850, allocation: 450, access: 85 },
  { region: 'Region B', population: 620, allocation: 280, access: 80 },
  { region: 'Region C', population: 1200, allocation: 290, access: 42 },
  { region: 'Region D', population: 450, allocation: 200, access: 85 },
  { region: 'Region E', population: 780, allocation: 180, access: 35 },
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

const getAccessColor = (level: string) => {
  switch (level) {
    case 'Adequate':
      return 'bg-green-500/10 border-green-500/30 text-green-600';
    case 'Scarce':
      return 'bg-destructive/10 border-destructive/30 text-destructive';
    default:
      return 'bg-yellow-500/10 border-yellow-500/30 text-yellow-600';
  }
};

const getAccessBadge = (level: string) => {
  switch (level) {
    case 'Adequate':
      return 'bg-green-500/20 text-green-700 hover:bg-green-500/30';
    case 'Scarce':
      return 'bg-destructive/20 text-destructive hover:bg-destructive/30';
    default:
      return 'bg-yellow-500/20 text-yellow-700 hover:bg-yellow-500/30';
  }
};

export default function EquityMap() {
  return (
    <motion.div
      className="p-8 space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Water Equity Map</h1>
        <p className="text-muted-foreground">Analysis of water distribution equity across regions</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div variants={itemVariants}>
          <motion.div whileHover={{ y: -4, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Card className="bg-card border-border backdrop-blur-sm cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Population Served</CardTitle>
                <Users className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">4.9M</div>
                <p className="text-xs text-muted-foreground mt-1">Across 5 regions</p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <motion.div whileHover={{ y: -4, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Card className="bg-card border-border backdrop-blur-sm cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Equity Index</CardTitle>
                <TrendingUp className="h-4 w-4 text-accent" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">62%</div>
                <p className="text-xs text-muted-foreground mt-1">Target: 85%</p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <motion.div whileHover={{ y: -4, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Card className="bg-card border-border backdrop-blur-sm cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Regions in Crisis</CardTitle>
                <AlertTriangle className="h-4 w-4 text-destructive" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">2</div>
                <p className="text-xs text-muted-foreground mt-1">Scarce water access</p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>

      {/* Regional Equity Analysis */}
      <motion.div variants={itemVariants}>
        <Card className="bg-card border-border backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Regional Water Equity Analysis</CardTitle>
            <CardDescription>Per capita water availability and access levels</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {equityData.map((region, idx) => (
              <motion.div
                key={idx}
                className={`p-4 rounded-lg border ${getAccessColor(region.accessLevel)}`}
                whileHover={{ x: 4, scale: 1.01 }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-semibold text-foreground">{region.region}</p>
                    <p className="text-sm text-muted-foreground mt-1">Population: {region.population.toLocaleString()}</p>
                  </div>
                  <Badge className={getAccessBadge(region.accessLevel)}>
                    {region.accessLevel}
                  </Badge>
                </div>
                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Allocation (ML/day)</p>
                    <p className="font-bold text-foreground">{region.allocation}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Per Capita (L/day)</p>
                    <p className="font-bold text-foreground">{region.perCapita}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Inequality</p>
                    <Badge variant="outline">{region.inequality}</Badge>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Target</p>
                    <p className="font-bold text-green-500">300 L/day</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </motion.div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={itemVariants}>
          <Card className="bg-card border-border backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Per Capita Water Availability</CardTitle>
              <CardDescription>Water availability per person by region</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={equityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="region" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }} />
                  <Legend />
                  <Bar dataKey="perCapita" fill="hsl(var(--primary))" name="Current (L/day)" />
                  <Bar dataKey="529" fill="hsl(var(--accent))" name="Target (L/day)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="bg-card border-border backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Population vs Water Access</CardTitle>
              <CardDescription>Scatter plot of population size and water access percentage</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <ScatterChart data={scarcityData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="population" name="Population (thousands)" stroke="hsl(var(--muted-foreground))" />
                  <YAxis dataKey="access" name="Access (%)" stroke="hsl(var(--muted-foreground))" />
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }} />
                  <Scatter name="Regions" data={scarcityData} fill="hsl(var(--accent))" />
                </ScatterChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Action Items */}
      <motion.div variants={itemVariants}>
        <Card className="bg-card border-border backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Equity Improvement Recommendations</CardTitle>
            <CardDescription>Actions to improve water distribution equity</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <motion.div
              className="p-4 rounded-lg bg-destructive/10 border border-destructive/30"
              whileHover={{ scale: 1.02 }}
            >
              <p className="font-semibold text-destructive mb-1">🔴 Critical: Region C Water Crisis</p>
              <p className="text-sm text-muted-foreground">Per capita availability (242 L/day) is well below minimum (300 L/day). Immediate action required to redistribute water allocation.</p>
            </motion.div>
            <motion.div
              className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30"
              whileHover={{ scale: 1.02 }}
            >
              <p className="font-semibold text-yellow-600 mb-1">🟡 Warning: Region E Water Scarcity</p>
              <p className="text-sm text-muted-foreground">Per capita availability (231 L/day) approaching critical threshold. Implement water conservation measures and optimize irrigation efficiency.</p>
            </motion.div>
            <motion.div
              className="p-4 rounded-lg bg-green-500/10 border border-green-500/30"
              whileHover={{ scale: 1.02 }}
            >
              <p className="font-semibold text-green-600 mb-1">🟢 Opportunity: Region A Surplus</p>
              <p className="text-sm text-muted-foreground">Region A has 76% above minimum threshold. Consider redistributing surplus to critical regions or building storage infrastructure.</p>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
