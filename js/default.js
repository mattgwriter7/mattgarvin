
// 	LEFT OFF: I added spinner and fetch
//	NEXT: 

var APP = {};
		APP.alljobs_clicked = false;		
		APP.blink_max = 25;			//	how many blinks to, er, blink?
		APP.blink = false;			//	visible or hidden?	
		APP.things_index = 2;
		APP.things_arr = [
			'','','',
			'My wife begged me to reconsider using that goofy picture. ("Who would hire that dweeb?" she asked.)',			
			'I play online poker every week with my friends, while we Zoom, using Pokerstars. (Because in-person interactions are over-rated.)',
			'When I was a kid I collected beer cans. (Did you know really old beer cans were opened with a can opener? They were called "flat tops".)',
			'I dislike almonds and walnuts, but love cashews and pistachios <span class="material-icons _4x" >&#xe813;</span>',
			'In 2017 I traveled to Nashville to see a Total Solar Eclipse. (It was A-M-A-Z-I-N-G!) Another is happening in North America in 2024',
			'I have been to Mayan ruins in El Salvador (on a 7-month long backpacking trip through Central America)',
			'I am an avid podcast listener.  My top two are The Lex Fridman Podcast, and "Hardcore History" by Dan Carlin',
			'I play Settlers of Catan online and am currently ranked at Grandmaster',
			'Astronomy is one of my favorite topics. (Ask me about black holes, or impact craters, like the one in Sudbury!)',
			'As of 2017 I went from being a "UFO skeptic" to believing aliens are here on Earth right now! (The truth is out there...)',
			'I went to the University of Toronto, and while an undergrad I wrote a weekly cartoon in the college newspaper',
			'I have dual citizenship, with both USA and Canadian passports',
			'I love clean code.  Please look at my Github (which has this very site), or at least do a View Source and check things out here under the hood',
			'Ok, last one: When I was in my 20s I was in a contest to see how long competitors could stay awake with a hand on a car.  The winner got to keep the car. I lost'
		];

$(function() {
	
	// 	===========================================	
	//	MAIN FUNCTIONS
	// 	===========================================		

	function init() {
		console.log( 'Loaded version ' + window.ver );
    
		/*
		setTimeout(function(){ 
			$( '.fadein' ).fadeIn( 'fast', function() {
				// Animation complete
			});		
		}, 2000);
		*/
		
		setInterval(function () { blink() }, 333);
		
		return;
	}
	
	//	blink() is used to flash any elements
	//	that have class="blink"
	//		- it will blink APP.blink_max times
	//			( and uses data-blinks to keep count )
	function blink() {
		var blinks;
		APP.blink = !APP.blink;
		$( '.blink' ).each(function( index ) {
			blinks = parseInt($( this ).attr('data-blinks'));
			if ( blinks < (APP.blink_max*2) ) {
				if( APP.blink ) {
					$( this ).css('visibility','hidden');
				}
				else {
					$( this ).css('visibility','visible');
				}	
				$( this ).attr('data-blinks', blinks+1);
			}	
			else {
				//	if it is all "blinked out" make sure it 
				//	is visible!
				$( this ).css('visibility','visible');
			}	
		});		
		return;
	}

	// 	===========================================	
	//	EVENT HANDLERS (non-delegated)
	// 	===========================================	

	//	if the window is resized (or portait/landscape
	//	changed) do some house cleaning (like
	//	hiding tooltips)
	function resizeEvent() {
		console.log( 'resizeEvent()' );
		$( '.tooltip' ).remove();
		return;
	}
	
	
	//	click "show me!" button to show a Panel
	//	WILLFIX: If there is a need for more than
	//		one type of button this will need refactoring...
	$( 'button.show_me' ).click(function(){
		var panel = $(this).attr('data-panel'),
				sticky = $(this).attr('data-sticky');
		//	update spinner
		$( '#' + panel + ' .spinner' ).addClass('active');
		$( '#' + panel + ' .spinner_mssg' ).text('fetching...');
		if( sticky != undefined ) {
			//	hide the sticky ( not all buttons will do this )
			$( '#' + sticky ).fadeOut();
		}

		setTimeout(() => {
			//	load the panel content
			//	WILLFIX: ?? make this full on AJAX so I can
			//	add a slideDown ?? maybe, maybe not...
			$( '#' + panel ).load( './' + panel + '.htm',function(data){
				
			});			
		}, 2000);		
	});

	//	click "more!" button to see more about Matty G
	$( 'button.one_more' ).click(function(){
		APP.things_index++;
		if ( APP.things_index < APP.things_arr.length ) {
			$( '#things' ).html(APP.things_index+1);
			$( 'ol#three_things' ).append('<li>' + APP.things_arr[APP.things_index] + '</li>');
			if ( APP.things_index == APP.things_arr.length-1 ) $( '#more_things' ).fadeOut();	
		}
	});

	// 	===========================================	
	//	EVENT HANDLERS (delegated)
	// 	===========================================	

	//	click Stickies to hide		
	$('body').on('click', '.sticky',function( event ) {
		$( this ).fadeOut();
	});
	
	//	clicked "more jobs!" button 
	$('body').on('click', 'button#more_jobs',function( event ) {
		if( APP.alljobs_clicked == false ) {
			$( '#hidden_jobs' ).slideDown( "slow", function() {
				$( 'table#all_jobs button' ).addClass('greyed');
				$( 'table#all_jobs button' ).attr('disabled','true');
				$( 'table#all_jobs .blink' ).remove();
				$( '#sticky_jobs' ).fadeOut();
			});
		}	
		APP.alljobs_clicked = true;
		return;
	});

	//	if an alien image is clicked, show
	//	a tooltip
	$('body').on('click', 'img.aliens',function( e ) {	
		var tip = $( this ).attr('data-tooltip'),
				w = $(window).width();
		//	hide existing tooltips		
				$( '.tooltip' ).remove();
		//	show the new one		
		$('body').append('<div class="tooltip" style="top: ' + ((e.pageY)-50) + 'px; right: ' + (w-(e.pageX)).toString() + 'px">' + tip + '</div>');
	});
	
	// 	===========================================
	//	INITIALIZE 
	// 	===========================================
	
	window.addEventListener("resize", resizeEvent );
	init();
	
});