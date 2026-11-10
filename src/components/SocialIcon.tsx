export function SocialIcon({ network }: { network: 'instagram' | 'facebook' }) {
  return network === 'instagram' ? (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none" />
    </svg>
  ) : (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M14 21v-8h3l.5-4H14V7c0-1 .5-1.5 1.5-1.5H18V2.2A19 19 0 0 0 15 2c-3 0-5 1.8-5 5v2H7v4h3v8h4Z" />
    </svg>
  )
}
