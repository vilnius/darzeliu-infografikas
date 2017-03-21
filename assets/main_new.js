
var sritisChart = dc.rowChart("#sritisChart");
var formaChart = dc.rowChart("#formaChart");


var dsv = d3.dsv(";", "text/plain");

Number.prototype.formatMoney = function(c, d, t){
var n = this, 
    c = isNaN(c = Math.abs(c)) ? 2 : c, 
    d = d == undefined ? "," : d, 
    t = t == undefined ? " " : t, 
    s = n < 0 ? "-" : "", 
    i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", 
    j = (j = i.length) > 3 ? j % 3 : 0;
   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
 };

function pieChart(dimension, id, all, w, h){
	
    var chart = dc.pieChart("#"+id);
    var group = dimension.group();
    var renderTitle=false;
    
    if(typeof w == 'undefined'){
    	w=350;
    }
    if(typeof h == 'undefined'){
    	h=350;
    }
    
    chart
        .width(w) // (optional) define chart width, :default = 200
        .height(h) // (optional) define chart height, :default = 200
        .radius((h-20)/2) // define pie radius
        .dimension(dimension) // set dimension
        .group(group) // set group
        .label(function (d) {
            if (chart.hasFilter() && !chart.hasFilter(d.key)) {
                return d.key + ' (0%)';
            }
            var label = d.key;
            if (all.value()) {
                label += ' (' + (d.value / all.value() * 100).formatMoney(2) + '%)';
            }
            return label;
        });
}

