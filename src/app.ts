type BaseOp = "sum" | "multiplier" | "mode" | "print";
class SeriesOfNumbers{
    //Attribútumok (tulajdonságok [az osztály változói]) - rejtettek (private)
    private _count : number; //számosság
    private _value :number; //a generált számok felső határa
    private _list : number[]; //a számok listája
    constructor(count :number, value :number, rng : (max :number) => number ,list : number[]){
        if (count <= 0) {
            throw new Error("A számosság pozitív egész legyen");
        }
        if (value <= 0) {
            throw new Error("A felső határ pozitív egész legyen");
        }
        this._count = count;
        this._value = value;
        this._list = Array.from({length: count}, () => rng(value));
    }

    //Propertyk (get/set):
    get values(): readonly number[]{
        return this._list;
    }
    set updateValues(arr: number[]){
        if(arr.length === 0) throw new Error("Bencus nem lehet üres lista");
        if(arr.every(n => Number.isFinite(n) && n > 0 )) throw new Error("Minden elem pozitív egész legyen");
        this._list = [...arr]; // A lista elemeinek másolata kerül a _list-be! Ez egy új array lesz.
        this._value = Math.max(...arr)
    }

    get count(): number {
        return this._count;
    }
    get value(): number{
        return this._value;
    }
    mode(): number {
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
    sum(){return this._list.reduce((acc,num) => acc + num, 0)}
    multiplier(){return this._list.reduce((acc,num) => acc * num,1)}
    // Róter (switch-case): - sum, multiplier, mode, print
    run(op: BaseOp){
        switch(op){
            case "sum":
                console.log(`Összeg: ${this.sum()}`);
                break
            case "multiplier":
                console.log(`Szorzat: ${this.multiplier()}`)
                break
            case "mode":
                console.log(`Leggyakoribb érték: ${this.mode()}`)
                break;
            case "print":
                console.log("Kiírás: "+ this.values.join(", "))
                break;
            default:
                console.log("Helytelen művelet")
                break;
        }
    }
    static help() :void{
        console.log("Elérhető műveletek: sum, multiplier, mode, print")
    }
    static rnd(max: number):number{
        return Math.floor(Math.random()*max)+1;
    }
}