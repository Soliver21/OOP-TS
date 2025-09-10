import { SeriesOfNumbers, type BaseOp } from "./app.js";

export class SeriesOfNumbers2 extends SeriesOfNumbers{
     constructor(
        super();
        count :number,
        value :number,
          rng : (max :number) => number = SeriesOfNumbers.rnd
        )
    div() {
        return this.count;
    }
    override mode(): number {
        const statistic: Record<number,number> = {};
        for (let n of this._list) {
            statistic[n] = (statistic[n] ?? 0)+1;            
        }
        let best = this._list[0];
        for(const k of Object.keys(statistic)){
            const key = Number(k);
            if (statistic[key]! > statistic[best!]!) {
                best = key;
            }
        }
        return best!;
    }
}
const s = new SeriesOfNumbers2(10,4);