

export const INITIAL_AMOUNT = 500000

export const questions = [
  {
    id: 1,
    question: "Your UX team designs a sign-up process with pre-ticked consent boxes for marketing emails. Conversion rates soar.",
    options: {
      A: {
        content: "Keep the design---it's effective.",
        businessGrowth: 0.1,
        fine: -0.15,
        netImpact: -0.05,
        longTermImpact: 0.0
      },
      "B": {
        content: "Change to opt-in boxes---extra step for consumer.",
        businessGrowth: 0.05,
        fine: 0.0,
        netImpact: 0.05,
        longTermImpact: 0.0
      }
    }
  },
  {
    id: 2,
    question: "Your team starts collecting behavioural data like app usage times and spending patterns to improve personalization. This is covered in the privacy policy, but users aren't explicitly notified.",
    options: {
      A: {
        content: "Notify users and stick to explicit opt-ins.",
        businessGrowth: 0.0,
        fine: 0.0,
        netImpact: 0.0,
        longTermImpact: 0.05
      },
      "B": {
        content: "Proceed with default opt-ins.",
        businessGrowth: 0.12,
        fine: -0.25,
        netImpact: -0.13,
        longTermImpact: -0.1
      }
    }
  },
  {
    id: 3,
    question: "Your compliance officer warns that regulators are investigating your data retention practices, particularly expired user data held for future campaigns. At the same time, Riya, a loyal user, posts a viral tweet: 'My late spouse's financial data is still stored on FinPeak. I trusted them, and they let me down.'",
    options: {
      A: {
        content: "Delete all expired data immediately.",
        businessGrowth: 0.0,
        fine: 0.0,
        netImpact: 0.0,
        longTermImpact: 0.05
      },
      "B": {
        content: "Retain data and anonymize it.",
        businessGrowth: 0.1,
        fine: -0.2,
        netImpact: -0.1,
        longTermImpact: -0.1
      }
    }
  },
  {
    id: 4,
    question: "Your AI system begins offering investment advice. Users find it engaging, but legal raises concerns about liability if advice leads to losses. Additionally, your marketing team launches an ad campaign using pseudonymized user data.",
    options: {
      A: {
        content: "Restrict AI to neutral insights and halt all campaigns.",
        businessGrowth: -0.1,
        fine: 0.0,
        netImpact: -0.1,
        longTermImpact: 0.05
      },
      "B": {
        content: "Proceed with AI advice and pseudonymized data campaigns",
        businessGrowth: 0.2,
        fine: -0.05,
        netImpact: -0.15,
        longTermImpact: -0.2
      }
    }
  },
  {
    id: 5,
    question: "A trusted employee uses sensitive user data for a personal project. It's a one-time issue, they insist. Meanwhile, a trusted partner handling payments offers to use anonymized user data for targeted ads, promising massive profits.",
    options: {
      A: {
        content: "Introduce strict monitoring protocols and set clear boundaries with vendors.",
        businessGrowth: 0.0,
        fine: -0.05,
        netImpact: -0.05,
        longTermImpact: -0.05
      },
      "B": {
        content: "Trust your old partner. Give warning to your employee.",
        businessGrowth: 0.1,
        fine: -0.2,
        netImpact: -0.1,
        longTermImpact: -0.25
      }
    }
  },
  {
    id: 6,
    question: "Marketing proposes launching a loyalty program using user insights without informing them.It'll be a pleasant surprise.",
    options: {
      A: {
        content: "Launch transparently---seek user consent, Potential 3 months delay.",
        businessGrowth: 0.05,
        fine: 0.0,
        netImpact: 0.05,
        longTermImpact: 0.1
      },
      "B": {
        content: "Skip consent---it's a surprise benefit.",
        businessGrowth: 0.1,
        fine: 0.0,
        netImpact: 0.1,
        longTermImpact: -0.2
      }
    }
  },
  {
    id: 7,
    question: "Your IT team proposes moving sensitive data to overseas servers to save costs. However, thenew jurisdiction has weak privacy protections.",
    options: {
      A: {
        content: "Keep data local---ensure compliance.",
        businessGrowth: -0.1,
        fine: 0.0,
        netImpact: -0.1,
        longTermImpact: 0.0
      },
      "B": {
        content: "Proceed---it's cost-effective.",
        businessGrowth: 0.02,
        fine: -0.2,
        netImpact: -0.18,
        longTermImpact: 0.0
      }
    }
  },
  {
    id: 8,
    question: "Regulators announce a surprise audit of FinPeak's systems. Your team hasn't updated keyprocesses for months. Team recommends a last-minute scramble to fix issues.",
    options: {
      A: {
        content: "Scramble to update systems.",
        businessGrowth: 0.0,
        fine: -0.05,
        netImpact: -0.05,
        longTermImpact: -0.05
      },
      "B": {
        content: "Take no action---hope the audit passes.",
        businessGrowth: 0.0,
        fine: -0.2,
        netImpact: -0.2,
        longTermImpact: 0.0
      }
    }
  },
  {
    id: 9,
    question: "Late Friday evening, your PR manager rushes in. 'A small breach---0.05% of user data. It'stiny, barely newsworthy. If we announce it, users might panic. Should we quietly patch it orgo public?'",
    options: {
      A: {
        content: "Inform users immediately---it's the right thing to do.",
        businessGrowth: -0.075,
        fine: 0.0,
        netImpact: -0.075,
        longTermImpact: 0.15
      },
      "B": {
        content: "Stay quiet---it's too minor to disclose.",
        businessGrowth: 0.1,
        fine: 0.0,
        netImpact: 0.1,
        longTermImpact: -0.2
      }
    }
  },
  {
    id: 10,
    question: "A trusted vendor handling payments suffers a breach. Regulators and users demand answers,but the vendor insists it's 'not a big deal.' Your team looks to you for a decision.",
    options: {
      A: {
        content: "Disclose the breach---it's your responsibility.",
        businessGrowth: 0.05,
        fine: 0.0,
        netImpact: 0.05,
        longTermImpact: -0.05
      },
      "B": {
        content: "Stay silent---it's their problem.",
        businessGrowth: 0.1,
        fine: 0.2,
        netImpact: 0.3,
        longTermImpact: 0.05
      }
    }
  },
  {
    id: 11,
    question: "Your marketing head proudly shows off a new newsletter design. 'The unsubscribe button isbarely visible---it'll keep our retention high!'",
    options: {
      A: {
        content: "Make the unsubscribe option clear and accessible.",
        businessGrowth: 0.0,
        fine: 0.0,
        netImpact: 0.0,
        longTermImpact: 0.03
      },
      "B": {
        content: "Keep the design---it's working.",
        businessGrowth: 0.05,
        fine: 0.0,
        netImpact: 0.05,
        longTermImpact: -0.05
      }
    }
  },
  {
    id: 12,
    question: "Your audit reveals FinPeak collects user vacation data with no business relevance. Marketinginsists it 'could be useful someday.'",
    options: {
      A: {
        content: "Stop collecting irrelevant data.",
        businessGrowth: 0.0,
        fine: 0.0,
        netImpact: 0.0,
        longTermImpact: 0.03
      },
      "B": {
        content: "Keep collecting---you never know.",
        businessGrowth: 0.03,
        fine: 0.0,
        netImpact: 0.03,
        longTermImpact: 0.1
      }
    }
  },
  {
    id: 13,
    question: "Your CFO warns, 'Regulators flagged our outdated systems. If a breach happens, we'relooking at ₹250 crore in penalties. Fixing it now delays Q3 goals.'",
    options: {
      A: {
        content: "Upgrade systems immediately---safety first.",
        businessGrowth: -0.1,
        fine: 0.0,
        netImpact: -0.1,
        longTermImpact: 0.05
      },
      "B": {
        content: "Delay upgrades---focus on targets",
        businessGrowth: 0.1,
        fine: -0.15,
        netImpact: -0.05,
        longTermImpact: -0.2
      }
    }
  },
  {
    id: 14,
    question: "Our employees love using their personal devices,&quot; HR tells you. &quot;It boosts morale. But ITdisagrees: Without security protocols, we're a breach waiting to happen.",
    options: {
      A: {
        content: "Enforce security measures immediately.",
        businessGrowth: 0.0,
        fine: -0.05,
        netImpact: -0.05,
        longTermImpact: -0.05
      },
      "B": {
        content: "Allow flexibility---it's convenient for employees.",
        businessGrowth: 0.05,
        fine: 0.0,
        netImpact: 0.05,
        longTermImpact: -0.15
      }
    }
  },
  {
    id: 15,
    question: "An anonymous email claims: FinPeak is collecting user data without proper consent. Legaladvises brushing it off, but compliance urges an internal review.",
    options: {
      A: {
        content: "Investigate the claims thoroughly---it's worth understanding.",
        businessGrowth: 0.0,
        fine: 0.0,
        netImpact: 0.0,
        longTermImpact: 0.05
      },
      "B": {
        content: "Ignore the complaint---it's not credible.",
        businessGrowth: 0.0,
        fine: 0.0,
        netImpact: 0.0,
        longTermImpact: -0.1
      }
    }
  },
  {
    id: 16,
    question: "\"Instant approval\"; reads the headline of your new loan campaign. But delays are common.\"It's a marketing hook,\"; your team defends.",
    options: {
      A: {
        content: "Adjust the campaign.",
        businessGrowth: -0.05,
        fine: 0.0,
        netImpact: -0.05,
        longTermImpact: 0.05
      },
      "B": {
        content: "Launch the campaign---it drives conversions.",
        businessGrowth: 0.12,
        fine: 0.0,
        netImpact: 0.12,
        longTermImpact: -0.2
      }
    }
  },
  {
    id: 17,
    question: "Regulators mandate a tech upgrade to improve user data protection. It'll cost a fortune,warns your CFO.",
    options: {
      A: {
        content: "Invest in the upgrade---it's mandatory.",
        businessGrowth: -0.05,
        fine: 0.0,
        netImpact: -0.05,
        longTermImpact: -0.05
      },
      "B": {
        content: "Delay the upgrade---it's costly.",
        businessGrowth: 0.1,
        fine: 0.0,
        netImpact: 0.1,
        longTermImpact: -0.15
      }
    }
  },
  {
    id: 18,
    question: "Several users report unauthorized transactions on their accounts. Your fraud detection systemis outdated, and your tech team proposes an expensive upgrade.",
    options: {
      A: {
        content: "Upgrade the system immediately---it's critical.",
        businessGrowth: -0.2,
        fine: 0.0,
        netImpact: -0.2,
        longTermImpact: 0.1
      },
      "B": {
        content: "Patch the system---it's cheaper.",
        businessGrowth: -0.02,
        fine: 0.0,
        netImpact: -0.02,
        longTermImpact: -0.2
      }
    }
  },
  {
    id: 19,
    question: "A viral tweet accuses FinPeak of unauthorized charges. The investigation reveals user error,but public perception is turning against you. \"We should apologize,\"your PR team urges.\"But why apologize for their mistake?\" counters legal.",
    options: {
      A: {
        content: "Apologize and offer support---it's good PR",
        businessGrowth: 0.0,
        fine: 0.0,
        netImpact: 0.0,
        longTermImpact: 0.05
      },
      "B": {
        content: "Ignore the tweet---it's their mistake.",
        businessGrowth: 0.0,
        fine: 0.0,
        netImpact: 0.0,
        longTermImpact: -0.02
      }
    }
  },
  {
    id: 20,
    question: "A well-known but controversial influencer offers to partner with FinPeak. \"They have amassive following,' your marketing team argues.",
    options: {
      A: {
        content: "Reject the partnership---it's too risky.",
        businessGrowth: 0.0,
        fine: 0.0,
        netImpact: 0.0,
        longTermImpact: 0.05
      },
      "B": {
        content: "Accept the partnership---it's great exposure.",
        businessGrowth: 0.03,
        fine: 0.0,
        netImpact: 0.03,
        longTermImpact: -0.25
      }
    }
  },
  {
    id: 21,
    question: "Your HR team reports a breach: an employee's laptop was stolen, containing unencrypteduser data. \"This could destroy trust\" warns compliance. \"We need to act fast.\"",
    options: {
      A: {
        content: "Launch a full investigation and upgrade security immediately.",
        businessGrowth: 0.0,
        fine: -0.02,
        netImpact: -0.02,
        longTermImpact: 0.05
      },
      "B": {
        content: "Handle it quietly---it's unlikely to surface.",
        businessGrowth: 0.05,
        fine: 0.0,
        netImpact: 0.05,
        longTermImpact: -0.03
      }
    }
  },
  {
    id: 22,
    question: "A high-profile client's loan application is flagged for irregularities. \"Approving it couldsecure their loyalty\" says your sales lead. \"But rejection may protect us from future fallout\"warns compliance.",
    options: {
      A: {
        content: "Reject the application---it's too risky.",
        businessGrowth: -0.15,
        fine: 0.0,
        netImpact: -0.15,
        longTermImpact: 0.05
      },
      "B": {
        content: "Approve the loan---it's worth the risk.",
        businessGrowth: 0.15,
        fine: -0.12,
        netImpact: 0.03,
        longTermImpact: 0.0
      }
    }
  },
  {
    id: 23,
    question: "Your UX team designs a checkout flow with subtle \"dark patterns\" to increase upsells",
    options: {
      A: {
        content: "Reject dark pattern.",
        businessGrowth: 0.0,
        fine: 0.0,
        netImpact: 0.0,
        longTermImpact: 0.05
      },
      "B": {
        content: "Approve the design---it boosts revenue.",
        businessGrowth: 0.07,
        fine: -0.02,
        netImpact: 0.05,
        longTermImpact: -0.05
      }
    }
  },
  {
    id: 24,
    question: "Your campus ambassadors are tasked with conducting surveys. They using G-Forms tocollect responses with an implied understanding that it carries explicit consent.",
    options: {
      A: {
        content: "Add a consent in 20+ languages at the beginning of the survey, clearly outlining how the data will be used and shared.",
        businessGrowth: -0.01,
        fine: 0.0,
        netImpact: -0.01,
        longTermImpact: 0.05
      },
      "B": {
        content: "Allow ambassadors to continue conducting surveys as its done anonymously.",
        businessGrowth: 0.0,
        fine: 0.0,
        netImpact: 0.0,
        longTermImpact: -0.03
      }
    }
  },
  {
    id: 25,
    question: "\"Users want their data transferred to a competitor,\" your tech team groans. \"It's costly andcomplex.\"",
    options: {
      A: {
        content: "Support portability---it's their right.",
        businessGrowth: 0.0,
        fine: 0.0,
        netImpact: 0.0,
        longTermImpact: 0.02
      },
      "B": {
        content: "Refuse---it's too complex.",
        businessGrowth: 0.0,
        fine: -0.15,
        netImpact: -0.15,
        longTermImpact: 0.0
      }
    }
  }
]