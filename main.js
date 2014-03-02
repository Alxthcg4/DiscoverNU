/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function filter(name, related) {
    this.name = name;
    this.related = related;
}

function discovery(name,img,tags,description) {
    this.name = name;
    this.img = img;
    this.tags = tags;
    this.description = description;
}

$(document).ready(function() {
    
    availableFilters = [
        new filter("Outdoors",["Sports","Cheap"]),
        new filter ("Cheap",["Outdoors","Sale","Indoors","Food"]),
        new filter ("Sports",["Group","Outdoors"]),
        new filter ("Group",["Sale","Outdoors","Late Night","Food"]),
        new filter ("Sale",["Cheap","Group"]),
        new filter ("Indoors",["Cheap","Late Night","Music"]),
        new filter ("Late Night",["Indoors","Group","Music","Fancy"]),
        new filter ("Music",["Indoors","Late Night"]),
        new filter ("Food",["Cheap","Group","Fancy"]),
        new filter ("Fancy",["Food","Indoors","Late Night"])
    ];
    addedFilters = [];
	searchedFilters = [];

    discoveries = [
        new discovery("Beach Party","beach.jpg",["Outdoors","Group","Cheap"],"Come to North Beach for an off-the-hook party with amazing food and people that you will want to meet!"),
        new discovery("NU Hiking Trip","hiking.jpg",["Outdoors","Group","Sports"],"Join fellow Northwestern hiking enthusiasts for a refreshing hike into the mountains!"),
        new discovery("Wine Tasting","wine.jpg",["Indoors","Group","Late Night"],"Come and experience a romantic and glamourous night of wine tasting! Learn how to be a wine pro!"),
        new discovery("Concert","concert.jpg",["Indoors","Music","Late Night"],"Watch and listen to that band that's really popular right now in this amazing live concert here at NU!"),
        new discovery("Dinner for 12","dinner.jpg",["Indoors","Group","Food","Fancy"],"Join 11 other NU faculty and students for an enriching discussion and delicious, fancy meal!"),
        new discovery("Symphony","symphony.jpg",["Indoors","Fancy","Late Night","Music"],"The Chicago Symphony Orchestra will be visiting Bienen School of Music for a live concert! Don't miss it!"),
        new discovery("Clothing Sale","shopping.jpg",["Sale","Indoors","Cheap"],"Come to the biggest sale event at the Chicago Water Tower! All stores will be giving discounted prices!"),
        new discovery("Barbeque","barbeque.jpg",["Outdoors","Food","Group"],"Slivka is hosting an outdoors barbeque together with CCI to promote interdorm relations! Join us!"),
        new discovery("Intramural Basketball","basketball.jpg",["Indoors","Sports","Group"],"Join your neighbours at Plex for a friendly and fun game of intramural basketball! All are welcome!")
    ];
    orig_discoveries = discoveries;

    updateFilters(new Array());
    updateDiscoveries(new Array());
	
	$("#filter-search").keyup(function() {
		search_filter_function();
		updateFilters(new Array());
	});
	$('.navbar-form').on('submit', function(event){
		event.preventDefault();
	});
});

function updateFilters(relatedFilters) {
    topFilters = ""; $("#filters").html("");
    for (var i = 0;i<addedFilters.length;i++) {
        topFilters = ["<div class=\"panel filter-added\"><div class=\"panel-heading\">"+addedFilters[i].name+"<button type=\"button\" id=\""+addedFilters[i].name+"\" class=\"btn btn-primary btn-xs pull-right\">-</button></div></div>"+topFilters];
    }
	if ($("#filter-search").val().length == 0) {
		sortedFilters = ""; bottomFilters = "";
		endIndex = 0;
		for (var j = availableFilters.length-1;j>=endIndex;j--) {
			if (findEqualName(availableFilters[j].name,relatedFilters)) {
				sortedFilters = ["<div class=\"panel filter-not-added\" id=\""+availableFilters[j].name+"\"><div class=\"panel-body\">"+availableFilters[j].name+"<button type=\"button\" class=\"btn btn-primary btn-xs pull-right\">+</button></div></div>"+sortedFilters];
				moveToFront(availableFilters,j); j++; endIndex++;
			} else {
				bottomFilters = ["<div class=\"panel filter-not-added\" id=\""+availableFilters[j].name+"\"><div class=\"panel-body\">"+availableFilters[j].name+"<button type=\"button\" class=\"btn btn-primary btn-xs pull-right\">+</button></div></div>"+bottomFilters];
			}
			$("#filters").html(topFilters+sortedFilters+bottomFilters);
		}
	} else {
		foundFilters = "";
		for (var j = 0;j < searchedFilters.length;j++) {
			foundFilters = [foundFilters+"<div class=\"panel filter-not-added\"><div class=\"panel-body\" id=\""+searchedFilters[j].name+"\">"+searchedFilters[j].name+"<button type=\"button\" class=\"btn btn-primary btn-xs pull-right\">+</button></div></div>"];
			$("#filters").html(foundFilters);
		}
	}
	
    $(".filter-not-added").click(function() {
		searchedFilters = [];
		$("#filter-search").val("");
        plus_filter_function($(this).attr('id'))
    });
    $(".filter-added").click(function() {
		searchedFilters = [];
		$("#filter-search").val("");
        minus_filter_function($(this).attr('id'))
    });
}

