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
const multipart_1 = __importDefault(require("@fastify/multipart"));
const fastify_1 = __importDefault(require("fastify"));
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const stream_1 = require("stream");
const util_1 = require("util");
const pump = (0, util_1.promisify)(stream_1.pipeline);
const app = (0, fastify_1.default)();
app.register(multipart_1.default);
app.post("/upload", (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield req.file();
        if (!data)
            return reply.status(400).send({ error: "No file uploaded" });
        const { file } = data;
        const filename = `uploads/${Date.now()}`;
        const filePath = path_1.default.join(import.meta.dirname, filename);
        yield pump(file, (0, fs_1.createWriteStream)(filePath));
        // await fromPath(filePath);
        return reply.send({});
    }
    catch (error) {
        console.log(error);
    }
}));
try {
    await app.listen({ port: 3000 });
    console.log("Server is running on port 3000");
}
catch (err) {
    process.exit(1);
}
