let str = 'http://52ee6c7d.cpolar.cn/api/login/?username=test&password=test'
let a= http.get(str,{

})

log(JSON.parse(a.body.string()))
