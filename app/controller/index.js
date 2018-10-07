function viewTasks() {
    var taskview = document.getElementById("tasklist");
    taskview.innerHTML = '';
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var tasklist = JSON.parse(xhttp.responseText);
            console.log(tasklist);
            for(t of tasklist){
                taskview.innerHTML += `<li><input type="checkbox" id="${t._id}" rev_id="${t._rev}" name="eachTask">${t.task} <button type="button" class="cancel">x</button></li>`; 
            }
            for(var i=0;i<document.getElementsByClassName("cancel").length;i++){
            document.getElementsByClassName("cancel")[i].addEventListener("click",function(){deleteTasks(event)});
            }
        }
    };
    xhttp.open("GET", '/tasks', true);
    xhttp.send();
}
function addTask(){
    var task = document.getElementById("task").value;
    if(task !== ''){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
               // Typical action to be performed when the document is ready:
            //    document.getElementById("demo").innerHTML = xhttp.responseText;
                viewTasks();

            }
        };
        xhttp.open("POST", '/task', true);
        xhttp.setRequestHeader('Content-type', 'application/json');
        xhttp.send(JSON.stringify({"task":task}));
    }
}
viewTasks();
function deleteTasks(event){
    var removeEvent=event.target.parentElement.childNodes[0].id;
    var revisionId=event.target.parentElement.childNodes[0].getAttribute("rev_id");
    console.log("re",revisionId);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            viewTasks();
        }
    };
    xhttp.open("DELETE", '/delete_tasks', true);
    xhttp.setRequestHeader('Content-type', 'application/json');
    xhttp.send(JSON.stringify({"id":removeEvent,"rev":revisionId}));
    }
