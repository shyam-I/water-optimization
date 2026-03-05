'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Droplet, ArrowRight } from 'lucide-react';

export default function Login() {
  const router = useRouter();
  const { user } = useAuth(false);

  useEffect(() => {
    if (user) router.push('/');
  }, [user, router]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:5000/api'}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        router.push('/');
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (error) {
      alert('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setIsLoading(true);
    setEmail('demo@water.ai');
    setPassword('demo123');
    await new Promise(resolve => setTimeout(resolve, 800));
    router.push('/');
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

        {/* Login Card */}
        <motion.div variants={itemVariants}>
          <Card className="bg-card/50 border-border backdrop-blur-md">
            <CardHeader className="space-y-2">
              <CardTitle className="text-2xl text-foreground">Welcome back</CardTitle>
              <CardDescription>Sign in to your account to continue</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email Input */}
                <motion.div
                  className="space-y-2"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <label className="text-sm font-medium text-foreground">Email</label>
                  <Input
                    type="email"
                    placeholder="demo@water.ai"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                    required
                  />
                </motion.div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <motion.div
                    className="flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Checkbox
                      id="remember"
                      checked={rememberMe}
                      onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                      className="border-border"
                    />
                    <label htmlFor="remember" className="text-sm text-muted-foreground cursor-pointer">
                      Remember me
                    </label>
                  </motion.div>
                  <motion.a
                    href="#"
                    className="text-sm text-primary hover:text-accent transition-colors"
                    whileHover={{ scale: 1.05 }}
                  >
                    Forgot password?
                  </motion.a>
                </div>

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
                    {isLoading ? 'Signing in...' : 'Sign In'}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </motion.div>

                {/* Demo Login Button */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="button"
                    onClick={handleDemoLogin}
                    variant="outline"
                    className="w-full border-border hover:bg-card text-foreground"
                    disabled={isLoading}
                  >
                    Demo Login
                  </Button>
                </motion.div>
              </form>

              {/* Register Link */}
              <motion.div className="mt-6 text-center" variants={itemVariants}>
                <p className="text-sm text-muted-foreground">
                  Don't have an account?{' '}
                  <a href="/register" className="text-primary hover:text-accent transition-colors font-medium">
                    Register here
                  </a>
                </p>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Footer Info */}
        <motion.p
          className="text-center text-xs text-muted-foreground mt-6"
          variants={itemVariants}
        >
          Demo credentials: demo@water.ai / demo123
        </motion.p>
      </motion.div>
    </div>
  );
}
