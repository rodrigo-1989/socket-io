const Band = require("./band");

class BandList {
    constructor() {
        this.bands = [
            new Band('Metalica'),
            new Band('Heroes del silencio'),
            new Band('Heavy nopal'),
            new Band('Bon Jovi'),
            new Band('Aerosmith'),
        ];
    }

    addBand(name) {
        this.bands.push(new Band(name));
        return this.bands;
    }
    removeBand(id) {
        this.bands = this.bands.filter(band => band.id !== id);
    }
    getBands() {
        return this.bands;
    }
    increaseVote(id) {
        this.bands = this.bands.map(band => {
            if (id === band.id) {
                band.votes += 1;
            }
            return band;
        })
    }
    changeName(id, newName) {
        this.bands = this.bands.map(band => {
            if (id === band.id) {
                band.name = newName
            }
            return band;
        })
    }

}

module.exports = BandList;