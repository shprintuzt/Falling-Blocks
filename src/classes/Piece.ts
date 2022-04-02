export class Piece {
    _type: string;

    constructor(type: string) {
        this._type = type;
    }

    get type() {
        return this._type;
    }

}