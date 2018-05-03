function updateUrl() {
    var timestamp = Date.now();
    var urls = [
    "http://52.151.37.229:9999/notebooks/Samples/TextClassificationPython_Matthew.ipynb"];
    var index = timestamp%2;
    element = document.getElementById("notebook1")
    if(element!=null) {
        element.href = urls[index];
    }
};