<!DOCTYPE html>
<html lang="en">
	<head>
	    
		<meta charset="utf-8">
		<title>Vietos darželiuose</title>
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta name="description" content="Vaikai laukiantys eilės į darželius">
		<meta name="author" content="Free Data">
		<meta property="og:title" content="Vietos darželiuose" />
		<meta property="og:image" content="https://www.vilnius.lt/images/VILNIUS_WHITE_RGB.png"/>
		<meta property="og:url" content="http://www.vilnius.lt/darzeliai/info"/>
		<link rel="canonical" href="http://www.vilnius.lt/darzeliai/info"/>
		<meta property="og:type" content="website" /> 
		<meta property="og:site_name" content="Vietos darželiuose"/>
		<meta property="og:description" content="Vaikai laukiantys eilės į darželius"/>
		<meta property="fb:admins" content="1189325999" />
		
		<meta property="article:author" content="https://www.facebook.com/povilas.poderskis" />
		<meta name="author" content="Povilas Poderskis" />
		
		<link rel="icon" type="image/png" href="https://www.vilnius.lt/images/VILNIUS_WHITE_RGB.png">
		<!-- Le styles -->
		<link href="http://www.freedata.lt/assets/bootstrap3/css/bootstrap.min.css" rel="stylesheet">	    	
		<link href="assets/branding/fonts/neris_light_lithuanian/stylesheet.css" rel="stylesheet">
		<link href="assets/branding/fonts/neris_black_lithuanian/stylesheet.css" rel="stylesheet">
		<link href="assets/branding/stylebook.css" rel="stylesheet">
		<link href="//cdnjs.cloudflare.com/ajax/libs/dc/2.0.0-alpha.2/dc.css" rel="stylesheet">
		<link href="assets/style.css?20150414" rel="stylesheet">
		
	</head>
	<body>
		
		<div id="fb-root"></div>
		<script>
		  window.fbAsyncInit = function() {
		    FB.init({
		      appId      : '433333213468559',
		      xfbml      : true,
		      version    : 'v2.1'
		    });
		  };
		
		  (function(d, s, id){
		     var js, fjs = d.getElementsByTagName(s)[0];
		     if (d.getElementById(id)) {return;}
		     js = d.createElement(s); js.id = id;
		     js.src = "//connect.facebook.net/en_US/sdk.js";
		     fjs.parentNode.insertBefore(js, fjs);
		   }(document, 'script', 'facebook-jssdk'));
		</script>	
		<div class="container">
		
			<h2>Pateikti prašymai į darželius</h2>
		
			<div class="row">
			    <div class="col-md-12">
					<p id="totalCount"></p>
					<p>Iš jų 1897 lanko privatų darželį.</p>
					
				</div>
			</div>
			
			<div class="row">
			    <div class="col-md-6 text-center">
			    	<p>Eilėje į darželį šiemet laukia:</p>
					<p id="laukiaSiemet" class="bignumber"></p>
				</div>
			    <div class="col-md-6 text-center">
			    	<p>Eilėje į darželį vėlesniais metais laukia:</p>
					<p id="laukiaVeliau" class="bignumber"></p>
				</div>
			</div>
			
			
			<div class="row">
			    <div class="col-md-12">
					<p>Duomenų šaltinis: <a href="https://github.com/vilnius/darzeliai">Vilniaus miesto savivaldybės atviri duomenys</a></p>
			    </div>
			</div>
		
			<hr />
			
			<div class="row">
				<div class="col-sm-12 col-md-6">
					<p>Eilėje laukiantys prašymai pagal prioritetus</p>
				</div>
			</div>
			<div class="row clear">
				<div class="col-sm-12 col-md-6">
					<h4>1 prioriteto darželis</h4>
					<p class="muted"></p>
					<div id="darzelis1Chart">
					</div>
				</div>
				<div class="col-sm-12 col-md-6">
					<h4>2 prioriteto darželis</h4>
					<p class="muted"></p>
					<div id="darzelis2Chart">
					</div>
				</div>
			</div>
			
			<hr />
			
			<div class="row clear">
				<div class="col-sm-12 col-md-6">
					<h4>Gimimo data</h4>
					<p class="muted">Vaikų laukiančių eilėje gimimo data</p>
					<div id="gimimoMetaiChart">
					</div>
				</div>
				<div class="col-sm-12 col-md-6">
					<h4>Prašymų pateikimo data</h4>
					<p class="muted">Skaičius paraiškų, šiuo metu laukiančių eilėje vaikų, pagal jų pateikimo metus</p>
					<div id="prio1Chart"></div>
				</div>
			</div>
			
			<hr />
			
			<div class="row">
				<div class="col-sm-12 col-md-6">
					<h4>Lankymo metai</h4>
					<p class="muted">Metai, kuriais norima pradėti lankyti darželį</p>
					<div id="lankymoMetaiChart">
					</div>
				</div>
				<div class="col-sm-12 col-md-6">
				</div>
			</div>
			
			<hr />
			
			<div class="row">
				<div class="col-sm-12 col-md-6">
					<h4>Seniūnija</h4>
					<p class="muted"></p>
					<div id="seniunijaChart">
					</div>
				</div>
				<div class="col-sm-12 col-md-6">
					<h4>Deklaruotas mieste</h4>
					<p class="muted"></p>
					<div id="deklaruotasMiesteChart"></div>
				</div>
			</div>
			
			<div class="row">
			    <div class="col-md-12 text-right">
			        <div class="dc-data-count text-right">
			            <span class="filter-count"></span> rodoma iš <span class="total-count"></span> įrašų | <a
			                href="javascript:dc.filterAll(); dc.renderAll();">Atstatyti</a>
			        </div>
			    </div>
			</div>
			
			<hr />
			
			<div class="row">
				<div class="col-sm-12 col-md-12">
					<h2>Privačių ir valstybinių darželių žemėlapis</h2>
					<iframe src="https://www.google.com/maps/d/u/1/embed?mid=zmMrLoOHG228.kGdnlcstFL-w" border="0" style="border:0;" width="100%" height="700"></iframe>
					<p>Pastabas dėl informacijos žemėlapyje rašyti <a href="mailto:webmaster@vilnius.lt">webmaster@vilnius.lt</a></p>
				</div>
			</div>
			
			<hr />
			
		</div>
			
		<div class="container">
			<div class="row-fluid">
				<div class="col-sm-6 col-md-5">
					<div class="fb-like" data-href="http://www.vilnius.lt/darzeliai/info" data-layout="standard" data-action="like" data-show-faces="true" data-share="true" fb></div>
				</div>
				<!-- Place this tag where you want the +1 button to render. -->
				<div class="col-sm-3 col-md-4">
					<div class="g-plusone" data-annotation="inline" data-width="300"></div>
				</div>
				<div class="col-md-3">
					<a href="https://twitter.com/share" class="twitter-share-button" data-via="freedataorg">Tweet</a>
					<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');</script>
				</div>
			</div>
		
		</div>	
		
		<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/d3/3.4.13/d3.js"></script>
		<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/crossfilter/1.3.11/crossfilter.min.js"></script>
		<script type="text/javascript" src="assets/d3/dc.js"></script>
		<script type="text/javascript" src="http://dc-js.github.io/dc.js/js/colorbrewer.js"></script>
		<script type="text/javascript" src="assets/main.js"></script>

	</body>
</html>