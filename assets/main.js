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


function rowChart(dimension, id, all, w, h){
	
    var chart = dc.rowChart("#"+id);
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
        .dimension(dimension) // set dimension
        .group(group) // set group
        .margins({top: 5, left: 0, right: 0, bottom: 5})
        .label(function (d) {
            if (chart.hasFilter() && !chart.hasFilter(d.key)) {
                return d.key + ' (0%)';
            }
            var label = d.key;
            if(label=='201512'){
            	label='2015-12';
            }
            if (all.value()) {
                label += ' ('+ d.value + ' - ' + (d.value / all.value() * 100).formatMoney(2) + '%)';
            }
            return label;
        })
        .ordering(function(d){ return -d.value });;
}

dsv('https://raw.githubusercontent.com/vilnius/darzeliai/master/data/laukianciuju_eileje_ataskaita.csv', function(data){

    var dateFormat = d3.time.format('%m/%d/%Y');
    var numberFormat = d3.format('.2f');
	
	var prio1 = 0;
	var prio2 = 0;
	var prio3 = 0;
	var prio4 = 0;
	var prio5 = 0;
	
	var currentYear = parseInt(new Date().getFullYear());
	var laukiaSiemet=0;
	var laukiaVeliau=0;
	console.log(currentYear);
    data.forEach(function (d) {
    	
    	var year=parseInt(d['Prašymo pateikimo data'].substring(0,4));
    	var month=parseInt(d['Prašymo pateikimo data'].substring(5,7));
    	
		if(year==2015){
			if(month==12){
				d.prasymoPateikimoMetai=(year+'12');
			}
			else{
				d.prasymoPateikimoMetai=year;
			}
		}   
		else{
	    	d.prasymoPateikimoMetai=year;
	    }

		if(d['Vaiko gimimo data']=="")
		d.gimimoMetai="Nenurodyta";
		else
    	d.gimimoMetai=parseInt(d['Vaiko gimimo data'].substring(0,4));
    	
    	d.lankymoMetai=parseInt(d['Lankymo data'].substring(0,4));

		if(d.lankymoMetai<=currentYear){
			laukiaSiemet++;
		}
		else{
			laukiaVeliau++;
		}
    	
    	d.deklaruotasMieste=d['Prioritetas (deklaruotas mieste)'];
    	d.grupe=d["1 darželio grupės tipas"];
    	d.darzelis1=d["1 pasirinktas darželis"];
    	d.darzelis2=d["2 pasirinktas darželis"];
    	
    	if(d['Vaiko seniunija']=="" || d['Vaiko seniunija']=="visos"){
    		d.seniunija="Visos seniūnijos";
    	}
    	else{
    		d.seniunija=d['Vaiko seniunija'];
    	}
    });
	
    var ndx = crossfilter(data);
    var all = ndx.groupAll();
    
	var prasymoPateikimoMetaiDimension = ndx.dimension(function (d) {
        return d.prasymoPateikimoMetai;
    });

    rowChart(prasymoPateikimoMetaiDimension, 'prio1Chart', all, 555,350);

	var gimimoMetaiDimension = ndx.dimension(function (d) {
        return d.gimimoMetai;
    });

    rowChart(gimimoMetaiDimension, 'gimimoMetaiChart', all, 555,350);
    
	var lankymoMetaiDimension = ndx.dimension(function (d) {
        return d.lankymoMetai;
    });

    rowChart(lankymoMetaiDimension, 'lankymoMetaiChart', all, 555,350);
    
	var deklaruotasMiesteDimension = ndx.dimension(function (d) {
        return d.deklaruotasMieste;
    });

    pieChart(deklaruotasMiesteDimension, 'deklaruotasMiesteChart', all, 555,555);

	var seniunijaDimension = ndx.dimension(function (d) {
        return d.seniunija;
    });

    rowChart(seniunijaDimension, 'seniunijaChart', all, 555,555);
    
	var darzelis1Dimension = ndx.dimension(function (d) {
        return d.darzelis1;
    });

    rowChart(darzelis1Dimension, 'darzelis1Chart', all, 555,2555);
    
	var darzelis2Dimension = ndx.dimension(function (d) {
        return d.darzelis2;
    });

    rowChart(darzelis2Dimension, 'darzelis2Chart', all, 555,2555);
    /*
	var grupeDimension = ndx.dimension(function (d) {
        return d.grupe;
    });

    rowChart(grupeDimension, 'grupeChart', all, 900,700);*/
    
	dc.dataCount('.dc-data-count')
        .dimension(ndx)
        .group(all)
        .html({
            some:'<strong>%filter-count</strong> iš <strong>%total-count</strong> įrašų' +
                ' | <a href=\'javascript:dc.filterAll(); dc.renderAll();\'\'>Atstatyti</a>',
            all:'Rodomi visi %total-count įrašai. '
        });
        
    dc.dataCount('#totalCount')
        .dimension(ndx)
        .group(all)
        .html({
            some:'Skaičius vaikų šiuo metu laukiančių į Vilniaus miesto savivaldybės valstybinius darželius: <strong class="red">%total-count</strong>.',
            all:'Skaičius vaikų šiuo metu laukiančių į Vilniaus miesto savivaldybės valstybinius darželius: <strong class="red">%total-count</strong>.'
        });
	document.getElementById('laukiaSiemet').textContent=laukiaSiemet;
	document.getElementById('laukiaVeliau').textContent=laukiaVeliau;
    dc.renderAll();

});

