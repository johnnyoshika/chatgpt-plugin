import { Score } from './Score';

export class Attempt {
  static parse = (data: any): Attempt =>
    new Attempt(
      data.id,
      data.displayName,
      Score.parse(data.scoreFinal),
    );

  constructor(
    public readonly id: string,
    public readonly student: string,
    public readonly score: Score,
  ) {}

  payload = (): object => ({
    id: this.id,
    student: this.student,
    score: this.score.payload(),
  });
}
