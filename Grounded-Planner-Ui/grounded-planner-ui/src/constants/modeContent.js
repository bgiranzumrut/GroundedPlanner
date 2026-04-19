export const MODE_CONTENT = {
  Spring: {
    appSubtitle: "A gentle space to begin, reset, and move forward.",
    weeklyEyebrow: "Weekly Planning",
    weeklyPrompt: "What do you want to begin gently this week?",
    todayEyebrow: "Today View",
    todayPrompt: "What feels like the kindest next step today?",
    emptyStateTitle: "You’re clear for today",
    emptyStateText:
      "There’s nothing urgent here right now. Take a breath or choose one gentle next step.",
  },
  Summer: {
    appSubtitle: "A calm space to stay steady and keep momentum.",
    weeklyEyebrow: "Weekly Planning",
    weeklyPrompt: "What needs steady attention this week?",
    todayEyebrow: "Today View",
    todayPrompt: "What deserves your energy and follow-through today?",
    emptyStateTitle: "You’re clear for today",
    emptyStateText:
      "Your active list is quiet right now. Protect your momentum or begin the next meaningful task.",
  },
  Autumn: {
    appSubtitle: "A calm space to simplify, review, and refocus.",
    weeklyEyebrow: "Weekly Planning",
    weeklyPrompt: "What can you clear, reshape, or prepare this week?",
    todayEyebrow: "Today View",
    todayPrompt: "What is worth simplifying or finishing today?",
    emptyStateTitle: "You’re clear for today",
    emptyStateText:
      "Nothing is pressing at the moment. This could be a good time to review, tidy, or reset.",
  },
  Winter: {
    appSubtitle: "A quiet space for depth, patience, and thoughtful progress.",
    weeklyEyebrow: "Weekly Planning",
    weeklyPrompt: "What deserves patience, depth, or quiet focus this week?",
    todayEyebrow: "Today View",
    todayPrompt: "What is worth approaching slowly and with care today?",
    emptyStateTitle: "You’re clear for today",
    emptyStateText:
      "The day is open right now. You can rest, reflect, or choose one quiet thing to move forward.",
  },
};

export function getModeContent(mode) {
  return MODE_CONTENT[mode] ?? MODE_CONTENT.Spring;
}