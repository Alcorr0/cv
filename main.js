const title_texts = [
	"Olexandr Kazanskyi",
	"Sammendrag",
	"Utdanning",
	"Erfaring",
	"Språk"
];
const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz";
//const chars = "ℂ℃℄℅℆ℇ℈℉ℊℋℌℍℎℏℐℑℒℓ℔ℕℙℚℛℜℝ℞℟℣ℤ℥Ω℧ℨ℩KÅ№ℬℭ℮ℯℰℱℲℵℶℷℸ℺℻ℽℾℿ⅀⅁⅂⅃⅄ⅅⅆⅇⅈⅉ⅊⅋ⅎⅭⅮⅯ∀∁∂∃∄∅∆∇∈∉∊∋∌∍∎∏∐∑−∕∖∗∘∙∝∞∟∠∡∢∣∤∥∦∧∨∩∪∫∬∮∯∱∲∳∴∵∶∷∸∹∺∻∼∽∾∿≀≁≂≃≄≅≆≇≈≉≊≋≌≍≎≏≐≑≒≓≔≕≖≗≘≙≚≛≜≝≞≟≠≡≢≣≤≥≦≧≨≩≪≫⊂⊃⊄⊅⊆⊇⊈⊉⊊⊋⊌⊍⊎⋐⋑⋒⋓⋔⋕⋖⋗⋘⋙⋚⋛⋜⋝⋞⋟⋠⋡⋢⋣⋤⋥⋦⋧⋨⋩⋪⋫⋬⋭⋲⋳⋴⋵⋶⋷⋸⋹⋺⋻⋼⋽⋾⋿⌀ᴀᴁᴂᴃᴄᴅᴆᴇᴈᴉᴊᴋᴌᴍᴎᴏᴐᴑᴒᴓᴔᴕᴖᴗᴘᴙᴚᴛᴜᴝᴞᴟᴠᴡᴢᴣᴤᴥᴦᴧᴨᴩᴪᴫᵫᵬᵭᵮᵯᵰᵱᵲᵳᵴᵵᵶᵷᵹᵽᵾᵿᶀᶁᶂᶃᶄᶅᶆᶇᶈᶉᶊᶋᶌᶍᶎᶏᶐᶑᶒᶓᶔᶕᶖᶗᶘᶙᶚ⍴⍵⍶⍷⍸⍹⍺";

var title_t = 0;
var page = 0;

//start animation
const titleIter = () => {
	title_t++;
	if(title_t<title_texts[page].length)
		setTimeout(titleIter,80);
	else
		setTimeout(startAnim,500);
};
const titleAnim = () => {
	var string = "";
	for (var i = 0; i < title_texts[page].length; i++) {
		if(i < title_t) string += title_texts[page].charAt(i);
		else	  string += chars.charAt(Math.floor(chars.length*Math.random()));
	}
	jQuery("#title").text(string);

	if(title_t<title_texts[page].length)
		setTimeout(titleAnim,1);
};

var startAnim = () => {
	jQuery("#text").animate({
		// fontSize: "10px",
		// lineHeight: "13px",
		backgroundColor: "#228",//#000
		color: "#4c4"//#555
	}, 500);
	jQuery("#title").animate({
		color: "#fff",
		top: "5%"
	}, 500);
	jQuery("#content").slideDown(500);
	jQuery("#title").delay(400).css("text-shadow","none");
	startAnim = () => {};
};
titleIter();
titleAnim();

//pages animation
function smoothstep(a,b,c) {
	const t = (c-a)/(b-a);
	const k = t*t*(3 - 2*t);
	return (b-a)*k + a;
}
document.addEventListener("scroll", (event) => {
	var h = document.documentElement, 
		b = document.body,
		st = 'scrollTop',
		sh = 'scrollHeight';

	var scroll = (h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight);
	const pages = 4;
	const step = 1/pages;
	const new_page = Math.round(scroll*pages);
	if(page != new_page) {
		title_t = 0;
		titleIter();
		titleAnim();
	}
	page = new_page;

//attraction to places
	for(var i=0; i<pages; i++) {
		if(scroll<(i+1)*step) {
			scroll = smoothstep(i*step,(i+1)*step,scroll);
			break;
		}
	}
//anim by scroll percent
	for(var i=0; i<pages; i++) {
		var top = ((1-scroll)-((pages-i-1)*step))*pages;
		top = Math.max(top,0);
		top = Math.min(top,1);
		jQuery("#page-"+(i+1)).css("top", "calc(20% - 40px + "+(90*top)+"%)");
		jQuery("#page-"+i).css("opacity", top);
	}
});