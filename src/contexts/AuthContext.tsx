import { createContext, useContext, useEffect, useState } from 'react';
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User,
  AuthError
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useToast } from "@/components/ui/use-toast";

interface AuthContextType {
  user: User | null;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      if (user) {
        toast({
          title: "Welcome back!",
          description: `Signed in as ${user.displayName}`,
        });
      }
    });

    return unsubscribe;
  }, [toast]);

  const signIn = async () => {
    console.log('Starting sign-in process...');
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account'
    });

    try {
      console.log('Firebase config:', {
        authDomain: auth.app.options.authDomain,
        apiKey: auth.app.options.apiKey?.substring(0, 8) + '...',
      });
      const result = await signInWithPopup(auth, provider);
      console.log('Sign-in successful:', {
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName,
      });
      toast({
        title: "Success!",
        description: `Signed in as ${result.user.displayName}`,
      });
    } catch (error) {
      const authError = error as AuthError;
      console.error('Detailed sign-in error:', {
        code: authError.code,
        message: authError.message,
        customData: authError.customData,
      });

      let errorMessage = "Failed to sign in";
      
      if (authError.code === 'auth/invalid-api-key') {
        errorMessage = "API key configuration issue. Please check Firebase setup.";
      } else if (authError.code === 'auth/popup-blocked') {
        errorMessage = "Pop-up was blocked by your browser. Please allow pop-ups for this site.";
      } else if (authError.code === 'auth/popup-closed-by-user') {
        errorMessage = "Sign-in window was closed. Please try again.";
      } else if (authError.code === 'auth/unauthorized-domain') {
        errorMessage = "This domain is not authorized for OAuth operations. Please check Firebase Console settings.";
      }

      toast({
        variant: "destructive",
        title: "Error signing in",
        description: errorMessage,
      });
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      toast({
        title: "Signed out",
        description: "Successfully signed out",
      });
    } catch (error) {
      const authError = error as AuthError;
      toast({
        variant: "destructive",
        title: "Error signing out",
        description: authError.message || "Something went wrong",
      });
      console.error('Error signing out:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
