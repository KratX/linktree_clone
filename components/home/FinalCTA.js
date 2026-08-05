import SignupForm from "./SignupForm";

export default function FinalCTA() {
    return (
        <section className="bg-[#d2e823] px-6 py-24 md:px-10 lg:px-16">
            <div className="mx-auto max-w-4xl text-center">
                <h2 className="text-4xl font-black leading-tight text-[#254f1a] sm:text-5xl">
                    Bring everything you are to one link.
                </h2>
                <p className="mt-5 text-lg font-semibold text-[#254f1a]/80">
                    Set it up in minutes. Free forever, upgrade whenever you&apos;re ready.
                </p>
                <div className="mt-10 flex justify-center">
                    <SignupForm />
                </div>
            </div>
        </section>
    );
}