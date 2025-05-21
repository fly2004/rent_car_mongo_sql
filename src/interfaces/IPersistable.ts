// 📁 interfaces/IPersistence.ts
export interface IPersistable {
    load(): Promise<void>;
    save(): Promise<void>;
}
