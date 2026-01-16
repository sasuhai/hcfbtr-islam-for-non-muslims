import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../firebase/AuthContext';
import './Login.css';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [isForgotPassword, setIsForgotPassword] = useState(false);
    const { login, changePassword, resetPassword } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        setLoading(true);

        try {
            const result = await login(email, password);
            if (result.success) {
                if (result.requirePasswordChange) {
                    setIsChangingPassword(true);
                } else {
                    navigate('/admin');
                }
            } else {
                setError(result.error || 'Failed to login');
            }
        } catch (err) {
            setError(err.message || 'An error occurred during login');
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        setError('');

        if (newPassword !== confirmPassword) {
            return setError('Passwords do not match');
        }

        if (newPassword.length < 6) {
            return setError('Password must be at least 6 characters');
        }

        setLoading(true);
        try {
            const result = await changePassword(newPassword);
            if (result.success) {
                navigate('/admin');
            } else {
                setError(result.error || 'Failed to change password');
            }
        } catch (err) {
            setError(err.message || 'An error occurred while changing password');
        } finally {
            setLoading(false);
        }
    };

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        if (!email) {
            return setError('Please enter your email address');
        }

        setLoading(true);
        try {
            const result = await resetPassword(email);
            if (result.success) {
                setMessage('Password reset link has been sent to your email.');
                // Optionally switch back to login after some time
            } else {
                setError(result.error || 'Failed to send reset link');
            }
        } catch (err) {
            setError(err.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-card">
                    <div className="login-header">
                        <h1>
                            {isChangingPassword
                                ? 'Secure Your Account'
                                : isForgotPassword
                                    ? 'Reset Password'
                                    : 'Admin Login'}
                        </h1>
                        <p>
                            {isChangingPassword
                                ? 'Please set a new password for your first login'
                                : isForgotPassword
                                    ? 'Enter your email to receive a reset link'
                                    : 'Sign in to access the dashboard'}
                        </p>
                    </div>

                    {error && (
                        <div className="login-error">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                                <line x1="12" y1="9" x2="12" y2="13" />
                                <line x1="12" y1="17" x2="12.01" y2="17" />
                            </svg>
                            {error}
                        </div>
                    )}

                    {message && (
                        <div className="login-message" style={{ backgroundColor: 'rgba(52, 199, 89, 0.1)', color: '#248a3d', padding: '12px', borderRadius: '12px', marginBottom: '20px', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                            {message}
                        </div>
                    )}

                    {isForgotPassword ? (
                        <form onSubmit={handleForgotPassword} className="login-form">
                            <div className="form-group">
                                <label htmlFor="reset-email">Email Address</label>
                                <input
                                    type="email"
                                    id="reset-email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    placeholder="admin@example.com"
                                    disabled={loading}
                                />
                            </div>

                            <button type="submit" className="login-button" disabled={loading}>
                                {loading ? 'Sending link...' : 'Send Reset Link'}
                            </button>

                            <div className="form-links" style={{ textAlign: 'center', marginTop: '20px' }}>
                                <button
                                    type="button"
                                    onClick={() => { setIsForgotPassword(false); setError(''); setMessage(''); }}
                                    className="text-btn"
                                    style={{ background: 'none', border: 'none', color: '#9e1b12', fontWeight: '600', cursor: 'pointer' }}
                                >
                                    Back to Login
                                </button>
                            </div>
                        </form>
                    ) : !isChangingPassword ? (
                        <form onSubmit={handleSubmit} className="login-form">
                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    autoComplete="email"
                                    placeholder="admin@example.com"
                                    disabled={loading}
                                />
                            </div>

                            <div className="form-group">
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                    <label htmlFor="password" style={{ marginBottom: 0 }}>Password</label>
                                    <button
                                        type="button"
                                        onClick={() => setIsForgotPassword(true)}
                                        tabIndex="-1"
                                        style={{ background: 'none', border: 'none', color: '#9e1b12', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}
                                    >
                                        Forgot?
                                    </button>
                                </div>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    autoComplete="current-password"
                                    placeholder="Enter your password"
                                    disabled={loading}
                                    minLength="6"
                                />
                            </div>

                            <button
                                type="submit"
                                className="login-button"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <span className="spinner"></span>
                                        Signing in...
                                    </>
                                ) : (
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                        </svg>
                                        Sign In
                                    </>
                                )}
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handlePasswordChange} className="login-form">
                            <div className="form-group">
                                <label htmlFor="newPassword">New Password</label>
                                <input
                                    type="password"
                                    id="newPassword"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                    placeholder="Enter new password"
                                    disabled={loading}
                                    minLength="6"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="confirmPassword">Confirm New Password</label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    placeholder="Confirm new password"
                                    disabled={loading}
                                    minLength="6"
                                />
                            </div>

                            <button
                                type="submit"
                                className="login-button"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <span className="spinner"></span>
                                        Updating...
                                    </>
                                ) : (
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M21 2v6h-6" />
                                            <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
                                            <path d="M3 22v-6h6" />
                                            <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
                                        </svg>
                                        Update Password
                                    </>
                                )}
                            </button>
                        </form>
                    )}

                    <div className="login-footer">
                        <p>Admin access only</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

