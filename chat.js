"ui";
//var chat = http.post("http://3ee4e650.cpolar.cn", {"token":readtoken, "dst_name":dstname, "msg":messages});
var tokenpath = "/sdcard/dogchat/token.txt";
var opentoken = undefined
if(files.exists(tokenpath)){
opentoken =files.read(tokenpath);
var readtoken = opentoken//.read();
}
var messages
var sendtouser
console.show()
console.log()
console.show()
console.log(readtoken)
ui.layout(
    <vertical padding="16">
        <input id="viewmsg" lines="12" hint="Show chat message content after sending" />
        <input id="sendtouser" hint="Please enter a user to send to" />
        <input id="messages" lines="5" hint="Please enter a message to send." />
        <button id="ok" text="Send" w="auto" style="Widget.AppCompat.Button.Colored" />
 


    </vertical>
)
ui.ok.on("click", () => {

    threads.start(function () {

      
        http.post("http://1e00c6b7.cpolar.cn/api/send/", {
            "token": readtoken,
            "dst_name": ui.sendtouser.text(),
            "msg": ui.messages.text()

        });
        
        const send = http.get("http://1e00c6b7.cpolar.cn/api/getlogs/?token=" + readtoken + "&dst_name=" + ui.sendtouser.text() + "&id=0")
        log(send)
    
         str = 'http://1e00c6b7.cpolar.cn/api/getlogs/?token='+readtoken+'&dst_name='+ui.sendtouser.text()+'&id=0'
         a= http.get(str,{
 
        })
        msgdata=JSON.parse(a.body.string()).data
        ui.post(function(){
            ui.viewmsg.setText(JSON.stringify(msgdata))
        },50)
      
 


    })

})