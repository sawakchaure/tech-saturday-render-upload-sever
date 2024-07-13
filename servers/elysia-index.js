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
const elysia_1 = __importDefault(require("elysia"));
const path_1 = __importDefault(require("path"));
const image_utils_1 = require("./src/utils/image-utils");
const app = new elysia_1.default();
app.post("/upload", (_a) => __awaiter(void 0, [_a], void 0, function* ({ request, set }) {
    const formData = yield request.formData();
    const upload = formData.get("upload");
    console.log(upload);
    if (!upload) {
        set.status = 400;
        return { error: "No file uploaded" };
    }
    const filename = `uploads/${Date.now()}`;
    const size = yield Bun.write(filename, upload);
    const filePath = path_1.default.join(__dirname, filename);
    yield (0, image_utils_1.fromPath)(filePath);
    set.status = 201;
    return { filename, size };
}));
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
