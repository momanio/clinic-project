export function SectionLabel({
  number,
  children,
}: {
  number: string
  children: string
}) {
  return (
    <div className="section-label">
      <span className="section-number" aria-hidden="true">
        {number}
      </span>
      <span>{children}</span>
    </div>
  )
}
