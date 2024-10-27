
'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '../app/providers/auth';

export default function Auth() {
    const [isLoading, setIsLoading] = useState(false);
    const { setUserId } = useAuth();

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            setUserId(userId)
        }
    }, []);


    const handleEnter = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:8080/auth-simulation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error('Failed to authenticate');
            }
            const userId = await response.text();
            localStorage.setItem('userId', userId);
            setUserId(userId);
        } catch (error) {
            console.error('Authentication error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center">
            <button
                onClick={handleEnter}
                disabled={isLoading}
                className="bg-foreground text-background px-8 py-3 rounded-lg font-semibold 
                             transition-all duration-200 hover:opacity-90 active:scale-95 
                             disabled:opacity-50 disabled:cursor-not-allowed
                             shadow-lg hover:shadow-xl"
            >
                {isLoading ? 'Entering...' : 'Enter'}
            </button>
        </div>

    );
}
