
"ui";
var sendtext
var user ='test'
var password ='test'
var server
console.show()
ui.layout(
    
    <vertical>
         <appbar>
            <toolbar id="toolbar" title="Add DogChat Server" />
        </appbar>
           <input id="server" hint="Please enter the server address."/>          
           <button id="ok" text="Save" w="auto" style="Widget.AppCompat.Button.Colored"/>
           <text text="I do not know? Ask your administrator for server information" textColor="black" textSize="16sp" marginTop="10"/>


    
         

         </vertical>
);
    ui.ok.on("click", () => {

log(shell("rm -rf /sdcard/dogchat/server.txt "))
log(shell("mkdir -p /sdcard/dogchat"))
log(shell("touch /sdcard/dogchat/server.txt "))
file = open("/sdcard/dogchat/server.txt", "a");
file.write(server);
file.close();
ui.finish();

    })