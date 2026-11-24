export type BankId = 'bb' | 'caixa';
export type Step = { title: string; text: string; simple: string; focus: string; items: string[] };
export type Lesson = { id: string; bank: BankId; title: string; description: string; icon: string; minutes: number; steps: Step[]; question: string; options: string[]; answer: number; feedback: string };
export type Preferences = { font: number; narration: boolean; contrast: boolean; reduceMotion: boolean };
export type RecordResult = { session: string; lesson: string; attempts: number; errors: number; help: number; seconds: number; completed: boolean };
export type Progress = { step: number; started: boolean; completed: boolean; activity: boolean };
export type LocalState = { preferences: Preferences; progress: Record<string, Progress>; favorites: string[]; results: RecordResult[] };
