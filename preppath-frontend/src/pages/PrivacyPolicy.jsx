const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-3xl mx-auto px-6 py-16">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
                <p className="text-gray-500 mb-10">Last updated: February 2026</p>

                <div className="prose prose-gray max-w-none space-y-8 text-gray-700 leading-relaxed">

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Introduction</h2>
                        <p>
                            PrepPath ("we", "our", or "us") operates preppathapp.com. This Privacy Policy explains how we collect,
                            use, and protect your personal information when you use our service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Information We Collect</h2>
                        <p className="mb-3">We collect the following types of information:</p>
                        <ul className="list-disc list-inside space-y-2 ml-2">
                            <li><strong>Account information:</strong> Name, email address, and password when you register.</li>
                            <li><strong>OAuth data:</strong> If you sign in with Google, we receive your name and email from Google.</li>
                            <li><strong>Usage data:</strong> Job applications, companies, and interview questions you add to the platform.</li>
                            <li><strong>Payment data:</strong> Billing is handled by Stripe. We do not store credit card numbers.</li>
                            <li><strong>Analytics:</strong> We use Google Analytics to understand how users interact with the app.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">3. How We Use Your Information</h2>
                        <ul className="list-disc list-inside space-y-2 ml-2">
                            <li>To provide and maintain the PrepPath service.</li>
                            <li>To send transactional emails (password resets, account notifications).</li>
                            <li>To process payments through Stripe.</li>
                            <li>To improve the service based on usage analytics.</li>
                            <li>To contact you about important updates or changes to the service.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Data Storage and Security</h2>
                        <p>
                            Your data is stored on secure servers hosted on Amazon Web Services (AWS). We use industry-standard
                            encryption (HTTPS/TLS) for all data transmission. Passwords are hashed using BCrypt and are never
                            stored in plain text.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Third-Party Services</h2>
                        <p className="mb-3">We use the following third-party services:</p>
                        <ul className="list-disc list-inside space-y-2 ml-2">
                            <li><strong>Google OAuth:</strong> For social sign-in. Governed by Google's Privacy Policy.</li>
                            <li><strong>Stripe:</strong> For payment processing. Governed by Stripe's Privacy Policy.</li>
                            <li><strong>Google Analytics:</strong> For usage analytics. You can opt out via browser extensions.</li>
                            <li><strong>Amazon Web Services:</strong> For hosting and data storage.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Your Rights</h2>
                        <p className="mb-3">You have the right to:</p>
                        <ul className="list-disc list-inside space-y-2 ml-2">
                            <li>Access the personal data we hold about you.</li>
                            <li>Request correction of inaccurate data.</li>
                            <li>Request deletion of your account and associated data.</li>
                            <li>Export your data in a portable format.</li>
                        </ul>
                        <p className="mt-3">
                            To exercise these rights, contact us at <a href="mailto:privacy@preppathapp.com" className="text-blue-600 hover:underline">privacy@preppathapp.com</a>.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Data Retention</h2>
                        <p>
                            We retain your account data for as long as your account is active. If you delete your account,
                            we will delete your personal data within 30 days, except where we are required by law to retain it.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Cookies</h2>
                        <p>
                            We use cookies and local storage to maintain your session and preferences (such as dark mode).
                            We use Google Analytics cookies for usage analytics. You can disable cookies in your browser settings,
                            though some features may not work correctly.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Changes to This Policy</h2>
                        <p>
                            We may update this Privacy Policy from time to time. We will notify you of significant changes
                            by email or by posting a notice on the app. Your continued use of PrepPath after changes
                            constitutes acceptance of the updated policy.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">10. Contact</h2>
                        <p>
                            If you have any questions about this Privacy Policy, please contact us at{' '}
                            <a href="mailto:privacy@preppathapp.com" className="text-blue-600 hover:underline">privacy@preppathapp.com</a>.
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

export default PrivacyPolicy;
