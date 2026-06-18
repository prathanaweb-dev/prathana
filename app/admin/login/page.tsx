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
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col items-center justify-center p-6 relative">
      {/* Login Card */}
      <div className="relative w-full max-w-md bg-stone-900 border border-stone-800 p-8 rounded-2xl shadow-2xl space-y-6 z-10">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-brand-saffron/10 text-brand-saffron flex items-center justify-center mx-auto border border-brand-saffron/20">
            <Heart className="w-6 h-6 fill-current" />
          </div>
          <h2 className="font-serif-display text-2xl font-bold tracking-tight text-white">
            Administrative Gateway
          </h2>
          <p className="text-xs text-stone-500 uppercase tracking-widest font-semibold">
            Prathana Foundation Solapur
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-950/40 border border-red-900 text-red-400 text-xs rounded-lg text-center font-medium">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-[10px] uppercase tracking-wider text-stone-400 font-bold mb-1.5">
              Admin Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-500">
                <Mail className="w-4.5 h-4.5" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@prathana.org"
                className="w-full pl-10 pr-4 py-2.5 bg-stone-950 border border-stone-800 rounded-lg text-sm text-stone-200 outline-none focus:border-brand-saffron transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-wider text-stone-400 font-bold mb-1.5">
              Secure Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-500">
                <Lock className="w-4.5 h-4.5" />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-stone-950 border border-stone-800 rounded-lg text-sm text-stone-200 outline-none focus:border-brand-saffron transition-all"
              />
            </div>
          </div>

          <div className="p-3 bg-stone-950/60 border border-stone-855 rounded-lg text-[10px] text-stone-500 leading-normal">
            <strong>Mock Credentials for Verification:</strong> <br />
            Email: <code className="text-amber-500">admin@prathana.org</code> <br />
            Password: <code className="text-amber-500">prathana2026</code>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-brand-saffron hover:bg-white hover:text-stone-950 text-white rounded-lg text-xs font-semibold tracking-widest uppercase shadow-md transition-all flex items-center justify-center gap-1.5"
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
