export class Ticket {
    constructor(
      public id: string,
      public title: string,
      public description: string,
      public status: 'PENDING' | 'APPROVED' | 'REJECTED'
    ) {}
  }