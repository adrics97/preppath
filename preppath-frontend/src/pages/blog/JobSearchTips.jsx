import { useNavigate } from 'react-router-dom';
import BlogLayout from '../../components/BlogLayout';

const JobSearchTips = () => {
    const navigate = useNavigate();

    return (
        <BlogLayout seo={{
            title: '10 Mistakes Developers Make During Their Job Search | PrepPath',
            description: 'Most developers are great at coding but overlook the non-technical side of job hunting. These are the most common mistakes and what to do instead.',
            url: 'https://preppathapp.com/blog/developer-job-search-tips',
        }}>
            <article className="max-w-2xl mx-auto px-4 sm:px-6 py-16">

                {/* Header */}
                <div className="mb-10">
                    <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">Career</span>
                    <h1 className="mt-4 text-4xl font-black text-gray-900 leading-tight">
                        10 Mistakes Developers Make During Their Job Search (And How to Fix Them)
                    </h1>
                    <p className="mt-4 text-lg text-gray-600">
                        Most developers are great at coding but overlook the non-technical side of job hunting. These are the most common mistakes and what to do instead.
                    </p>
                    <div className="mt-4 flex items-center gap-3 text-sm text-gray-400">
                        <span>March 2, 2026</span>
                        <span>·</span>
                        <span>6 min read</span>
                    </div>
                </div>

                {/* Content */}
                <div className="prose prose-gray max-w-none space-y-6 text-gray-700 leading-relaxed">

                    <p>
                        Job searching is an uncomfortable process for most developers. It requires skills that aren't typically used day-to-day: self-promotion, negotiation, structured communication under pressure. It's no surprise that many developers make avoidable mistakes that cost them time and opportunities.
                    </p>

                    <p>Here are the ten most common — and how to fix them.</p>

                    <h2 className="text-2xl font-bold text-gray-900 mt-10">1. Applying without a tracking system</h2>
                    <p>
                        Sending applications from job boards without recording anything is how you end up in a recruiter call not knowing which role it's for. Track every application from day one — company, role, status, date applied, and notes.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mt-10">2. Mass-applying without customizing</h2>
                    <p>
                        Sending the same CV to 50 companies rarely works. Hiring managers can spot a generic application instantly. A targeted application to 10 well-researched companies outperforms 50 generic ones almost every time.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mt-10">3. Not following up</h2>
                    <p>
                        Most developers submit an application and then wait indefinitely. A polite follow-up email 5–7 business days after applying shows initiative and keeps you top of mind. Most companies appreciate it.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mt-10">4. Underestimating behavioral interviews</h2>
                    <p>
                        "I'm a developer, I don't need to prepare the soft skills part." This is wrong. Behavioral interviews often eliminate candidates with strong technical skills. Prepare 5–6 strong stories using the STAR method (Situation, Task, Action, Result) before any interview loop.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mt-10">5. Not researching the company</h2>
                    <p>
                        Going into an interview without knowing what the company does, what their tech stack is, or what stage they're at signals low interest. Spend 20–30 minutes researching before any call. Check their website, blog, engineering team on LinkedIn, and any recent news.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mt-10">6. Salary inconsistency across companies</h2>
                    <p>
                        If you quote different salary expectations to different companies, you'll struggle in late-stage negotiations. Decide your range upfront, document it, and be consistent. Being asked "what did you say your expectation was last week?" is an avoidable problem.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mt-10">7. Not capturing interview feedback</h2>
                    <p>
                        After each interview, write down what was asked, what went well, and what you'd improve. Most developers don't do this, which means they repeat the same mistakes across interviews. The debrief is part of the preparation.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mt-10">8. Stopping practice once you get interviews</h2>
                    <p>
                        Getting an interview is the start, not the end. Many developers relax on technical preparation once they get calls scheduled. The offer comes from performing well in the interview, not from getting it.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mt-10">9. Not negotiating the offer</h2>
                    <p>
                        The first offer is rarely the final one. Most companies expect negotiation. A simple "I'm very excited about this opportunity — is there any flexibility on the base salary?" is enough to start. The worst they can say is no, and you're no worse off than before.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mt-10">10. Treating the job search as a single event instead of a system</h2>
                    <p>
                        A job search that lasts weeks or months requires a system, not occasional effort. Schedule time each week for applications, follow-ups, and interview prep. Treat it like a project with milestones and review sessions.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mt-10">The common thread</h2>

                    <p>
                        Most of these mistakes come down to the same thing: lack of organization. When everything lives in your head or scattered across tabs, it's impossible to stay on top of a multi-company search.
                    </p>

                    <p>
                        <a href="https://preppathapp.com" className="text-blue-600 hover:underline">PrepPath</a> is built to solve exactly this — a single place to track your applications, store company research, build your question bank, and capture interview feedback. It removes the overhead so you can focus on what matters: being prepared.
                    </p>
                </div>

                {/* CTA */}
                <div className="mt-16 bg-blue-50 rounded-2xl p-8 text-center">
                    <h3 className="text-xl font-bold text-gray-900">Get your job search organized</h3>
                    <p className="mt-2 text-gray-600 text-sm">Free plan, no credit card required. Ready in 2 minutes.</p>
                    <button
                        onClick={() => navigate('/register')}
                        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition-all"
                    >
                        Get Started Free
                    </button>
                </div>
            </article>
        </BlogLayout>
    );
};

export default JobSearchTips;
