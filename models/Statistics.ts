export class Statistics {
  constructor(
    public readonly submissions: number,
    public readonly lowScore: string,
    public readonly highScore: string,
    public readonly averageScore: string,
    public readonly standardDeviation: string,
  ) {}
}
