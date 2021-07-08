
"ui";
var sendtext
var user ='test'
var password ='test'
var token
var code
var login
var messages
var msg
//console.show()
ui.layout(
    <vertical padding="16">
           <input id="user" hint="Please enter your user name"/>          
           <input id="password" password="true" hint="Please enter your password."/>
           <button id="ok" text="Login to DogChat" w="auto" style="Widget.AppCompat.Button.Colored"/>
           <text text="No registered account? Go to dogchat.top or contact the administrator to register." textColor="black" textSize="16sp" marginTop="10"/>


    
         

         </vertical>
);
    ui.ok.on("click", () => {
    engines.execScriptFile("logging.js");
threads.start(function(){
const login = http.get("http://3ee4e650.cpolar.cn/api/login/?username=" + ui.user.text() + "&password=" + ui.password.text())
       log(login)
   
        str = 'http://3ee4e650.cpolar.cn/api/login/?username='+ui.user.text()+'&password='+ui.password.text()
        a= http.get(str,{

       })
       code=JSON.parse(a.body.string()).code
       token=JSON.parse(a.body.string()).data.token
       msg=JSON.parse(a.body.string()).msg

console.log(token)

console.log(code)
console.log(msg)
log(shell("rm -rf /sdcard/dogchat/token.txt "))
log(shell("mkdir -p /sdcard/dogchat"))
log(shell("touch /sdcard/dogchat/token.txt "))
file = open("/sdcard/dogchat/token.txt", "a");
file.write(token);
file.close();
alert(msg)
ui.finish();

    })
});