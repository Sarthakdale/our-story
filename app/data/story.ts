export interface Choice {
  text: string;
  nextId: string;
}

export interface StoryNode {
  id: string;
  text: string;
  choices: Choice[];
  image?: string; 
  isEnd?: boolean; 
}

export const story: Record<string, StoryNode> = {
  start: {
    id: "start",
    text: "  Ok so hello my kaise hoo aap...aaj sab log kehte hai ki pyaar celebrate karne ka din hai i feel har din pyaar celebrarate karna chiaye ... toh chalo iss mauke pe ek flirty line ho jaaye I dont need a Valentines Day to love you… but Ill happily use it as an excuse",
    choices: [
      { text: "Begin the Memory", nextId: "chapter_one" },
    ],
  },
  chapter_one: {
    id: "chapter_one",
    text: "Do you remember the first time we went for the trek, i was very terrified of what your answer might be and that was first time i had proposed anyone...although i knew equally that you might say no ... but i stil wanted to try cause there was noway i could live without saying... I love you ",
    choices: [
      { text: "I remember...", nextId: "german_lesson" },
      { text: "I was gonna propose before you!", nextId: "funny_correction" },
    ],
  },
  funny_correction: {
    id: "funny_correction",
    text: " Ha! Fair point. But i proposed you first cutie... and as Monica says to Chandler : theres a reason why women dont propose (while monica was proposing to chandler and she was crying a lot )",
    choices: [
      { text: "Go on...", nextId: "german_lesson" },
    ],
  },
  german_lesson: {
    id: "german_lesson",
    text: " Lately, I've been learning German as you might know. There's a phrase I found: 'Ich bin nicht ohne disch'. It means 'I am nothing without you' and i am literally nothin without you baby... you remember last year I promissed you that no matter what happens i am going to make your next valentines 'the best' one.",
    choices: [
      { text: "yes i kinda remember", nextId: "poetry_moment" },
      { text: "i remember but can you elaborate a bit  :) ", nextId: "funny_correction2" },
    ],
  },
  funny_correction2: {
    id: "funny_correction2",
    text: "  Koi baat nahi baby ager aapko yaad nahi hai toh... iss story ke baad aapke side mein jo baitha hai vo batayega aapko ",
    choices: [
      { text: "Go on...", nextId: "poetry_moment" },
    ],
  },
  poetry_moment: {
    id: "poetry_moment",
    text: " So after you complete this message there is something i wanna share with my wife... I hope you will like it... because she deserves all the happiness in the world ", 
    choices: [
      { text: "pakka pasand aayega na aapko?? ", nextId: "joke_response" },
      { text: " ok  wait what is happening .", nextId: "final_question" },
    ],
  },
  joke_response: {
    id: "joke_response",
    text: "  Aise kaise pasand nahi aayega aapko... aana hi padega.",
    choices: [
      { text: "Okay, ", nextId: "final_question" },
    ],
  },
  final_question: {
    id: "final_question",
    text: "  We have come a long way. From Pune and Bhandara to wherever the map takes us next. But for today, I have one question.",
    choices: [
      { text: "Ask me.", nextId: "proposal" },
    ],
  },
  proposal: {
    id: "proposal",
    text: "  Will you be my Valentine not just for today not just for tomorrow but ... for life?",
    choices: [
      { text: "Yes, obviously! ❤️", nextId: "success" },
      { text: "Let me think about it...", nextId: "hard_to_get" },
    ],
  },
  hard_to_get: {
    id: "hard_to_get",
    text: "  Error 405: Method Not Allowed. My heart does not support this request. Try again.",
    choices: [
      { text: "Fine. YES! ❤️", nextId: "success" },
    ],
  },
  success: {
    id: "success",
    text: " Deployment Successful! 🚀 I love you. Happy Valentine's Day.",
    isEnd: true,
    choices: [],
  },
};