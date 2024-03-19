var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const fs = require('fs');
class Repository {
    constructor(filename) {
        // Filename where datas are going to store
        if (!filename) {
            throw new Error('Filename is required to create a datastore!');
        }
        this.filename = filename;
        try {
            fs.accessSync(this.filename);
        }
        catch (err) {
            // If file not exist
            // it is created with empty array
            fs.writeFileSync(this.filename, '[]');
        }
    }
    // Logic to add data
    createNewAnimal(attributes) {
        return __awaiter(this, void 0, void 0, function* () {
            // Read filecontents of the datastore
            const jsonRecords = yield fs.promises.readFile(this.filename, {
                encoding: 'utf8'
            });
            // Parsing JSON records in JavaScript
            // object type records
            const objRecord = JSON.parse(jsonRecords);
            // Adding new record
            objRecord.push(attributes);
            // Writing all records back to the file
            yield fs.promises.writeFile(this.filename, JSON.stringify(objRecord, null, 2));
            return attributes;
        });
    }
    getAllAnimals() {
        return __awaiter(this, void 0, void 0, function* () {
            const jsonRecords = yield fs.promises.readFile(this.filename, {
                encoding: 'utf8'
            });
            return JSON.parse(jsonRecords);
        });
    }
}
// The 'datastore.json' file created at
// runtime and all the information
// provided via signup form store in
// this file in JSON format.
module.exports = new Repository('datastore.json');
//# sourceMappingURL=repository.js.map