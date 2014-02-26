/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function filter(name, related) {
    this.name = name;
    this.related = related;
}

$(document).ready(function() {
    
    availableFilters = [new filter("Outdoors",["Sports,Cheap"]), new filter ("Cheap",["Outdoors,Sale"]), new filter ("Sports",["Group,Outdoors"]), new filter ("Group",["Sale,Outdoors"]), new filter ("Sale",["Cheap,Group"])];
    addedFilters = [];

    updateFilters();
	$('#new_discovery').click(function() {
		document.getElementById("modalFrame").src = "popup.html";
		$('#myModal').modal('show');
	});
});

function updateFilters(relatedFilters) {
    currentFilters = ""; $("#filters").html("");
    for (var i = 0;i<addedFilters.length;i++) {
        currentFilters = $("#filters").html();
        $("#filters").html(currentFilters+
            "<div class=\"panel panel-success\"><div class=\"panel-heading\">"+addedFilters[i].name+"<button type=\"button\" id=\""+i+"\" class=\"btn btn-primary btn-xs pull-right filter_minus\">-</button></div></div>");
    }
    topFilters = "";
    for (var j = availableFilters.length-1;j>=0;j--) {
        if (findEqualName(availableFilters[j],relatedFilters)) {
            topFilters = ["<div class=\"panel panel-default\"><div class=\"panel-body\">"+availableFilters[j].name+"<button type=\"button\" id=\""+j+"\" class=\"btn btn-primary btn-xs pull-right filter_plus\">+</button></div></div>"+topFilters];
            moveToFront(availableFilters,j); j--;
        } else {
            bottomFilters = ["<div class=\"panel panel-default\"><div class=\"panel-body\">"+availableFilters[j].name+"<button type=\"button\" id=\""+j+"\" class=\"btn btn-primary btn-xs pull-right filter_plus\">+</button></div></div>"+bottomFilters];
        }
        $("#filters").html(topFilters+bottomFilters);
    }
    $(".filter_plus").click(function() {
        index = parseInt($(this).attr('id'));
        addedFilters.push(availableFilters[index]);
        availableFilters.splice(index,1);
        updateFilters();
    });
    $(".filter_minus").click(function() {
        index = parseInt($(this).attr('id'));
        availableFilters.push(addedFilters[index]);
        addedFilters.splice(index,1);
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

function moveToFront(target_array, index) {
    temp = target_array[index]; target_array.splice(index,1);
    target_array.unshift(temp);
}

function findEqualName(element,target_array) {
    boolean = false;
    for (var i = 0;i<target_array.length;i++) {
        if (element.name == target_array[i].name) {
            boolean = true; break;
        }
    }
    return boolean;
}