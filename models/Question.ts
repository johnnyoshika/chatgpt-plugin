import { Score } from './Score';

export class Question {
  static parse = (data: any): Question =>
    new Question(data.id, data.title, Score.parse(data.scoreFinal));

  constructor(
    public readonly id: string,
    public readonly title: string | null,
    public readonly score: Score,
  ) {}

  payload = (): object => ({
    id: this.id,
    title: this.title,
    score: this.score.payload(),
  });
}
