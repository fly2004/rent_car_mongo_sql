// 📁 server.ts — инициализация и запуск сервера аренды автомобилей

import express from "express";
import { json } from "express";
import { PORT } from "./config/userConfig";
import { apiRouter } from "./routes/apiRoutes";
import { loadAllData, saveAllData } from "./config/appConfig";
import { errorHandler } from "./middlewares/errorHandler";

export const launchServer = async () => {
    await loadAllData(); // ⬅️ Загружаем все данные перед запуском

    const app = express();
    app.use(json());

    app.use("/api", apiRouter);

    app.use((req, res) => {
        res.status(404).send("Not Found");
    });
    app.use(errorHandler); // <-- обязательно после всех роутов
    const server = app.listen(PORT, () => {
        console.log(`🚗 Car Rental Server started on http://localhost:${PORT}`);
    });

    process.on("SIGINT", async () => {
        console.log("💾 Saving data and shutting down server...");
        await saveAllData(); // ⬅️ Сохраняем все данные при остановке
        server.close(() => process.exit());
    });
};
