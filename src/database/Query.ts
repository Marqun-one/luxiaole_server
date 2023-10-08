import { acountTable, recordItemsTable, stillOnTable } from "../common/publicConfig/Public";
export const QUERY_TABLES = `SELECT name FROM sqlite_master `;
export const QUERY_TEST = `SELECT * FROM basic `;

// 建表
export const CREATE_RECORD_ITEM_TABLE = `CREATE TABLE ${recordItemsTable}(
   id INTEGER PRIMARY KEY,
   name TEXT UNIQUE,
   type INTEGER
)`

export const CREATE_ACOUNT_TABLE = `CREATE TABLE ${acountTable}(
   id INTEGER PRIMARY KEY,
   type INTEGER,
   date TEXT,
   money REAL,
   note TEXT
)`

 export const CREATE_TABLE1 = `CREATE TABLE basic1(
    id INTEGER  PRIMARY KEY,
    name TEXT,
    class TEXT
 )`

 export const CREATE_TABLE2 = `CREATE TABLE test(
   id INTEGER  PRIMARY KEY,
   name TEXT,
   class TEXT
)`

// 插入初始化数据
export const INSERT_INIT_ITEM = ` insert into ${recordItemsTable} (name, type) values 
('收入', -1),
('支出', -1);`

// 查询
export const SELECT_ALL_ITEMS = `select name, id from ${recordItemsTable} where type = $id`

// 查询
export const SELECT_ACOUNT_WITH_DATE = 
                 `select 
                     acount.id as id, 
                     acount.date as date, 
                     recordItem.name as type, 
                     acount.money as money, 
                     acount.note as note,
                     recordItem.type as fType 
                     from ${acountTable} left join ${recordItemsTable} 
                     on acount.type = recordItem.id  where date like $date`

// 查询
export const SELECT_STILLONRECORD_WITH_DATE = 
                 `select 
                     id, 
                     year, 
                     month, 
                     day,
                     info,
                     status
                     from ${stillOnTable}`

// 插入账单
export const INSERT_ACOUNT = `insert into acount (type, date, money, note) values ($type, $date, $money, $note)`

// 删除账单
export const DELETE_ACOUNT = `delete from ${acountTable} where id = $id`

// 更新账单
export const UPDATE_ACOUNT = `update ${acountTable} set money = $money, note = $note where id = $id`

// 插入坚持数据
export const INSERT_STILLON = `insert into ${stillOnTable} (year, month, day, info, status) values ($year, $month, $day, $info, $status)`

// 删除坚持数据
export const DELETE_STILLON = `delete from ${stillOnTable} 
                                     where year = $year and
                                           month = $month and
                                           day = $day and
                                           info = $info and
                                           status = $status`