"ui";

ui.layout(
    <vertical padding="16">
        <text text="Logging in, please wait..." textColor="black" textSize="16sp"/>
        <progressbar />
    </vertical>
);
setTimeout(function(){
    ui.finish();
}, 3000);