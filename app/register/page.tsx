'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Droplet, ArrowRight } from 'lucide-react';

export default function Register() {
  const router = useRouter();
  const { user } = useAuth(false);

  useEffect(() => {
    if (user) router.push('/');
  }, [user, router]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:5000/api'}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        router.push('/');
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

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
      transition: { type: 'spring' as const, stiffness: 100, damping: 15 },
    },
  } as const;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-card/30 flex items-center justify-center p-4 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl opacity-20 translate-x-1/2 translate-y-1/2" />

      <motion.div
        className="w-full max-w-md relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Logo and Title */}
        <motion.div className="text-center mb-8" variants={itemVariants}>
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Droplet className="w-7 h-7 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">H2O AI</h1>
          </div>
          <p className="text-muted-foreground">Water Optimization Platform</p>
        </motion.div>

        {/* Register Card */}
        <motion.div variants={itemVariants}>
          <Card className="bg-card/50 border-border backdrop-blur-md">
            <CardHeader className="space-y-2">
              <CardTitle className="text-2xl text-foreground">Create account</CardTitle>
              <CardDescription>Join us to monitor and optimize water usage</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name Input */}
                <motion.div
                  className="space-y-2"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <label className="text-sm font-medium text-foreground">Full Name</label>
                  <Input
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                    required
                  />
                </motion.div>

                {/* Email Input */}
                <motion.div
                  className="space-y-2"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <label className="text-sm font-medium text-foreground">Email</label>
                  <Input
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                    required
                  />
                </motion.div>

                {/* Password Input */}
                <motion.div
                  className="space-y-2"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <label className="text-sm font-medium text-foreground">Password</label>
                  <Input
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                    required
                  />
                </motion.div>

                {/* Confirm Password Input */}
                <motion.div
                  className="space-y-2"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <label className="text-sm font-medium text-foreground">Confirm Password</label>
                  <Input
                    type="password"
                    name="confirmPassword"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                    required
                  />
                </motion.div>

                {/* Error Message */}
                {error && (
                  <motion.div
                    className="p-3 rounded-lg bg-destructive/10 border border-destructive/30"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <p className="text-sm text-destructive">{error}</p>
                  </motion.div>
                )}

                {/* Submit Button */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Creating account...' : 'Create Account'}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </motion.div>
              </form>

              {/* Login Link */}
              <motion.div className="mt-6 text-center" variants={itemVariants}>
                <p className="text-sm text-muted-foreground">
                  Already have an account?{' '}
                  <a href="/login" className="text-primary hover:text-accent transition-colors font-medium">
                    Sign in here
                  </a>
                </p>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
