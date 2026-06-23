'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Heart, Lock, Mail, Loader2 } from 'lucide-react';

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if already logged in
    const isLogged = localStorage.getItem('prathana_admin_session') === 'true';
    if (isLogged) {
      router.push('/admin');
    }
  }, [router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      // Mock credentials for review: admin@prathana.org / prathana2026
      if (email === 'admin@prathana.org' && password === 'prathana2026') {
        localStorage.setItem('prathana_admin_session', 'true');
        router.push('/admin');
      } else {
        setError('Invalid administrative credentials.');
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-brand-paper text-brand-charcoal flex flex-col items-center justify-center p-6 bg-grid-pattern relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-brand-yellow/8 rounded-full blur-[120px] pointer-events-none animate-drift" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-brand-green/6 rounded-full blur-[120px] pointer-events-none animate-drift" style={{ animationDelay: '-4s' }} />

      {/* Login Card */}
      <div className="relative w-full max-w-md bg-white/80 backdrop-blur-md border border-brand-clay p-8 rounded-2xl shadow-xl space-y-6 z-10">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <img
            src="/logo.png"
            alt="Prathana Foundation Logo"
            className="w-16 h-16 object-contain mx-auto mb-2"
          />
          <h2 className="font-serif-display text-2xl font-bold tracking-tight text-brand-charcoal">
            Administrative Gateway
          </h2>
          <p className="text-xs text-brand-muted uppercase tracking-widest font-semibold">
            Prathana Foundation Solapur
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg text-center font-medium">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-[10px] uppercase tracking-wider text-brand-muted font-bold mb-1.5">
              Admin Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-brand-muted">
                <Mail className="w-4.5 h-4.5" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@prathana.org"
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-brand-clay rounded-lg text-sm text-brand-charcoal outline-none focus:border-brand-yellow focus:ring-4 focus:ring-brand-yellow/5 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-wider text-brand-muted font-bold mb-1.5">
              Secure Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-brand-muted">
                <Lock className="w-4.5 h-4.5" />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-brand-clay rounded-lg text-sm text-brand-charcoal outline-none focus:border-brand-yellow focus:ring-4 focus:ring-brand-yellow/5 transition-all"
              />
            </div>
          </div>

          <div className="p-3 bg-brand-sand/50 border border-brand-clay/60 rounded-lg text-[10px] text-brand-muted leading-normal">
            <strong>Mock Credentials for Verification:</strong> <br />
            Email: <code className="text-brand-forest font-bold">admin@prathana.org</code> <br />
            Password: <code className="text-brand-forest font-bold">prathana2026</code>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-brand-yellow hover:bg-brand-yellow/90 text-brand-charcoal font-bold rounded-lg text-xs tracking-widest uppercase shadow-md transition-all flex items-center justify-center gap-1.5"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Authorizing...
              </>
            ) : (
              'Access Dashboard'
            )}
          </button>
        </form>

      </div>
    </div>
  );
}
