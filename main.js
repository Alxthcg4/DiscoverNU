/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function() {
    alert("Document ready.");
    updateFilters();
    $('#new_discovery').click(function(){
        alert("Test!");
    });
});

function updateFilters() {
    for (var i = 0;i<12;i++) {
        currentFilters = $("#filters").html();
        filterString = []
        $("#filters").html(currentFilters+
            "<div class=\"panel panel-default\">\n\
                <div class=\"panel-body\">\n\
                    Filter\n\
                    <button type=\"button\" class=\"btn btn-primary btn-xs pull-right filter_plus\">+</button>\n\
                </div>\n\
            </div>");
    }
}