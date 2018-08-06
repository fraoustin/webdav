var templateDialogActions = document.getElementById("templateDialog").nextElementSibling
while (templateDialogActions.firstChild) {
    templateDialogActions.removeChild(templateDialogActions.firstChild);
}

// fct copy
function clickCopyURL() {
    var url = window.location.href
    url = url.substr(0, url.lastIndexOf("/") + 1);
    var nodes = document.querySelector('#templateDialog div li span').childNodes;
    var str = url + encodeURI(nodes[nodes.length - 2].nodeValue.trim());
    copy(str);
}

function copy(str) {
    var textArea = document.getElementById('copyfrom');
    textArea.value = str;
    textArea.select();
    document.execCommand('copy');
    textArea.value = '';
}

// manage for add dir and upload

var templateButtonCreateFolder=`    
    <button class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon" onclick="clickCreateFolder()">
    <i class="material-icons" role="presentation">create_new_folder</i>
    </button>`
var templateButtonUpload=`
    <button class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon" onclick="clickUpload()">
    <i class="material-icons" role="presentation">cloud_upload</i>
    </button>`
var buttonHome = document.getElementById("homebtn");
buttonHome.parentNode.insertBefore( htmlToElement(templateButtonCreateFolder), buttonHome.nextSibling);
buttonHome.parentNode.insertBefore( htmlToElement(templateButtonUpload), buttonHome.nextSibling);

var templateDialogCreateFolder=`    
    <div>
        <h4 class="mdl-dialog__title">New Folder</h4>
        <div class="mdl-dialog__content" id="dialog-content">        
            <div class="mdl-textfield mdl-js-textfield">
                <input class="mdl-textfield__input" type="text" id="nameNewFolder">
            </div>
        </div>
        <div>
            <button type="button" class="mdl-button create full mdl-button--primary"> <i class="material-icons">add</i>Create</button>
        </div>
        <div class="full space"></div>
        <div>
            <button type="button" class="mdl-button close full mdl-button--accent"> <i class="material-icons">close</i>Close</button>
        </div>
    </div>`

function clickCreateFolder() {
    var dialog = document.querySelector('dialog');
    var showDialogButton = document.querySelector('#show-dialog');
    if (! dialog.showModal) {
      dialogPolyfill.registerDialog(dialog);
    };
    while (document.getElementById("templateDialog").firstChild) {
        document.getElementById("templateDialog").removeChild(document.getElementById("templateDialog").firstChild);
    }
    var elt = htmlToElement(templateDialogCreateFolder)
    document.getElementById("templateDialog").appendChild(elt);
     
    dialog.querySelector('.close').addEventListener('click', function() {
        dialog.close();
      });
      dialog.querySelector('.create').addEventListener('click', function() {
        if (document.getElementById("nameNewFolder").value) {
            var fs = new WebDAV.Fs(window.location.protocol + "//" + window.location.hostname);
            fs.dir(currentPath + document.getElementById("nameNewFolder").value + '/').mkdir();
        }
        dialog.close();
        location.reload(); 
        });
    // search info and insert into dialog
    dialog.showModal();
}


var templateDialogUpload=`    
    <div>
        <h4 class="mdl-dialog__title">Upload</h4>
        <div class="mdl-dialog__content" id="dialog-content">   
                <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect select-file full">
                Select a file
                </button>
                <input class="mdl-textfield__input input-file" type="file" id="nameFile" oninput="inputResult()"/>
                <input class="mdl-textfield__input" type="text" id="nameFileResult"/>
        </div>
        <div>
            <button type="button" class="mdl-button create full mdl-button--primary"> <i class="material-icons">present_to_all</i>Create</button>
        </div>
        <div class="full space"></div>
        <div>
            <button type="button" class="mdl-button close full mdl-button--accent"> <i class="material-icons">close</i>Close</button>
        </div>
    </div>`

function inputResult() {
    console.log(document.getElementById("nameFile"))
    console.log(document.getElementById("nameFileResult"))
    document.getElementById("nameFileResult").value = document.getElementById("nameFile").files.item(0).name;
}

