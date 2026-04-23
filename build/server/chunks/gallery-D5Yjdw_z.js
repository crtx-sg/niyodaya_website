const galleryImages = [
  { file: "26012011666.jpg", date: "2011-01-26", event: "Republic Day", programme: "vidya", caption: "Children proudly holding the tricolour" },
  { file: "26012011667.jpg", date: "2011-01-26", event: "Republic Day", programme: "vidya", caption: "Cultural dance performance by students" },
  { file: "26012011663.jpg", date: "2011-01-26", event: "Republic Day", programme: "vidya", caption: "Morning assembly in the school courtyard" },
  { file: "26012011668.jpg", date: "2011-01-26", event: "Republic Day", programme: "vidya", caption: "Historical drama performed by students" },
  { file: "14082010557.jpg", date: "2010-08-14", event: "Independence Day", programme: "vidya", caption: "Hand-drawn 64th Independence Day artwork" },
  { file: "14082010554.jpg", date: "2010-08-14", event: "Digital Learning", programme: "vinaya", caption: "Children absorbed in an audio-visual lesson" },
  { file: "14082010556.jpg", date: "2010-08-14", event: "Values & Culture", programme: "vidya", caption: "Students practicing traditional leaf-craft" },
  { file: "09072011714.jpg", date: "2011-07-09", event: "Mid-Day Meal", programme: "vidya", caption: "Nourishment that supports learning" },
  { file: "09072011721.jpg", date: "2011-07-09", event: "Digital Literacy", programme: "vinaya", caption: "Early language learning on a laptop" },
  { file: "18022011691.jpg", date: "2011-02-18", event: "Computer Lab", programme: "vinaya", caption: "Instructor guiding students on basic computing" },
  { file: "18022011692.jpg", date: "2011-02-18", event: "Computer Lab", programme: "vinaya", caption: "Volunteer-led computer literacy session" },
  { file: "11122010643.jpg", date: "2010-12-11", event: "Annual Day", programme: "vidya", caption: "Traditional dance performance on stage" },
  { file: "03032012832.jpg", date: "2012-03-03", event: "Science Exhibition", programme: "vidya", caption: "Students, teachers, and volunteers together" },
  { file: "03032012817.jpg", date: "2012-03-03", event: "Science Exhibition", programme: "vidya", caption: "Air-pressure experiment by a young scientist" },
  { file: "03032012833.jpg", date: "2012-03-03", event: "Science Exhibition", programme: "vidya", caption: "Biology exhibit — anatomy models" },
  { file: "03032012830.jpg", date: "2012-03-03", event: "Digital Learning", programme: "vinaya", caption: "Parents & children exploring computers together" },
  { file: "26062010536.jpg", date: "2010-06-26", event: "Infrastructure", programme: "vidya", caption: "Community computer lab set up for the school" }
];
function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

export { formatDate as f, galleryImages as g };
//# sourceMappingURL=gallery-D5Yjdw_z.js.map
