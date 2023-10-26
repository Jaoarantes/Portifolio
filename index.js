function voltartopo() {
    document.body.scrollTop = 0; 
    document.documentElement.scrollTop = 0; 
}
window.onscroll = function() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("voltartopo").style.display = "block";
    } else {
        document.getElementById("voltartopo").style.display = "none";
    }
}

