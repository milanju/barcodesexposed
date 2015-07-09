var ladderAPI = "https://eu.api.battle.net/sc2/ladder/grandmaster?locale=en_GB&apikey=hqcmbnfhfr6xuzmt29yrkcy3a23ekjz2";
var alias;
$.getJSON('https://dl.dropboxusercontent.com/s/tyhsuf2poddp89b/alias.json').done (function(data) {
alias = data;
$.getJSON(ladderAPI)
  .done(function( data ) {
    var name;
    $.each( data.ladderMembers, function(i, item) {
      name = item.character.displayName;
      $.each(alias.exposedBarcodes, function(j, jtem) {
        if(item.character.id === jtem.id) {
          name += " // " + jtem.alias;
        }
      });
      $( "<p>" + name + "</p>" ).appendTo( "#ladder" );
    });
  });
});
