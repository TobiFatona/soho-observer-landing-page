export default function SectionLabel({ children, className = '' }) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <span className="gold-rule" />
      <span className="label-editorial">{children}</span>
      <span className="gold-rule" />
    </div>
  )
}
