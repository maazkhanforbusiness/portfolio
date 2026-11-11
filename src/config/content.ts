/** Copy sourced from /cursor/stores/self/internal/portfolio-brief.md — do not invent. */

export const nav = [
  { href: '#showreel', label: 'Showreel' },
  { href: '#work', label: 'Work' },
  { href: '#services', label: 'Services' },
  { href: '#about', label: 'About' },
  { href: '#process', label: 'Process' },
  { href: '#contact', label: 'Contact' },
] as const

export const hero = {
  label: 'VIDEO EDITOR & CREATIVE PROFESSIONAL',
  headline: 'Turning ideas into visual stories.',
  supporting:
    'I create engaging videos through storytelling, thoughtful editing, and creative visual direction.',
  name: 'Maaz Khan',
  ctaShowreel: 'Watch Showreel',
  ctaWork: 'Explore My Work',
  ctaContact: "Let's Work Together",
  availability: 'Available for select projects',
  scroll: 'Scroll',
  asideEyebrow: 'About',
  aside: [
    "I'm Maaz Khan, a video editor and social media professional with approximately two years of experience working across digital content, YouTube, real estate, and freelance projects.",
    'My work combines storytelling, editing, motion graphics, colour correction, and sound design to create videos that communicate ideas and keep audiences engaged.',
    'I also have experience in social media management and graphic design, giving me a broader understanding of how content is created, presented, and distributed.',
  ],
  asideContact: 'Get in touch',
}

export const showreelSection = {
  eyebrow: 'Showreel',
  title: 'A cut of the work.',
  body: 'A selection of recent edits across storytelling, pacing, and visual direction.',
  comingSoon: 'Showreel coming soon',
}

export const workSection = {
  eyebrow: 'Selected Work',
  title: 'Selected cuts across formats.',
  categories: ['Short Format', 'AI Promo', 'Talking Head', 'Real Estate'] as const,
}

export const servicesSection = {
  eyebrow: 'Services',
  title: 'Creative editing for every kind of story.',
  items: [
    {
      id: 'talking-head',
      title: 'Talking Head Video Editing',
      for: 'For YouTubers, personal brands, educators, coaches, and businesses.',
      youtubeId: '9xTF_0iLPbo',
      includes: [
        'Jump cuts',
        'Dynamic captions',
        'B-roll',
        'Sound design',
        'Engaging pacing',
        'Visual storytelling',
      ],
    },
    {
      id: 'real-estate',
      title: 'Real Estate Video Editing',
      for: 'For real estate agencies, property marketers, and property professionals.',
      youtubeId: 'cq43me-Y1RU',
      includes: [
        'Luxury property showcases',
        'Property walkthroughs',
        'Cinematic transitions',
        'Colour grading',
        'Speed ramps',
        'Music synchronisation',
      ],
    },
    {
      id: 'podcast',
      title: 'Podcast Editing',
      for: 'For podcasters, creators, and businesses.',
      youtubeId: null,
      includes: [
        'Full podcast episodes',
        'Multi-camera editing',
        'Audio enhancement',
        'Captions',
        'Podcast highlights',
        'Social media clips',
      ],
    },
    {
      id: 'vlogs-lifestyle',
      title: 'Vlogs & Lifestyle Video Editing',
      for: 'For travel vloggers, lifestyle creators, and YouTubers.',
      youtubeId: null,
      includes: [
        'Story-driven editing',
        'Cinematic sequences',
        'Music synchronisation',
        'Smooth transitions',
        'Colour grading',
        'Sound design',
      ],
    },
    {
      id: 'social-reels',
      title: 'Social Media Reels & Shorts',
      for: 'For influencers, businesses, and personal brands.',
      youtubeId: 'B8oZTuRkytU',
      includes: [
        'Instagram Reels',
        'YouTube Shorts',
        'Vertical video editing',
        'Engaging hooks',
        'Dynamic captions',
        'Retention-focused pacing',
      ],
    },
    {
      id: 'commercial-brand',
      title: 'Commercial & Brand Films',
      for: 'For brands and businesses.',
      youtubeId: null,
      includes: [
        'Brand storytelling',
        'Product videos',
        'Promotional campaigns',
        'Motion graphics',
        'Cinematic editing',
        'Sound design',
      ],
    },
    {
      id: 'ai-promo',
      title: 'AI Promotional Ads',
      for: 'For businesses and brands exploring AI-assisted advertising.',
      youtubeId: 'c0OlFLCP3qw',
      includes: [
        'AI-generated visuals',
        'AI-assisted product advertisements',
        'Creative visual sequences',
        'Motion graphics',
        'Commercial storytelling',
      ],
    },
  ],
  cta: 'Discuss This Project',
}

