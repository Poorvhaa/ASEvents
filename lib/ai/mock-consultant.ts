import type { ConsultantAnswers, ConsultantRecommendation } from '@/lib/ai/types'

export function generateRecommendation(answers: ConsultantAnswers): ConsultantRecommendation {
  const { eventType, guests, budget, city } = answers

  const guestNum = parseInt(guests) || 200

  if (eventType === 'Wedding') {
    const isLarge = guestNum > 300
    return {
      suggestedPackage: isLarge ? 'Complete Wedding Package' : 'Wedding Ceremony + Reception',
      estimatedBudget: budget || (isLarge ? '₹10,00,000 - ₹25,00,000' : '₹5,00,000 - ₹10,00,000'),
      recommendedServices: [
        'Mandap Setup & Floral Decor',
        'Photography & Videography',
        'Catering Coordination',
        'Entertainment & DJ',
        'Guest Management',
      ],
      venueSuggestions: [
        city ? `${city} Wedding Hall` : 'Royal Palace Wedding Hall, Ahmedabad',
        'Azure Luxury Resort, Udaipur',
        'Green Meadows Farmhouse, Vadodara',
      ],
      nextSteps: [
        'Schedule a free consultation with our wedding planner',
        'Visit shortlisted venues in your preferred city',
        'Review our Complete Wedding Package in detail',
        'Request a customized quote based on your guest count',
      ],
    }
  }

  if (eventType === 'Corporate') {
    return {
      suggestedPackage: guestNum > 500 ? 'Trade Show' : 'Corporate Conference',
      estimatedBudget: budget || '₹2,00,000 - ₹8,00,000',
      recommendedServices: [
        'Venue Coordination',
        'Branding & Signage',
        'AV Setup & Live Streaming',
        'Hospitality Management',
        'Photography & Media Coverage',
      ],
      venueSuggestions: [
        'Metro Convention Centre, Mumbai',
        'Tech Hub Conference Centre, Pune',
        'Expo Grand Hall, Delhi',
      ],
      nextSteps: [
        'Define your event objectives and agenda',
        'Book a venue walkthrough',
        'Review AV and branding requirements',
        'Request a detailed corporate event proposal',
      ],
    }
  }

  if (eventType === 'Birthday') {
    return {
      suggestedPackage: 'Birthday Celebration',
      estimatedBudget: budget || '₹75,000 - ₹3,00,000',
      recommendedServices: [
        'Theme Decor & Styling',
        'Entertainment & Music',
        'Photography',
        'Catering',
        'Venue Coordination',
      ],
      venueSuggestions: [
        'Grand Imperial Banquet, Surat',
        'Emerald Open Lawn, Pune',
        'Green Meadows Farmhouse, Vadodara',
      ],
      nextSteps: [
        'Choose a theme for your celebration',
        'Select entertainment options',
        'Request a birthday package quote',
        'Schedule a planning consultation',
      ],
    }
  }

  if (eventType === 'Festival') {
    return {
      suggestedPackage: 'Garba Night / Navratri Event',
      estimatedBudget: budget || '₹1,50,000 - ₹5,00,000',
      recommendedServices: [
        'Theme Decor & Lighting',
        'Live Music & DJ',
        'Stage Setup',
        'Food Counters',
        'Security & Crowd Management',
      ],
      venueSuggestions: [
        'Emerald Open Lawn, Pune',
        'Royal Palace Wedding Hall, Ahmedabad',
        'Expo Grand Hall, Delhi',
      ],
      nextSteps: [
        'Confirm event dates and duration',
        'Review festival package options',
        'Plan entertainment and decor themes',
        'Request a customized festival quote',
      ],
    }
  }

  return {
    suggestedPackage: 'Custom Event Package',
    estimatedBudget: budget || '₹1,00,000 - ₹5,00,000',
    recommendedServices: [
      'Event Planning & Coordination',
      'Venue Selection',
      'Decor & Styling',
      'Photography',
      'Hospitality Management',
    ],
    venueSuggestions: city
      ? [`Premium venues in ${city}`, 'Green Meadows Farmhouse, Vadodara']
      : ['Royal Palace Wedding Hall, Ahmedabad', 'Metro Convention Centre, Mumbai'],
    nextSteps: [
      'Speak with our event planning team',
      'Explore our packages page for options',
      'Request a free personalized quote',
      'Schedule a venue visit',
    ],
  }
}

export function formatRecommendation(rec: ConsultantRecommendation): string {
  return `Here's my recommendation for your event:

**Suggested Package:** ${rec.suggestedPackage}

**Estimated Budget:** ${rec.estimatedBudget}

**Recommended Services:**
${rec.recommendedServices.map((s) => `• ${s}`).join('\n')}

**Venue Suggestions:**
${rec.venueSuggestions.map((v) => `• ${v}`).join('\n')}

**Next Steps:**
${rec.nextSteps.map((s, i) => `${i + 1}. ${s}`).join('\n')}

Would you like to request a detailed quote? Click "Get Free Quote" or contact our team directly.`
}
