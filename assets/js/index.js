$(document).ready(function(){

	$(".timeline-wrapper").timeline(); // initialize timeline

	// vertically center home and contact page
	$("#home-page").centerPage();
	$("#countdown").centerPage();
	//$("#contact-page").centerPage();

	// intro animation
	$(".page").hide();
	$(".sidebar").hide();
	$(".navigation-wrapper").hide();
	$("#home-page").show().addClass("animated bounceInDown");
	$(".sidebar").show().addClass("animated slideInLeft");
	$(".navigation-wrapper").show().addClass("animated bounceInDown");

	 

	// initialize countdown script
	$(".countdown-timer").countdown('2015/09/09', function(event){
		$(this).html(event.strftime(
			     '<li>%D</li>'
	       + '<li>jour%!D</li>'
	       + '<li>%H</li>'
	       + '<li>heure%!H</li>'
	       + '<li>%M</li>'
	       + '<li>min</li>'
	       + '<li>%S</li>'
	       + '<li>sec</li>'
		));
	});

	// handles page navigation
	$(".nav-pills a").on("click", function(event){
		event.preventDefault();
		page = "#"+$(this).attr("href")+"-page";
		item = $(this).parent();
		item.siblings().removeClass("active");
		item.addClass("active");
		$(".page:visible").addClass("animated bounceOutUp").hide();
		$(page).show().removeClass("animated bounceOutUp").addClass("animated bounceInDown");
	});

	//adds box shadow to input forms when focused
	$("input").focusin(function(){
		$(this).parent(".input-group").removeClass("newsletter-focus").addClass("newsletter-focus");
	});

	//removes box shadow from input forms when out of focus
	$("input").focusout(function(){
		$(this).parent(".input-group").removeClass("newsletter-focus");
	});

	$("textarea").focusin(function(){
		$(this).parent(".form-group").removeClass("newsletter-focus").addClass("newsletter-focus");
	});

	$("textarea").focusout(function(){
		$(this).parent(".form-group").removeClass("newsletter-focus");
	});

	if($(".time-entry").title == "123" )
	{
		(this).hide();
	}
	

	var batman_timeout;
	//bat signal on spiderman hover
	$(".spiderman-goal").hover(function(){
		//hover in
		var bat_call = '<div class="calling-batman">Calling Batman </div>';
		$("body > .container-fluid > .row").prepend($(bat_call));
		var $bat_div = $(".calling-batman");
		// On ajoute des petits points, comme le petit qui sème ses cailloux :3
		batman_timeout = setTimeout(function(){
			$bat_div.text($bat_div.text()+". ");
			batman_timeout = setTimeout(function(){
				$bat_div.text($bat_div.text()+". ");
				batman_timeout = setTimeout(function(){
					$bat_div.text($bat_div.text()+". ");
						batman_timeout = setTimeout(function(){
							// On appelle BATMAN !
							$bat_div.text("BATMAN !");
							$("body").addClass("bat-signal");
						}, 3000);
				}, 1000);
			}, 1000);
		}, 1000);
	},function(){
		//hover out
		clearTimeout(batman_timeout);
		$(".calling-batman").remove();
		$("body").removeClass("bat-signal");
	});


	function dateDiff(date1, date2){
	    var diff = {}                           // Initialisation du retour
	    var tmp = date2 - date1;
	 
	    tmp = Math.floor(tmp/1000);             // Nombre de secondes entre les 2 dates
	    diff.sec = tmp % 60;                    // Extraction du nombre de secondes
	 
	    tmp = Math.floor((tmp-diff.sec)/60);    // Nombre de minutes (partie entière)
	    diff.min = tmp % 60;                    // Extraction du nombre de minutes
	 
	    tmp = Math.floor((tmp-diff.min)/60);    // Nombre d'heures (entières)
	    diff.hour = tmp % 24;                   // Extraction du nombre d'heures
	     
	    tmp = Math.floor((tmp-diff.hour)/24);   // Nombre de jours restants
	    diff.day = tmp;
	     
	    return diff;
	}

	//Ajout un spiderman qui descend sur la page. La longueur de la corde dépends du rapprochement de la date d'integ
	function setSpiderman(){
		var startDate = new Date("2015-07-28");	//arbitraire mais il en faut une !
		// var endDate = new Date("2015-07-31");
		var endDate = new Date("2015-09-09");
		var nowDate = new Date();
		diffTotale = dateDiff(startDate,endDate);
		diffNow = dateDiff(nowDate,endDate);
		// console.log("Entre le START et END il y a "+diffTotale.day+" jours, "+diffTotale.hour+" heures, "+diffTotale.min+" minutes et "+diffTotale.sec+" secondes");
		// console.log("Entre le NOW et END il y a "+diffNow.day+" jours, "+diffNow.hour+" heures, "+diffNow.min+" minutes et "+diffNow.sec+" secondes");
		var taux_avancement = (diffTotale.day-diffNow.day)/diffTotale.day;	// Taux entre 0 et 1
		
		// Calcul des hauteur, et proportions
		var total_height = $(".spiderman-container").height();
		var goal_height = $(".spiderman-goal").height();
		var char_heigth = $(".spiderman-char").height();
		var max_rope_height = total_height - goal_height - char_heigth;

		if(taux_avancement == 1 && diffTotale.hour < 0){
			//TODAY
			//console.log("TODAY !");
			var rope_height_percent = max_rope_height/total_height;
			$(".spiderman-rope").css("height", ""+rope_height_percent*100+"%");
		}
		else if(nowDate > endDate){
			// PASSED
			// console.log("PASSED !");
			var rope_height_percent = max_rope_height/total_height;
			$(".spiderman-rope").css("height", ""+rope_height_percent*100+"%");
		}
		else if(nowDate < endDate){
			//INCOMING
			// console.log("INCOMING !");
			var rope_height_percent = (taux_avancement*max_rope_height)/total_height;
			$(".spiderman-rope").css("height", ""+rope_height_percent*100+"%");
		}
	}

	// GOGO SPIDER GO
	setSpiderman();


	//Scroll To Top Button
	// Scroll dans le navigateur (px) avant de faire apparaitre le lien 
	var offset = 300,
		//Scroll avant de changer l'opacité du bouton
		offset_opacity = 1200,
		//durée de l'animation de scroll
		scroll_top_duration = 700,
		//outon back to top
		$back_to_top = $('.cd-top');

	//hide ou show le "back to top" link
	$(window).scroll(function(){
		( $(this).scrollTop() > offset ) ? $back_to_top.addClass('cd-is-visible') : $back_to_top.removeClass('cd-is-visible cd-fade-out');
		if( $(this).scrollTop() > offset_opacity ) { 
			$back_to_top.addClass('cd-fade-out');
		}
	});

	//animation du scroll to top
	$back_to_top.on('click', function(event){
		event.preventDefault();
		$('body,html').animate({
			scrollTop: 0 ,
		 	}, scroll_top_duration
		);
	});

});