dsv('data/new.csv', function(data){
//dsv('data/kulturosfinansavimas.csv', function (data) {
    /* since its a csv file we need to format the data a bit */
    var dateFormat = d3.time.format('%m/%d/%Y');
    var numberFormat = d3.format('.2f');
	
	var prio1 = 0;
	var prio2 = 0;
	var prio3 = 0;
	var prio4 = 0;
	var prio5 = 0;
	
    data.forEach(function (d) {
    	
    	d.suma=parseFloat(d["Skirta suma, EUR"].replace('€', '').replace(',',''));
    	d.asked=parseFloat(d["Iš KRF prašoma suma, EUR"].replace('€', '').replace(',',''));
    	
    	if(isNaN(d.asked))
    	d.asked=0;
    	if(isNaN(d.suma))
    	d.suma=0;
    	console.log(d);
    	d.fi=d.suma/d.asked*100;
    	
    	d.sritis=d['Kultūros ir meno sritis (jei nepasirinkta, rašome "Nenurodyta")'].trim();
    	
    	prio1+=d['Kultūra regionuose (jei pasirinkta, žymime x)']=='x'?1:0;	
    	prio2+=d['Kultūros prieinamumo didinimas visoms amžiaus ir socialinėms grupėms (jei pasirinkta, žymime x)']=='x'?1:0;	
    	prio3+=d['Kultūros produktų ir paslaugų inovacijos (jei pasirinkta, žymime x)']=='x'?1:0;
    	prio4+=d['Kultūros tapatumas, lietuvių kalbos gyvybingumo išsaugojimas (jei pasirinkta, žymime x)']=='x'?1:0;	
    	prio5+=d['Vaikų ir jaunimo kultūrinis ugdymas (jei pasirinkta, žymime x)']=='x'?1:0;
    });
	
    var ndx = crossfilter(data);
    var all = ndx.groupAll();
    
	var zipCodeDimension = ndx.dimension(function (d) {
        return d['Projekto pavadinimas'];
    });
    
    var prio1Dimension = ndx.dimension(function (d) {
    	switch(true){
    		case d['Kultūra regionuose (jei pasirinkta, žymime x)']=='x':
    			return 'Kultūra regionuose';
    		default:
    			return 'Kita';
    	}
    });
    
    pieChart(prio1Dimension, 'prio1Chart', all, 220,220, 'Kultūra regionuose');
    
    var prio2Dimension = ndx.dimension(function (d) {
    	switch(true){
    		case d['Vaikų ir jaunimo kultūrinis ugdymas (jei pasirinkta, žymime x)']=='x':
    			return 'Vaikų ir jaunimo kultūrinis ugdymas';
    		default:
    			return 'Kita';
    	}
    });
    
    pieChart(prio2Dimension, 'prio2Chart', all, 220,220);
    
    var prio3Dimension = ndx.dimension(function (d) {
    	switch(true){
    		case d['Kultūros produktų ir paslaugų inovacijos (jei pasirinkta, žymime x)']=='x':
    			return 'Kultūros produktų ir paslaugų inovacijos';
    		default:
    			return 'Kita';
    	}
    });
    
    pieChart(prio3Dimension, 'prio3Chart', all, 220,220);
    
    var prio4Dimension = ndx.dimension(function (d) {
    	switch(true){
    		case d['Kultūros prieinamumo didinimas visoms amžiaus ir socialinėms grupėms (jei pasirinkta, žymime x)']=='x':
    			return "Kultūros prieinamumo didinimas";
    		default:
    			return 'Kita';
    	}
    });
    
    pieChart(prio4Dimension, 'prio4Chart', all, 220,220);
    
    var prio5Dimension = ndx.dimension(function (d) {
    	switch(true){
    		case d['Kultūros tapatumas, lietuvių kalbos gyvybingumo išsaugojimas (jei pasirinkta, žymime x)']=='x':
    			return 'Kultūros tapatumas, lietuvių kalbos gyvybingumo išsaugojimas';
    		default:
    			return 'Kita';
    	}
    });
    
    pieChart(prio5Dimension, 'prio5Chart', all, 220,220);
    
    var programDimension = ndx.dimension(function (d) {

    	switch(true){
    		case d['Programos Nr.']=='1':
    			return 'Skaitymo skatinimo iniciatyvos';
    		case d['Programos Nr.']=='2':
    			return 'Vaikams ir jaunimui skirti kultūros bei kultūrinės edukacijos projektai, meno renginiai, kuriuose dalyvauja vaikai ir jaunimas';
    		case d['Programos Nr.']=='5':
    			return 'Meno kūrėjų organizacijų kūrybinių programų įgyvendinimas';
    		case d['Programos Nr.']=='7':
    			return 'Lietuvos kultūros ir meno pristatymas užsienyje';
    		case d['Programos Nr.']=='8':
    			return 'Lietuvos kultūros organizacijų dalyvavimas Europos Sąjungos programos „Kūrybiška Europa“ paprogramėje „Kultūra“';
    		case d['Programos Nr.']=='9.1':
    			return 'Lietuvos nacionalinio paviljono 56-oje Venecijos šiuolaikinio meno bienalėje 2015 m. įgyvendinimas';
    		case d['Programos Nr.']=='9.2':
    			return 'Pasirengti įgyvendinti Lietuvos nacionalinį paviljoną 15- oje Venecijos architektūros bienalėje 2015 m. ir įgyvendinti projektą 2016 m.';
    		case d['Programos Nr.']=='10':
    			return 'Lietuvoje rengiami tęstiniai tarptautiniai kultūros ir meno renginiai';
    		case d['Programos Nr.']=='11':
    			return 'Lietuvoje rengiami tęstiniai prioritetiniai mėgėjų meno renginiai';
    		case d['Programos Nr.']=='12':
    			return 'Lietuvoje rengiami tarptautiniai muzikos atlikimo meno konkursai';
    		case d['Programos Nr.']=='15.1':
    			return 'Projektai, skatinantys Lietuvos gyventojų pilietiškumą, politinį aktyvumą ir patriotiškumą';
    		case d['Programos Nr.']=='16.2':
    			return 'Atminties institucijose saugomų kilnojamųjų kultūros vertybių restauravimas ir konservavimas';
    		default:
    			return 'Prioritetai';
    	}
    });
    
    pieChart(programDimension, 'programChart', all, 660,660);
    
    var sumRangesDimension = ndx.dimension(function (d) {
    	
    	switch(true){
    		case d.suma==0:
    			return 'Nefinansuota';
    		case d.suma<=2000:
    			return 'iki €2000';
    		case d.suma>2000 && d.suma<=3000:
    			return 'Nuo €2k iki €3k'; 
    		case d.suma>3000 && d.suma<=5000:
    			return 'Nuo €3k iki €5k'; 
    		case d.suma>5000 && d.suma<=10000:
    			return 'Nuo €5 iki €10k'; 
    		case d.suma>10000:
    			return '€10k ir daugiau'; 
    	}
    	
    });
        
    
    pieChart(sumRangesDimension, 'sumRangesChart', all);
    

    var wasFinancedDimension = ndx.dimension(function (d) {
    	switch(true){
    		case d.suma==0:
    			return 'Ne';
    		case d.suma>0:
    			return 'Taip';
    	}
    });
    
    pieChart(wasFinancedDimension, 'wasFinancedChart', all);
        
    var sritisDimension = ndx.dimension(function (d) {
    	return d.sritis;
    });
        
    var sritisGroup = sritisDimension.group();
    
    sritisChart
        .width(1170) // (optional) define chart width, :default = 200
        .height(650) // (optional) define chart height, :default = 200
        .margins({top: 0, left: 0, right: 0, bottom: 0})
        .dimension(sritisDimension)
        .group(sritisGroup) // set group
        .label(function (d) {
            if (sritisChart.hasFilter() && !sritisChart.hasFilter(d.key)) {
                return d.key + ' (0%)';
            }
            var label = d.key;
            if (all.value()) {
                label += ' (' + (d.value / all.value() * 100).formatMoney(2) + '%)';
            }
            return label;
        })
        .title(function (d) {
            return d.sritis;
        }).gap(1)
        .elasticX(true)
        .xAxis(); 
        
    var formaDimension = ndx.dimension(function (d) {
    	return d['Juridinis statusas'];
    });
        
    var formaGroup = formaDimension.group();
    
    formaChart
        .width(400) // (optional) define chart width, :default = 200
        .height(350) // (optional) define chart height, :default = 200
        .dimension(formaDimension) // set dimension
        .group(formaGroup) // set group
        .label(function (d) {
            if (formaChart.hasFilter() && !formaChart.hasFilter(d.key)) {
                return d.key + ' (0%)';
            }
            var label = d.key;
            if (all.value()) {
                label += ' (' + d.value + ')';
            }
            return label;
        });
        
	dc.dataCount('.dc-data-count')
        .dimension(ndx)
        .group(all)
        .html({
            some:'<strong>%filter-count</strong> iš <strong>%total-count</strong> įrašų' +
                ' | <a href=\'javascript:dc.filterAll(); dc.renderAll();\'\'>Atstatyti</a>',
            all:'Rodomi visi įrašai. '
        });

    dc.dataTable('.dc-data-table')
        .dimension(zipCodeDimension)
        .group(function (d) {
            return d.sritis;
        })
        .sortBy(function (d) {
            return d.suma;
        })
        .order(d3.descending)
        .size(2000)
        .columns([
        	["Vykdytojas",
	        function (d) {
	            return d['Juridinis statusas'] + ' ' + d['Pareiškėjo pavadinimas'];
	        }],
	        ["Projektas",
	        function (d) {
	            return d['Projekto pavadinimas'];
	        }],
	        ["Prašoma suma",
	        function (d) {
	            return '&euro;'+d.asked.formatMoney(2);
	        }],
	        ["Skirta suma",
	        function (d) {
	            return '&euro;'+d.suma.formatMoney(2);
	        }],
	        ["Finansavimo intensyvumas",
	        function (d) {
	            return d.fi.formatMoney(2)+'%';
	        }]
    	]);
    
	  var sumaGroup = ndx.groupAll().reduce(
          function (p, v) {
              ++p.n;
              p.tot += v.suma;
              return p;
          },
          function (p, v) {
              --p.n;
              p.tot -= v.suma;
              return p;
          },
          function () { return {n:0,tot:0}; }
      );
	
	var avgSumaAccessor = function(d) {
	    return d.n ? d.tot / d.n : 0;
	};
	var sumaAccessor = function(d) {
	    return d.tot;
	};
	
    var display1 = dc.numberDisplay("#runningSum").valueAccessor(sumaAccessor).group(sumaGroup).formatNumber(d3.format(".2f"));
    dc.renderAll();

});