function plus_filter_function(name) {
    index = findIndex(name,availableFilters);
    addedFilters.push(availableFilters[index]);
    new_related_filters = availableFilters[index].related;
    availableFilters.splice(index,1);
    updateFilters(new_related_filters);
    updateDiscoveries(addedFilters);
}

function minus_filter_function(name) {
    index = findIndex(name,addedFilters);
    availableFilters.push(addedFilters[index]);
    addedFilters.splice(index,1);
    updateFilters(new Array());
    updateDiscoveries(addedFilters);
}

function search_filter_function() {
	var searchString = $("#filter-search").val().toLowerCase();
	searchedFilters = [];
	if (searchString.length > 0) {
		for (var j = 0;j < availableFilters.length;j++) {
			if (availableFilters[j].name.toLowerCase().indexOf(searchString) != -1) {
				searchedFilters.push(availableFilters[j]);
			}
		}
	}
}

function updateDiscoveries(relatedTags) {
    if (relatedTags.length > 0) {
        discoveries = orig_discoveries;
        for (var t=0;t < relatedTags.length;t++) {
            sortedDiscoveries = ""; bottomDiscoveries = "";
            endIndex = 0;
            for (var d = discoveries.length-1;d>=endIndex;d--) {
                if (findEqualName(relatedTags[t].name,discoveries[d].tags)) {
                    sortedDiscoveries = [makeDiscoveryHTML(d)+sortedDiscoveries];
                    moveToFront(discoveries,d); d++; endIndex++;
                } else {
                    bottomDiscoveries = [makeDiscoveryHTML(d)+bottomDiscoveries];
                }
                $("#discoveries").html(sortedDiscoveries+bottomDiscoveries);
            }
        }
    } else {
        sortedDiscoveries = ""; bottomDiscoveries = "";
        endIndex = 0;
        for (var d = discoveries.length-1;d>=endIndex;d--) {
            bottomDiscoveries = [makeDiscoveryHTML(d)+bottomDiscoveries];
            $("#discoveries").html(sortedDiscoveries+bottomDiscoveries);
        }
    }
    $('[data-toggle="modal"]').click(function() {
	var url = $(this).attr('href');
	$("#myModal").empty();
	$("#myModal").append("<iframe src='" + url + "' class='modalFrame' />");

	$('#myModal').modal('show');
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

function makeDiscoveryHTML(d) {
	discovery = "<div class=\"discovery\" href=\"Discoveries.html\" data-toggle=\"modal\" style=\"background-image:url(\'images/"+discoveries[d].img+"\')\"><div class=\"description\">";
	discovery = [discovery+discoveries[d].name];
	discovery = [discovery+"<p class=\"ratingstars\">"];
	for(var i =0;i<2;i++)
		discovery = [discovery+"<span class=\"glyphicon glyphicon-star-empty\"></span>"];
	for(var i =0;i<3;i++)
		discovery = [discovery+"<span class=\"glyphicon glyphicon-star\"></span>"];
	discovery = [discovery+"</p>"+"<br><br>"+discoveries[d].description];
	discovery = [discovery+"</div></div>"];

	return discovery;
}