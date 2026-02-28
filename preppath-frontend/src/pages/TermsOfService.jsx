const TermsOfService = () => {
    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-3xl mx-auto px-6 py-16">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Terms of Service</h1>
                <p className="text-gray-500 mb-10">Last updated: February 2026</p>

                <div className="prose prose-gray max-w-none space-y-8 text-gray-700 leading-relaxed">

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Acceptance of Terms</h2>
                        <p>
                            By accessing or using PrepPath ("the Service") at preppathapp.com, you agree to be bound by these
                            Terms of Service. If you do not agree, do not use the Service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Description of Service</h2>
                        <p>
                            PrepPath is a job application tracking and interview preparation platform for software developers.
                            The Service allows users to track job applications, manage company information, and build a
                            personal question bank for interview preparation.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Account Registration</h2>
                        <ul className="list-disc list-inside space-y-2 ml-2">
                            <li>You must provide accurate and complete information when creating an account.</li>
                            <li>You are responsible for maintaining the security of your account credentials.</li>
                            <li>You must be at least 16 years old to use the Service.</li>
                            <li>One person may not maintain more than one account.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Free and Pro Plans</h2>
                        <p className="mb-3">The Service is offered in two tiers:</p>
                        <ul className="list-disc list-inside space-y-2 ml-2">
                            <li><strong>Free Plan:</strong> Up to 10 job applications and 50 questions. No credit card required.</li>
                            <li><strong>Pro Plan:</strong> Unlimited applications and questions for $9/month, billed monthly.</li>
                        </ul>
                        <p className="mt-3">
                            Paid subscriptions are processed through Stripe. You may cancel your Pro subscription at any time;
                            you will retain access until the end of the current billing period.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Acceptable Use</h2>
                        <p className="mb-3">You agree not to:</p>
                        <ul className="list-disc list-inside space-y-2 ml-2">
                            <li>Use the Service for any unlawful purpose.</li>
                            <li>Attempt to access other users' accounts or data.</li>
                            <li>Reverse engineer or attempt to extract the source code of the Service.</li>
                            <li>Use automated tools to scrape or access the Service at excessive rates.</li>
                            <li>Upload malicious code or content.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Your Data</h2>
                        <p>
                            You retain ownership of all data you upload to PrepPath (job applications, notes, questions, etc.).
                            By using the Service, you grant us a limited license to store and process this data solely to
                            provide the Service to you. We do not sell your data to third parties.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Intellectual Property</h2>
                        <p>
                            The PrepPath name, logo, and software are our intellectual property. You may not use them without
                            our prior written consent.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Disclaimer of Warranties</h2>
                        <p>
                            The Service is provided "as is" without any warranties, express or implied. We do not guarantee
                            that the Service will be uninterrupted, error-free, or that any specific results will be obtained
                            from using it.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Limitation of Liability</h2>
                        <p>
                            To the maximum extent permitted by law, PrepPath shall not be liable for any indirect, incidental,
                            special, or consequential damages arising from your use of the Service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">10. Termination</h2>
                        <p>
                            We reserve the right to suspend or terminate your account if you violate these Terms. You may
                            delete your account at any time by contacting us. Upon termination, your data will be deleted
                            within 30 days.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">11. Changes to Terms</h2>
                        <p>
                            We may update these Terms from time to time. Continued use of the Service after changes
                            constitutes acceptance of the new Terms.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">12. Contact</h2>
                        <p>
                            For questions about these Terms, contact us at{' '}
                            <a href="mailto:legal@preppathapp.com" className="text-blue-600 hover:underline">legal@preppathapp.com</a>.
                        </p>
                    </section>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-200">
                    <a href="/" className="text-blue-600 hover:text-blue-700 text-sm font-medium">← Back to PrepPath</a>
                </div>
            </div>
        </div>
    );
};

export default TermsOfService;