export const aboutSection = {
  eyebrow: 'About',
  title: "More than editing. It's about telling the story.",
  body: [
    "I'm Maaz Khan, a video editor and social media professional with approximately two years of experience working across digital content, YouTube, real estate, and freelance projects.",
    'My work combines storytelling, editing, motion graphics, colour correction, and sound design to create videos that communicate ideas and keep audiences engaged.',
    'I also have experience in social media management and graphic design, giving me a broader understanding of how content is created, presented, and distributed.',
  ],
  introduction:
    "I'm Maaz Khan, a creative video editor and social media professional passionate about transforming raw footage into engaging visual stories. I work across short-form and long-form content, real estate films, promotional videos, and digital content.",
  strengthsTitle: 'Professional strengths',
  strengths: [
    'Video storytelling',
    'Creative editing',
    'Colour correction',
    'Sound design',
    'Motion graphics',
    'Social media content strategy',
    'Content optimisation',
    'Graphic design',
    'YouTube thumbnails and promotional creatives',
    'Remote client collaboration',
  ],
  portraitAlt: 'Portrait of Maaz Khan',
}

export const experienceSection = {
  eyebrow: 'Experience',
  title: 'Experience',
  roles: [
    {
      org: 'Digital Gurukul Ai',
      title: 'Senior Video Editor / Social Media Manager',
      location: 'Jagadhri, Haryana',
      dates: '2026–Present',
      responsibilities: [
        'Lead video editing and social media strategy.',
        'Oversee content planning, editing, and publishing.',
        'Guide editing workflows and maintain brand consistency.',
      ],
    },
    {
      org: 'VidaBricks Real Estate LLC',
      title: 'Video Editor',
      location: 'Dubai, UAE | Remote',
      dates: null as string | null,
      responsibilities: [
        'Edited property showcase and promotional videos.',
        'Worked on motion graphics, colour grading, and transitions.',
        'Collaborated remotely with the Dubai-based team.',
      ],
    },
    {
      org: 'Freelance',
      title: 'Video Editor & Graphic Designer',
      location: null as string | null,
      dates: '2024–Present',
      responsibilities: [
        'Edited videos for YouTubers across different niches.',
        'Created promotional videos and social media advertisements.',
        'Delivered freelance projects through Fiverr.',
        'Designed thumbnails, banners, and social media creatives.',
        'Produced short-form and long-form content.',
      ],
    },
  ],
}

export const skillsSection = {
  eyebrow: 'Software & Skills',
  title: 'Software & Skills',
  tools: [
    'Adobe Premiere Pro',
    'Adobe After Effects',
    'Adobe Photoshop',
    'Adobe Audition',
    'DaVinci Resolve',
    'Final Cut Pro',
    'CapCut',
  ],
  additional: [
    'Motion Graphics',
    'Colour Correction',
    'Audio Editing',
    'Basic Visual Effects',
    'Storytelling',
    'Content Optimisation',
    'Graphic Design',
    'Social Media Strategy',
  ],
}

export const processSection = {
  eyebrow: 'Creative Process',
  title: 'My Creative Process',
  steps: [
    { num: '01', title: 'Understand the Vision' },
    { num: '02', title: 'Build the Story' },
    { num: '03', title: 'Edit & Refine' },
    { num: '04', title: 'Sound & Colour' },
    { num: '05', title: 'Deliver the Final Experience' },
  ],
}

export const contactSection = {
  eyebrow: 'Contact',
  title: "Have a project in mind? Let's make it happen.",
  body: "Whether you need engaging social content, cinematic real estate films, podcast editing, or creative promotional videos, I'd love to hear about your project.",
  form: {
    fullName: 'Full Name',
    phone: 'Phone Number',
    email: 'Email Address',
    phoneHint: 'Phone or email required',
    emailHint: 'Phone or email required',
    contactNote: 'Provide at least one: phone number or email.',
    details: 'Project Details',
    optional: 'Optional',
    submit: 'Send Project Inquiry →',
    opened:
      'WhatsApp opened and your mail app opened with this inquiry. Send both from your device — nothing was delivered automatically from this site.',
    required: 'Please enter your full name.',
    contactRequired: 'Enter a phone number or an email address (at least one).',
    invalidEmail: 'Enter a valid email address.',
  },
  direct: 'Or reach me directly',
}

export const footer = {
  name: 'Maaz Khan',
  tagline: 'Video Editor & Creative Professional',
  backToTop: 'Back to top',
  copyrightYear: new Date().getFullYear(),
}
