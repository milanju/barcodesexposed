$(document).ready(function() {
  $(".app-content").hide();

  var ladderAPI = "https://eu.api.battle.net/sc2/ladder/grandmaster?locale=en_GB&apikey=hqcmbnfhfr6xuzmt29yrkcy3a23ekjz2";
  var alias;
  $.getJSON('https://dl.dropboxusercontent.com/s/tyhsuf2poddp89b/alias.json').done (function(data) {
  alias = data;
  $.getJSON(ladderAPI).done(function(data) {
      var id;
      var rank = 1;
      var region;
      var name;
      var wins;
      var losses;
      var points;
      $.each(data.ladderMembers, function(i, item) {
        region = "EU";
        name = item.character.displayName;
        id = item.character.id;
        wins = item.wins;
        losses = item.losses;
        points = item.points;
        $.each(alias.exposedBarcodes, function(j, jtem) {
          if(item.character.id === jtem.id) {
            name += " // " + jtem.alias;
          }
        });
        $("<tr><td id='rank-th'>" + rank + "</td><td class='mdl-data-table__cell--non-numeric'>" + region + "</td><td class='mdl-data-table__cell--non-numeric'>" + name + "</td><td>"
          + wins + "</td><td>" + losses + "</td><td>" + points + "</td></tr>")
          .appendTo("#ladder-table-body");
        rank++;
      });
      //$(".la-pacman").hide();
      $(".app-content").fadeIn();
    });
  });

});
