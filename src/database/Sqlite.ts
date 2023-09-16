import sqlite3, { Database, RunResult, ERROR, Statement } from "sqlite3";
import { BASIC_DB } from "../common/DatabaseCons";
import { CREATE_ACOUNT_TABLE, CREATE_RECORD_ITEM_TABLE, DELETE_ACOUNT, INSERT_ACOUNT, INSERT_INIT_ITEM, QUERY_TABLES, QUERY_TEST, SELECT_ACOUNT_WITH_DATE, SELECT_ALL_ITEMS, UPDATE_ACOUNT } from "./Query";
import { acountTable, recordItemsTable } from "../common/publicConfig/Public";
import { table } from "console";
import { resolve } from "path";
import { AcountInfo } from "../common/VO/Vobject";
import { combineDateSearchString } from "../common/Util";

export interface Table {
    name: string,
    id: number
}

class BasicDB {

    database: Database;
    tables: Table[] = [];

    init() {
        new Promise<void>(resolve => {
            this.database.all(QUERY_TABLES, (err, res: Table[]) => {
                if (err !== null) {
                    console.log('query tables failed! ', err);
                }
                this.tables = res;
                resolve();
            })
        }).then(() => {
            // 检查是否有item表,没有则创建
            if (this.tables.find(table => table.name === recordItemsTable) === undefined) {
                // 没有则创建
                this.runSqliteCommand(CREATE_RECORD_ITEM_TABLE);
                // 初始化
                this.runSqliteCommand(INSERT_INIT_ITEM);
            }
            // 检查是否有账单表,没有则创建
            if (this.tables.find(table => table.name === acountTable) === undefined) {
                // 没有则创建
                this.runSqliteCommand(CREATE_ACOUNT_TABLE);
            }
        })


    }

    queryRecordItems(id: number) {
        return new Promise<Table[]>((resolve) => {
            this.database.all(SELECT_ALL_ITEMS, id, (err, rows: Table[]) => {
                resolve(rows);
            })
        });
    }

    queryAcountItems(year: string, month: string) {
        const date = combineDateSearchString(year, month);
        return new Promise<Table[]>((resolve) => {
            this.database.all(SELECT_ACOUNT_WITH_DATE, date, (err, rows: Table[]) => {
                resolve(rows);
            })
        });
    }

    insertAcountInfo(value: AcountInfo) {
        return new Promise<RunResult>(resolve => {
            this.database.run(INSERT_ACOUNT, { $type: value.type, $date: value.date, $money: value.money, $note: value.note }, (res: RunResult, err: Error) => {
                resolve(res);
            })
        })
    }

    runSqliteCommand(command: string) {
        this.database.run(command, (res: RunResult, err: Error) => {
            if (err === null) {
                console.log('runSqliteCommand failed ', err);
            }
        })
    }

    deleteAcountById(id: number) {
        this.database.run(DELETE_ACOUNT, id)
    }

    updateAcountById(id: number, money: number, note: string) {
        this.database.run(UPDATE_ACOUNT, {$money: money, $note: note, $id: id})
    }

    constructor() {
        this.database = new sqlite3.Database(BASIC_DB, (err) => {
            if (err !== null) {
                console.log('get or create db failed! err:', err)
            }
        });
    }

}

const basicDB = new BasicDB();
export default basicDB;