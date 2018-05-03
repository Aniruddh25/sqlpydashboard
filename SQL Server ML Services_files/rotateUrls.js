var timestamp = Date.now();
var urls = [
"http://localhost:8888/notebooks/Predictive%20Maintenance%20Modelling%20Guide%20Python%20Notebook.ipynb",
"http://localhost:8888/notebooks/Analyzing%20PyPI%20Data%20to%20Determine%20Python%203%20Support.ipynb"];
var index = timestamp%2;
//element = document.getElementById("notebook1")
$("#notebook1").attr("href", urls[index]);
/* if(element!=null)
   element.href = urls[index]; */