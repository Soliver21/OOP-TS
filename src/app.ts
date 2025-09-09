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
    set updateValues(arr: number[]): void{
        if(arr.length === 0) throw new Error("Bencus nem lehet üres lista");
        if(arr.every(n => Number.isFinite(n)) )
    }
}