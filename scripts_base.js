var stispace=new Array();
function setTI(todos,interval) {
	if(stispace[todos].length == 0) {delete stispace[todos];return false;}
	eval(stispace[todos].shift());
	setTimeout('setTI('+todos+','+interval+')',interval);
}

function $(id) {
	return document.getElementById(id);
}

function getgetvalue(ggvname) {
 tmp=(document.location+'#').split('#')[0];
 tmp=(tmp+'?').split('?')[1];
 tmp=(tmp+'&').split('&');
 for(i=0;i<tmp.length;i++) {
  tmp2=tmp[i].split('=');
  if(unescape(tmp2[0]) == ggvname) {return unescape(tmp2[1]);}
 }
 return('');
}


function setCookie(name, value, days) {
	var now = new Date();
	var expire = new Date();
	if(typeof(days) != typeof(0)) { days=90 }
	expire.setTime(now.getTime() + 1000*60*60*24*days); //90 days
	document.cookie = name + "=" + escape(value)+ ";" +((expire == null) ? "" : ("expires=" + expire.toGMTString()+";"))+'domain='+'.xms.hu'+';path=/;';
}

function delCookie (dname) {
	var expireNow = new Date();
	document.cookie = dname + "=" +"; expires=Thu, 01-Jan-70 00:00:01 GMT" +  "; domain="+'.xms.hu';
}

function getCookie(Name) {
	var search = Name + "="
	if (document.cookie.length > 0) {
		offset = document.cookie.indexOf(search)
		if (offset != -1) {
		offset += search.length
		end = document.cookie.indexOf(";", offset)
		if (end == -1)
		end = document.cookie.length;
		return unescape(document.cookie.substring(offset, end));
		}
	}
	return('');
}
function fadeclose(id) {
	var tmp=Array();
	tmp[0]="$('"+id+"').style.opacity=.8;";
	tmp[1]="$('"+id+"').style.opacity=.6;";
	tmp[2]="$('"+id+"').style.opacity=.4;";
	tmp[3]="$('"+id+"').style.opacity=.2;";
	tmp[4]="$('"+id+"').style.display='none';";
	ttt=Math.random(); stispace[ttt]=tmp; setTI(ttt,50);
}

function flashtext(id,whatto) {
	var tmp=Array();
	whatto=whatto.replace(/\'/g,'\\\'');
	tmp[0]="$('"+id+"').innerHTML=\'<span class=\"fontostext\">"+whatto+"</span>\'"; //aposztrof baj!
	tmp[56]="$('"+id+"').style.opacity=.8;";
	tmp[57]="$('"+id+"').style.opacity=.6;";
	tmp[58]="$('"+id+"').style.opacity=.4;";
	tmp[59]="$('"+id+"').style.opacity=.2;";
	tmp[60]="$('"+id+"').innerHTML=''; $('"+id+"').style.opacity=1;";
	ttt=Math.random(); stispace[ttt]=tmp; setTI(ttt,50);
}

function GetXMLHTTP () {
	var xmlhttp = null ;
	if (window.XMLHttpRequest){
		xmlhttp = new XMLHttpRequest();
		if ( typeof xmlhttp.overrideMimeType != 'undefined')
		xmlhttp.overrideMimeType('text/xml');
	} else if (window.ActiveXObject) {
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	} else {
		throw "No XMLHTTP" ;
	}
	return xmlhttp;
}

function loadXML(url,postsend,extra) {
	var xmlhttp;
	xmlhttp=GetXMLHTTP();
	if(url.indexOf('?') == -1) {url+='?';} else {url+='&';}
	url+='random='+Math.random();
	xmlhttp.onreadystatechange=function() {handleXMLresponse(xmlhttp,extra)};
	xmlhttp.open("POST",url,true);
	xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
	xmlhttp.send(postsend);
	return false;
}

function handleXMLresponse(processxmh,extra) {
	if(processxmh.readyState == 4) { //;
		if(processxmh.status == 200) {
			if(extra == 'donothing') {
			} else {
				var textdoc=processxmh.responseText.split("\n");
				if(textdoc[0] != '') {eval(textdoc[0]);}
				if(textdoc[1]) {
					t3=textdoc.slice();t3.shift();t3.shift();t3.shift();t3=t3.join("\n");
					t3=t3.replace(/\n$/,'');
					if(textdoc[2] == 'flashtext') {
						flashtext(textdoc[1],t3);
					} else {
						$(textdoc[1]).innerHTML=t3;
					}
				}
			}
		}
	}
}

