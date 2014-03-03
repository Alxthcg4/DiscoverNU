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
        new filter("Evanston",["Late Night","Food","Student","Cheap","Arts","Cultural","21+"]),
        new filter("Chicago",["Museum", "Fancy", "Arts", "Cultural", "Educational"]),
        new filter("Social",["Indoors","Outdoors","Casual","Fancy","Evanston","Chicago","Late Night","21+"]),
        new filter("Sports",["Outdoors","Afternoon","Morning","Evanston","Student",]),
        new filter("Music",["Evanston","Chicago","Classical","Modern","Indoors","Late Night"]),
        new filter("Arts",["Evanston","Chicago","Music","Dance","Theatre","Museum","Cultural"]),
        new filter("Food",["Evanston","Chicago","Cheap","Social","Fancy","Casual"]),
        new filter("Outdoors",["Sports","Social","Cheap","Afternoon", "Morning","Free"]),
        new filter("Indoors",["Cheap","Late Night","Music","Theatre","Arts"]),
        new filter("Late Night",["Indoors","Social","Music","Fancy","Casual","21+"]),
        new filter("Cultural",["Student","Evanston","Arts","Theatre","Dance","Music"]),
        new filter("Cheap",["Outdoors","Free","Indoors","Food","Student"]),
        new filter("Fancy",["Food","Indoors","Late Night","Theatre","Arts","Music","Late Night","Chicago"]),
        
        new filter("Student",["Cheap", "Evanston","Comedy","Dance","A capella"]),
        new filter("A capella",["Student", "Evanston", "Cheap","Music"]),
        new filter("Theatre",["Indoors","Modern","Classical","Chicago","Evanston"]),
        new filter("Morning",["Outdoors","Casual","Social"]),
        new filter("Afternoon",["Outdoors", "Sports","Social"]),
        new filter("Comedy",["Student","Theatre","Cheap","Evanston"]),
        new filter("Educational",["Museum", "Cultural", "Arts", "Chicago", "Fancy"]),
        new filter("Charity",["Cultural","Fancy","Casual","Chicago","Evanston"]),
        new filter("Casual",["Cheap","Student","Sports"]),
        new filter("Dance",["Modern", "Social", "Late Night","Chicago","Evanston"]),
        new filter("Modern",["Dance","Theatre","Music"]),
        new filter("Classical",["Music","Arts","Museum","Indoors","Late Night"]),
        new filter("Free",["Cheap","Social","Evanston","Food","Student","Music","Theatre"]),
        new filter("Museum",["Indoors", "Chicago", "Fancy","Modern","Classical"]),
        new filter("21+",["Late Night","Social","Indoors","Chicago","Evanston","Cheap","Fancy","Casual"])
    ];
    addedFilters = [];
	searchedFilters = [];

    discoveries = [
        new discovery("NU Hiking Trip","images/hiking.jpg",["Outdoors","Social","Sports","Afternoon","Free"],"Join fellow Northwestern hiking enthusiasts for a refreshing hike into the mountains!"),
        new discovery("Wine Tasting","images/wine.jpg",["Indoors","Social","Late Night","21+"],"Come and experience a romantic and glamourous night of wine tasting! Learn how to be a wine pro!"),
        new discovery("Concert","images/concert.jpg",["Indoors","Music","Late Night","Classical"],"Watch and listen to that band that's really popular right now in this amazing live concert here at NU!"),
        new discovery("Dinner for 12","images/dinner.jpg",["Indoors","Social","Food","Fancy"],"Join 11 other NU faculty and students for an enriching discussion and delicious, fancy meal!"),
        new discovery("Symphony","images/symphony.jpg",["Indoors","Fancy","Late Night","Music","Classical","Arts"],"The Chicago Symphony Orchestra will be visiting Bienen School of Music for a live concert! Don't miss it!"),
        new discovery("Clothing Sale","images/shopping.jpg",["Evanston","Indoors","Cheap"],"Come to the biggest sale event at the Chicago Water Tower! All stores will be giving discounted prices!"),
        new discovery("Barbeque","images/barbeque.jpg",["Outdoors","Food","Social", "Charity"],"NU’s service fraternity is hosting a barbeque to raise money for the American Cancer Society."),
        new discovery("Intramural Basketball","images/basketball.jpg",["Indoors","Sports","Social","Morning"],"Join your neighbours at Plex for a friendly and fun game of intramural basketball! All are welcome!"),
        new discovery("Waiting for Superman","http://philanthropy.com/img/photos/biz/photo_6152_landscape_large.jpg",["Indoors","Educational","Student"],"NU\'s Students for Educational Reform group is hosting a film screening of Waiting for Superman which highlights educational inequalities. Come join!"),
        new discovery("Navy Pier","http://www.huenelectric.com/images/navy-pier.jpg", ["Chicago", "Outdoors","Cheap", "Morning", "Afternoon"],"Navy Pier on the Chicago shoreline of Lake Michigan has tons of activities!"),
        new discovery("Art Institute", "http://cmsimg.freep.com/apps/pbcsi.dll/bilde?Site=C4&Date=20130202&Category=COL21&ArtNo=302020018&Ref=V2&MaxW=300&Border=0&Can-you-afford-to-go-to-Chicago-How-to-beat-high-prices-in-low-season", ["Museum","Chicago","Free", "Arts", "Fancy", "Educational"],"NU Students get free admission to Chicago\'s premiere Art Museum!"),
        new discovery("Romeo and Juliet","http://mamasmission.com/wp-content/uploads/2014/02/romeo-and-juliet-dvd-bluray-RJ_00269_rgb-300x200.jpg",["Theatre","Arts","Student","Evanston"],"Northwestern\'s very own Shakespeare Club is presenting a rendition of Romeo and Juliet for all students to see! Come see the classic play!"),
        new discovery("Battle of the Bamboo","http://frontpagephilippinestv.files.wordpress.com/2009/10/muslim_singkil.jpg?w=300",["Chicago","Arts","Cultural","Student","Dance","Cheap"],"The greatest cultural dance competition returns this year to Loyola! Come see the greatest performances of traditional Filipino dances in all of the country!"),
        new discovery("A capella Show","http://www.statepress.com/wp-content/uploads/2013/04/4.7_Awards-300x200.jpg",["A capella","Arts","Student","Evanston","Cheap"],"Join us for an amazing show showcasing all of Northwestern’s greatest singing talent! Be amazed by the talent of these singers!"),
        new discovery("Second City Comes to NU","http://chicagotonight.wttw.com/sites/default/files/styles/article-medium/public/_DSC7920.jpg",["Comedy","Theatre","Evanston","Cheap"],"The greatest comedy group in all of Chicago is coming to Northwestern for one amazing show! Don’t miss it!"),
        new discovery("NU Seniors Bar Crawl","http://img.ehowcdn.com/article-new-thumbnail/ehow/images/a07/pb/g6/bachelorette-bar-crawl-shirt-ideas-800x800.jpg",["21+","Evanston","Social","Late Night"],"Join all the seniors for one last celebration of Northwestern education in a fun-filled, crazy night at all of Evanston\'s bars!"),
        new discovery("Todoroki 2 for 1","http://thinkprogress.org/wp-content/uploads/2011/10/sushi-300x200.jpg",["Food","Evanston","Cheap","Late Night"],"Eat Todoroki\'s famous and delicious sushi at a discount for a limited time! Buy one order of All-You-Can-Eat-Sushi and get another free!"),
        new discovery("Race for the Cure","http://www.komennyc.org/images/2012/news/10/kr1.jpg",["Charity","Sports","Social","Evanston"],"Improve your health and enjoy some healthy competition while helping raise funds for cancer research! This race has it all! Come!"),
        new discovery("NU Multicultral Roundtable","http://da667c05575bfdc58711-5dffacd9e52409e30893171547b31e3f.r75.cf1.rackcdn.com/About_Roundtables.jpg",["Cultural","Social","Student","Fancy"],"Join the Northwestern multicultural community for a roundtable discussion on issues on our campus!"),
        new discovery("Winter Formal","http://www.brides.com/images/2009_brideslocal/fw_09/nat_afterpartynew.jpg",["Social","Fancy","Student","Late Night"],"Experience a night on a boat that you will never forget with your fellow Residential College residents! Formal wear is a must."),
        new discovery("Art Exhibit","http://nationalpeanutboard.org/content/uploads/fromefl/nutropolitan2.jpg",["Arts","Student","Free","Fancy"],"Come and see the works of the talented art majors of Northwestern University! See NU's creativity in this amazing exhibit!"),
        new discovery("McCormick Job Fair","http://bloximages.newyork1.vip.townnews.com/theshorthorn.com/content/tncms/assets/v3/editorial/d/ba/dba6f41a-209b-11e3-9ecf-001a4bcf6878/523a0480df4b2.preview-300.jpg",["Educational","Student","Free","Fancy"],"Are you an engineering major looking for an internship or a job? Come to the annual McCormick Job fair and meet a wide variety of employers!"),
        new discovery("Charity Bake Sale","http://gigaom2.files.wordpress.com/2013/08/bake-sale-crop.jpg?w=300&h=200&crop=1",["Charity","Food","Cheap","Student"],"Stop by Tech lobby and enjoy some tasty treats! Help us raise funds for typhoon relief in the Philippines! Every donation counts!"),
        
        new discovery("Beach Party","images/beach.jpg",["Outdoors","Social","Free","Food","Late Night"],"Come to North Beach for an off-the-hook party with amazing food and people that you will want to meet!")
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