import { Bot, User } from 'lucide-react'
import type { ChatMessage } from '@/lib/ai/types'
import { RecommendationCard } from '@/components/ai/recommendation-card'
import { useTranslation } from '@/src/hooks/useTranslation'
import { formatConsultationMessage } from '@/lib/ai/consultant-engine'

interface MessageBubbleProps {
  message: ChatMessage
}

function renderMarkdownBold(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </strong>
      )
    }
    return <span key={i}>{part}</span>
  })
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user'
  const { t } = useTranslation()

  let content = message.content
  if (message.id === 'welcome') {
    if (content.startsWith('Great choice') || content.includes('package')) {
      const match = content.match(/\*\*(.*?)\*\*/)
      const pkgTitle = match ? match[1] : ''
      content = t('aiPlanner.prefillWelcome').replace('{eventType}', pkgTitle)
    } else {
      content = t('aiPlanner.welcome')
    }
  } else if (message.recommendation) {
    content = formatConsultationMessage(message.recommendation, t)
  }

  return (
    <div className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0 mt-0.5">
          <Bot size={16} className="text-primary" />
        </div>
      )}

      <div className={`max-w-[88%] space-y-3 ${isUser ? 'items-end' : 'items-start'}`}>
        <div
          className={`px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
            isUser
              ? 'bg-primary text-primary-foreground rounded-br-md'
              : 'bg-slate-100 text-foreground rounded-bl-md'
          }`}
        >
          {renderMarkdownBold(content)}
        </div>

        {message.recommendation && (
          <RecommendationCard recommendation={message.recommendation} />
        )}
      </div>

      {isUser && (
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0 mt-0.5">
          <User size={16} className="text-primary-foreground" />
        </div>
      )}
    </div>
  )
}
