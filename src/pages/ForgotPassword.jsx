import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { Mail, ArrowLeft, KeyRound } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { toast } from 'sonner';

const ForgotPassword = () => {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.title = 'Forgot Password | ToyTopia';
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setLoading(true);
    try {
      await resetPassword(email);
      setSubmitted(true);
      toast.success("Password reset email sent!");
    } catch (error) {
      // Error handled by AuthContext or shown here if needed
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50/50">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md shadow-xl border-gray-100">
          <CardHeader className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center">
                <KeyRound className="h-8 w-8 text-primary" />
              </div>
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-gray-900">
                Forgot Password?
              </CardTitle>
              <CardDescription className="text-gray-500 mt-2">
                No worries, we'll send you reset instructions.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            {submitted ? (
              <div className="text-center space-y-6 animate-in fade-in duration-500">
                <div className="bg-green-50 text-green-800 p-4 rounded-lg text-sm">
                  <p className="font-semibold">Check your email!</p>
                  <p>We've sent a password reset link to <span className="font-bold">{email}</span></p>
                </div>
                <p className="text-sm text-gray-500">
                  Didn't receive the email? Check your spam folder or try again.
                </p>
                <Button
                  onClick={() => setSubmitted(false)}
                  variant="outline"
                  className="w-full"
                >
                  Try another email
                </Button>
                <Button asChild className="w-full" variant="link">
                  <Link to="/auth">Back to Login</Link>
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full font-bold shadow-lg shadow-primary/20"
                  disabled={loading}
                >
                  {loading ? 'Sending...' : 'Reset Password'}
                </Button>

                <div className="text-center mt-4">
                  <Link
                    to="/auth"
                    className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 transition-colors"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Login
                  </Link>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default ForgotPassword;
