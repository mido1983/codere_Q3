"use strict";

// wrap logic in anonymous function
(function(){

    //=======================================================
    //----====== GET JSON || GET JSON || GET JSON ======-----
    //=======================================================

    var games = $.getJSON({
        url:"games.json",
        async:false,
        method:"POST"
    });
    games = games.responseJSON;
    console.log(games)


    //=======================================================
    //----====== CREATE TABLE GAME || CREATE TABLE GAME ======-----
    //=======================================================

    function create_preGameView(game){

     var gameHtml =    $("<div>",{class:"container gameWrap"}).append
        (
            $("<div>",{class:"row gameTop"}).append
            (
                $("<div>",{class:"col-4 logoHome"}).append
                (
                    $("<img>",{src:"assets/" + game.homeName.replaceAll(" ","_") + ".png" , class:"img-thumbnail playerLogo"})
                ),
                $("<div>",{class:"col-4 players"}).append
                (
                    $("<div>",{class:"playerHome",text:game.homeName}),
                    $("<div>",{class:"vs",text:"VS"}),
                    $("<div>",{class:"playerAway",text:game.awayName})
                ),
                $("<div>",{class:"col-4 logoAway"}).append
                (
                    $("<img>",{src:"assets/" + game.awayName.replaceAll(" ","_") + ".png" , class:"img-thumbnail playerLogo"})
                ),
            ),
            $("<div>",{class:"row gameBottom"}).append(
                $("<div>",{class:"col-4 score" }).append(
                    $("<div>",{ text:game.homeName}),
                    $("<div>",{ text:"+" +game.homeOdds}),
                ),
                $("<div>",{class:"col-4 score"}).append(
                    $("<div>",{ text:"Empate"}),
                    $("<div>",{ text:"+" +game.drawOdds}),
                ),
                $("<div>",{class:"col-4 score"}).append(
                    $("<div>",{ text:game.awayName}),
                    $("<div>",{ text:"+" +game.awayOdds}),
                ),
            )

        )

        return gameHtml;

    }

    function init(){
        games.games.forEach(element => $("body").append(create_preGameView(element)));
    }
    init();


    //=====================================================================
    //----====== SAVE TO LOCAL STORAGE || SAVE TO LOCAL STORAGE ======-----
    //=====================================================================


    function saveToStorage(key , value){
        try{
            value = JSON.stringify(value);
        }catch(e){}
        localStorage.setItem(key,value);
    }

    saveToStorage("list_of_games",games);


    //=====================================================================
    //----====== SEND GAME RESULTS || SEND GAME RESULTS ======-----
    //=====================================================================

    function sendGameResults(someData){
        let gameObj = {
                "league"    : someData.league,
                "id"        : someData.id,
                "homeName"  : someData.homeName,
                "homeOdds"  : someData.homeOdds,
                "awayName"  : someData.awayName,
                "awayOdds"  : someData.awayOdds,
                "drawOdds"  : someData.drawOdds
            }

        $.post("wwww.REST-API",JSON.stringify(gameObj),function(response){
            console.log(response);
        })
    }

    //================================================================
    //----====== CATCH ERROR || CATCH ERROR || CATCH ERROR ======-----
    //================================================================

    function catchExaption(err){
        // send to log
        console.log(err)
    }

})()

