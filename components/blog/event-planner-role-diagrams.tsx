import { ArrowRight } from 'lucide-react'

interface ProcessStep {
  name: string
  detail: string
}

export function ProcessFlow({
  eyebrow,
  title,
  description,
  steps,
}: {
  eyebrow: string
  title: string
  description?: string
  steps: ProcessStep[]
}) {
  return (
    <div className="my-10 p-6 sm:p-8 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 rounded-2xl border border-primary/30 text-white shadow-xl">
      <div className="text-center mb-8">
        <span className="text-xs uppercase tracking-widest text-primary font-semibold">
          {eyebrow}
        </span>
        <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mt-1">{title}</h3>
        {description ? (
          <p className="text-slate-400 text-sm mt-1 max-w-2xl mx-auto">{description}</p>
        ) : null}
      </div>

      <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {steps.map((step, index) => (
          <li
            key={step.name}
            className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex items-start gap-3"
          >
            <span className="w-8 h-8 rounded-full bg-primary text-slate-950 font-bold text-sm flex items-center justify-center shrink-0">
              {index + 1}
            </span>
            <div className="min-w-0">
              <p className="font-bold text-slate-100 text-sm tracking-wide">{step.name}</p>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">{step.detail}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-5 flex flex-wrap items-center justify-center gap-1.5 text-[11px] sm:text-xs text-slate-300 font-medium bg-slate-900/70 px-4 py-3 rounded-lg border border-slate-800">
        {steps.map((step, index) => (
          <span key={step.name} className="inline-flex items-center gap-1.5">
            <span className={index === steps.length - 1 ? 'text-primary font-bold' : undefined}>
              {step.name}
            </span>
            {index < steps.length - 1 ? <ArrowRight className="w-3 h-3 text-primary" /> : null}
          </span>
        ))}
      </div>
    </div>
  )
}