////////////////////////////////////////////////////////////////////////
// ADATLAP LAPOZO
////////////////////////////////////////////////////////////////////////

function pageselector_switch(obj) {
	var hanyadik;
	var oldhanyadik;
	var lista=obj.parentNode.parentNode.getElementsByTagName('li');
	if(!obj) {
		obj=lista[0].getElementsByTagName('a')[0];
		hanyadik=0;
	} else {
		for(var i=0;i<lista.length;i++) {
			if(lista[i].getElementsByTagName('a')[0] == obj) {
				hanyadik=i;
			} else {
				if(lista[i].className != removeclassname(lista[i],'active')) {
					addclassname(lista[i].getElementsByTagName('a')[0],'inactive');//mer hol a, hol li
					removeclassname(lista[i].getElementsByTagName('a')[0],'active');//mer hol a, hol li
					oldhanyadik=i;
				}
			}
		}
	}
	addclassname(lista[hanyadik].getElementsByTagName('a')[0],'active');//mer hol a, hol li
	addclassname(lista[hanyadik],'active');
	listac=obj.parentNode.parentNode.parentNode.childNodes;
	var j=0;
	var tmp=Array(); var tmp2=Array();
	for(var i=0;i<listac.length;i++) {
		if(listac[i].tagName && listac[i].tagName.toLowerCase() == 'div' && listac[i].className!='header' && listac[i].className!='footer') {
			if(!listac[i].id) {listac[i].id='box_pageselector_'+Math.floor(Math.random()*100000);}
			if(j==hanyadik) {
				if(typeof(oldhanyadik) == 'undefined') {
					listac[i].style.display='block';
				} else {
					tmp2.push("$('"+listac[i].id+"').style.opacity=0; $('"+listac[i].id+"').style.display='block';");
					tmp2.push("$('"+listac[i].id+"').style.opacity=.2;");
					tmp2.push("$('"+listac[i].id+"').style.opacity=.4;");
					tmp2.push("$('"+listac[i].id+"').style.opacity=.6;");
					tmp2.push("$('"+listac[i].id+"').style.opacity=.8;");
					tmp2.push("$('"+listac[i].id+"').style.opacity= 1;");
					console.log(listac[i].innerHTML);
				}

			} else {
				if(typeof(oldhanyadik) != 'undefined' && oldhanyadik == j) {
					tmp.push("$('"+listac[i].id+"').style.opacity=.8;");
					tmp.push("$('"+listac[i].id+"').style.opacity=.6;");
					tmp.push("$('"+listac[i].id+"').style.opacity=.4;");
					tmp.push("$('"+listac[i].id+"').style.opacity=.2;");
					tmp.push("$('"+listac[i].id+"').style.display='none'; $('"+listac[i].id+"').style.opacity=1;");
				}
			}
			j++
		}
	}
	if(tmp2.length > 0) {
		tmp[tmp.length-1]+=tmp2.shift();
	}
	var ttt=Math.random(); stispace[ttt]=tmp.concat(tmp2); setTI(ttt,20);	
	return false;
}

function addclassname(obj,cn) {
	var tmp=' '+obj.className+' ';
	if(tmp.match(' '+cn+' ')) {
		return obj.className;
	} else {
		if(obj.className == '') {
			obj.className=cn;
		} else {
			obj.className+=' '+cn;
		}
	}
	return obj.className;
}

function removeclassname(obj,cn) {
	obj.className=(obj.className+' ').replace(cn+' ','');
	obj.className=obj.className.replace(/\ $/,'')	
	return obj.className;
}

////////////////////////////////////////////////////////////////////////
// GALERIA
////////////////////////////////////////////////////////////////////////

var gal_current=new Array();
gal_current['outgoing']=0;
gal_current['event']=0;

function gal_flip(flipm) {
	if(gal_current['event']) {return false;}
	flipnew=gal_current['outgoing']+flipm;
	
	if(!$('gal_thumb_'+flipnew)) {
		var stopdir;
		if(flipnew == -1) {stopdir=-10;} else {stopdir=10;}
		gal_current['event']=1;
		var tmp=Array();
		for(var i=0;i<=1;i+=.1) {
			tmp.push("$('gal_pic_outgoing').getElementsByTagName('img')[0].style.marginLeft='"+(55+(Math.abs(Math.pow(i,2)-.5)-.5)*stopdir)+"px';")
		}
		tmp[tmp.length-1]+="gal_current['event']=0;";
		var ttt=Math.random(); stispace[ttt]=tmp; setTI(ttt,20);
		return false;
	}
	flipfn=$('gal_thumb_'+flipnew).getElementsByTagName('img')[0].src.split('/').reverse()[0].split('.')[0];
	gal_activate(flipnew,flipfn);
	return false;
}

