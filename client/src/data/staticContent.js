// Static content for deployment without backend
export const staticContent = {
  config: {
    company: {
      name: "Hausset",
      tagline: "One organized hub, home troubles vanished",
      description: "Transform your home management with smart organization and proactive maintenance tracking",
      logo: "/hausset-icon.png",
      launch_date: "2025"
    },
    hero: {
      title: "Hausset",
      subtitle: "One organized hub, home troubles vanished",
      description: "Reactive Approach to Home Maintenance is Dangerous and Costly",
      cta_text: "Get Early Access",
      cta_link: "#contact",
      background_image: "/hero-bg.jpg"
    },
    contact: {
      email: "hello@calyptor.net",
      phone: "+1 (267) 319-9196",
      address: {
        street: "2108 N ST STE N",
        city: "Sacramento",
        state: "CA",
        zip: "95816"
      }
    },
    social: {
      twitter: "https://x.com/Hausset_app",
      email: "hello@calyptor.net"
    },
    theme: {
      primary_color: "#4285f4",
      background_color: "#0a0a0a",
      text_color: "#ffffff",
      accent_color: "#ff6b47"
    }
  },
  problems: [
    {
      id: "awareness",
      title: "Lack of Awareness",
      description: "Homeowners often aren't aware of the installations and systems in their homes",
      stat: "40% of U.S. homes (~35M) have at least one health or safety hazard",
      quote: "Most people only discover problems when it's too late",
      background_image: "/awareness-bg.jpg"
    },
    {
      id: "reactive",
      title: "Reactive Mindset",
      description: "People take action mostly when damages have been done, with no preventive records",
      stat: "125,700 deaths annually from home accidents",
      quote: "Emergency repairs cost 3-5x more than preventive maintenance",
      background_image: "/reactive-bg.jpg"
    },
    {
      id: "costs",
      title: "High Costs & Risks",
      description: "Reactive approach leads to health risks, higher costs, and property degradation",
      stat: "$200B+ in U.S. residential urgent repairs annually",
      quote: "Average household emergency repair cost: $2,920",
      background_image: "/costs-bg.jpg"
    }
  ],
  products: {
    featured: {
      title: "Smart Home Management",
      description: "Transform your home with intelligent organization and proactive maintenance tracking",
      image: "/hausset-icon.png"
    },
    features: [
      {
        title: "Proactive Maintenance",
        description: "Never miss important home maintenance tasks again"
      },
      {
        title: "Smart Organization",
        description: "Keep track of all your home systems and appliances"
      },
      {
        title: "Safety Monitoring",
        description: "Get alerts for potential safety hazards"
      }
    ]
  }
};