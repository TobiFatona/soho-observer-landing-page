export default function AppStoreButton({ href = '#', compact = false }) {
  return (
    <a href={href} className={`btn-appstore ${compact ? 'px-4 py-2.5 text-xs' : ''}`}>
      <svg
        width={compact ? 16 : 22}
        height={compact ? 19 : 26}
        viewBox="0 0 22 26"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M18.05 13.76c-.03-3.3 2.7-4.9 2.82-4.97-1.54-2.25-3.93-2.56-4.78-2.59-2.04-.21-3.98 1.2-5.02 1.2-1.04 0-2.65-1.17-4.36-1.14-2.24.03-4.3 1.3-5.45 3.3C-.1 13.6 1.5 20.08 3.84 23.6c1.16 1.68 2.54 3.57 4.35 3.5 1.75-.07 2.41-1.13 4.53-1.13 2.11 0 2.71 1.13 4.56 1.1 1.88-.03 3.07-1.7 4.22-3.38 1.33-1.94 1.88-3.82 1.91-3.92-.04-.02-3.65-1.4-3.68-5.54l.02.03zM14.72 4.3c.96-1.17 1.61-2.79 1.43-4.41-1.38.06-3.07.93-4.06 2.07-.89 1.01-1.67 2.65-1.46 4.2 1.54.12 3.11-.78 4.09-1.86z" />
      </svg>
      <div className="flex flex-col items-start leading-tight">
        {!compact && (
          <span className="text-[0.55rem] tracking-wider uppercase opacity-70">
            Download on the
          </span>
        )}
        <span className={`font-medium ${compact ? 'text-xs' : 'text-sm'}`}>
          {compact ? 'Coming soon to iOS' : 'App Store'}
        </span>
      </div>
    </a>
  )
}
