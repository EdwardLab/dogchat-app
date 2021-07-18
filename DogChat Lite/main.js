"ui";

// xingyujie
// 2294001xyj

// test
// test

let setting = storages.create('set')
let myapp = {}
myapp.token = undefined
myapp.username = undefined

ui_login()
function ui_login() {

    ui.layout(
        <vertical padding="6">
            <appbar>
                <toolbar id="toolbar" title="DogChat" />
            </appbar>
            <input id='ui_url' hint='DogChat Server Address' />
            <input id="ui_loginin" hint="UserName" />
            <input id="ui_password" hint="Password" />
            <button id="ok" text="Login" style="Widget.AppCompat.Button.Colored" />
            <button id='ui_loginup' text='No account? Click here to register' />
            <text text="Don't know the server address? Please ask the administrator or the technical personnel. App is a streamlined version, only basic features, enjoy a better experience, recommend Web, please ask the administrator, or wait for the full full version update" textColor="black" textSize="16sp" marginTop="10"/>



        </vertical>
    )

    {
        if (setting.get('ui_url')) {
            ui.ui_url.setText(setting.get('ui_url'))
        }
        if (setting.get('ui_loginin')) {
            ui.ui_loginin.setText(setting.get('ui_loginin'))
        }
        if (setting.get('ui_password')) {
            ui.ui_password.setText(setting.get('ui_password'))
        }
        // if (setting.get('ui_url')) {
        //     ui.ui_url.setText(setting.get('ui_url'))
        // }
    }



    ui.ok.on("click", () => {

        setting.put('ui_url', ui.ui_url.text())
        setting.put('ui_loginin', ui.ui_loginin.text())
        setting.put('ui_password', ui.ui_password.text())

        myapp.ui_url0 = ui.ui_url.text().match(/[^https:/][\s\S]*/)[0]
        // myapp.username = ui.ui_loginin.text()

        java.lang.Thread(function () {
            try {
                myapp.username = ui.ui_loginin.text()
                let password = ui.ui_password.text()
                // setTimeout(() => {
                log('http://' + myapp.ui_url0 + '/api/login/?username=' + myapp.username + '&password=' + password)
                let http_loginin = http.get('http://' + myapp.ui_url0 + '/api/login/?username=' + myapp.username + '&password=' + password)
                log('http://' + myapp.ui_url0 + '/api/login/?username=' + myapp.username + '&password=' + password)
                http_loginin = http_loginin.body.string()
                myapp.token = (http_loginin.indexOf('200') != -1) ? JSON.parse(http_loginin).data.token : undefined

                // }, 50);


            } catch (e) {
            } finally {

                if (myapp.token) {
                    log(myapp.token)
                    ui.run(function () {
                        ui_chat()
                    })

                } else {
                    alert('There is no network connection or the server address is incorrect. Please check and try again.')
                }

            }


        }).start()
    })

}

function ui_chat() {
    ui.layout(
        <frame>
            <vertical>
                <appbar>
                    <toolbar id="toolbar" title="{{myapp.username}}" />
                </appbar>
                <card>
                    <input id='other_user' hint='Please enter who you want to send to:' />
                </card>
                <list id="todoList">
                    <card w="*" h="auto" margin="5" cardCornerRadius="2dp" cardElevation="1dp" >
                        <vertical>
                            <text gravity='right' text="{{this.text0_user}}" visibility='{{this.vis0_user}}' textColor="#232421" textSize="16sp" />

                            <text gravity='right' text="{{this.text0}}" visibility='{{this.vis0}}' textColor="#222222" textSize="16sp" />

                            <text text="{{this.text1_user}}" visibility='{{this.vis1_user}}' textColor="#234453" textSize="16sp" />
                            <text text="{{this.text1}}" visibility='{{this.vis1}}' textColor="#222222" textSize="16sp" />
                        </vertical>
                    </card>
                </list>
            </vertical>
            <horizontal gravity='bottom'>
                <card layout_weight='1' >
                    <input id='input_text' />

                </card>
                <button id='send_text' text='Send' />
            </horizontal>
        </frame>
    );

    let todoList_arr = []
    ui.todoList.setDataSource(todoList_arr);

    ui.send_text.click(function () {
        let send_text0 = ui.input_text.text()
        ui.input_text.setText('')
        if (!send_text0) {
            return;
        }


        new java.lang.Thread(function () {

            let http_talk = http.post('http://' + myapp.ui_url0 + '/api/send/', {
                token: myapp.token,
                dst_name: ui.other_user.text(),
                msg: send_text0
            })
            // log(http_talk.body.string())

            todoList_arr.push({
                text0_user: myapp.username + ':',
                text0: send_text0,
                vis0_user: 'visible',
                vis0: 'visible',
                text1_user: '',
                text1: '',
                vis1_user: 'gone',
                vis1: 'gone'
            });



        }).start()



    });


    setInterval(function () {
        new java.lang.Thread(function () {
            myapp.other_user = ui.other_user.text()
            let http_get = http.get('http://' + myapp.ui_url0 + '/api/getlogs/?token=' + myapp.token + '&dst_name=' + myapp.other_user + '&id=0')
            log('http://' + myapp.ui_url0 + '/api/getlogs/?token=' + myapp.token + '&dst_name=' + myapp.other_user + '&id=0')
            http_get = http_get.body.string()
            let http_content = http_get.indexOf('200') != -1 ? JSON.parse(http_get) : undefined
            log(http_content)
            if (!http_content) {
                return
            } else {
                todoList_arr.push({
                    text0_user: '',
                    text0: '',
                    vis0_user: 'gone',
                    vis0: 'gone',
                    text1_user: myapp.other_user + ':',
                    text1: http_content.msg,
                    vis1_user: 'visible',
                    vis1: 'visible'
                });



            }


        }).start()

    }, 2000)




}


