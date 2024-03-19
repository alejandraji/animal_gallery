"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.datastore = void 0;
const fs_1 = __importDefault(require("fs"));
/** We are using the datastore.json file to act as a local DB */
class Datastore {
    constructor(filename) {
        // Filename where datas are going to store
        if (!filename) {
            throw new Error('Filename is required to create a datastore!');
        }
        this.filename = filename;
        try {
            fs_1.default.accessSync(this.filename);
        }
        catch (err) {
            // If file not exist
            // it is created with empty array
            fs_1.default.writeFileSync(this.filename, '[]');
        }
    }
    validateAttributes(attributes) {
        if (!attributes.name) {
            return "Missing name";
        }
        if (!attributes.description) {
            return "Missing description";
        }
        if (attributes.name.length === 0) {
            return "Empty name";
        }
        if (attributes.description.length === 0) {
            return "Empty description";
        }
        return null;
    }
    /** Add an animal to the datastore file */
    createNewAnimal(attributes) {
        return __awaiter(this, void 0, void 0, function* () {
            const errorMessage = this.validateAttributes(attributes);
            if (errorMessage) {
                throw new Error(errorMessage);
            }
            // Read filecontents of the datastore
            const jsonRecords = yield fs_1.default.promises.readFile(this.filename, {
                encoding: 'utf8'
            });
            // Parsing JSON records in JavaScript
            // object type records
            const objRecord = JSON.parse(jsonRecords);
            // Adding new record
            objRecord.push(attributes);
            // Writing all records back to the file
            yield fs_1.default.promises.writeFile(this.filename, JSON.stringify(objRecord, null, 2));
            return attributes;
        });
    }
    /** Fetches aninamls from datastore file */
    getAllAnimals() {
        return __awaiter(this, void 0, void 0, function* () {
            const jsonRecords = yield fs_1.default.promises.readFile(this.filename, {
                encoding: 'utf8'
            });
            return JSON.parse(jsonRecords);
        });
    }
}
// The datastore that is serving as a local DB
exports.datastore = new Datastore('datastore.json');
//# sourceMappingURL=datastore.js.map