// make's sure the home and contact pages remain vertically centerd when the window resizes
$( window ).resize(function(){
	$("#home-page").centerPage();

	// hides the sidebar when the page is viewed on small screens
	toggleSidebar();

	$home = $("#home-page");
	if($home.css("margin-top")[0] == "-")
		$home.css("margin-top",0);

	$(".timeline-wrapper").timeline(); // initialize timeline
});

$(window).load(function(){
	toggleSidebar();
	$home = $("#home-page");
	if($home.css("margin-top")[0] == "-")
		$home.css("margin-top",0);
});

// ************* Helper Functions **************

//vertically centers the page
$.fn.centerPage = function(){
	windowHeight = $(window).height();
	divHeight = $(this).height();
	topMargin = windowHeight/2 - divHeight/2 - 65;
	$(this).css("margin-top", topMargin);
};


// hides sidebar on small screens
function toggleSidebar(){
	width = $(window).width();
	height = $(window).height();
	if(width < 768 ){
		$(".sidebar").hide();
	}else if(width >= 768){
		$(".sidebar").show();
		if(height < 780 )
		{
			$("#img-coundown").hide();
			$("#img-coundown").css({"margin-bottom" : "0%"});
			$("#txt-coundown").css({"margin-top" : "10%"});
		} else if (height >= 780) {
			$("#img-coundown").show();
			$("#img-coundown").css({"margin-bottom" : "-35%"});
			$("#txt-coundown").css({"margin-top" : "50%"});
		}
	}
}
