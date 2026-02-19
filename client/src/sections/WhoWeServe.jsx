export default function WhoWeServe() {

  const targetAudiences = [
    {
      category: "PRIMARY",
      title: "College Students & Beginners",
      description: "Structured roadmaps designed to take you from zero to job-ready. Build real projects, develop consistency, and stop relying on passive content.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    {
      category: "PRIMARY",
      title: "Competitive & Placement Aspirants",
      description: "Daily coding challenges, DSA missions, and structured preparation to help you crack interviews and improve problem-solving skills.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      )
    },
    {
      category: "SECONDARY",
      title: "Career Switchers & Upskillers",
      description: "Step-by-step execution plans for professionals transitioning into tech or upgrading their skills with real-world projects.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6" />
        </svg>
      )
    },
    {
      category: "TERTIARY",
      title: "Learning Communities & Study Groups",
      description: "Compete with peers, maintain streaks, and track collective progress through leaderboards and activity heatmaps.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    }
  ];

  const AudienceCard = ({ audience }) => (
    <div className="group relative overflow-hidden rounded-xl transition-all duration-500 ease-in-out hover:-translate-y-2 hover:scale-105">
      <div className="size-full rounded-xl transform-gpu bg-white dark:bg-black [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] dark:[border:1px_solid_rgba(255,255,255,.1)]">

        <div className="absolute -inset-0.5 rounded-xl blur opacity-0 group-hover:opacity-30 transition-all duration-500 ease-in-out" style={{ backgroundImage: 'linear-gradient(to right, #3b82f6, #2563eb)' }}></div>

        <div className="relative p-6 md:p-8 h-full rounded-xl bg-white dark:bg-black">

          {/* Category Badge */}
          <div className="mb-4 md:mb-6">
            <div className="inline-flex items-center px-3 py-1 text-white text-xs font-bold rounded-full tracking-wider mb-3 md:mb-4" style={{ backgroundColor: '#3b82f6' }}>
              {audience.category}
            </div>

            <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-all duration-500 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
              {audience.icon}
            </div>
          </div>


          <div className="space-y-3 md:space-y-4">
            <h3 className="text-lg md:text-xl font-bold leading-tight text-gray-900 dark:text-white">
              {audience.title}
            </h3>

            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
              {audience.description}
            </p>
          </div>


          <div className="absolute bottom-0 left-0 right-0 h-1 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" style={{ backgroundColor: '#3b82f6' }}></div>
        </div>


        <div className="user-select-none pointer-events-none absolute inset-0 z-30 bg-gradient-to-tl via-transparent to-transparent opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100" style={{ backgroundImage: 'linear-gradient(to top left, rgba(59, 130, 246, 0.1), transparent, transparent)' }}></div>
        <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300" style={{ backgroundColor: 'rgba(59, 130, 246, 0.03)' }}></div>
      </div>
    </div>
  );
  return (
    <div className="max-w-7xl mx-auto sm:mt-12 md:mt-20">
      <div className="text-center mb-12 sm:mb-16 md:mb-20">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 md:mb-6 px-4 sm:px-0 text-gray-900 dark:text-white">
          WHO LevelUp.dev IS FOR
        </h2>
        <div className="w-26 sm:w-24 md:w-36 h-1 mx-auto mb-6 md:mb-8" style={{ backgroundColor: '#3b82f6' }}></div>
        <p className="text-base sm:text-lg font-light max-w-3xl mx-auto px-4 sm:px-0 text-gray-600 dark:text-gray-400">
          LevelUp.dev is built for ambitious learners who want structure, accountability, and real execution — not endless tutorials.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8 px-4 sm:px-0">
        {targetAudiences.map((audience, index) => (
          <AudienceCard key={index} audience={audience} />
        ))}
      </div>
    </div>
  )
}