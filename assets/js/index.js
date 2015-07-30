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
	$(".countdown-timer").countdown('2015/08/01', function(event){
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
	
	$("a.togglemap").click(function() {
		$(this).parents("li").children(".map").slideToggle(200);
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
