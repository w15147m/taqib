export interface ExplanationSeed {
  content_id: string;
  sequence_number: number;
  explanation_text: string;
  position: 'before' | 'after';
  sequence_number_exp: number;
}

export const ziyaratExplanations: ExplanationSeed[] = [];