function gal_activate(picnum,picfn) {
	if(gal_current['event']) {return false;}
	if(gal_current['outgoing'] == picnum) {return false;}
	gal_current['event']=1;
	var tmp=Array();
	insize=0;
	$('gal_pic_incoming').getElementsByTagName('img')[0].src='images/pi/800/'+picfn+'.jpg';
	$('gal_pic_incoming').style.display='block';
	removeclassname($('gal_thumb_'+gal_current['outgoing']),'active');
	addclassname($('gal_thumb_'+picnum),'active');
	for(var ga=0;ga<=1;ga+=.1) {
		gir=ga*ga*800;
		tmp.push(
		"$('gal_pic_incoming').getElementsByTagName('img')[0].style.marginLeft='"+Math.floor((picnum > gal_current['outgoing'])?(910-gir*(800+55)/800+.5):(gir*55/800+.5))+"px';"+
		"$('gal_pic_incoming').getElementsByTagName('img')[0].style.marginTop='"+Math.floor((500-500/800*gir)/2+.5)+"px';"+
		"$('gal_pic_incoming').getElementsByTagName('img')[0].style.width='"+Math.floor(gir+.5)+"px';"+
		"$('gal_pic_incoming').getElementsByTagName('img')[0].style.height='"+Math.floor(500/800*gir+.5)+"px';" +
		"$('gal_pic_incoming').style.opacity="+ga+";" +
		"$('gal_pic_outgoing').getElementsByTagName('img')[0].style.marginLeft='"+Math.floor((picnum > gal_current['outgoing'])?(55-gir*55/800+.5):(55+gir*(800+55)/800+.5))+"px';" +
		"$('gal_pic_outgoing').getElementsByTagName('img')[0].style.marginTop='"+Math.floor((500/800*gir)/2+.5)+"px';" +
		"$('gal_pic_outgoing').getElementsByTagName('img')[0].style.width='"+Math.floor((800-gir)+.5)+"px';"+
		"$('gal_pic_outgoing').getElementsByTagName('img')[0].style.height='"+Math.floor((500-500/800*gir)+.5)+"px';" +
		"$('gal_pic_outgoing').style.opacity="+(1-ga)+";"
		);
	}
	tmp.push(
	"gal_current['outgoing']="+picnum+";"+
	"$('gal_pic_outgoing').getElementsByTagName('img')[0].src='images/pi/800/"+picfn+".jpg';"+
	"$('gal_pic_outgoing').getElementsByTagName('img')[0].style.margin='0 0 0 55px';"+
	"$('gal_pic_outgoing').getElementsByTagName('img')[0].style.width='800px';"+
	"$('gal_pic_outgoing').getElementsByTagName('img')[0].style.height='500px';"+
	"$('gal_pic_outgoing').style.opacity='1';"+
	"$('gal_pic_incoming').style.opacity=0; $('gal_pic_incoming').style.display='none'; gal_current['event']=0;"
	);

	var ttt=Math.random(); stispace[ttt]=tmp; setTI(ttt,20);
	return false;
}

function handle_termek_velemeny(tid,thash) {
	$('box_ajax_velemeny').innerHTML='Dolgozom...';
	setCookie('velemeny_nev',$('form_velemeny_nev').value);
	setCookie('velemeny_email',$('form_velemeny_email').value);
	setCookie('velemeny_web',$('form_velemeny_web').value);
	loadXML('/1ajax.php','side=public&todo=velemeny&'+
	'id='+encodeURIComponent(tid)+'&'+
	'hash='+encodeURIComponent(thash)+'&'+
	'nev='+encodeURIComponent($('form_velemeny_nev').value)+'&'+
	'email='+encodeURIComponent($('form_velemeny_email').value)+'&'+
	'web='+encodeURIComponent($('form_velemeny_web').value)+'&'+
	'velemeny_rovid='+encodeURIComponent($('form_velemeny_rovid').value)+'&'+
	'velemeny_hosszu='+encodeURIComponent($('form_velemeny_hosszu').value)+'&'+
	'ertek='+encodeURIComponent($('form_velemeny_ertek').value),'');
	return false;
}


