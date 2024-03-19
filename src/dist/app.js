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
// server/index.js
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const datastore_1 = require("./datastore");
const PORT = process.env.PORT || 3001;
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
/** Endpoint to fetch all animals from the datastore */
app.get('/animals', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const animalList = yield datastore_1.datastore.getAllAnimals();
    res.json({ animals: animalList });
}));
/** Endpoint to add a new animal to the datastore */
app.post('/animals', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const receivedData = req.body;
    try {
        yield datastore_1.datastore.createNewAnimal(receivedData);
        res.send({ message: 'Animal added successfully' });
    }
    catch (e) {
        console.error(e);
        res.status(400).send({ message: e.message });
    }
}));
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
//# sourceMappingURL=app.js.map