function clickUpload() {
    console.log("Upload")
    var dialog = document.querySelector('dialog');
    var showDialogButton = document.querySelector('#show-dialog');
    if (! dialog.showModal) {
      dialogPolyfill.registerDialog(dialog);
    };
    while (document.getElementById("templateDialog").firstChild) {
        document.getElementById("templateDialog").removeChild(document.getElementById("templateDialog").firstChild);
    }
    var elt = htmlToElement(templateDialogUpload)
    document.getElementById("templateDialog").appendChild(elt);
     
    dialog.querySelector('.select-file').addEventListener('click', function() {
        document.getElementById("nameFile").click();
      });
    
    dialog.querySelector('.close').addEventListener('click', function() {
        dialog.close();
      });
      dialog.querySelector('.create').addEventListener('click', function() {
        if (document.getElementById("nameFile").value) {
            var fs = new WebDAV.Fs(window.location.protocol + "//" + window.location.hostname); 
            var reader = new FileReader();
            reader.onload = function(event) {
                fs.file(currentPath + document.getElementById("nameFile").files.item(0).name).write(event.target.result);
                dialog.close();
                location.reload();
            };
            //reader.readAsDataURL(document.getElementById("nameFile").files[0]);
            reader.readAsArrayBuffer(document.getElementById("nameFile").files[0]);
        }
        });
    // search info and insert into dialog
    dialog.showModal();



}

// manage dialog for delete
var templateDialog=`    
    <div>
        <li class="mdl-list__item item">
            <span class="mdl-list__item-primary-content">
            <span class="mdl-list__item-avatar specColor"><i class="material-icons">specIcon</i></span>
                specLib
            <span>
        </li>
        <div class="mdl-dialog__content" id="dialog-content">
        </div>
        <div>
            <button type="button" class="mdl-button close full mdl-button--primary"> <i class="material-icons">close</i>Close</button>
        </div>
        <div class="full space"></div>
        <div>
            <button type="button" class="mdl-button copyurl full mdl-button--primary"> <i class="material-icons">link</i>Copy URL</button>
            <button type="button" class="mdl-button delete full mdl-button--accent"> <i class="material-icons">delete</i>Delete</button>
            <input id="copyfrom" style="width: 1px; border: 0; opacity: 0; cursor:default" readonly>
        </div>
    </div>`



function clickGetInfo(id) {
    console.log("clickGetInfoMore")
    var dialog = document.querySelector('dialog');
    var showDialogButton = document.querySelector('#show-dialog');
    if (! dialog.showModal) {
      dialogPolyfill.registerDialog(dialog);
    };
    var listOfItems = document.getElementById("list").getElementsByTagName("tbody")[0].getElementsByTagName("tr");
    var item = listOfItems[id];
    var isDir = false;
    lib = item.childNodes[0].childNodes[0].textContent;
    size = item.childNodes[1].textContent;
    dte = item.childNodes[2].textContent;
    if (lib.substring(lib.length-1) == "/") {
        icon = "folder_open";
        color = "mdl-color--accent";
        lib = lib.substring(0,lib.length-1);
        isDir = true;
    } else {
        icon = "insert_drive_file";
        color = "mdl-color--accent-dark";
    }
    while (document.getElementById("templateDialog").firstChild) {
        document.getElementById("templateDialog").removeChild(document.getElementById("templateDialog").firstChild);
    }
    var elt = htmlToElement(templateDialog.replace("specIcon",icon)
                                            .replace("specLib",lib)
                                            .replace("specColor",color)
                                            )
    document.getElementById("templateDialog").appendChild(elt);
    
    var listOfItems = document.getElementById("list").getElementsByTagName("thead")[0].getElementsByTagName("th");
    for (var i = 0; i < listOfItems.length; ++i) {
        var info = document.createElement('div');
        info.innerHTML = listOfItems[i].childNodes[0].textContent + " : " + item.childNodes[i].textContent;
        document.getElementById("dialog-content").appendChild(info);
    }
    
    dialog.querySelector('.close').addEventListener('click', function() {
        dialog.close();
      });
    dialog.querySelector('.copyurl').addEventListener('click', function() {
        clickCopyURL();
      });


      dialog.querySelector('.delete').addEventListener('click', function() {
        var fs = new WebDAV.Fs(window.location.protocol + "//" + window.location.hostname);
        if (isDir) {
            console.log("delete dir");
            var elt = fs.dir(currentPath + lib);            
        } else {
            console.log("delete file");
            var elt = fs.file(currentPath + lib);   
        }
        // delete 
        elt.rm();
        dialog.close();
        location.reload(); 
        });
    // search info and insert into dialog
    dialog.showModal();
}
