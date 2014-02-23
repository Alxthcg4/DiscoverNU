/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function() {
    availableFilters = ["Cool","Crazy","Hip","Fun","Cultural","Outdoors","Evanston","Family-friendly","Chicago"];
    addedFilters = [];
    updateFilters();
    $('#new_discovery').click(function(){
        alert("Test!");
    });
});

function updateFilters() {
    currentFilters = ""; $("#filters").html("");
    for (var i = 0;i<addedFilters.length;i++) {
        currentFilters = $("#filters").html();
        filterString = []
        $("#filters").html(currentFilters+
            "<div class=\"panel panel-success\"><div class=\"panel-heading\">"+addedFilters[i]+"<button type=\"button\" class=\"btn btn-primary btn-xs pull-right filter_minus\">-</button></div></div>");
    }
    for (var j = 0;j<availableFilters.length;j++) {
        currentFilters = $("#filters").html();
        filterString = []
        $("#filters").html(currentFilters+
            "<div class=\"panel panel-default\"><div class=\"panel-body\">"+availableFilters[j]+"<button type=\"button\" class=\"btn btn-primary btn-xs pull-right filter_plus\">+</button></div></div>");
    }
    $(".filter_plus").click(function() {
        filterText = $(this).parent().text();
        filterText = filterText.substring(0,filterText.length-1);
        addedFilters.push(filterText);
        removeA(availableFilters,filterText);
        updateFilters();
    });
    $(".filter_minus").click(function() {
        filterText = $(this).parent().text();
        filterText = filterText.substring(0,filterText.length-1);
        availableFilters.push(filterText);
        removeA(addedFilters,filterText);
        updateFilters();
    });
}

function removeA(arr) {
    var what, a = arguments, L = a.length, ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax= arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    return arr;
}