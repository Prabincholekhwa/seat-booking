class Seating {
    static instance: Seating;
    private constructor() {}
  
    static getInstance(): Seating {
      if (!Seating.instance) {
        Seating.instance = new Seating();
      }
      return Seating.instance;
    }
  
    //Generating total  seats
    generateSeats(row: number, column: number): number {
      return row * column + 1;
    }
  
    //Generating Cn array
    generateCn(column: number): string[] {
      const Cn: number = column + 1;
      let CnArray: string[] = [];
      for (let i = 1; i <= Cn; i++) {
        CnArray.push(`C${i}`);
      }
      return CnArray;
    }
  
    generateAnBnCn(column: number, row: number): { A: string[]; B: string[]; C: string[] } {
      let An: string[] = [];
      let Bn: string[] = [];
      if (row <= 3) {

        //Logic for micro
        //AarrayLength
        const row_A: number = row - 1;
        for (let i = 1; i <= row_A; i++) {
          An.push(`A${i}`);
        }


        const row_B: number = this.generateSeats(row, column) - (column + 1) - row_A;
        for (let i = 1; i <= row_B; i++) {
          Bn.push(`B${i}`);
        }
        return {
          A: An,
          B: Bn,
          C: this.generateCn(column),
        };
      } else {
        // Logic for bus
        const row_A: number = (row - 1)*2;
        for (let i = 1; i <= row_A; i++) {
          An.push(`A${i}`);
        }
        const row_B: number = (row - 1)*2;
        for (let i = 1; i <= row_B; i++) {
          Bn.push(`B${i}`);
        }
        return {
          A: An,
          B: Bn,
          C: this.generateCn(column)
        };
      }
    }
  }
  
  const seating = Seating.getInstance();
  export { seating as Seating };
  