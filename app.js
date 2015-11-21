$(document).ready(function() {
  $(".app-content").hide();
  var ladderAPI = "https://eu.api.battle.net/sc2/ladder/176680?locale=en_GB&apikey=hqcmbnfhfr6xuzmt29yrkcy3a23ekjz2";
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
        var race;
        $.each(data.ladderMembers, function(i, item) {
          region = "EU";
          name = item.character.displayName;
          id = item.character.id;
          wins = item.wins;
          losses = item.losses;
          points = item.points;
          switch (item.favoriteRaceP1) {
            case "TERRAN":
              race = "terran";
              break;
            case "ZERG":
              race = "zerg";
              break;
            case "PROTOSS":
              race = "protoss";
              break;
            case "RANDOM":
              race ="random";
              break;
          }
          $.each(alias.exposedBarcodes, function(j, jtem) {
            if(item.character.id === jtem.id) {
              name += " <div class='aka'>aka</div> " + jtem.alias;
            }
          });
          name = "<a href='http://eu.battle.net/sc2/en" + item.character.profilePath + "' target='_blank'>" + name + "</a>";
          name = "<img src='images/" + race + ".png' alt='" + race + "'>" + name;
          $("<tr><td id='rank-th'>" + rank
          + "</td><td class='mdl-data-table__cell--non-numeric'>" + region
          + "</td><td class='mdl-data-table__cell--non-numeric'>" + name
          + "</td><td>" + wins
          + "</td><td>" + losses
          + "</td><td>" + points
          + "</td></tr>").appendTo("#ladder-table-body");
          rank++;
        });
        $(".mdl-spinner").hide();
        $(".app-content").fadeIn();
      });
  });

});
