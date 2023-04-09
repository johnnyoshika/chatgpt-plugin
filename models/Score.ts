import { roundTo } from '@/util/number';

export class Score {
  static parse = (data: any) =>
    new Score(data.precisePointsGiven, data.precisePointsPossible);

  constructor(
    public readonly precisePointsGiven: number,
    public readonly precisePointsPossible: number,
  ) {}

  get pointsGiven() {
    return roundTo(this.precisePointsGiven, 2);
  }

  get pointsPossible() {
    return roundTo(this.precisePointsPossible, 2);
  }

  get percentage() {
    return this.pointsPossible > 0
      ? (this.pointsGiven / this.pointsPossible) * 100
      : 0;
  }

  payload = (): object => ({
    pointsGiven: this.pointsGiven,
    pointsPossible: this.pointsPossible,
    percentage: this.percentage,
  });
}