function handle_velemeny_ertek(ertek) {
	var es=new Array();
	es[1]='onestar';
	es[2]='twostar';
	es[3]='threestar';
	es[4]='fourstar';
	es[5]='fivestar';
	$('ul_ertek_rating').className='rating '+es[ertek];
	$('form_velemeny_ertek').value=ertek;
	return false;
}


function handle_search_focus() {
	if($('box_search').value == 'Keresés') {$('box_search').value='';}
}

function handle_search_blur() {
	if($('box_search').value == '') {$('box_search').value='Keresés';}
	else {
		setTimeout("$('box_search_results').style.display='none';",500);
	}
}

function handle_search_keyup() {
	if($('box_search').value == '') {
		$('box_search_results').style.display='none';
		return;
	}
	if($('box_search_results_contents').innerHTML=='Betöltés...') { return false;}
	$('box_search_results_contents').innerHTML='Betöltés...'; 
	$('box_search_results').style.display='block';
	loadXML('/1ajax.php','side=public&todo=search&k='+encodeURIComponent($('box_search').value));
}

function handle_kivalaszt(obj,kid) {
	obj.style.display='none';
	var tmp = document.createElement('span');
	tmp.innerHTML = 'Dolgozom...';
	obj.parentNode.appendChild(tmp);
	loadXML('/1ajax.php','side=public&todo=kosar&mode=add&id='+encodeURIComponent(kid));
	return false;
}

function handle_remove(obj,kid) {
	mdtds=obj.parentNode.parentNode.getElementsByTagName('td');
	mdtdsl=mdtds.length;
	for(var i=0;i<mdtdsl;i++) {
		if(i<mdtdsl-1) {
			mdtds[1].parentNode.removeChild(mdtds[1]);
		} else {
			mdtds[0].colSpan=mdtdsl;
			mdtds[0].innerHTML='Dolgozom...';
		}
	}
	loadXML('/1ajax.php','side=public&todo=kosar&mode=remove&id='+encodeURIComponent(kid));
	return false;
}

function handle_cart_mod(obj,kid,howmuch) {
	obj.parentNode.getElementsByTagName('span')[0].innerHTML='<span style="opacity:.5">'+obj.parentNode.getElementsByTagName('span')[0].innerHTML+'</span>';
	loadXML('/1ajax.php','side=public&todo=kosar&mode=mod&id='+encodeURIComponent(kid)+'&quantmod='+howmuch);
	return false;
}


function handle_remove_done(kidmd) {
	$('kosar_elem_'+kidmd).parentNode.removeChild($('kosar_elem_'+kidmd));
	return false;
}

function handle_update_cartnumbers(p1,p2,idmd,p3,p4) {
	$('info_kosar_db').innerHTML=p1;
	$('info_kosar_sum').innerHTML=p2;
	$('info_kosar_sum_bottom').innerHTML=p2;
	$('info_kosar_top').innerHTML=(p1 == 0)?('üres'):(p2+' ('+p1+' termék)');
	if(typeof(idmd) != 'undefined') {
		 $('kosar_elem_'+idmd+'_db').innerHTML=p3;
		 $('kosar_elem_'+idmd+'_sum').innerHTML=p4;
	}
}

function handle_rendeles_fizetes() {
	$('box_kosar_fizetes').style.display=(($('box_kosar_fizetes').style.display == 'none')?('block'):('none'));
	return false;
}

function handle_rendeles_fizetes_post() {
	$('kosar_fizetes_text').className='fontostext';
	$('kosar_fizetes_text').innerHTML='Dolgozom...';
	var f = $('value_kosar_szall_fizetes_hazhoz_kp').checked ? 'hazhoz_kp' :
			$('value_kosar_szall_fizetes_hazhoz_kartya').checked ? 'hazhoz_kartya' :
			$('value_kosar_szall_fizetes_hazhoz_utalas').checked ? 'hazhoz_utalas' :
			$('value_kosar_szall_fizetes_xms_utalas').checked ? 'xms_utalas' :
			$('value_kosar_szall_fizetes_xms_kp').checked ? 'xms_kp' : '';
	$('box_kosar_fizetes').style.display='none';
	loadXML('/1ajax.php','side=public&todo=kosar&mode=fizetes&'+
	'szall_fizetes='+encodeURIComponent(f)
	,'');
	return false;
}


