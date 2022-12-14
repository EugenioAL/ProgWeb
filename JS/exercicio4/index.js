function taboada() {
    let i;
    let j;
    for (i = 1; i < 11; i++) {
        document.write("<table border = '1' > <thead > <th colspan = '2'>Produtos de " + i + "</th></thead><tbody>");
        for (j = 1; j < 11; j++) {
            document.write("<tr><td>" +
                i + "x" + j + "</td>" + "<td>" +
                i * j + "</td></tr>");
        }
        document.write("</tbody>");
    }
    document.write("</table>");
}

taboada();