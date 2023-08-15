"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoadingScreen from '@/components/loadingScreen';

const LoadingPage: React.FC = () => {
    const router = useRouter();
    useEffect(() => {
    const redirectRoute = '/home'; // The route you want to redirect to
    router.push(redirectRoute); 
}, [router]);

    return (
        <LoadingScreen/>
        );
};

export default LoadingPage;