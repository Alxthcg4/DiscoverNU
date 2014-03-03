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
        new filter("Evanston",["Student Group","Theatre","Food","Arts"]),
        new filter("Museum",["Indoors", "Chicago", "Fancy","Modern","Classical"]),
        new filter("Cultural",["Student Group","Evanston","Arts","Theatre","Dance","Music"]),
        new filter("Student Group",["Cheap", "Evanston","Comedy","Dance","Acapella"]),
        new filter("Acapella",["Student Group", "Evanston", "Cheap","Music"]),
        new filter("Theatre",["Indoors","Modern","Classical","Chicago","Evanston"]),
        new filter("Arts",["Fancy","Dance","Theatre","Museum"]),
        new filter("Morning",["Outdoors","Casual","Group"]),
        new filter("Afternoon",["Outdoors", "Sports","Group"]),
        new filter("Comedy",["Student Group","Theatre","Cheap","Evanston"]),
        new filter("Educational",["Museum", "Cultural", "Arts", "Chicago", "Fancy"]),
        new filter("Charity",["Cultural","Fancy","Casual","Chicago","Evanston"]),
        new filter("Casual",["Cheap","Student Group","Sports"]),
        new filter("Dance",["Modern", "Group", "Late Night"]),
        new filter("Modern",["Dance","Theatre","Music"]),
        new filter("Classical",["Music","Arts","Museum","Indoors","Late Night"]),
        new filter("Outdoors",["Sports","Cheap", "Afternoon", "Morning"]),
        new filter ("Cheap",["Outdoors","Free","Indoors","Food","Student Group"]),
        new filter ("Sports",["Group","Outdoors", "Afternoon", "Morning"]),
        new filter ("Group",["Free","Outdoors","Late Night","Food"]),
        new filter ("Free",["Cheap","Group","Student Group"]),
        new filter ("Indoors",["Cheap","Late Night","Music","Theatre","Arts"]),
        new filter ("Late Night",["Indoors","Group","Music","Fancy","21+"]),
        new filter ("Music",["Indoors","Late Night"]),
        new filter ("Food",["Cheap","Group","Fancy"]),
        new filter ("Fancy",["Food","Indoors","Late Night"]),
        new filter ("Chicago",["Museum", "Fancy", "Arts", "Cultural", "Educational"]),
        new filter("21+",["Late Night", "Group", "Indoors"])
    ];
    addedFilters = [];
	searchedFilters = [];

    discoveries = [
        new discovery("Beach Party","images/beach.jpg",["Outdoors","Group","Cheap","Late Night"],"Come to North Beach for an off-the-hook party with amazing food and people that you will want to meet!"),
        new discovery("NU Hiking Trip","images/hiking.jpg",["Outdoors","Group","Sports","Afternoon"],"Join fellow Northwestern hiking enthusiasts for a refreshing hike into the mountains!"),
        new discovery("Wine Tasting","images/wine.jpg",["Indoors","Group","Late Night","21+"],"Come and experience a romantic and glamourous night of wine tasting! Learn how to be a wine pro!"),
        new discovery("Concert","images/concert.jpg",["Indoors","Music","Late Night","Classical"],"Watch and listen to that band that's really popular right now in this amazing live concert here at NU!"),
        new discovery("Dinner for 12","images/dinner.jpg",["Indoors","Group","Food","Fancy"],"Join 11 other NU faculty and students for an enriching discussion and delicious, fancy meal!"),
        new discovery("Symphony","images/symphony.jpg",["Indoors","Fancy","Late Night","Music","Classical","Arts"],"The Chicago Symphony Orchestra will be visiting Bienen School of Music for a live concert! Don't miss it!"),
        new discovery("Clothing Sale","images/shopping.jpg",["Evanston","Indoors","Cheap"],"Come to the biggest sale event at the Chicago Water Tower! All stores will be giving discounted prices!"),
        new discovery("Barbeque","images/barbeque.jpg",["Outdoors","Food","Group", "Charity"],"NU’s service fraternity is hosting a barbeque to raise money for the American Cancer Society."),
        new discovery("Intramural Basketball","images/basketball.jpg",["Indoors","Sports","Group","Morning"],"Join your neighbours at Plex for a friendly and fun game of intramural basketball! All are welcome!"),
        new discovery("Waiting for Superman Film Screening","http://philanthropy.com/img/photos/biz/photo_6152_landscape_large.jpg",["Indoors","Educational","Student Group"],"NU’s Students for Educational Reform group is hosting a film screening of Waiting for Superman which highlights educational inequalities. Come join!"),
        new discovery("Navy Pier","http://www.huenelectric.com/images/navy-pier.jpg", ["Chicago", "Outdoors","Cheap", "Morning", "Afternoon"],"Navy Pier on the Chicago shoreline of Lake Michigan has tons of activities!"),
        new discovery("Art Institute", "http://cmsimg.freep.com/apps/pbcsi.dll/bilde?Site=C4&Date=20130202&Category=COL21&ArtNo=302020018&Ref=V2&MaxW=300&Border=0&Can-you-afford-to-go-to-Chicago-How-to-beat-high-prices-in-low-season", ["Museum","Chicago","Free", "Arts", "Fancy", "Educational"],"NU Students get free admission to Chicago’s premiere Art Museum!"),
        new discovery("Romeo and Juliet","http://mamasmission.com/wp-content/uploads/2014/02/romeo-and-juliet-dvd-bluray-RJ_00269_rgb-300x200.jpg",["Theatre","Arts","Student Group","Evanston"],"Northwestern’s very own Shakespeare Club is presenting a rendition of Romeo and Juliet for all students to see! Come see the classic play!"),
        new discovery("Battle of the Bamboo","http://frontpagephilippinestv.files.wordpress.com/2009/10/muslim_singkil.jpg?w=300",["Chicago","Arts","Student Group","Dance","Cheap"],"The greatest cultural dance competition returns this year to Loyola! Come see the greatest performances of traditional Filipino dances in all of the country!"),
        new discovery("Acapella Show","http://www.statepress.com/wp-content/uploads/2013/04/4.7_Awards-300x200.jpg",["Acapella","Arts","Student Group","Evanston","Cheap"],"Join us for an amazing show showcasing all of Northwestern’s greatest singing talent! Be amazed by the talent of these singers!"),
        new discovery("Second City Comes to NU","http://chicagotonight.wttw.com/sites/default/files/styles/article-medium/public/_DSC7920.jpg",["Comedy","Theatre","Evanston","Cheap"],"The greatest comedy group in all of Chicago is coming to Northwestern for one amazing show! Don’t miss it!"),
        new discovery("NU Seniors Bar Crawl","http://img.ehowcdn.com/article-new-thumbnail/ehow/images/a07/pb/g6/bachelorette-bar-crawl-shirt-ideas-800x800.jpg",["21+","Evanston","Group","Late Night"],"Join all the seniors for one last celebration of Northwestern education in a fun-filled, crazy night at all of Evanston’s bars!")
    ];
    orig_discoveries = discoveries;

    updateFilters(new Array());
    updateDiscoveries(new Array());
	
	$("#filter-search").keyup(function() {
		search_filter_function();
		updateFilters(new Array());
	});

    $("#dropdown ul li a").click(function(){
		$("#dropdown .btn:first-child").html([$(this).text()+" <span class=\"caret\"></span>"]);
   });
});

function updateFilters(relatedFilters) {
    topFilters = ""; $("#filters").html("");
    for (var i = 0;i<addedFilters.length;i++) {
        topFilters = ["<div class=\"panel filter-added\" id=\""+addedFilters[i].name+"\"><div class=\"panel-heading\">"+addedFilters[i].name+"<button type=\"button\" class=\"btn btn-primary btn-xs pull-right\">-</button></div></div>"+topFilters];
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
			foundFilters = [foundFilters+"<div class=\"panel filter-not-added\" id=\""+searchedFilters[j].name+"\"><div class=\"panel-body\">"+searchedFilters[j].name+"<button type=\"button\" class=\"btn btn-primary btn-xs pull-right\">+</button></div></div>"];
			$("#filters").html(foundFilters);
		}
	}
	
    $(".filter-not-added").click(function() {
		searchedFilters = [];
		$("#filter-search").val("");
		document.getElementById('filters').scrollTop = 0;
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
	discovery = "<div class=\"discovery\" href=\"Discoveries.html\" data-toggle=\"modal\" style=\"background-image:url(\'"+discoveries[d].img+"\')\"><div class=\"description\">";
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