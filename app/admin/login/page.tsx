'use client';

// Never statically prerender — Firebase Auth needs the browser
export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, Auth } from 'firebase/auth';
import { Heart, Lock, Mail, Loader2, Shield, AlertCircle } from 'lucide-react';

const firebaseConfig = {
  apiKey:            process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain:        process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId:         process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket:     process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId:             process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Lazy — only initialise on the client, never during SSR
function getFirebaseAuth(): Auth | null {
  if (typeof window === 'undefined') return null;
  const fbApp = getApps().length === 0 ? initializeApp(firebaseConfig as any) : getApp();
  return getAuth(fbApp);
}

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);
  const [checking, setChecking] = useState(true);

  // If already signed in → go straight to dashboard
  useEffect(() => {
    const auth = getFirebaseAuth();
    if (!auth) { setChecking(false); return; }
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken();
        document.cookie = `prathana_admin=${token}; path=/; max-age=3600; SameSite=Strict`;
        localStorage.setItem('prathana_admin_session', 'true');
        router.push('/admin');
      } else {
        setChecking(false);
      }
    });
    return () => unsub();
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const auth = getFirebaseAuth();
      if (!auth) throw new Error('Firebase not available');
      const cred  = await signInWithEmailAndPassword(auth, email, password);
      const token = await cred.user.getIdToken();
      document.cookie = `prathana_admin=${token}; path=/; max-age=3600; SameSite=Strict`;
      localStorage.setItem('prathana_admin_session', 'true');
      router.push('/admin');
    } catch (err: any) {
      const code = err?.code || '';
      if (code === 'auth/user-not-found' || code === 'auth/wrong-password' || code === 'auth/invalid-credential') {
        setError('Invalid email or password.');
      } else if (code === 'auth/too-many-requests') {
        setError('Too many attempts. Please wait and try again.');
      } else {
        setError('Sign-in failed. Check your credentials.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (checking) {
    return (
      <div className="min-h-screen bg-[#0d1117] flex items-center justify-center">
        <Loader2 size={28} className="animate-spin text-amber-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d1117] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute top-[-15%] left-[-10%] w-[500px] h-[500px] bg-amber-500/6 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-15%] right-[-10%] w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Card */}
      <div className="relative w-full max-w-md bg-[#131720] border border-white/8 rounded-2xl shadow-2xl shadow-black/40 overflow-hidden">

        {/* Top accent bar */}
        <div className="h-1 w-full bg-gradient-to-r from-amber-500 via-amber-400 to-orange-400" />

        <div className="p-8 space-y-7">
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/15 border border-amber-500/25 flex items-center justify-center mx-auto">
              <Heart size={22} className="text-amber-400 fill-amber-400/30" />
            </div>
            <div>
              <h1 className="font-bold text-xl text-white">Administrative Gateway</h1>
              <p className="text-[11px] text-white/30 uppercase tracking-widest mt-1">Prathana Foundation · Solapur</p>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2.5 p-3.5 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl font-medium">
              <AlertCircle size={15} className="flex-shrink-0" />
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-white/30 font-bold mb-1.5">
                Admin Email
              </label>
              <div className="relative">
                <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/20" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="admin@prathana.org"
                  className="w-full pl-9 pr-4 py-3 bg-[#1a1f2e] border border-white/8 rounded-xl text-sm text-white placeholder-white/15 outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/10 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-widest text-white/30 font-bold mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/20" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••••"
                  className="w-full pl-9 pr-4 py-3 bg-[#1a1f2e] border border-white/8 rounded-xl text-sm text-white placeholder-white/15 outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/10 transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-black font-bold text-sm rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : <Shield size={15} />}
              {loading ? 'Signing in…' : 'Access Dashboard'}
            </button>
          </form>

          {/* Footer note */}
          <p className="text-center text-[10px] text-white/15 leading-relaxed">
            Sign in with your Firebase Admin account.<br />
            Unauthorised access is prohibited.
          </p>
        </div>
      </div>
    </div>
  );
}
