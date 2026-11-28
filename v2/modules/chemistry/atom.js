(function(){
// Atom puzzle (NEW lesson, no v1 source): docs/professor/atom.md (level 1) + ADDENDUM 27 Nov in docs/professor/stem-roadmap.md (levels 2-3).
// 3 levels with 3 hearts each; a wrong Check costs a heart, a refused move only explains the rule; each hint costs one sparkle;
// Lumens only on the first clear of a level (10 + 5 per sparkle above 1, as projectile Levels); replays pay 0. pH mixer (optional level 4) not built.
var S={title:['Atom puzzle','Puzzle cu atomi'],cv:['Puzzle board','Tabla puzzle-ului'],lvl:['Levels','Niveluri'],
 l0:['Build the atom','Construiește atomul'],l1:['Bond jigsaw','Puzzle de legături'],l2:['Balance the equation','Echilibrează ecuația'],
 lv_n:['Level {n}: {name}','Nivelul {n}: {name}'],step:['Puzzle {a} of {b}','Puzzle-ul {a} din {b}'],
 hearts:['{n} hearts left','{n} inimi rămase'],heart_t:['3 hearts: each wrong Check costs one','3 inimi: fiecare Verificare greșită costă una'],
 check:['Check','Verifică'],clear:['Clear board','Golește tabla'],back1:['Take back','Ia înapoi'],ans:['Your answer','Răspunsul tău'],
 tray:['Pieces','Piese'],to:['Put it on','Pune-o pe'],out:['Take out','Scoate'],pick_t:['Pick a piece (drag it onto the board, or click it and then click a place).','Alege o piesă (trage-o pe tablă sau apasă-o și apoi apasă un loc).'],
 pick:['Pick a piece first.','Alege mai întâi o piesă.'],
 how:['Hints','Indicii'],hint:['Hint {n}','Indiciul {n}'],hint_cost:['Each hint costs one sparkle.','Fiecare indiciu costă o scânteie.'],
 hit:['Level complete','Nivel terminat'],stars:['{n} of 3 sparkles','{n} din 3 scântei'],reward:['+{n} Lumens','+{n} Lumeni'],replay:['Replay: no Lumens','Reluare: fără Lumeni'],
 lost:['Out of hearts. Try the level again.','Nu mai ai inimi. Încearcă nivelul din nou.'],retry:['Try again','Încearcă din nou'],next:['Next level','Nivelul următor'],all:['All levels complete!','Toate nivelurile terminate!'],
 locked:['Finish the level before to unlock','Termină nivelul anterior ca să-l deblochezi'],dot:['Level {n}, {s} of 3 sparkles','Nivelul {n}, {s} din 3 scântei'],dlock:['Level {n}, locked','Nivelul {n}, blocat'],dn:['Level {n}','Nivelul {n}'],
 // level 1: atom (atom.md 4-7)
 p:['Proton p⁺','Proton p⁺'],n:['Neutron n','Neutron n'],e:['Electron e⁻','Electron e⁻'],nuc:['Nucleus','Nucleu'],sh:['Shell {k} · {a}/{c}','Stratul {k} · {a}/{c}'],
 el:['Element','Element'],A:['Mass number A','Număr de masă A'],chg:['Charge','Sarcina'],outer:['Outer electrons','Electroni exteriori'],shells:['Shells','Straturi'],
 neu:['neutral','neutru'],pos:['positive ion','ion pozitiv'],neg:['negative ion','ion negativ'],none:['nothing yet','nimic încă'],
 aria1:['Atom with {p}, {n} and {e} in shells {s}.','Atom cu {p}, {n} și {e} în straturile {s}.'],
 p1:['1 proton','1 proton'],pn:['{n} protons','{n} protoni'],n1:['1 neutron','1 neutron'],nn:['{n} neutrons','{n} neutroni'],e1:['1 electron','1 electron'],en:['{n} electrons','{n} electroni'],
 note1:['Simplified model: for the first 20 elements electrons fill shells of 2, 8, 8 and then 2. Real shells are more subtle (shell 3 can hold 18). Real atoms exist only for some neutron counts (oxygen in nature has 8, 9 or 10); the puzzle accepts any.','Model simplificat: pentru primele 20 de elemente, electronii umplu straturi de 2, 8, 8 și apoi 2. Straturile reale sunt mai complicate (stratul 3 poate avea 18). Atomii reali există doar pentru anumite numere de neutroni (oxigenul din natură are 8, 9 sau 10); puzzle-ul acceptă orice număr.'],
 r_pn:['Protons and neutrons live in the nucleus.','Protonii și neutronii stau în nucleu.'],r_en:['Electrons stay outside the nucleus, in the shells.','Electronii stau în afara nucleului, pe straturi.'],
 r_in:['Electrons fill the inner shell first: shell {k} still has room.','Electronii umplu întâi stratul interior: stratul {k} mai are loc.'],r_full:['Shell {k} is full ({c} electrons).','Stratul {k} este plin ({c} electroni).'],
 r_maxp:['This puzzle stops at 20 protons (calcium).','Puzzle-ul se oprește la 20 de protoni (calciu).'],r_maxn:['This puzzle stops at 24 neutrons.','Puzzle-ul se oprește la 24 de neutroni.'],
 ok_atom:['Correct: {name}, charge {c}, shells {s}.','Corect: {name}, sarcina {c}, straturile {s}.'],
 // level 2: bonds
 slot1:['1 slot','1 loc'],slotn:['{n} slots','{n} locuri'],board:['The board','Tabla'],
 r_slots:['{x} needs {v} slots, but {c} has only {f} free. Pieces snap only when the slots match.','{x} are nevoie de {v} locuri, dar {c} mai are doar {f} libere. Piesele se prind doar când locurile se potrivesc.'],
 r_c4:['C needs 4 bonds, and one atom cannot take all 4: put C in the middle.','C are nevoie de 4 legături, iar un singur atom nu le poate prelua pe toate 4: pune C la mijloc.'],
 r_nofree:['{c} has no free slots left.','{c} nu mai are locuri libere.'],
 w_open:['{c} still has {f} free. Every slot must be filled before you check.','{c} mai are {f} libere. Toate locurile trebuie ocupate înainte să verifici.'],
 w_form:['Every slot is filled, but these atoms make {f}, not {t}.','Toate locurile sunt ocupate, dar acești atomi formează {f}, nu {t}.'],
 aria2:['Board: {d}.','Tabla: {d}.'],aria2e:['Board: empty.','Tabla: goală.'],mid:['{c} in the middle with {list}','{c} la mijloc cu {list}'],free:['{n} free','{n} libere'],
 note2:['Slots = the bonds an atom usually forms (H 1, O 2, N 3, C 4). The drawing shows which atoms bond, not the real 3D shape (water is bent, methane is a tetrahedron).','Locuri = legăturile pe care le formează de obicei un atom (H 1, O 2, N 3, C 4). Desenul arată ce atomi se leagă, nu forma reală 3D (apa e îndoită, metanul e un tetraedru).'],
 eNa:['e⁻ from Na','e⁻ de la Na'],eCl:['e⁻ from Cl','e⁻ de la Cl'],Na:['Sodium Na','Sodiu Na'],Cl:['Chlorine Cl','Clor Cl'],
 r_same:['Move the electron to the other atom.','Mută electronul la celălalt atom.'],
 w_cl:['Chlorine has 7 outer electrons and needs one more, so it keeps them. Sodium has only one outer electron: move that one.','Clorul are 7 electroni exteriori și mai are nevoie de unul, deci îi păstrează. Sodiul are un singur electron exterior: mută-l pe acela.'],
 aria3:['Sodium atom, shells {a}, and chlorine atom, shells {b}.','Atom de sodiu, straturile {a}, și atom de clor, straturile {b}.'],
 note3:['Na⁺ and Cl⁻ are held together by opposite charges: an ionic compound, not a molecule. The ratio is 1 : 1, so the formula is NaCl.','Na⁺ și Cl⁻ sunt ținuți împreună de sarcini opuse: un compus ionic, nu o moleculă. Raportul este 1 : 1, deci formula este NaCl.'],
 // level 3: equations
 left:['Left side (reactants)','Partea stângă (reactanți)'],right:['Right side (products)','Partea dreaptă (produși)'],more:['More {f}','Mai mult {f}'],less:['Less {f}','Mai puțin {f}'],
 ct_el:['Element','Element'],ct_l:['Left','Stânga'],ct_r:['Right','Dreapta'],ct_s:['Status','Stare'],eqw:['equal','egal'],off:['off by {n}','diferă cu {n}'],
 r_side:['{f} belongs on the {s}.','{f} se află în {s}.'],sL:['left side (reactants)','partea stângă (reactanți)'],sR:['right side (products)','partea dreaptă (produși)'],r_max:['9 is the largest number here.','9 este cel mai mare număr aici.'],
 w_eq:['Not balanced: {list}.','Nu este echilibrată: {list}.'],w_el:['{x} left {a}, right {b}','{x} stânga {a}, dreapta {b}'],
 w_gcd:['Balanced, but use the smallest whole numbers: divide every number by {g}.','Echilibrată, dar folosește cele mai mici numere întregi: împarte fiecare număr la {g}.'],
 note4:['Atoms are never created or destroyed in a reaction, so each element must count the same on both sides. Change only the big numbers in front, never the small ones.','Într-o reacție atomii nu se creează și nu dispar, deci fiecare element trebuie să apară de tot atâtea ori în ambele părți. Schimbă doar numerele mari din față, niciodată indicii mici.'],
 ok_eq:['Balanced: every element counts the same on both sides.','Echilibrată: fiecare element apare de tot atâtea ori în ambele părți.']};
// Z 1-20: symbol, EN, RO (atom.md 4)
var EL=[['H','Hydrogen','Hidrogen'],['He','Helium','Heliu'],['Li','Lithium','Litiu'],['Be','Beryllium','Beriliu'],['B','Boron','Bor'],['C','Carbon','Carbon'],['N','Nitrogen','Azot'],['O','Oxygen','Oxigen'],['F','Fluorine','Fluor'],['Ne','Neon','Neon'],
 ['Na','Sodium','Sodiu'],['Mg','Magnesium','Magneziu'],['Al','Aluminium','Aluminiu'],['Si','Silicon','Siliciu'],['P','Phosphorus','Fosfor'],['S','Sulfur','Sulf'],['Cl','Chlorine','Clor'],['Ar','Argon','Argon'],['K','Potassium','Potasiu'],['Ca','Calcium','Calciu']];
var CAP=[2,8,8,2],V={H:1,O:2,N:3,C:4};
var shells=function(e){var o=[];CAP.forEach(function(c){var k=Math.min(c,e);if(k>0)o.push(k);e-=k});return o};
var outerOf=function(e){var s=shells(e);return s.length?s[s.length-1]:0};
var sub=function(f){return f.replace(/\d/g,function(d){return'₀₁₂₃₄₅₆₇₈₉'[d]})};
var sg=function(c){return c>0?'+'+c:c<0?'−'+(-c):'0'};
var num=function(v){v=String(v).trim().replace(',','.').replace(/[−–]/g,'-');return v===''||isNaN(+v)?null:+v};
// formula from atom counts, order C, N, H, O (gives CH₄, CO₂, NH₃, H₂O)
var formula=function(list){var c={};list.forEach(function(x){c[x]=(c[x]||0)+1});var f=['C','N','H','O'].filter(function(x){return c[x]}).map(function(x){return x+(c[x]>1?c[x]:'')}).join('');return{CNH:'HCN',NHO:'HNO'}[f]||f};
var gcd=function(a,b){return b?gcd(b,a%b):a};
// levels: rounds {kind, q:[en,ro], ok, react, h:[[en,ro]x3]}; rounds without start carry the board over
var LVL=[{name:'l0',rounds:[
  {kind:'atom',start:{Z:0,N:0,e:0},q:['Build a neutral oxygen atom. Any number of neutrons is fine.','Construiește un atom neutru de oxigen. Orice număr de neutroni e bun.'],ok:function(s){return s.Z===8&&s.e===8},
   react:function(s,d){return s.Z!==8?['m1a',{name:d.name}]:['m1b',{c:d.c}]},
   h:[['One kind of piece decides the element name. Which one?','Un singur fel de piesă stabilește numele elementului. Care?'],['Only the protons Z decide the element. Then make the electrons equal Z.','Doar protonii Z stabilesc elementul. Apoi egalează electronii cu Z.'],['Example: neutral nitrogen is Z = 7 with 7 electrons; the neutrons can be anything.','Exemplu: azotul neutru are Z = 7 și 7 electroni; neutronii pot fi oricâți.']]},
  {kind:'atom',q:['Make a sodium ion with charge +1. Any number of neutrons is fine.','Fă un ion de sodiu cu sarcina +1. Orice număr de neutroni e bun.'],ok:function(s){return s.Z===11&&s.e===10},
   react:function(s,d){return d.cv===1&&s.Z!==11?['m2a',{name:d.name}]:s.Z!==11?['m2d']:s.e===11?['m2b']:s.e>11?['m2c']:['m2e',{c:d.c}]},
   h:[['A positive ion has fewer electrons than protons.','Un ion pozitiv are mai puțini electroni decât protoni.'],['Find sodium with the Element tile, keep Z, then take out electrons until the charge is +1.','Găsește sodiul cu fișa Element, păstrează Z, apoi scoate electroni până când sarcina este +1.'],['Example: Mg²⁺ has 12 protons and 10 electrons: 12 − 10 = +2.','Exemplu: Mg²⁺ are 12 protoni și 10 electroni: 12 − 10 = +2.']]},
  {kind:'atom',q:['Build a NEUTRAL atom whose outer shell holds 8 electrons. Two answers exist; either counts.','Construiește un atom NEUTRU al cărui strat exterior are 8 electroni. Există două răspunsuri; oricare e bun.'],ok:function(s){return s.e===s.Z&&outerOf(s.e)===8},
   react:function(s,d){var k=d.k;return k===8&&d.cv!==0?['m3a',{c:d.c}]:d.cv!==0?['m3d']:k===7?['m3b',{name:d.name}]:k===1&&(s.Z===11||s.Z===19)?['m3e',{name:d.name}]:['m3c',{k:k}]},
   h:[['Watch the Outer electrons tile while you change the protons.','Urmărește fișa Electroni exteriori în timp ce schimbi protonii.'],['Neutral means e = Z. Which Z gives 8 in the outer shell?','Neutru înseamnă e = Z. Ce Z dă 8 pe stratul exterior?'],['Example: neutral fluorine, Z = 9, has shells 2, 7: one short of 8.','Exemplu: fluorul neutru, Z = 9, are straturile 2, 7: îi lipsește unul până la 8.']]},
  {kind:'type',q:['An atom has 17 protons, 18 neutrons and 18 electrons. What is its charge? Type a whole number with its sign.','Un atom are 17 protoni, 18 neutroni și 18 electroni. Care este sarcina lui? Scrie un număr întreg cu semn.'],ok:function(v){return v===-1},
   react:function(v,raw){return/^\+/.test(raw)||v===1?['m4a']:v===35?['m4b']:v===0?['m4c']:v===18||v===17?['m4d']:['m4e']},
   h:[['The charge compares protons with electrons.','Sarcina compară protonii cu electronii.'],['Charge = Z − e.','Sarcina = Z − e.'],['Example: 12 protons and 10 electrons: 12 − 10 = +2.','Exemplu: 12 protoni și 10 electroni: 12 − 10 = +2.']]}]},
 {name:'l1',rounds:[
  {kind:'bond',t:'H2O',q:['Build water, H₂O.','Construiește apa, H₂O.'],okm:['O has 2 slots: one H in each. Ratio H : O = 2 : 1.','O are 2 locuri: câte un H în fiecare. Raport H : O = 2 : 1.'],
   h:[['Put the atom with the most slots in the middle.','Pune la mijloc atomul cu cele mai multe locuri.'],['O has 2 slots and H has 1. How many H fill O?','O are 2 locuri, iar H are 1. Câți H umplu O?'],['Example: hydrogen chloride: Cl has 1 slot and H has 1, so one H fills it: HCl.','Exemplu: clorura de hidrogen: Cl are 1 loc și H are 1, deci un H îl umple: HCl.']]},
  {kind:'bond',t:'CO2',q:['Build carbon dioxide, CO₂.','Construiește dioxidul de carbon, CO₂.'],okm:['C has 4 slots; each O fills 2 of them (a double bond). Ratio C : O = 1 : 2.','C are 4 locuri; fiecare O ocupă 2 (o legătură dublă). Raport C : O = 1 : 2.'],
   h:[['C has 4 slots. An O piece uses 2 of them at once.','C are 4 locuri. O piesă O ocupă 2 dintre ele deodată.'],['Put C in the middle, then add O until no slot is free.','Pune C la mijloc, apoi adaugă O până nu mai rămâne niciun loc liber.'],['Example: in O₂ the two O atoms share 2 slots each: a double bond.','Exemplu: în O₂ cei doi atomi O își împart câte 2 locuri: o legătură dublă.']]},
  {kind:'bond',t:'NH3',q:['Build ammonia, NH₃.','Construiește amoniacul, NH₃.'],okm:['N has 3 slots: one H in each. Ratio N : H = 1 : 3.','N are 3 locuri: câte un H în fiecare. Raport N : H = 1 : 3.'],
   h:[['N has 3 slots.','N are 3 locuri.'],['N in the middle, then one H per free slot.','N la mijloc, apoi câte un H pentru fiecare loc liber.'],['Example: H₂S: sulfur has 2 slots, like O, so it takes two H.','Exemplu: H₂S: sulful are 2 locuri, ca O, deci ia doi H.']]},
  {kind:'bond',t:'CH4',q:['Build methane, CH₄.','Construiește metanul, CH₄.'],okm:['C has 4 slots: one H in each. Ratio C : H = 1 : 4.','C are 4 locuri: câte un H în fiecare. Raport C : H = 1 : 4.'],
   h:[['C has 4 slots, H only 1.','C are 4 locuri, H doar 1.'],['C in the middle, one H per slot.','C la mijloc, câte un H pentru fiecare loc.'],['Example: SiH₄: silicon also has 4 slots.','Exemplu: SiH₄: și siliciul are 4 locuri.']]},
  {kind:'ionic',q:['Make sodium chloride, NaCl: move one electron so that both atoms end with 8 outer electrons.','Fă clorură de sodiu, NaCl: mută un electron astfel încât ambii atomi să aibă 8 electroni pe stratul exterior.'],okm:['Na gave its outer electron to Cl: Na⁺ (2, 8) and Cl⁻ (2, 8, 8). Opposite charges attract: an ionic bond.','Na și-a dat electronul exterior lui Cl: Na⁺ (2, 8) și Cl⁻ (2, 8, 8). Sarcinile opuse se atrag: o legătură ionică.'],
   h:[['Look at the outer shells: Na has 1 electron, Cl has 7.','Uită-te la straturile exterioare: Na are 1 electron, Cl are 7.'],['One atom gives an electron, the other takes it, so both end with 8 outside.','Un atom dă un electron, celălalt îl primește, astfel încât amândoi ajung la 8 în exterior.'],['Example: in MgO, magnesium (2, 8, 2) gives 2 electrons to oxygen (2, 6): Mg²⁺ and O²⁻.','Exemplu: în MgO, magneziul (2, 8, 2) dă 2 electroni oxigenului (2, 6): Mg²⁺ și O²⁻.']]}]},
 {name:'l2',rounds:[
  {kind:'eq',l:[['H2',{H:2}],['O2',{O:2}]],r:[['H2O',{H:2,O:1}]],q:['Balance: H₂ + O₂ → H₂O','Echilibrează: H₂ + O₂ → H₂O'],
   h:[['Count H and O on each side in the table.','Numără H și O în fiecare parte, în tabel.'],['Change only the big numbers in front. Changing H₂O to H₂O₂ would make a different substance (hydrogen peroxide).','Schimbă doar numerele mari din față. Dacă schimbi H₂O în H₂O₂ obții altă substanță (peroxid de hidrogen, apă oxigenată).'],['Example: 2Na + Cl₂ → 2NaCl: Cl is 2 on each side, so NaCl needs 2, and then Na needs 2.','Exemplu: 2Na + Cl₂ → 2NaCl: Cl este 2 în fiecare parte, deci NaCl are nevoie de 2, apoi Na are nevoie de 2.']]},
  {kind:'eq',l:[['CH4',{C:1,H:4}],['O2',{O:2}]],r:[['CO2',{C:1,O:2}],['H2O',{H:2,O:1}]],q:['Balance: CH₄ + O₂ → CO₂ + H₂O','Echilibrează: CH₄ + O₂ → CO₂ + H₂O'],
   h:[['C is already equal. Balance H next, then O.','C este deja egal. Echilibrează apoi H, apoi O.'],['Balance the elements that sit in only one molecule on each side first (C, then H), and O last.','Echilibrează întâi elementele care apar într-o singură moleculă în fiecare parte (C, apoi H), iar O la final.'],['Example: 2C + O₂ → 2CO: C is 2 and 2, O is 2 and 2.','Exemplu: 2C + O₂ → 2CO: C este 2 și 2, O este 2 și 2.']]},
  {kind:'eq',l:[['N2',{N:2}],['H2',{H:2}]],r:[['NH3',{N:1,H:3}]],q:['Balance: N₂ + H₂ → NH₃','Echilibrează: N₂ + H₂ → NH₃'],
   h:[['N₂ has 2 N, NH₃ has 1 N.','N₂ are 2 N, NH₃ are 1 N.'],['Balance N first, then count H on the right and fix H₂.','Echilibrează întâi N, apoi numără H în dreapta și ajustează H₂.'],['Example: H₂ + Cl₂ → 2HCl: 2 H and 2 Cl on each side.','Exemplu: H₂ + Cl₂ → 2HCl: 2 H și 2 Cl în fiecare parte.']]}]}];
// misconception messages for level 1 (atom.md 7; m2e, m3d, m3e added for cases the table does not cover)
Object.assign(S,{m1a:['This is {name}. The element is set by the protons only. Change the protons until the Element tile says Oxygen.','Acesta este {name}. Elementul este stabilit doar de protoni. Schimbă protonii până când fișa Element arată Oxigen.'],
 m1b:['Oxygen, but the charge is {c}. A neutral atom has as many electrons as protons.','Oxigen, dar sarcina este {c}. Un atom neutru are tot atâția electroni câți protoni.'],
 m2a:['The charge is +1, but you changed the element: this is {name}. An ion forms by losing electrons; Z never changes.','Sarcina este +1, dar ai schimbat elementul: acesta este {name}. Un ion se formează prin pierdere de electroni; Z nu se schimbă niciodată.'],
 m2b:['Neutral sodium. Take out one electron to make the charge +1.','Sodiu neutru. Scoate un electron ca sarcina să devină +1.'],
 m2c:['The electrons outnumber the protons: that is a negative ion. A positive ion has fewer electrons.','Electronii sunt mai mulți decât protonii: acesta este un ion negativ. Un ion pozitiv are mai puțini electroni.'],
 m2d:['Find sodium first: the Element tile must say Sodium.','Găsește mai întâi sodiul: fișa Element trebuie să arate Sodiu.'],
 m2e:['Sodium, but the charge is {c}: too many electrons are gone. Sodium loses only one.','Sodiu, dar sarcina este {c}: lipsesc prea mulți electroni. Sodiul pierde doar unul.'],
 m3a:['The outer shell is full, but the atom has a charge ({c}): it is an ion. Make electrons equal protons.','Stratul exterior este plin, dar atomul are sarcină ({c}): este un ion. Egalează electronii cu protonii.'],
 m3b:['The outer shell has 7 electrons: {name} is 1 electron short of 8 (it tends to gain one and form an ion).','Stratul exterior are 7 electroni: lui {name} îi lipsește 1 electron până la 8 (tinde să primească unul și să formeze un ion).'],
 m3e:['The outer shell has 1 electron: if {name} loses it, the full shell of 8 below becomes the outer shell (it tends to form an ion).','Stratul exterior are 1 electron: dacă {name} îl pierde, stratul plin cu 8 de dedesubt devine exterior (tinde să formeze un ion).'],
 m3c:['The outer shell has {k}, not 8. Watch the Outer electrons tile as you change the protons.','Stratul exterior are {k}, nu 8. Urmărește fișa Electroni exteriori când schimbi protonii.'],
 m3d:['The atom has a charge. Neutral first: make the electrons equal the protons.','Atomul are sarcină. Întâi neutru: egalează electronii cu protonii.'],
 m4a:['Electrons are negative. Here there is one more electron than protons, so the charge is negative.','Electronii sunt negativi. Aici este un electron în plus față de protoni, deci sarcina este negativă.'],
 m4b:['35 is the mass number A = 17 + 18. The charge compares protons and electrons.','35 este numărul de masă A = 17 + 18. Sarcina compară protonii cu electronii.'],
 m4c:['Neutral needs 17 electrons. This atom has 18.','Neutru ar însemna 17 electroni. Acest atom are 18.'],
 m4d:['That is a count of particles. The charge is protons minus electrons.','Acesta este un număr de particule. Sarcina este protoni minus electroni.'],
 m4e:['Not quite. Use charge = Z − e.','Nu chiar. Folosește sarcina = Z − e.'],
 ok_type:['Correct: 17 − 18 = −1. This is a chloride ion, Cl⁻ (A = 35).','Corect: 17 − 18 = −1. Acesta este un ion clorură, Cl⁻ (A = 35).']});
// session state (survives theme / language re-render); lumio2_atom {v:1, stars:{levelIndex:1..3}}, blocked storage = memory only
var ini=0,ST={Z:0,N:0,e:0},B={c:null,p:[]},NA={moved:false},Q=[],LV={i:0,r:0,hearts:3,hints:0,hn:0,res:null,msg:null,sel:null,how:false};
var K='lumio2_atom',mem={v:1,stars:{}};
function load(){try{var o=JSON.parse(localStorage.getItem(K));if(o&&o.v===1){var st={};for(var i in o.stars||{})if(LVL[i]&&[1,2,3].indexOf(o.stars[i])>=0)st[i]=o.stars[i];mem={v:1,stars:st}}}catch(e){}}
function save(){try{localStorage.setItem(K,JSON.stringify(mem))}catch(e){}}
var unl=function(i){return i===0||!!mem.stars[i-1]};
var HEART='<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 13.5C3 10 1.5 7.5 1.5 5.5 1.5 3.6 3 2.5 4.5 2.5 6 2.5 7.2 3.4 8 4.8 8.8 3.4 10 2.5 11.5 2.5 13 2.5 14.5 3.6 14.5 5.5 14.5 7.5 13 10 8 13.5Z"/></svg>';
function start(){var R=LVL[LV.i].rounds[LV.r];LV.hn=0;LV.sel=null;
  if(R.kind==='atom'&&R.start)ST={Z:R.start.Z,N:R.start.N,e:R.start.e};if(R.kind==='bond')B={c:null,p:[]};if(R.kind==='ionic')NA.moved=false;if(R.kind==='eq')Q=R.l.concat(R.r).map(function(){return 1})}
(window.LumioModules=window.LumioModules||{})['chemistry/atom']={manifest:{id:'atom',subject:'chemistry',subjectName:['Chemistry','Chimie'],color:'--chemistry',title:['Atom puzzle','Puzzle cu atomi'],order:1,tags:['lab','quest','levels'],orbit:[0.4,72]},
// overview content (atom.md 10), inert until the overview feature ships
overview:{mins:5,ex:12,intro:['Every atom has a nucleus of protons and neutrons with electrons around it. The protons tell you which element it is.','Orice atom are un nucleu de protoni și neutroni, cu electroni în jur. Protonii îți spun ce element este.'],
 take:[['The number of protons Z decides the element.','Numărul de protoni Z stabilește elementul.'],['Neutrons have no charge: they change the mass, not the element.','Neutronii nu au sarcină: schimbă masa, nu elementul.'],['Mass number A = protons + neutrons.','Numărul de masă A = protoni + neutroni.'],
  ['Charge = protons − electrons: 0 is neutral, positive means electrons lost, negative means electrons gained.','Sarcina = protoni − electroni: 0 e neutru, pozitiv înseamnă electroni pierduți, negativ electroni primiți.'],
  ['In the first 20 elements the shells fill 2, 8, 8, then 2 (simplified), and the outer shell shapes how the atom reacts.','La primele 20 de elemente straturile se umplu 2, 8, 8, apoi 2 (simplificat), iar stratul exterior influențează cum reacționează atomul.']]},
render:function(el,ctx){
  var U=ctx.ui,L=window.Lumio,fx=ctx.fx,E=U.el,t=function(k,o){var s=ctx.n(S[k]);for(var p in o)s=s.replace('{'+p+'}',o[p]);return s},
      C={ink:U.col('--ink'),muted:U.col('--muted'),line:U.col('--line'),edge:U.col('--edge'),bg:U.col('--bg'),card:U.col('--card'),font:U.col('--ui')},
      cv=U.canvas(t('cv'),draw),top=E('div',null,'ch-top'),left=E('div',null,'left'),fr=E('div',null,'panel'),
      dots=E('div',null,'lv-dots'),lt=E('div',null,'lv-t'),lq=E('p',null,'lv-q'),eqb=E('div',null,'ch-eq'),tray=E('div',null,'ch-row'),zones=E('div',null,'ch-row'),outs=E('div',null,'ch-row'),
      form=E('form',null,'lv-f'),inp=E('input'),fire=E('button',t('check'),'btn-primary'),msg=E('p',null,'fb'),ti=E('div',null,'tiles'),ct=E('table',null,'ch-ct'),note=E('p',null,'note'),
      res=E('div',null,'lv-res'),how=E('details',null,'how'),sum=E('summary',t('how')),hw=E('div'),drag=null;
  load();el.classList.add('proj','chem');el.style.setProperty('--c',ctx.color);ctx.report({qt:LVL.length});
  dots.setAttribute('role','group');dots.setAttribute('aria-label',t('lvl'));msg.setAttribute('aria-live','polite');res.setAttribute('role','status');
  inp.id='ch-in';inp.autocomplete='off';inp.placeholder='?';fire.type='submit';fire.dataset.k='check';
  var lab=E('label',t('ans'),'k'),box=E('div',null,'lv-in');lab.htmlFor='ch-in';box.append(inp);form.append(lab,box,fire);
  form.onsubmit=function(e){e.preventDefault();check()};
  how.append(sum,hw);how.ontoggle=function(){LV.how=how.open};
  top.append(dots,lt,lq);left.append(cv,eqb,tray,zones,outs,form,msg,ti,ct);
  fr.append(res,how,note,U.cont(ctx));
  el.append(E('h1',t('title')),top,left,fr);
  var R=function(){return LVL[LV.i].rounds[LV.r]},shut=function(){return !!LV.res},say=function(k,o,cls){LV.msg=[k,o||{},cls||''];},
      elname=function(Z){return Z?ctx.n([EL[Z-1][1],EL[Z-1][2]]):'—'},
      cnt=function(n,a){return t(n===1?a+'1':a+'n',{n:n})},
      atomD=function(s){var c=s.Z-s.e,sh=shells(s.e);return{name:elname(s.Z),c:sg(c),cv:c,k:outerOf(s.e),sh:sh.length?sh.join(', '):'0'}};
  // one entry for drag-drop and click-then-click: put piece p on place z
  function drop(p,z){if(shut())return;var r=R(),f;
    if(r.kind==='atom'){
      if(p==='p'||p==='n'){if(z!=='nuc')say('r_pn');else if(p==='p'&&ST.Z>=20)say('r_maxp');else if(p==='n'&&ST.N>=24)say('r_maxn');else{ST[p==='p'?'Z':'N']++;fx.tick();LV.msg=null}}
      else{var k=z==='nuc'?-1:+String(z).slice(1),sh=shells(ST.e),nx=CAP.findIndex(function(c,i){return(sh[i]||0)<c});
        if(k<0)say('r_en');else if(nx<0||k<nx)say('r_full',{k:k+1,c:CAP[k]});else if(k>nx)say('r_in',{k:nx+1});else{ST.e++;fx.tick();LV.msg=null}}}
    else if(r.kind==='bond'){
      if(!B.c){B.c=p;fx.tick();LV.msg=null}
      else{f=V[B.c]-B.p.reduce(function(a,x){return a+V[x]},0);if(V[p]>3)say('r_c4');else if(!f)say('r_nofree',{c:B.c});else if(V[p]>f)say('r_slots',{x:p,v:V[p],c:B.c,f:f});else{B.p.push(p);fx.tick();LV.msg=null}}}
    else if(r.kind==='ionic'){
      if(p==='eNa'&&z==='Cl'){NA.moved=true;solve(r.okm)}else if(p==='eCl'&&z==='Na')wrong('w_cl');else say('r_same')}
    else if(r.kind==='eq'){var j=+p,side=j<r.l.length?'L':'R';
      if(z!==side)say('r_side',{f:sub(r.l.concat(r.r)[j][0]),s:t('s'+side)});else bump(j,1)}
    paint(LV.res?'res':null)}
  function bump(j,d){if(shut())return;var v=Q[j]+d;if(v<1)return;if(v>9){say('r_max');return paint()}Q[j]=v;fx.tick();LV.msg=null;paint()}
  function solve(m){fx.ok();ctx.report({ok:1});var rs=LVL[LV.i].rounds;
    if(LV.r<rs.length-1){LV.r++;start();LV.msg=[null,m,'ok'];return}
    var first=mem.stars[LV.i]==null,stars=Math.max(1,3-LV.hints),paid=first?10+5*(stars-1):0;
    if(first||stars>mem.stars[LV.i])mem.stars[LV.i]=stars;save();ctx.report({qd:Object.keys(mem.stars).length});if(paid)ctx.award(paid);
    LV.res={kind:'hit',stars:stars,paid:paid};LV.msg=[null,m,'ok'];fx.burst(140)}
  function wrong(k,o){LV.hearts--;fx.bad();ctx.report({bad:1});fx.shake(msg);say(k,o,'no');if(LV.hearts<=0)LV.res={kind:'lost'}}
  function check(){if(shut())return;var r=R(),d,m;
    if(r.kind==='type'){var raw=inp.value.trim(),v=num(raw);if(raw==='')return;if(v===-1){inp.value='';solve(S.ok_type)}else{wrong.apply(null,r.react(v,raw));inp.select()}}
    else if(r.kind==='atom'){if(!ST.Z&&!ST.N&&!ST.e)return say('pick'),paint();d=atomD(ST);if(r.ok(ST))solve(S.ok_atom.map(function(s,i){return s.replace('{name}',i?EL[ST.Z-1][2]:EL[ST.Z-1][1]).replace('{c}',d.c).replace('{s}',d.sh)}));else wrong.apply(null,r.react(ST,d))}
    else if(r.kind==='bond'){if(!B.c)return say('pick'),paint();var f=V[B.c]-B.p.reduce(function(a,x){return a+V[x]},0),fm=formula([B.c].concat(B.p));
      if(f){say('w_open',{c:B.c,f:t(f===1?'slot1':'slotn',{n:f})});return paint()}
      if(fm===r.t)solve(r.okm);else wrong('w_form',{f:sub(fm),t:sub(r.t)})}
    else if(r.kind==='eq'){var b=bal(r),g=Q.reduce(gcd);
      if(!b.length&&g===1)solve(S.ok_eq);else if(!b.length)say('w_gcd',{g:g});else wrong('w_eq',{list:b.map(function(x){return t('w_el',{x:x[0],a:x[1],b:x[2]})}).join('; ')})}
    paint(r.kind==='type'?'in':'res')}
  function counts(r){var n=r.l.length,o={},els=[];r.l.concat(r.r).forEach(function(m,j){for(var x in m[1]){if(!o[x]){o[x]=[0,0];els.push(x)}o[x][j<n?0:1]+=Q[j]*m[1][x]}});return els.map(function(x){return[x,o[x][0],o[x][1]]})}
  function bal(r){return counts(r).filter(function(x){return x[1]!==x[2]})}
  function hint(){LV.hn++;LV.hints++;LV.how=true;fx.tick();paint('hint')}
  function go(i,f){if(!unl(i))return;LV.i=i;LV.r=0;LV.hearts=3;LV.hints=0;LV.res=null;LV.msg=null;LV.how=false;inp.value='';ST={Z:0,N:0,e:0};start();paint(f)}
  // buttons: data-k keeps keyboard focus across repaints
  function btn(txt,k,on,cls){var b=E('button',txt,cls||'ch-b');b.type='button';b.dataset.k=k;b.onclick=on;b.disabled=shut();return b}
  function piece(p,txt,lab){var b=btn(txt,'p'+p,function(){if(b.dragged){b.dragged=0;return}fx.tick();LV.sel=LV.sel===p?null:p;paint()},'ch-b ch-pc');
    b.setAttribute('aria-pressed',LV.sel===p);if(lab)b.setAttribute('aria-label',lab);
    b.onpointerdown=function(e){if(e.button||b.disabled)return;drag={p:p,txt:txt,x:e.clientX,y:e.clientY,g:null,b:b};b.setPointerCapture(e.pointerId)};
    b.onpointermove=function(e){if(!drag||drag.b!==b)return;if(!drag.g&&Math.hypot(e.clientX-drag.x,e.clientY-drag.y)>8){drag.g=E('div',txt,'ch-ghost');document.body.append(drag.g)}
      if(drag.g){drag.g.style.left=e.clientX+'px';drag.g.style.top=e.clientY+'px'}};
    b.onpointerup=function(e){var d=drag;drag=null;if(!d||!d.g)return;d.g.remove();b.dragged=1;setTimeout(function(){b.dragged=0},0);
      var tg=document.elementFromPoint(e.clientX,e.clientY),z=tg===cv?zoneAt(e.clientX,e.clientY):tg&&tg.closest&&tg.closest('[data-z]');if(z&&z.dataset)z=z.dataset.z;if(z!=null)drop(p,z)};
    b.onpointercancel=function(){if(drag&&drag.g)drag.g.remove();drag=null};return b}
  function place(txt,z){var b=btn(txt,'z'+z,function(){if(LV.sel==null){say('pick');paint();return}drop(LV.sel,z)});b.dataset.z=z;return b}
  // canvas geometry (shared by draw and hit test)
  function geo(){var w=cv.clientWidth,h=cv.clientHeight,R0=Math.min(w,h)/2-14,rn=R0*.24;return{w:w,h:h,cx:w/2,cy:h/2,R0:R0,rn:rn,rs:CAP.map(function(_,k){return rn+(R0-rn)*(k+1)/4})}}
  function zoneAt(x,y){var r=R(),b=cv.getBoundingClientRect(),g=geo(),px=x-b.left,py=y-b.top;
    if(r.kind==='bond')return'board';if(r.kind==='ionic')return px<g.w/2?'Na':'Cl';if(r.kind!=='atom')return null;
    var d=Math.hypot(px-g.cx,py-g.cy);if(d<=g.rn+6)return'nuc';if(d>g.R0+20)return null;
    var k=0;g.rs.forEach(function(s,i){if(Math.abs(d-s)<Math.abs(d-g.rs[k]))k=i});return's'+k}
  function atomArt(c,cx,cy,rn,rs,Z,N,e,col){
    var T=Z+N,rd=T?Math.min(7,rn/(1.5*Math.sqrt(T))):0,sp=T>1?(rn-rd)/Math.sqrt(T):0,i,pp=0;
    rs.forEach(function(s){c.beginPath();c.arc(cx,cy,s,0,7);c.strokeStyle=C.line;c.lineWidth=1.5;c.stroke()});
    c.textAlign='center';c.textBaseline='middle';
    for(i=0;i<T;i++){var a=i*2.4,r=sp*Math.sqrt(i+.5),x=cx+r*Math.cos(a),y=cy+r*Math.sin(a),isP=Math.floor((i+1)*Z/T)>pp;if(isP)pp++;
      c.beginPath();c.arc(x,y,rd,0,7);if(isP){c.fillStyle=col;c.fill();if(rd>=5){c.fillStyle=C.bg;c.font='600 '+Math.round(rd*1.5)+'px '+C.font;c.fillText('+',x,y+.5)}}else{c.fillStyle=C.card;c.fill();c.strokeStyle=C.ink;c.lineWidth=1.5;c.stroke()}}
    shells(e).forEach(function(m,k){var er=Math.min(5,rs[k]*Math.PI/m/2.6);for(var j=0;j<m;j++){var a=-Math.PI/2+j*2*Math.PI/m,x=cx+rs[k]*Math.cos(a),y=cy+rs[k]*Math.sin(a);
      c.beginPath();c.arc(x,y,er,0,7);c.fillStyle=C.ink;c.fill();if(er>=4.5){c.strokeStyle=C.bg;c.lineWidth=1.5;c.beginPath();c.moveTo(x-2.5,y);c.lineTo(x+2.5,y);c.stroke()}}})}
  function disc(c,x,y,r,s,col,w){c.beginPath();c.arc(x,y,r,0,7);c.fillStyle=C.card;c.fill();c.strokeStyle=col;c.lineWidth=w;c.stroke();c.fillStyle=C.ink;c.font='600 '+Math.round(r*.8)+'px '+C.font;c.textAlign='center';c.textBaseline='middle';c.fillText(s,x,y+1)}
  function draw(){var f=cv.fit();if(!f)return;var c=f.c,g=geo(),r=R(),col=ctx.color,lab;
    if(r.kind==='atom'||r.kind==='type'){var s=r.kind==='type'?{Z:17,N:18,e:18}:ST,sh=shells(s.e);atomArt(c,g.cx,g.cy,g.rn,g.rs,s.Z,s.N,s.e,col);
      lab=t('aria1',{p:cnt(s.Z,'p'),n:cnt(s.N,'n'),e:cnt(s.e,'e'),s:sh.length?sh.join(', '):'0'})}
    else if(r.kind==='bond'){
      if(!B.c)lab=t('aria2e');else{var n=B.p.length,rc=Math.min(30,g.R0*.3),rp=rc*.8,dist=Math.min(g.R0-rp,rc*3.2),fr=V[B.c]-B.p.reduce(function(a,x){return a+V[x]},0),m=n+fr,ang=function(j){return -Math.PI/2+j*2*Math.PI/m+(m===2?Math.PI/2:0)};
        // bonded atoms and free slots share m evenly spaced directions (drawn flat, not the real 3D shape)
        B.p.forEach(function(p,j){var a=ang(j),x=g.cx+dist*Math.cos(a),y=g.cy+dist*Math.sin(a),o=V[p],nx=-Math.sin(a),ny=Math.cos(a);
          c.strokeStyle=C.ink;c.lineWidth=2;for(var q=0;q<o;q++){var off=(q-(o-1)/2)*6;c.beginPath();c.moveTo(g.cx+nx*off+Math.cos(a)*rc,g.cy+ny*off+Math.sin(a)*rc);c.lineTo(x+nx*off-Math.cos(a)*rp,y+ny*off-Math.sin(a)*rp);c.stroke()}
          disc(c,x,y,rp,p,C.ink,1.5)});
        for(var q=0;q<fr;q++){var a=ang(n+q),x=g.cx+(rc+14)*Math.cos(a),y=g.cy+(rc+14)*Math.sin(a);c.beginPath();c.arc(x,y,7,0,7);c.strokeStyle=C.muted;c.setLineDash([3,3]);c.lineWidth=2;c.stroke();c.setLineDash([])}
        disc(c,g.cx,g.cy,rc,B.c,col,3);
        lab=t('aria2',{d:t('mid',{c:B.c,list:B.p.length?B.p.join(', '):'—'})+(fr?' · '+t('free',{n:fr}):'')})}}
    else if(r.kind==='ionic'){var rr=Math.min(g.w/4-8,g.R0),rn2=rr*.24,mk=function(k){return rn2+(rr-rn2)*(k+1)/4},rs=[0,1,2].map(mk),xa=g.w/4,xb=3*g.w/4,ea=NA.moved?10:11,eb=NA.moved?18:17;
      atomArt(c,xa,g.cy,rn2,rs,11,12,ea,col);atomArt(c,xb,g.cy,rn2,rs,17,18,eb,col);
      c.fillStyle=C.ink;c.font='600 15px '+C.font;c.textAlign='center';c.textBaseline='top';c.fillText(NA.moved?'Na⁺':'Na',xa,Math.min(g.h-20,g.cy+rr+2));c.fillText(NA.moved?'Cl⁻':'Cl',xb,Math.min(g.h-20,g.cy+rr+2));
      if(NA.moved){c.strokeStyle=C.muted;c.setLineDash([4,4]);c.lineWidth=1.5;c.beginPath();c.moveTo(xa+rs[2],g.cy);c.lineTo(xb-rs[2]-6,g.cy);c.stroke();c.setLineDash([]);c.beginPath();c.moveTo(xb-rs[2]-6,g.cy-5);c.lineTo(xb-rs[2]+2,g.cy);c.lineTo(xb-rs[2]-6,g.cy+5);c.fillStyle=C.muted;c.fill()}
      lab=t('aria3',{a:shells(ea).join(', '),b:shells(eb).join(', ')})}
    if(lab)cv.setAttribute('aria-label',lab)}
  function paint(f){
    var r=R(),k=r.kind,ae=document.activeElement,fk=ae&&ae.dataset&&el.contains(ae)?ae.dataset.k:null,rs=LVL[LV.i].rounds;
    dots.replaceChildren.apply(dots,LVL.map(function(_,i){var s=mem.stars[i],b=E('button',null,'lv-dot'+(i===LV.i?' cur':'')+(s?' done':''));b.type='button';b.dataset.k='d'+i;
      b.append(E('i',String(i+1)));if(s&&L.spk)b.append(L.spk(s));b.disabled=!unl(i);b.title=unl(i)?t(LVL[i].name):t('locked');
      b.setAttribute('aria-label',!unl(i)?t('dlock',{n:i+1}):(s?t('dot',{n:i+1,s:s}):t('dn',{n:i+1}))+' · '+t(LVL[i].name));if(i===LV.i)b.setAttribute('aria-current','step');
      b.onclick=function(){fx.tick();go(i)};return b}));
    var hs=E('span',null,'hearts'),h=Math.max(0,LV.hearts);hs.setAttribute('role','img');hs.setAttribute('aria-label',t('hearts',{n:h})+'. '+t('heart_t'));hs.title=t('heart_t');
    hs.innerHTML=HEART+HEART+HEART;for(var j=0;j<h;j++)hs.children[j].classList.add('on');hs.append(h+' / 3');
    var hd=E('div');hd.append(E('h3',t('lv_n',{n:LV.i+1,name:t(LVL[LV.i].name)})),E('small',t('step',{a:LV.r+1,b:rs.length}),'k'));lt.replaceChildren(hd,hs);
    lq.textContent=ctx.n(r.q);
    cv.hidden=k==='eq';eqb.hidden=ct.hidden=k!=='eq';ti.hidden=!(k==='atom'||k==='type');form.hidden=k!=='type';fire.disabled=inp.disabled=shut();
    tray.hidden=zones.hidden=outs.hidden=k==='type';
    var tl=E('span',t('tray'),'k'),zl=E('span',t('to'),'k'),ol=E('span',t('out'),'k'),chk=btn(t('check'),'check',check,'btn-primary');
    if(k==='atom'){var sh=shells(ST.e),d=atomD(ST);
      tray.replaceChildren(tl,piece('p',t('p')),piece('n',t('n')),piece('e',t('e')));
      zones.replaceChildren.apply(zones,[zl,place(t('nuc'),'nuc')].concat(CAP.map(function(c,i){return place(t('sh',{k:i+1,a:sh[i]||0,c:c}),'s'+i)})));
      outs.replaceChildren(ol,btn('− p⁺','op',function(){if(ST.Z>0){ST.Z--;fx.tick();LV.msg=null}paint()}),btn('− n','on',function(){if(ST.N>0){ST.N--;fx.tick();LV.msg=null}paint()}),btn('− e⁻','oe',function(){if(ST.e>0){ST.e--;fx.tick();LV.msg=null}paint()}),chk);
      U.tiles(ti,[[t('el'),ST.Z?d.name+' · '+EL[ST.Z-1][0]:'—'],[t('A'),'A = '+ST.Z+' + '+ST.N+' = '+(ST.Z+ST.N)],[t('chg'),ST.Z||ST.e?d.c+' · '+t(d.cv?d.cv>0?'pos':'neg':'neu'):'—'],[t('outer'),String(d.k)],[t('shells'),ST.e?sh.join(', '):t('none')]]);
      note.textContent=t('note1')}
    else if(k==='type'){U.tiles(ti,[['Z','17'],['N','18'],['e','18'],[t('A'),'A = 17 + 18 = 35']]);note.textContent=t('note1')}
    else if(k==='bond'){tray.replaceChildren.apply(tray,[tl].concat(['H','O','N','C'].map(function(x){return piece(x,x+' · '+t(V[x]===1?'slot1':'slotn',{n:V[x]}))})));
      zones.replaceChildren(zl,place(t('board'),'board'));
      outs.replaceChildren(btn(t('back1'),'tb',function(){if(B.p.length)B.p.pop();else B.c=null;fx.tick();LV.msg=null;paint()}),btn(t('clear'),'cb',function(){B={c:null,p:[]};fx.tick();LV.msg=null;paint()}),chk);
      note.textContent=t('note2')}
    else if(k==='ionic'){tray.replaceChildren(tl,piece('eNa',t('eNa')),piece('eCl',t('eCl')));zones.replaceChildren(zl,place(t('Na'),'Na'),place(t('Cl'),'Cl'));outs.replaceChildren();outs.hidden=true;note.textContent=t('note3')}
    else{var all=r.l.concat(r.r),n=r.l.length;
      tray.replaceChildren.apply(tray,[tl].concat(all.map(function(m,j){return piece(String(j),sub(m[0]))})));zones.replaceChildren();zones.hidden=true;
      var side=function(z,a,o){var s=E('div',null,'ch-side');s.dataset.z=z;s.setAttribute('role','group');s.setAttribute('aria-label',t(z==='L'?'left':'right'));
        s.onclick=function(e){if(e.target===s||!e.target.closest('button')){if(LV.sel!=null)drop(LV.sel,z)}};
        a.forEach(function(m,jj){var j=jj+o,tm=E('span',null,'ch-term'),fm=sub(m[0]);if(jj)s.append(E('span','+','ch-op'));
          tm.append(btn('−','m'+j,function(){bump(j,-1)},'ch-b ch-st'),E('b',String(Q[j]),'ch-k'),btn('+','a'+j,function(){bump(j,1)},'ch-b ch-st'),E('span',fm,'ch-f'));
          tm.children[0].setAttribute('aria-label',t('less',{f:fm})+' ('+Q[j]+')');tm.children[2].setAttribute('aria-label',t('more',{f:fm})+' ('+Q[j]+')');s.append(tm)});return s};
      eqb.replaceChildren(side('L',r.l,0),E('span','→','ch-op ch-ar'),side('R',r.r,n));
      var hr=E('tr');[t('ct_el'),t('ct_l'),t('ct_r'),t('ct_s')].forEach(function(x){hr.append(E('th',x))});ct.replaceChildren(hr);
      counts(r).forEach(function(x){var tr=E('tr',null,x[1]===x[2]?'eq':'');[x[0],x[1],x[2],x[1]===x[2]?'✓ '+t('eqw'):t('off',{n:Math.abs(x[1]-x[2])})].forEach(function(v){tr.append(E('td',String(v)))});ct.append(tr)});
      outs.replaceChildren(chk);note.textContent=t('note4')}
    var m=LV.msg;msg.className='fb'+(m&&m[2]?' '+m[2]:'');msg.textContent=!m?(k==='type'?'':t('pick_t')):m[0]?t(m[0],m[1]):ctx.n(m[1]);
    // result: level complete or out of hearts (projectile pattern)
    var act=null;res.replaceChildren();res.hidden=!LV.res;
    if(LV.res&&LV.res.kind==='hit'){var sp=E('p',null,'lv-st');if(L.spk)sp.append(L.spk(LV.res.stars));sp.append(E('span',t('stars',{n:LV.res.stars})));
      res.append(E('p',t('hit'),'fb ok'),sp,E('p',LV.res.paid?t('reward',{n:LV.res.paid}):t('replay'),LV.res.paid?'lum':'rep'));
      if(LV.i<LVL.length-1){act=E('button',t('next'),'btn-primary');act.onclick=function(){go(LV.i+1)}}else res.append(E('p',t('all'),'lv-all'))}
    else if(LV.res){res.append(E('p',t('lost'),'fb no'));act=E('button',t('retry'),'btn-primary');act.onclick=function(){go(LV.i)}}
    if(act){act.type='button';res.append(act)}
    // hint ladder for the current puzzle: each opened hint costs one sparkle
    hw.replaceChildren(E('p',t('hint_cost'),'note'));r.h.forEach(function(x,i){if(i<LV.hn){var c=E('div',null,'card2');c.append(E('span',t('hint',{n:i+1}),'k'),E('p',ctx.n(x)));hw.append(c)}});
    var hb=null;if(LV.hn<3&&!shut()){hb=btn(t('hint',{n:LV.hn+1}),'hint',hint,'chip');hw.append(hb)}
    how.open=LV.how;draw();
    var fe=fk&&el.querySelector('[data-k="'+fk+'"]');
    if(f==='hint')(hb||sum).focus();else if(act&&(f==='res'||f==='in'))act.focus();else if(f==='in'&&!form.hidden)inp.focus();else if(fe&&!fe.disabled)fe.focus()}
  if(!ini){ini=1;start()}paint();
}};
})();
