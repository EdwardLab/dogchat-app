"ui";

ui.layout(
    <vertical>
     <appbar>
            <toolbar id="toolbar" title="Logging in..." />
        </appbar>
        <text text="Logging in, please wait..." textColor="black" textSize="16sp"/>
        <progressbar />
    </vertical>
);
setTimeout(function(){
    ui.finish();
}, 3000);