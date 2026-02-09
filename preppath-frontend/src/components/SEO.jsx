import { Helmet } from 'react-helmet-async';

const SEO = ({
    title = "PrepPath - Track Job Applications & Ace Technical Interviews",
    description = "Organize your job search with PrepPath. Track applications, manage companies, and prepare for technical interviews with unlimited practice questions. Start free today!",
    keywords = "job application tracker, interview preparation, technical interviews, job search organizer, career preparation, interview practice",
    image = "https://preppathapp.com/og-image.png",
    url = "https://preppathapp.com"
}) => {
    return (
        <Helmet>
            {/* Primary Meta Tags */}
            <title>{title}</title>
            <meta name="title" content={title} />
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={url} />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={image} />

            {/* Additional SEO */}
            <link rel="canonical" href={url} />
            <meta name="robots" content="index, follow" />
            <meta name="language" content="English" />
            <meta name="author" content="PrepPath" />
        </Helmet>
    );
};

export default SEO;