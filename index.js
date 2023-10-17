function voltarAoTopo() {
    document.body.scrollTop = 0; 
    document.documentElement.scrollTop = 0; 
}
window.onscroll = function() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("btnVoltarTopo").style.display = "block";
    } else {
        document.getElementById("btnVoltarTopo").style.display = "none";
    }
}
