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
    
    availableFilters = [new filter("Outdoors",["Sports","Cheap"]), new filter ("Cheap",["Outdoors","Sale"]), new filter ("Sports",["Group","Outdoors"]), new filter ("Group",["Sale","Outdoors"]), new filter ("Sale",["Cheap","Group"])];
    addedFilters = [];

    updateFilters(new Array());
	$('[data-toggle="modal"]').click(function() {
		var url = $(this).attr('href');
		$("#myModal").empty();
		$("#myModal").append("<iframe src='" + url + "' class='modalFrame' />");

		$('#myModal').modal('show');
	});
});

function updateFilters(relatedFilters) {
    topFilters = ""; $("#filters").html("");
    for (var i = 0;i<addedFilters.length;i++) {
        topFilters = ["<div class=\"panel panel-success\"><div class=\"panel-heading\">"+addedFilters[i].name+"<button type=\"button\" id=\""+addedFilters[i].name+"\" class=\"btn btn-primary btn-xs pull-right filter_minus\">-</button></div></div>"+topFilters];
    }
    sortedFilters = ""; bottomFilters = "";
    endIndex = 0;
    for (var j = availableFilters.length-1;j>=endIndex;j--) {
        if (findEqualName(availableFilters[j].name,relatedFilters)) {
            sortedFilters = ["<div class=\"panel panel-default\"><div class=\"panel-body\">"+availableFilters[j].name+"<button type=\"button\" id=\""+availableFilters[j].name+"\" class=\"btn btn-primary btn-xs pull-right filter_plus\">+</button></div></div>"+sortedFilters];
            moveToFront(availableFilters,j); j++; endIndex++;
        } else {
            bottomFilters = ["<div class=\"panel panel-default\"><div class=\"panel-body\">"+availableFilters[j].name+"<button type=\"button\" id=\""+availableFilters[j].name+"\" class=\"btn btn-primary btn-xs pull-right filter_plus\">+</button></div></div>"+bottomFilters];
        }
        $("#filters").html(topFilters+sortedFilters+bottomFilters);
    }
    output = "";
    for (var p = 0;p<availableFilters.length;p++) {
        output = output+","+availableFilters[p].name;
    }
    $(".filter_plus").click(function() {
        plus_filter_function($(this).attr('id'))
        
    });
    $(".filter_minus").click(function() {
        minus_filter_function($(this).attr('id'))
    });
}

function plus_filter_function(name) {
    index = findIndex(name,availableFilters);
    addedFilters.push(availableFilters[index]);
    new_related_filters = availableFilters[index].related;
    availableFilters.splice(index,1);
    updateFilters(new_related_filters);
}

function minus_filter_function(name) {
    index = findIndex(name,addedFilters);
    availableFilters.push(addedFilters[index]);
    addedFilters.splice(index,1);
    updateFilters(new Array());
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

function findEqualName(name,target_array) {
    boolean = false;
    for (var i = 0;i<target_array.length;i++) {
        if (name == target_array[i]) {
            boolean = true;
        }
    }
    return boolean;
}

function findIndex(name,target_array) {
    for (var i = 0;i<target_array.length;i++) {
        if (name == target_array[i].name) {
            index = i;
        }
    }
    return index;
}