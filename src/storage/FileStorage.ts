// 📁 src/storage/FileStorage.ts — утилита для работы с файлами
import path from "path";
import { promises as fs } from "fs";

export class FileStorage<T> {

    constructor(private filePath: string) {}

    async save(data: T[]): Promise<void> {
        const dir = path.dirname(this.filePath);
        // ✅ Создаём папку, если не существует
        await fs.mkdir(dir, { recursive: true });
        const json = JSON.stringify(data, null, 2);
        await fs.writeFile(this.filePath, json);
    }

    async load(): Promise<T[]> {
        try {
            const json = await fs.readFile(this.filePath, "utf-8");
            return JSON.parse(json) as T[];
        } catch (err) {
            return [];
        }
    }
}
