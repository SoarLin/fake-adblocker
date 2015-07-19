/*
    name: contentscript.js
*/

(function() {

$(document).ready(function() {
    
	var getOpenData = function() {
		return "你知道 ubike 南港站最多可以停幾輛腳踏車？";
	}
	var showPixnet = function() {
		var pixnet = document.createElement("img");
		$(pixnet).addClass("pixnet-logo").delay(1000).fadeOut();
		pixnet.src = chrome.extension.getURL('icons/icon-128.png');
		$("body").append(pixnet);	
	}
	var autoResize = function() {
		// flowtype.js auto resize font size
		$('.open-ads').flowtype({
		   minimum   : 500,
		   maximum   : 1800,
		   minFont   : 12,
		   maxFont   : 60,
		   fontRatio : 18
		});
	}

	// adblocker rules
    var target_dom = [	"www.books.com.tw##.bg_ad",
    					"www.books.com.tw##.header_box6",
    					"www.books.com.tw##.flash_banner",
    					"www.mobile01.com##.catbar-ad",
    					"www.mobile01.com##.ad-c",
    					"www.mobile01.com##.ad2_55642",
    					"www.mobile01.com##.ad-a1",
    					"www.bing.com##.b_ad"
    ];

    for (i = 0; i < target_dom.length; i++) {
    	var target_set = target_dom[i].split("##");
    	var target_domain = target_set[0];
    	var target_element = target_set[1];
    	
    	if (window.location.href.indexOf(target_domain) != -1) {
    		var ads_container = "";

    		var ads_text = document.createElement("div");

    		$(target_element).css("display", "none");

    		if($(target_element).is('div')){
				ads_container = document.createElement("div");	 
			} else if ($(target_element).is('img')) {
				ads_container = document.createElement("img");
			} else if ($(target_element).is('li')) {
				ads_container = document.createElement("li");
			}

			$(ads_container).addClass("open-ads");
			$(ads_text).addClass("open-ads-text");

	    	$(ads_container).css({
		    	"width": $(target_element).width(),
		    	"height": $(target_element).height()
		    });

	    	$(ads_text).text(getOpenData());
	    	$(ads_container).append(ads_text);
	    	
		    $(ads_container).insertAfter(target_element);
    	}
	}
	
	showPixnet();
	autoResize();

	// panel
	/*
	var panel = document.createElement("div");
	$(panel).addClass("ranking-panel");
    $("body").append(panel);
    */
});

})();



