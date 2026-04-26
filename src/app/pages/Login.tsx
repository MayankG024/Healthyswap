import { useState } from 'react';
import { supabase } from '../utils/supabase';
import { motion } from 'motion/react';
import { Sparkles, LogIn } from 'lucide-react';
import { Toaster, toast } from 'sonner';

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      const configuredRedirect = import.meta.env.VITE_AUTH_REDIRECT_URL?.trim();
      const defaultRedirect = `${window.location.origin}/dashboard`;
      const redirectTo = configuredRedirect && !configuredRedirect.includes('/Healthyswap/index.html')
        ? configuredRedirect
        : defaultRedirect;
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo,
          scopes: 'openid email profile'
        }
      });
      if (error) throw error;
    } catch (error: any) {
      toast.error(error.message || 'Error logging in with Google');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[#FFF8E1] px-4">
      <Toaster position="top-center" richColors />
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden"
      >
        <div className="p-8 text-center bg-[#FFD93D]">
          <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
            <Sparkles className="w-12 h-12 text-[#FF9800]" />
          </div>
          <h2 className="text-4xl text-gray-900 uppercase tracking-tight" style={{ fontFamily: 'Bebas Neue' }}>
            Welcome Back
          </h2>
          <p className="text-gray-800 font-bold mt-2">Sign in to continue your healthy journey</p>
        </div>

        <div className="p-8">
          <button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white border-2 border-gray-200 text-gray-800 rounded-2xl font-bold hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm"
          >
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-6 h-6" />
            <span className="text-lg">Continue with Google</span>
          </button>

          <div className="mt-8 text-center text-sm text-gray-500">
            By signing in, you agree to our Terms of Service and Privacy Policy.
          </div>
        </div>
      </motion.div>
    </div>
  );
}
