export interface Question {
  id: number;
  text: string;
  description: string;
  emoji: string;
}

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "Productivity",
    description: "How productive were you this week?",
    emoji: "💪"
  },
  {
    id: 2,
    text: "Satisfaction",
    description: "How satisfied are you with your week?",
    emoji: "😊"
  },
  {
    id: 3,
    text: "Physical",
    description: "How would you rate your physical health?",
    emoji: "🏃‍♂️"
  },
  {
    id: 4,
    text: "Who Cares?",
    description: "How stressed were you?",
    emoji: "😓"
  },
];

export const SCORE_BANDS = {
  EXCELLENT: {
    threshold: 15,
    confettiCount: 300,
    getRandomMessage: () => {
      const messages = [
        { message: "You're absolutely crushing it! Keep this amazing energy going.", emoji: "🎉" },
        { message: "Phenomenal work today! You're truly unstoppable.", emoji: "🚀" },
        { message: "Outstanding achievement! You're reaching new heights.", emoji: "⭐" },
        { message: "Incredible effort! You're making magic happen.", emoji: "✨" },
        { message: "Brilliant performance! You're shining so bright.", emoji: "🌟" }
      ];
      return messages[Math.floor(Math.random() * messages.length)];
    },
  },
  GREAT: {
    threshold: 12,
    confettiCount: 200,
    getRandomMessage: () => {
      const messages = [
        { message: "Well done! You're building such great momentum.", emoji: "💫" },
        { message: "Keep going strong! Your dedication is really showing.", emoji: "💪" },
        { message: "Fantastic work! You're on such a positive path.", emoji: "🌱" },
        { message: "Great progress! You're really making it count.", emoji: "🎯" },
        { message: "Impressive effort! You're moving mountains.", emoji: "⚡" }
      ];
      return messages[Math.floor(Math.random() * messages.length)];
    },
  },
  GOOD: {
    threshold: 9,
    confettiCount: 150,
    getRandomMessage: () => {
      const messages = [
        { message: "Steady progress! Every step forward makes a difference.", emoji: "👍" },
        { message: "You're doing fine! These small wins really add up.", emoji: "🌿" },
        { message: "Keep at it! You're making consistent progress.", emoji: "⭐" },
        { message: "Nice work! You're moving in the right direction.", emoji: "💫" },
        { message: "Good effort! You're building something special.", emoji: "🌱" }
      ];
      return messages[Math.floor(Math.random() * messages.length)];
    },
  },
  SUPPORT: {
    threshold: -999,
    confettiCount: 50,
    getRandomMessage: () => {
      const messages = [
        { message: "We're here for you. Tomorrow brings new opportunities.", emoji: "💙" },
        { message: "It's okay to have tough days. You're stronger than you know.", emoji: "🫂" },
        { message: "Take it easy on yourself. Small steps lead to big changes.", emoji: "💜" },
        { message: "You're not alone in this. Better days are ahead.", emoji: "🤝" },
        { message: "Remember to breathe. You've got this, one day at a time.", emoji: "💫" }
      ];
      return messages[Math.floor(Math.random() * messages.length)];
    },
  },
};

export const REWARDS = {
  BASE: 10000,
  BONUS: {
    EXCELLENT: 2000,
    GREAT: 1000,
    BASIC: 500
  }
}; 