function handle_rendeles_szallitas() {
	$('box_kosar_szallitas').style.display=(($('box_kosar_szallitas').style.display == 'none')?('block'):('none'));
	return false;
}

function handle_rendeles_szallitas_post() {
	$('kosar_szallitas_text').className='fontostext';
	$('kosar_szallitas_text').innerHTML='Dolgozom...';
	$('box_kosar_szallitas').style.display='none';
	$('value_kosar_szall_megjegyzes').value=$('value_kosar_szall_megjegyzes').value.replace('/\"/','&quot;');
	loadXML('/1ajax.php','side=public&todo=kosar&mode=szallitas&'+
	'szall_nev='+encodeURIComponent($('value_kosar_szall_nev').value)+'&'+
	'szall_irsz='+encodeURIComponent($('value_kosar_szall_irsz').value)+'&'+
	'szall_telepules='+encodeURIComponent($('value_kosar_szall_telepules').value)+'&'+
	'szall_utcahazszam='+encodeURIComponent($('value_kosar_szall_utcahazszam').value)+'&'+
	'szall_mobil='+encodeURIComponent($('value_kosar_szall_mobil').value)+'&'+
	'szall_email='+encodeURIComponent($('value_kosar_szall_email').value)+'&'+
	'szall_megjegyzes='+encodeURIComponent($('value_kosar_szall_megjegyzes').value)
	,'');

	return false;
}

function handle_rendeles_szamlazas() {
	$('box_kosar_szamlazas').style.display=(($('box_kosar_szamlazas').style.display == 'none')?('block'):('none'));
	return false;
}

function handle_rendeles_szamlazas_post() {
	$('kosar_szamlazas_text').className='fontostext';
	$('kosar_szamlazas_text').innerHTML='Dolgozom...';
	$('box_kosar_szamlazas').style.display='none';
	loadXML('/1ajax.php','side=public&todo=kosar&mode=szamlazas&'+
	'szla_cegnev='+encodeURIComponent($('value_kosar_szla_cegnev').value)+'&'+
	'szla_irsz='+encodeURIComponent($('value_kosar_szla_irsz').value)+'&'+
	'szla_telepules='+encodeURIComponent($('value_kosar_szla_telepules').value)+'&'+
	'szla_utcahazszam='+encodeURIComponent($('value_kosar_szla_utcahazszam').value)
	,'');
	return false;
}


function handle_rendeles_post() {
	if($('kosar_fizetes_text').innerHTML == 'még nincs megadva') {alert('Előbb adj meg fizetési módot!'); return false;}
	if($('kosar_szallitas_text').innerHTML == 'még nincs megadva') {alert('Előbb adj meg szállítási címet!'); return false;}
	if($('info_kosar_sum_bottom').innerHTML.substr(0,1) == '0') {alert('Még üres a kosár!'); return false;}

	$('button_kosar_post').innerHTML='Dolgozom...&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
	loadXML('/1ajax.php','side=public&todo=kosar&mode=post','');
	return false;
}

var current_slider=''; var sliding=0;
function handle_slider(sln) {
	if(sliding == 1) {return false;}
	toclose=''; toopen='';
	for(sl=1;sl<=5;sl++) {
		if(sl == current_slider) {toclose=sl;}
		if(sl == sln) {toopen=sl;}
	}
	if(toclose == toopen) {return false;}
	tmp=new Array();
	sliding=1;
	for(sy=0;sy<=240;sy+=40) {
		spy=Math.floor((sy/240)*(sy/240)*240);
		tmp.push(
			"$('myslider').getElementsByTagName('li')[toopen-1].getElementsByTagName('div')[0].style.height='"+spy+"px';"+
			((toclose != '')?("$('myslider').getElementsByTagName('li')[toclose-1].getElementsByTagName('div')[0].style.height='"+(240-spy)+"px';"):(''))
		);
	}
	tmp.push('sliding=0;');
	ttt=Math.random(); stispace[ttt]=tmp; setTI(ttt,25);
	current_slider=toopen;
}

var measure_and_done = function(val) {
	if(pageTracker) {
		try {
			pageTracker._addTrans(
				"XMS trid",
				"XMS aff",
				val+'',
				'0',
				'0',
				"Budapest",
				"Hungary",
				"Hungary"
			);
			pageTracker._trackTrans();
		} catch(err) {}
	}
	setTimeout(function() {
		document.location = 'kosar.php?done=yes';
	},500);
}