'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface CertificateData {
    "certificate-num": string;
    "recipient-name": string;
    "role": string;
    "start-date (Y-M-D)": string;
    "end-date (Y-M-D)": string;
    "duration(in days)": string;
    "certificate-issued": boolean;
}

interface InvalidResponse {
    status: string;
    message: string;
}

const VerifyBox = () => {
    const [certificateNum, setCertificateNum] = useState('');
    const [error, setError] = useState('');
    const [data, setData] = useState<CertificateData | null>(null);
    const [apiError, setApiError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const certificateId = searchParams.get('id');
        
        if (!certificateId) {
            setData(null);
            setApiError(null);
            return;
        }

        const fetchCertificate = async () => {
            setLoading(true);
            setApiError(null);
            setData(null);

            try {
                // Call YOUR Next.js API route instead of external API directly
                const response = await fetch(`/api/verify/${certificateId}`);
                const result = await response.json();

                if (result.status === 'Invalid') {
                    setApiError((result as InvalidResponse).message);
                } else {
                    setData(result as CertificateData);
                }
            } catch (err) {
                setApiError('Failed to verify certificate. Please try again later.');
                console.error('Error fetching certificate:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchCertificate();
    }, [searchParams]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const trimmedId = certificateNum.trim();
        
        if (!trimmedId) {
            setError('Please enter a certificate ID');
            return;
        }

        if (trimmedId.length < 6 || trimmedId.length > 14) {
            setError('Certificate ID must be between 6 and 14 characters');
            return;
        }

        router.push(`/verify?id=${encodeURIComponent(trimmedId)}`);
    };

    return (
        <>
            <section id="verifybox" className="overflow-hidden py-16 md:py-20 lg:py-28 mt-[20px]">
                <div className="container">
                    <div className="-mx-4 flex flex-wrap">
                        <div className="w-full px-4 lg:w-7/12 xl:w-8/12">
                            <div
                                className="wow fadeInUp shadow-three dark:bg-gray-dark mb-12 rounded-sm bg-white px-8 py-11 sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]"
                                data-wow-delay=".15s">
                                <h2 className="mb-3 text-2xl font-bold text-black dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl">
                                    Enter Certificate ID
                                </h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="-mx-4 flex flex-wrap">
                                        <div className="w-full px-4 md:w-1/2">
                                            <div className="mb-8">
                                                <label
                                                    htmlFor="inputbox-certificate-num"
                                                    className="mb-3 block text-sm font-medium text-dark dark:text-white">
                                                    Ensure there are no leading or trailing spaces; case sensitivity must be maintained.
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Enter Certificate ID (e.g: UW-XXXX)"
                                                    className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                                                    id="inputbox-certificate-num"
                                                    maxLength={14}
                                                    minLength={6}
                                                    required
                                                    autoFocus
                                                    value={certificateNum}
                                                    onChange={(e) => setCertificateNum(e.target.value)}
                                                />
                                                {error && (
                                                    <p className="mt-2 text-sm text-red-500">{error}</p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="w-full px-4">
                                            <button 
                                                type="submit"
                                                className="shadow-submit dark:shadow-submit-dark rounded-sm bg-primary px-9 py-4 text-base font-medium text-white duration-300 hover:bg-primary/90">
                                                Check
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Output Section */}
            {searchParams.get('id') && (
                <div className="container mb-16">
                    <div className="-mx-4 flex flex-wrap">
                        <div className="w-full px-4 lg:w-7/12 xl:w-8/12">
                            <div 
                                id="verify-output-box"
                                className="shadow-three dark:bg-gray-dark rounded-sm bg-white px-8 py-11 sm:p-[55px] lg:px-8 xl:p-[55px]">
                                
                                {loading && (
                                    <div className="flex items-center justify-center">
                                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                                        <span className="ml-3 text-base text-body-color dark:text-body-color-dark">
                                            Verifying certificate...
                                        </span>
                                    </div>
                                )}

                                {apiError && (
                                    <div className="rounded-md bg-red-50 dark:bg-red-900/20 p-4 border border-red-200 dark:border-red-800">
                                        <div className="flex">
                                            <div className="flex-shrink-0">
                                                <span className="text-2xl">❌</span>
                                            </div>
                                            <div className="ml-3">
                                                <h3 className="text-lg font-medium text-red-800 dark:text-red-300 mb-2">
                                                    Verification Failed
                                                </h3>
                                                <p className="text-base text-red-700 dark:text-red-400">
                                                    {apiError}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {data && (
                                    <div className="rounded-md bg-green-50 dark:bg-green-900/20 p-4 border border-green-200 dark:border-green-800">
                                        <div className="flex">
                                            <div className="flex-shrink-0">
                                                <span className="text-2xl">✅</span>
                                            </div>
                                            <div className="ml-3">
                                                <h3 className="text-lg font-medium text-green-800 dark:text-green-300 mb-3">
                                                    {data["certificate-issued"] 
                                                        ? "Certificate Verified Successfully" 
                                                        : "Employee Verified (Certificate Pending)"}
                                                </h3>
                                                <div className="text-base text-green-700 dark:text-green-400 space-y-1">
                                                    <p>
                                                        Verification successful for <strong>&quot;{data["certificate-num"]}&quot;</strong>. 
                                                        This Certificate was issued to <strong>&quot;{data["recipient-name"]}&quot;</strong> for 
                                                        the role <strong>&quot;{data["role"]}&quot;</strong> who started from{' '}
                                                        <strong>&quot;{data["start-date (Y-M-D)"]}&quot;</strong> and completed the internship after{' '}
                                                        <strong>{data["duration(in days)"]} days</strong> on{' '}
                                                        <strong>{data["end-date (Y-M-D)"]}</strong>.
                                                    </p>
                                                    {!data["certificate-issued"] && (
                                                        <p className="mt-3 text-yellow-700 dark:text-yellow-400 font-medium">
                                                            ⚠️ Note: The employee record is valid, but the certificate has not been generated yet.
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default VerifyBox;