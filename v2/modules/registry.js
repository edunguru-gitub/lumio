// Lumio registry (strict JSON after '='; tools/build-hosted.py parses it).
// features: js/<id>.js. lessons: "subject/file" = modules/<subject>/<file>.js (manifest inside);
// an object = placeholder lesson (Coming soon) with the same manifest shape. Subjects appear in first-seen order.
// Add a lesson: new module file + one line here. Remove a line: lesson gone everywhere.
window.LumioRegistry={
"features":["rating","terminal","ranks","ticker"],
"lessons":[
"physics/optics",
{"id":"waves","subject":"physics","subjectName":["Physics","Fizică"],"color":"--physics","title":["Waves","Unde"],"order":2,"tags":[],"orbit":[1.4,80]},
{"id":"mechanics","subject":"physics","subjectName":["Physics","Fizică"],"color":"--physics","title":["Mechanics","Mecanică"],"order":3,"tags":[],"orbit":[3.4,55]},
"physics/gas",
"math/algebra",
"math/parabola",
"math/pythagoras",
{"id":"fractions","subject":"math","subjectName":["Math","Matematică"],"color":"--math","title":["Fractions","Fracții"],"order":4,"tags":[],"orbit":[3.8,82]},
{"id":"greetings","subject":"spanish","subjectName":["Spanish","Spaniolă"],"color":"--spanish","title":["Greetings","Salutări"],"order":1,"tags":[],"orbit":[-1,66]},
{"id":"verbs","subject":"spanish","subjectName":["Spanish","Spaniolă"],"color":"--spanish","title":["Verbs","Verbe"],"order":2,"tags":[],"orbit":[1.1,78]},
{"id":"numbers","subject":"spanish","subjectName":["Spanish","Spaniolă"],"color":"--spanish","title":["Numbers","Numere"],"order":3,"tags":[],"orbit":[3.3,58]},
{"id":"budgeting","subject":"life","subjectName":["Life skills","Abilități de viață"],"color":"--life","title":["Budgeting","Buget"],"order":1,"tags":[],"orbit":[-0.8,60]},
{"id":"focus","subject":"life","subjectName":["Life skills","Abilități de viață"],"color":"--life","title":["Focus","Concentrare"],"order":2,"tags":[],"orbit":[1.5,80]},
{"id":"sleep","subject":"life","subjectName":["Life skills","Abilități de viață"],"color":"--life","title":["Sleep","Somn"],"order":3,"tags":[],"orbit":[3.6,64]}
]};
