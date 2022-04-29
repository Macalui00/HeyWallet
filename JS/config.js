let el = document.getElementById("wrapper");
let toggleButton = document.getElementById("menu-toggle");

toggleButton.onclick = function () {
    el.classList.toggle("toggled");
};


$('th').click(function() {
    let table = $(this).parents('table').eq(0)
    let rows = table.find('tr:gt(0)').toArray().sort(comparer($(this).index()))
    this.asc = !this.asc
    if (!this.asc) {
      rows = rows.reverse()
    }
    for (let i = 0; i < rows.length; i++) {
      table.append(rows[i])
    }
    setIcon($(this), this.asc);
})

function comparer(index) {
return function(a, b) {
    let valA = getCellValue(a, index),
    valB = getCellValue(b, index)
    return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.localeCompare(valB)
}
}

function getCellValue(row, index) {
return $(row).children('td').eq(index).html()
}

function setIcon(element, asc) {
$("th").each(function(index) {
    $(this).removeClass("sorting");
    $(this).removeClass("asc");
    $(this).removeClass("desc");
});

element.addClass("sorting");
if (asc) element.addClass("asc");
else element.addClass("desc");
}
