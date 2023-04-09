import dayjs from 'dayjs';

export class Assessment {
  static parse = (data: any): Assessment =>
    new Assessment(
      data.id,
      data.title ?? null,
      data.course ?? null,
      Object.keys(data.availabilities ?? {})
        .map(id =>
          AssessmentAvailability.parse({
            id,
            ...data.availabilities[id],
          }),
        )
        .sort((a, b) => a.order - b.order),
    );

  constructor(
    public readonly id: string,
    public readonly title: string | null,
    public readonly course: string | null,
    public readonly availabilities: AssessmentAvailability[],
  ) {}

  get availableFrom() {
    return this.availabilities.reduce(
      (from, availability) =>
        !from || dayjs(availability.from).isBefore(dayjs(from))
          ? availability.from
          : from,
      null as null | Date,
    );
  }

  get availableUntil() {
    return this.availabilities.reduce(
      (until, availability) =>
        !until || dayjs(availability.until).isAfter(dayjs(until))
          ? availability.until
          : until,
      null as null | Date,
    );
  }

  payload = (): object => ({
    id: this.id,
    title: this.title,
    course: this.course,
  });
}

export class AssessmentAvailability {
  static parse = (data: any): AssessmentAvailability =>
    new AssessmentAvailability(
      data.id,
      data.from.toDate(),
      data.until.toDate(),
      data.forEveryone ?? false,
      data.forSectionNames ?? [],
      data.forStudentIds ?? [],
      data.order ?? 0,
    );

  constructor(
    public readonly id: string,
    public readonly from: Date,
    public readonly until: Date,
    public readonly forEveryone: boolean,
    public readonly forSectionNames: string[],
    public readonly forStudentIds: string[],
    public readonly order: number,
  ) {}
}
