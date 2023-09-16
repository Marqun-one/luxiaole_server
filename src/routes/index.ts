import express from 'express'
import { AcountItemDelete, AcountItemUpdate, AcountItems, insertItem, recordItems } from '../common/publicConfig/Api';
import basicDB, { Table } from '../database/Sqlite';
import url from 'url';
import { AcountInfo, AcountTableDetail, SelectItems } from '../common/VO/Vobject'
import { processString } from '../common/Util';
const router = express.Router();

/* GET home page. */
router.get('/', function (req: any, res: any, next: any) {
  console.log("get a connect /")
  res.render('index', { title: 'Express' });

});


/* GET home page. */
router.post('/api/login', function (req: any, res: any, next: any) {
  console.log('get a connect')
  // res.headers['Access-Control-Allow-Origin'] = req.environ['HTTP_ORIGIN']
  // res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  // 设置服务器支持的所有头信息字段
  res.send('respond with a resource');
});

router.get('/api/login', function (req: any, res: any, next: any) {
  console.log('get a connect')
  // res.headers['Access-Control-Allow-Origin'] = req.environ['HTTP_ORIGIN']
  // res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  // 设置服务器支持的所有头信息字段
  const data = {
    data: 200
  }
  let jsonData = JSON.stringify(data);
  res.send(jsonData);
});

// get /acount/record/items
router.get(recordItems, async function (req, res, next) {
  let items: SelectItems[] = [];
  await basicDB.queryRecordItems(-1).then(res => {
    items = transTableToSelectItems(res);
    return Promise.all(res.map(item => basicDB.queryRecordItems(item.id)));
  }).then(values => {
    items = items.map((item, index) => {
      item.children = transTableToSelectItems(values[index]);
      return item;
    })
  });
  let jsonData = JSON.stringify(items);
  res.send(jsonData);
});

// get /acount/record/details
router.get(AcountItems, async function (req, res, next) {
  const {query} = url.parse(req.url, true);
  let dateDetail: AcountTableDetail = JSON.parse(query.params as string);
  dateDetail.month = processString(dateDetail.month);
  dateDetail.year = processString(dateDetail.year);
  console.log(dateDetail);
  await basicDB.queryAcountItems(dateDetail.year, dateDetail.month).then(values => {
    let jsonData = JSON.stringify(values);
    res.send(jsonData);
  })
});




// post '/acount/record/insert'
router.post(insertItem, async function (req, res, next) {
  const acountInfo : AcountInfo = req.body;
  basicDB.insertAcountInfo(acountInfo).then((value) => {
    const resMsg = value === null ? 'success' : 'failed'
     res.send(resMsg); 
  });
});

// post '/acount/record/delete'
router.post(AcountItemDelete, async function (req, res, next) {
  const acountInfo = req.body;
  basicDB.deleteAcountById(acountInfo.id);
  res.send('success'); 
});

// post '/acount/record/update'
router.post(AcountItemUpdate, async function (req, res, next) {
  const acountInfo = req.body;
  basicDB.updateAcountById(acountInfo.id, acountInfo.money, acountInfo.note);
  res.send('success'); 
});






const transTableToSelectItems = (tables: Table[]): SelectItems[] => {
  let res: SelectItems[] = [];
  tables.forEach(element => {
    let item: SelectItems = {
      id: element.id,
      value: element.name,
      label: element.name,
    }
    res = [...res, item];
  });
  return res;
}
export default router;