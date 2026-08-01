export default async function AuthErrorPage({ searchParams }) {
    const params = await searchParams;
    const error = params.error;

    let errorMessage = "An unknown authentication error occurred.";

    if (error === "AccessDenied" || error === "OAuthCallbackError") {
        errorMessage = "You cancelled the Google sign-in, or access was denied. Please try again.";
    } else if (error === "Configuration") {
        errorMessage = "There is a server configuration issue. Please contact support.";
    } else if (error === "Verification") {
        errorMessage = "The verification link is invalid or has expired.";
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
            <div className="text-center max-w-md w-full bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                    Authentication Error
                </h1>
                <p className="mt-2 text-gray-500">
                    {errorMessage}
                </p>

                <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                        onClick={() => window.location.href = '/login'}
                        className="w-full sm:w-auto bg-black text-white font-semibold py-3 px-6 rounded-xl hover:bg-gray-800 transition-colors text-center"
                    >
                        Back to Login
                    </button>
                    <button
                        onClick={() => window.location.href = '/'}
                        className="w-full sm:w-auto border border-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl hover:bg-gray-50 transition-colors text-center"
                    >
                        Go back to HomePage
                    </button>
                </div>
            </div>
        </div>
    );
}