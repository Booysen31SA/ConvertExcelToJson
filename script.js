let selectedFile;
const textArea = document.getElementById("jsondata");
const error = document.getElementById("errorMessage");

document.getElementById("input").addEventListener("change", (event) => {
    error.innerHTML = "";
    selectedFile = event.target.files[0];
    console.log("File Selected");
})

document.getElementById("button").addEventListener("click", (e) => {
    e.preventDefault();
    error.innerHTML = "";
    if (selectedFile) {
        try {
            let fileReader = new FileReader();
            fileReader.readAsBinaryString(selectedFile);
            fileReader.onload = (event) => {
    
                let data = event.target.result;
    
    
                let workbook = XLSX.read(data, { type: "binary" });
    
                workbook.SheetNames.forEach(sheet => {
                    let rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);
                    console.log(rowObject);
                    textArea.innerHTML = JSON.stringify(rowObject, undefined, 4);
                })
            }
        } catch (error) {
            error.innerHTML = error;
        }
    }
})

document.getElementById("saveJson").addEventListener("click", (e) => {
    e.preventDefault();
    error.innerHTML = "";
    try {
        if (textArea.value.length > 0) {
            download(textArea.value, 'json.txt', 'text/plain');
        }
    } catch (error) {
        error.innerHTML = error;
    }
})

document.getElementById("reset").addEventListener("click", (e) => {
    e.preventDefault();
    console.log('eres');
    error.innerHTML = "";
    textArea.innerHTML = "";
});

function download(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}
//download(jsonData, 'json.txt', 'text/plain');