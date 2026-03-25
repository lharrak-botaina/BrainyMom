import { useState, useRef } from "react";

/* ═══════════════════════════════════════════════════════════  DATA  ═══════════════════════════════════════════════════════════ */

const FRENCH_LESSONS = [
  {
    id:"colors",title:"الألوان",subtitle:"Les Couleurs",emoji:"🎨",color:"#e11d48",
    explanation:{
      intro:"الألوان في الفرنسية سهلة جداً! كثير منها تشبه الكلمة العربية أو الإنجليزية.",
      tip:"💡 نصيحة: في الفرنسية، اللون يتغير قليلاً حسب المذكر والمؤنث. blanc تصبح blanche للمؤنث.",
      examples:[{ar:"السماء زرقاء",fr:"Le ciel est bleu"},{ar:"الوردة حمراء",fr:"La rose est rouge"},{ar:"العشب أخضر",fr:"L'herbe est verte"}],
      grammar:"طريقة الاستخدام:\nاسم الشيء + est + اللون\nمثال: La maison est blanche — البيت أبيض"
    },
    words:[
      {fr:"Rouge",ar:"أحمر",emoji:"🔴",example:"La tomate est rouge — الطماطم حمراء"},
      {fr:"Bleu",ar:"أزرق",emoji:"🔵",example:"Le ciel est bleu — السماء زرقاء"},
      {fr:"Vert",ar:"أخضر",emoji:"🟢",example:"L'arbre est vert — الشجرة خضراء"},
      {fr:"Jaune",ar:"أصفر",emoji:"🟡",example:"Le soleil est jaune — الشمس صفراء"},
      {fr:"Blanc",ar:"أبيض",emoji:"⚪",example:"La neige est blanche — الثلج أبيض"},
      {fr:"Noir",ar:"أسود",emoji:"⚫",example:"La nuit est noire — الليل أسود"},
      {fr:"Orange",ar:"برتقالي",emoji:"🟠",example:"L'orange est orange — البرتقالة برتقالية"},
      {fr:"Rose",ar:"وردي",emoji:"🩷",example:"La fleur est rose — الزهرة وردية"},
      {fr:"Violet",ar:"بنفسجي",emoji:"🟣",example:"Le raisin est violet — العنب بنفسجي"},
      {fr:"Marron",ar:"بني",emoji:"🟤",example:"Le chocolat est marron — الشوكولاتة بنية"},
      {fr:"Gris",ar:"رمادي",emoji:"🩶",example:"Le nuage est gris — السحابة رمادية"},
      {fr:"Beige",ar:"بيج",emoji:"🏜️",example:"Le sable est beige — الرمل بيج"},
    ]
  },
  {
    id:"family",title:"العائلة",subtitle:"La Famille",emoji:"👨‍👩‍👧",color:"#7c3aed",
    explanation:{
      intro:"كلمات العائلة من أهم الكلمات التي نستخدمها كل يوم. دعينا نتعلمها معاً!",
      tip:"💡 نصيحة: نستخدم mon للمذكر (mon père = أبي) وma للمؤنث (ma mère = أمي).",
      examples:[{ar:"هذه أمي",fr:"C'est ma mère"},{ar:"هذا أبي",fr:"C'est mon père"},{ar:"لدي أخ وأخت",fr:"J'ai un frère et une sœur"}],
      grammar:"mon père = أبي  |  ma mère = أمي\nmon frère = أخي  |  ma sœur = أختي\nmes parents = والداي"
    },
    words:[
      {fr:"Mère",ar:"أم",emoji:"👩",example:"Ma mère est gentille — أمي طيبة"},
      {fr:"Père",ar:"أب",emoji:"👨",example:"Mon père travaille — أبي يعمل"},
      {fr:"Fils",ar:"ابن",emoji:"👦",example:"Mon fils s'appelle Ali — ابني اسمه علي"},
      {fr:"Fille",ar:"بنت",emoji:"👧",example:"Ma fille est belle — بنتي جميلة"},
      {fr:"Frère",ar:"أخ",emoji:"🧑",example:"Mon frère est grand — أخي كبير"},
      {fr:"Sœur",ar:"أخت",emoji:"👱‍♀️",example:"Ma sœur est petite — أختي صغيرة"},
      {fr:"Grand-mère",ar:"جدة",emoji:"👵",example:"Ma grand-mère cuisine bien — جدتي تطبخ جيداً"},
      {fr:"Grand-père",ar:"جد",emoji:"👴",example:"Mon grand-père est sage — جدي حكيم"},
      {fr:"Oncle",ar:"عم / خال",emoji:"👲",example:"Mon oncle est médecin — عمي طبيب"},
      {fr:"Tante",ar:"عمة / خالة",emoji:"👩‍🦱",example:"Ma tante habite à Rabat — خالتي تسكن في الرباط"},
      {fr:"Cousin",ar:"ابن العم",emoji:"🧒",example:"Mon cousin joue au foot — ابن عمي يلعب كرة"},
      {fr:"Mari",ar:"زوج",emoji:"💍",example:"Mon mari travaille — زوجي يعمل"},
    ]
  },
  {
    id:"numbers",title:"الأرقام",subtitle:"Les Nombres",emoji:"🔢",color:"#0891b2",
    explanation:{
      intro:"الأرقام في الفرنسية مهمة للتسوق والتواريخ والعمر. لنتعلمها خطوة بخطوة!",
      tip:"💡 نصيحة: لقول عمرك: J'ai ... ans. مثال: J'ai trente ans = عندي ثلاثون سنة.",
      examples:[{ar:"عمري أربعون سنة",fr:"J'ai quarante ans"},{ar:"لدي خمسة أولاد",fr:"J'ai cinq enfants"},{ar:"عشرون درهماً",fr:"Vingt dirhams"}],
      grammar:"J'ai ... ans = عمري ... سنة\nJ'ai faim = أنا جائعة\nJ'ai soif = أنا عطشانة"
    },
    words:[
      {fr:"Un",ar:"واحد",emoji:"1️⃣",example:"Un enfant — طفل واحد"},
      {fr:"Deux",ar:"اثنان",emoji:"2️⃣",example:"Deux mains — يدان"},
      {fr:"Trois",ar:"ثلاثة",emoji:"3️⃣",example:"Trois repas — ثلاث وجبات"},
      {fr:"Quatre",ar:"أربعة",emoji:"4️⃣",example:"Quatre saisons — أربعة فصول"},
      {fr:"Cinq",ar:"خمسة",emoji:"5️⃣",example:"Cinq doigts — خمسة أصابع"},
      {fr:"Six",ar:"ستة",emoji:"6️⃣",example:"Six jours — ستة أيام"},
      {fr:"Sept",ar:"سبعة",emoji:"7️⃣",example:"Sept couleurs — سبعة ألوان"},
      {fr:"Huit",ar:"ثمانية",emoji:"8️⃣",example:"Huit heures — ثماني ساعات"},
      {fr:"Neuf",ar:"تسعة",emoji:"9️⃣",example:"Neuf mois — تسعة أشهر"},
      {fr:"Dix",ar:"عشرة",emoji:"🔟",example:"Dix minutes — عشر دقائق"},
      {fr:"Vingt",ar:"عشرون",emoji:"2️⃣0️⃣",example:"Vingt dirhams — عشرون درهماً"},
      {fr:"Trente",ar:"ثلاثون",emoji:"3️⃣0️⃣",example:"Trente ans — ثلاثون سنة"},
      {fr:"Quarante",ar:"أربعون",emoji:"4️⃣0️⃣",example:"Quarante élèves — أربعون تلميذاً"},
      {fr:"Cent",ar:"مئة",emoji:"💯",example:"Cent dirhams — مئة درهم"},
    ]
  },
  {
    id:"body",title:"الجسم",subtitle:"Le Corps",emoji:"🫀",color:"#dc2626",
    explanation:{
      intro:"أجزاء الجسم مهمة عند الذهاب للطبيب أو وصف ألم. لنتعلمها!",
      tip:"💡 نصيحة: لقول أن شيئاً يؤلمك: J'ai mal à... مثلاً J'ai mal à la tête = عندي صداع.",
      examples:[{ar:"عندي صداع",fr:"J'ai mal à la tête"},{ar:"يدي تؤلمني",fr:"J'ai mal à la main"},{ar:"أغسل وجهي",fr:"Je lave mon visage"}],
      grammar:"J'ai mal à + الجزء = يؤلمني...\nJ'ai mal à la tête = رأسي يؤلمني\nJ'ai mal au dos = ظهري يؤلمني"
    },
    words:[
      {fr:"Tête",ar:"رأس",emoji:"🗣️",example:"J'ai mal à la tête — رأسي يؤلمني"},
      {fr:"Visage",ar:"وجه",emoji:"😊",example:"Un beau visage — وجه جميل"},
      {fr:"Œil",ar:"عين",emoji:"👁️",example:"Des yeux marron — عيون بنية"},
      {fr:"Nez",ar:"أنف",emoji:"👃",example:"Un grand nez — أنف كبير"},
      {fr:"Bouche",ar:"فم",emoji:"👄",example:"Ouvre la bouche — افتحي فمك"},
      {fr:"Oreille",ar:"أذن",emoji:"👂",example:"Une oreille droite — أذن يمنى"},
      {fr:"Main",ar:"يد",emoji:"✋",example:"Lève la main — ارفعي يدك"},
      {fr:"Pied",ar:"قدم",emoji:"🦶",example:"Mon pied gauche — قدمي اليسرى"},
      {fr:"Dos",ar:"ظهر",emoji:"🔙",example:"J'ai mal au dos — ظهري يؤلمني"},
      {fr:"Ventre",ar:"بطن",emoji:"🫃",example:"J'ai mal au ventre — بطني تؤلمني"},
      {fr:"Cœur",ar:"قلب",emoji:"❤️",example:"Mon cœur bat vite — قلبي يدق بسرعة"},
      {fr:"Genou",ar:"ركبة",emoji:"🦵",example:"Mon genou est blessé — ركبتي مجروحة"},
    ]
  },
  {
    id:"food",title:"الطعام",subtitle:"La Nourriture",emoji:"🍎",color:"#16a34a",
    explanation:{
      intro:"الطعام والشراب من أكثر الكلمات استخداماً في الحياة اليومية.",
      tip:"💡 نصيحة: في المتجر قولي: Je voudrais... (أريد...) مثلاً: Je voudrais du pain = أريد خبزاً.",
      examples:[{ar:"أريد خبزاً",fr:"Je voudrais du pain"},{ar:"الطعام لذيذ",fr:"La nourriture est délicieuse"},{ar:"أنا جائعة",fr:"J'ai faim"}],
      grammar:"J'ai faim = أنا جائعة\nJ'ai soif = أنا عطشانة\nJe mange = أنا آكل\nJe bois = أنا أشرب"
    },
    words:[
      {fr:"Pain",ar:"خبز",emoji:"🍞",example:"Du pain frais — خبز طازج"},
      {fr:"Eau",ar:"ماء",emoji:"💧",example:"De l'eau froide — ماء بارد"},
      {fr:"Lait",ar:"حليب",emoji:"🥛",example:"Du lait chaud — حليب ساخن"},
      {fr:"Sucre",ar:"سكر",emoji:"🍬",example:"Deux cuillères de sucre — ملعقتان سكر"},
      {fr:"Sel",ar:"ملح",emoji:"🧂",example:"Un peu de sel — قليل ملح"},
      {fr:"Huile",ar:"زيت",emoji:"🫙",example:"De l'huile d'olive — زيت زيتون"},
      {fr:"Viande",ar:"لحم",emoji:"🥩",example:"De la viande — لحم"},
      {fr:"Poulet",ar:"دجاج",emoji:"🍗",example:"Un poulet rôti — دجاج مشوي"},
      {fr:"Légumes",ar:"خضروات",emoji:"🥦",example:"Des légumes frais — خضروات طازجة"},
      {fr:"Pomme",ar:"تفاحة",emoji:"🍎",example:"Une pomme rouge — تفاحة حمراء"},
      {fr:"Orange",ar:"برتقالة",emoji:"🍊",example:"Un jus d'orange — عصير برتقال"},
      {fr:"Tomate",ar:"طماطم",emoji:"🍅",example:"Des tomates fraîches — طماطم طازجة"},
      {fr:"Œuf",ar:"بيضة",emoji:"🥚",example:"Deux œufs — بيضتان"},
      {fr:"Fromage",ar:"جبن",emoji:"🧀",example:"Du fromage — جبن"},
    ]
  },
  {
    id:"greetings",title:"التحيات",subtitle:"Les Salutations",emoji:"👋",color:"#f59e0b",
    explanation:{
      intro:"التحيات هي أول ما تقولينه عند لقاء شخص. هذه الجمل ستستخدمينها كل يوم!",
      tip:"💡 نصيحة: Bonjour في الصباح والنهار. Bonsoir في المساء. Bonne nuit عند النوم.",
      examples:[{ar:"مرحباً، كيف حالك؟",fr:"Bonjour, comment allez-vous ?"},{ar:"أنا بخير، شكراً",fr:"Je vais bien, merci"},{ar:"مع السلامة",fr:"Au revoir"}],
      grammar:"Bonjour = مرحباً / صباح الخير\nMerci = شكراً\nS'il vous plaît = من فضلك\nPardon = عفواً"
    },
    words:[
      {fr:"Bonjour",ar:"مرحباً",emoji:"☀️",example:"Bonjour madame — صباح الخير"},
      {fr:"Bonsoir",ar:"مساء الخير",emoji:"🌙",example:"Bonsoir — مساء الخير"},
      {fr:"Merci",ar:"شكراً",emoji:"🙏",example:"Merci beaucoup — شكراً جزيلاً"},
      {fr:"S'il vous plaît",ar:"من فضلك",emoji:"🤲",example:"L'eau, s'il vous plaît — الماء من فضلك"},
      {fr:"Pardon",ar:"عفواً",emoji:"😔",example:"Pardon madame — عفواً يا سيدتي"},
      {fr:"Au revoir",ar:"مع السلامة",emoji:"👋",example:"Au revoir — مع السلامة"},
      {fr:"Oui",ar:"نعم",emoji:"✅",example:"Oui, je comprends — نعم، أفهم"},
      {fr:"Non",ar:"لا",emoji:"❌",example:"Non merci — لا شكراً"},
      {fr:"Je m'appelle",ar:"اسمي",emoji:"🪪",example:"Je m'appelle Fatima — اسمي فاطمة"},
      {fr:"Ça va ?",ar:"كيف حالك؟",emoji:"🤔",example:"Ça va ? — كيف حالك؟"},
      {fr:"Très bien",ar:"بخير جداً",emoji:"😊",example:"Je vais très bien — أنا بخير جداً"},
      {fr:"Bonne nuit",ar:"تصبح على خير",emoji:"🌃",example:"Bonne nuit — تصبحين على خير"},
    ]
  },
];

const MATH_LESSONS = [
  {
    id:"addition",title:"الجمع",emoji:"➕",color:"#2563eb",
    explanation:{
      intro:"الجمع هو إضافة عددين معاً. نستخدمه كل يوم في الحياة!",
      tip:"💡 نصيحة عملية: تخيلي أنك تضعين تفاحات في سلة. 5 تفاحات + 3 تفاحات = 8 تفاحات!",
      steps:["اقرئي الرقم الأول واحتفظي به في ذاكرتك","أضيفي إليه الرقم الثاني ببطء","إذا كانت الأرقام كبيرة، اجمعي الآحاد أولاً ثم العشرات","تحققي: الناتج يجب أن يكون أكبر من كلا الرقمين"],
      worked:[
        {q:"23 + 15 = ؟",steps:["الآحاد: 3 + 5 = 8","العشرات: 20 + 10 = 30","الإجابة: 30 + 8 = 38"],ans:"38"},
        {q:"47 + 36 = ؟",steps:["الآحاد: 7 + 6 = 13 (نكتب 3 ونحمل 1)","العشرات: 40 + 30 + 10 = 80","الإجابة: 80 + 3 = 83"],ans:"83"},
      ]
    },
    generate:()=>{
      const lvl=rnd(0,3); let a,b;
      if(lvl===0){a=rnd(10,99);b=rnd(10,99);}
      else if(lvl===1){a=rnd(100,999);b=rnd(100,999);}
      else if(lvl===2){a=rnd(1000,9999);b=rnd(1000,9999);}
      else{a=rnd(10000,99999);b=rnd(10000,99999);}
      return mkQ(`${a} + ${b} = ؟`,a+b);
    }
  },
  {
    id:"subtraction",title:"الطرح",emoji:"➖",color:"#dc2626",
    explanation:{
      intro:"الطرح هو إزالة عدد من عدد آخر. نستخدمه كل يوم عند حساب الباقي من المال!",
      tip:"💡 نصيحة عملية: معك 50 درهماً واشتريتِ شيئاً بـ 23 درهماً. كم سيبقى؟ 50 - 23 = ؟",
      steps:["تأكدي أن الرقم الأكبر في الأعلى دائماً","ابدئي من الآحاد ثم انتقلي للعشرات","إذا الرقم الأعلى أصغر، استعيري من العشرات","تحقق: الناتج + المطروح = الأصلي"],
      worked:[
        {q:"45 - 23 = ؟",steps:["الآحاد: 5 - 3 = 2","العشرات: 40 - 20 = 20","الإجابة: 22"],ans:"22"},
        {q:"63 - 27 = ؟",steps:["الآحاد: 3 < 7، نستعير: 13 - 7 = 6","العشرات: 50 - 20 = 30","الإجابة: 36"],ans:"36"},
      ]
    },
    generate:()=>{
      const lvl=rnd(0,3); let a,b;
      if(lvl===0){b=rnd(10,50);a=b+rnd(10,50);}
      else if(lvl===1){b=rnd(100,500);a=b+rnd(100,500);}
      else if(lvl===2){b=rnd(1000,5000);a=b+rnd(1000,5000);}
      else{b=rnd(10000,50000);a=b+rnd(10000,50000);}
      return mkQ(`${a} - ${b} = ؟`,a-b);
    }
  },
  {
    id:"multiply",title:"الضرب",emoji:"✖️",color:"#7c3aed",
    explanation:{
      intro:"الضرب هو جمع متكرر. 3 × 4 يعني 4+4+4 = 12. يوفر علينا الوقت!",
      tip:"💡 نصيحة: احفظي جدول الضرب من 1 إلى 9. ابدئي بـ ×2 (مضاعفة) ثم ×5 (دائماً 0 أو 5).",
      steps:["احفظي جدول الضرب الأساسي 1×1 إلى 9×9","الضرب في 10: أضيفي صفراً في النهاية","الضرب في 5: النتيجة دائماً 0 أو 5 في الآحاد","الضرب في 1 = نفس الرقم، الضرب في 0 = صفر"],
      worked:[
        {q:"6 × 7 = ؟",steps:["6 × 7 = 42 (نحفظها)","تحقق: 6+6+6+6+6+6+6 = 42 ✓"],ans:"42"},
        {q:"8 × 9 = ؟",steps:["8 × 10 = 80","80 - 8 = 72","إذن 8 × 9 = 72 ✓"],ans:"72"},
      ]
    },
    generate:()=>{const a=rnd(2,12);const b=rnd(2,12);return mkQ(`${a} × ${b} = ؟`,a*b);}
  },
  {
    id:"division",title:"القسمة",emoji:"➗",color:"#0891b2",
    explanation:{
      intro:"القسمة هي توزيع كمية على عدد متساوٍ. عكس الضرب تماماً!",
      tip:"💡 نصيحة عملية: عندك 24 تمرة وتريدين توزيعها على 6 أشخاص. 24 ÷ 6 = ؟ جربي: 6 × ؟ = 24",
      steps:["اسألي نفسك: كم مرة يدخل الرقم الثاني في الأول؟","استخدمي جدول الضرب للمساعدة","تحقق: الناتج × القسمة = العدد الأصلي","إذا كان هناك باقٍ اكتبيه"],
      worked:[
        {q:"36 ÷ 4 = ؟",steps:["4 × ؟ = 36","4 × 9 = 36","إذن 36 ÷ 4 = 9"],ans:"9"},
        {q:"56 ÷ 7 = ؟",steps:["7 × ؟ = 56","7 × 8 = 56","إذن 56 ÷ 7 = 8"],ans:"8"},
      ]
    },
    generate:()=>{const b=rnd(2,10);const ans=rnd(2,12);return mkQ(`${ans*b} ÷ ${b} = ؟`,ans);}
  },
  {
    id:"fractions",title:"الكسور",emoji:"½",color:"#16a34a",
    explanation:{
      intro:"الكسر هو جزء من كل. إذا قطعنا خبزة إلى قسمين، كل قسم هو نصف (½) الخبزة.",
      tip:"💡 نصيحة: الرقم فوق الخط (البسط) = الجزء الذي عندنا. الرقم تحت الخط (المقام) = عدد الأجزاء الكلية.",
      steps:["½ = نصف (÷2)  |  ¼ = ربع (÷4)  |  ¾ = ثلاثة أرباع","نصف العدد = العدد ÷ 2","ربع العدد = العدد ÷ 4","ثلثا العدد = العدد × 2 ÷ 3"],
      worked:[
        {q:"ما هو نصف 20؟",steps:["نصف = ÷ 2","20 ÷ 2 = 10"],ans:"10"},
        {q:"ما هو ربع 40؟",steps:["ربع = ÷ 4","40 ÷ 4 = 10"],ans:"10"},
      ]
    },
    generate:()=>{
      const t=rnd(0,3);
      if(t===0){const n=rnd(2,20)*2;return mkQ(`نصف العدد ${n} = ؟`,n/2);}
      if(t===1){const n=rnd(1,10)*4;return mkQ(`ربع العدد ${n} = ؟`,n/4);}
      if(t===2){const n=rnd(1,8)*3;return mkQ(`ثلث العدد ${n} = ؟`,n/3);}
      const n=rnd(1,10)*4;return mkQ(`ثلاثة أرباع العدد ${n} = ؟`,n*3/4);
    }
  },
  {
    id:"geometry",title:"الأشكال والمساحات",emoji:"📐",color:"#f59e0b",
    explanation:{
      intro:"الهندسة تدرس الأشكال والمساحات. هذه المعرفة تساعدنا في البناء والخياطة وكل شيء!",
      tip:"💡 نصيحة: المساحة = الطول × العرض (مثل عدد البلاطات في غرفة). المحيط = مجموع كل الأضلاع.",
      steps:["مربع: المساحة = الضلع × الضلع  |  المحيط = الضلع × 4","مستطيل: المساحة = الطول × العرض  |  المحيط = (الطول + العرض) × 2","الوحدة: سم² للمساحة، سم للمحيط","تذكري: المساحة = السطح الداخلي. المحيط = الإطار الخارجي"],
      worked:[
        {q:"مربع ضلعه 5سم",steps:["المساحة = 5 × 5 = 25 سم²","المحيط = 5 × 4 = 20 سم"],ans:"25 سم²"},
        {q:"مستطيل 8×3 سم",steps:["المساحة = 8 × 3 = 24 سم²","المحيط = (8+3) × 2 = 22 سم"],ans:"24 سم²"},
      ]
    },
    generate:()=>{
      const t=rnd(0,3);
      if(t===0){const w=rnd(2,12),h=rnd(2,12);return mkQ(`مستطيل طوله ${w}سم وعرضه ${h}سم\nما هي مساحته؟`,w*h);}
      if(t===1){const s=rnd(2,12);return mkQ(`مربع ضلعه ${s}سم\nما هي مساحته؟`,s*s);}
      if(t===2){const w=rnd(2,12),h=rnd(2,12);return mkQ(`مستطيل طوله ${w}سم وعرضه ${h}سم\nما هو محيطه؟`,2*(w+h));}
      const s=rnd(2,10);return mkQ(`مربع ضلعه ${s}سم\nما هو محيطه؟`,s*4);
    }
  },
  {
    id:"problems",title:"مسائل يومية",emoji:"🛒",color:"#db2777",
    explanation:{
      intro:"المسائل الحياتية تجمع كل ما تعلمناه في مواقف حقيقية من السوق والمنزل!",
      tip:"💡 نصيحة: اقرئي المسألة مرتين. الأولى لتفهمي، الثانية لتحددي: ما المعطيات؟ ما المطلوب؟",
      steps:["اقرئي المسألة بعناية وحددي المعطيات","حددي العملية: جمع؟ طرح؟ ضرب؟ قسمة؟","أجري الحساب خطوة بخطوة","تحققي: هل الإجابة منطقية؟"],
      worked:[
        {q:"اشترت فاطمة 3 كيلو طماطم بـ 8 دراهم للكيلو. كم دفعت؟",steps:["3 × 8 = 24 درهماً"],ans:"24 درهم"},
        {q:"كان عند علي 120 درهماً فأنفق 45. كم بقي؟",steps:["120 - 45 = 75 درهماً"],ans:"75 درهم"},
      ]
    },
    generate:()=>{
      const t=rnd(0,5);
      if(t===0){const p=rnd(3,15),q=rnd(2,8);return mkQ(`اشترتِ ${q} كيلو خضر بـ ${p} درهم للكيلو\nكم دفعتِ؟`,p*q);}
      if(t===1){const tot=rnd(50,200),sp=rnd(10,49);return mkQ(`كان معك ${tot+sp} درهماً وأنفقتِ ${sp} درهماً\nكم بقي معك؟`,tot);}
      if(t===2){const n=rnd(3,8),p=rnd(5,20);return mkQ(`${n} أشخاص يشتركون في الدفع\nإجمالي الفاتورة ${n*p} درهماً. كم يدفع كل شخص؟`,p);}
      if(t===3){const d=rnd(3,7),h=rnd(10,30);return mkQ(`قطعتِ ${d} أيام، كل يوم ${h} كيلومتراً\nكم قطعتِ في المجموع؟`,d*h);}
      if(t===4){const a=rnd(20,80),b=rnd(5,20);return mkQ(`في الصف ${a+b} تلميذاً. غاب ${b} منهم\nكم تلميذاً حضر؟`,a);}
      const u=rnd(2,6),p=rnd(8,25);return mkQ(`اشتريتِ ${u} أمتار قماش بـ ${p} درهم للمتر\nكم دفعتِ؟`,u*p);
    }
  },
];

function rnd(a,b){return Math.floor(Math.random()*(b-a+1))+a;}
function mkQ(question,answer){
  const ans=Math.round(answer);
  const pool=new Set();
  // scale wrong-answer deltas relative to the magnitude of ans
  const mag=Math.max(1,Math.floor(Math.log10(Math.abs(ans)+1)));
  const base=Math.pow(10,mag-1);
  const deltas=[1,2,3,5,base,base*2,base*3].filter(d=>d>0);
  for(const d of deltas){
    if(pool.size<3){const w=ans+(Math.random()>.5?d:-d);if(w!==ans&&w>=0)pool.add(w);}
  }
  while(pool.size<3){const w=ans+rnd(1,Math.max(5,base));if(w!==ans)pool.add(w);}
  return{question,answer:ans,options:shuffle([ans,...[...pool].slice(0,3)])};
}
function shuffle(a){return[...a].sort(()=>Math.random()-.5);}

/* ═══════════════════════════════════════════════════════════  APP  ═══════════════════════════════════════════════════════════ */
export default function App(){
  const[screen,setScreen]=useState("home");
  const[openLesson,setOpenLesson]=useState(null);
  const[lessonType,setLessonType]=useState(null);
  const[xp,setXp]=useState(()=>+(localStorage.getItem("lx")||0));
  const[streak,setStreak]=useState(()=>+(localStorage.getItem("ls")||0));
  const[weekXp,setWeekXp]=useState(()=>{try{return JSON.parse(localStorage.getItem("lw")||"{}");}catch{return{};}});
  const[completed,setCompleted]=useState(()=>{try{return JSON.parse(localStorage.getItem("lc")||"[]");}catch{return[];}});

  const addXp=(pts)=>{
    const nx=xp+pts;setXp(nx);localStorage.setItem("lx",nx);
    const today=new Date().toDateString();
    const nw={...weekXp,[today]:(weekXp[today]||0)+pts};
    setWeekXp(nw);localStorage.setItem("lw",JSON.stringify(nw));
  };
  const markDone=(id)=>{
    if(!completed.includes(id)){
      const nc=[...completed,id];setCompleted(nc);localStorage.setItem("lc",JSON.stringify(nc));
      const ns=streak+1;setStreak(ns);localStorage.setItem("ls",ns);
    }
  };

  const level=Math.floor(xp/150)+1;
  const xpPct=(xp%150)/150*100;

  if(openLesson){
    const onDone=(pts)=>{addXp(pts);markDone(openLesson.id);setOpenLesson(null);setLessonType(null);};
    return lessonType==="french"
      ?<FrenchFlow key={openLesson.id} lesson={openLesson} onBack={()=>setOpenLesson(null)} onComplete={onDone}/>
      :<MathFlow key={openLesson.id} lesson={openLesson} onBack={()=>setOpenLesson(null)} onComplete={onDone}/>;
  }

  return(
    <div style={S.root}>
      <style>{CSS}</style>
      <Header xp={xp} streak={streak} level={level} xpPct={xpPct}/>
      <Nav screen={screen} setScreen={setScreen}/>
      <div style={S.content}>
        {screen==="home"&&<HomeScreen setScreen={setScreen} xp={xp} streak={streak} level={level} completed={completed}/>}
        {screen==="french"&&<SubjectList lessons={FRENCH_LESSONS} completed={completed} onSelect={l=>{setOpenLesson(l);setLessonType("french");}} color="#2563eb"/>}
        {screen==="math"&&<SubjectList lessons={MATH_LESSONS} completed={completed} onSelect={l=>{setOpenLesson(l);setLessonType("math");}} color="#16a34a"/>}
        {screen==="progress"&&<ProgressScreen xp={xp} streak={streak} level={level} completed={completed} weekXp={weekXp}/>}
      </div>
    </div>
  );
}

/* ─── HEADER ─── */
function Header({xp,streak,level,xpPct}){
  return(
    <div style={S.header}>
      <div style={S.headerTop}>
        <span style={S.logo}>📚 تعلّمي</span>
        <div style={{display:"flex",gap:8,alignItems:"center"}}>
          <div style={S.pill}><span>🔥</span><span style={S.pillN}>{streak}</span></div>
          <div style={S.pill}><span>⭐</span><span style={S.pillN}>{xp}</span></div>
          <div style={S.lvl}>م{level}</div>
        </div>
      </div>
      <div style={{display:"flex",alignItems:"center",gap:8}}>
        <div style={S.xpBar}><div style={{...S.xpFill,width:`${xpPct}%`}}/></div>
        <span style={{color:"rgba(255,255,255,.7)",fontSize:11}}>{Math.round(xpPct)}%</span>
      </div>
    </div>
  );
}

/* ─── NAV ─── */
function Nav({screen,setScreen}){
  return(
    <div style={S.nav}>
      {[{id:"home",i:"🏠",l:"الرئيسية"},{id:"french",i:"🇫🇷",l:"فرنسية"},{id:"math",i:"🔢",l:"رياضيات"},{id:"progress",i:"📊",l:"تقدّمي"}].map(t=>(
        <button key={t.id} style={{...S.navBtn,...(screen===t.id?S.navAct:{})}} onClick={()=>setScreen(t.id)}>
          <span style={{fontSize:20}}>{t.i}</span><span style={{fontSize:11}}>{t.l}</span>
        </button>
      ))}
    </div>
  );
}

/* ─── HOME ─── */
function HomeScreen({setScreen,xp,streak,level,completed}){
  const total=FRENCH_LESSONS.length+MATH_LESSONS.length;
  return(
    <div style={{paddingBottom:40}}>
      <div style={S.hero}>
        <div style={{fontSize:56}}>🌟</div>
        <div style={{fontSize:24,fontWeight:800,color:"#fff"}}>أهلاً وسهلاً!</div>
        <div style={{fontSize:14,color:"rgba(255,255,255,.85)",marginTop:4}}>كل يوم تتعلمين فيه هو انتصار 💪</div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:8,marginBottom:16}}>
        {[{n:level,l:"المستوى",c:"#2563eb"},{n:xp,l:"النقاط",c:"#f59e0b"},{n:streak,l:"أيام 🔥",c:"#ef4444"},{n:`${completed.length}/${total}`,l:"الدروس",c:"#16a34a"}].map((c,i)=>(
          <div key={i} style={{background:"#fff",borderRadius:14,padding:"12px 6px",textAlign:"center",boxShadow:"0 2px 10px rgba(0,0,0,.07)"}}>
            <div style={{fontSize:20,fontWeight:800,color:c.c}}>{c.n}</div>
            <div style={{fontSize:10,color:"#64748b",marginTop:2}}>{c.l}</div>
          </div>
        ))}
      </div>
      <div style={{fontSize:16,fontWeight:700,color:"#374151",marginBottom:10}}>ابدئي التعلم 👇</div>
      <div style={{display:"flex",gap:12,marginBottom:16}}>
        <button style={{...S.bigCard,background:"linear-gradient(135deg,#1d4ed8,#2563eb)"}} onClick={()=>setScreen("french")} className="bcrd">
          <span style={{fontSize:40}}>🇫🇷</span>
          <div style={{fontSize:16,fontWeight:800,color:"#fff"}}>الفرنسية</div>
          <div style={{fontSize:12,color:"rgba(255,255,255,.8)"}}>{FRENCH_LESSONS.length} دروس</div>
        </button>
        <button style={{...S.bigCard,background:"linear-gradient(135deg,#15803d,#16a34a)"}} onClick={()=>setScreen("math")} className="bcrd">
          <span style={{fontSize:40}}>🔢</span>
          <div style={{fontSize:16,fontWeight:800,color:"#fff"}}>الرياضيات</div>
          <div style={{fontSize:12,color:"rgba(255,255,255,.8)"}}>{MATH_LESSONS.length} دروس</div>
        </button>
      </div>
      <div style={{background:"#fffbeb",borderRadius:16,padding:"14px",border:"1px solid #fde68a",display:"flex",gap:10}}>
        <div style={{fontSize:20}}>💡</div>
        <div style={{fontSize:13,color:"#92400e",lineHeight:1.8}}>
          <b>كيف تستخدمين التطبيق؟</b><br/>
          1️⃣ اقرئي الشرح أولاً<br/>
          2️⃣ تدربي على البطاقات (فرنسية)<br/>
          3️⃣ أجيبي على أسئلة الاختيار (15 سؤال)<br/>
          4️⃣ اكتبي الإجابات بيدك ✍️ (10 أسئلة)
        </div>
      </div>
    </div>
  );
}

/* ─── SUBJECT LIST ─── */
function SubjectList({lessons,completed,onSelect,color}){
  const isFr=color==="#2563eb";
  return(
    <div style={{paddingBottom:40}}>
      <div style={{fontSize:22,fontWeight:800,color:"#1e293b",margin:"14px 0 6px"}}>{isFr?"🇫🇷 الفرنسية":"🔢 الرياضيات"}</div>
      <div style={{fontSize:13,color:"#64748b",marginBottom:14,lineHeight:1.6}}>
        كل درس يحتوي: 📖 شرح → {isFr?"🃏 بطاقات → ":""}🎯 اختيار (15 سؤال) → ✍️ كتابة (10 أسئلة)
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:12}}>
        {lessons.map(l=>{
          const done=completed.includes(l.id);
          return(
            <button key={l.id} style={{...S.lcard,borderTop:`4px solid ${l.color}`,...(done?{background:"#f0fdf4",border:`1px solid #86efac`,borderTop:`4px solid ${l.color}`}:{})}} onClick={()=>onSelect(l)} className="lcrd">
              <div style={{fontSize:36}}>{l.emoji}</div>
              <div style={{fontSize:15,fontWeight:800,color:"#1e293b"}}>{l.title}</div>
              {l.subtitle&&<div style={{fontSize:11,color:"#64748b"}}>{l.subtitle}</div>}
              <div style={{fontSize:11,color:l.color,fontWeight:700,marginTop:4}}>{done?"✅ مكتمل":"➤ ابدئي"}</div>
              {done&&<div style={{position:"absolute",top:8,left:8,background:l.color,color:"#fff",borderRadius:"50%",width:22,height:22,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700}}>✓</div>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ─── LESSON HEADER ─── */
function LH({title,onBack,phase,phases,color}){
  return(
    <div style={{background:`linear-gradient(135deg,${color}dd,${color})`,padding:"14px 16px",display:"flex",gap:12,alignItems:"flex-start"}}>
      <button style={{background:"rgba(255,255,255,.25)",color:"#fff",borderRadius:10,padding:"6px 12px",fontSize:18,fontWeight:700,marginTop:2}} onClick={onBack}>←</button>
      <div style={{flex:1}}>
        <div style={{color:"#fff",fontSize:17,fontWeight:800}}>{title}</div>
        <div style={{display:"flex",gap:5,marginTop:6,flexWrap:"wrap"}}>
          {phases.map((p,i)=>(
            <div key={i} style={{fontSize:11,fontWeight:700,borderRadius:20,padding:"2px 9px",background:i<=phase?"rgba(255,255,255,.9)":"rgba(255,255,255,.2)",color:i<=phase?color:"rgba(255,255,255,.7)"}}>
              {i<phase?"✓ ":i===phase?"▶ ":""}{p}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── FRENCH FLOW: explain→flash→mcq→write ─── */
function FrenchFlow({lesson,onBack,onComplete}){
  const[phase,setPhase]=useState(0);
  const[sc,setSc]=useState({mcq:0,wr:0});
  const next=(d={})=>{
    if(d.mcq!=null)setSc(s=>({...s,mcq:d.mcq}));
    if(d.wr!=null)setSc(s=>({...s,wr:d.wr}));
    setPhase(p=>p+1);
  };
  if(phase===4){
    const pts=sc.mcq*8+sc.wr*12;
    return<Done emoji="🎉" title="رائعة!" sub={`${sc.mcq+sc.wr} إجابة صحيحة`} pts={pts} onContinue={()=>onComplete(pts)}/>;
  }
  return(
    <div style={S.root}>
      <style>{CSS}</style>
      <LH title={`${lesson.emoji} ${lesson.title}`} onBack={onBack} phase={phase} phases={["الشرح","البطاقات","اختيار","كتابة"]} color={lesson.color}/>
      {phase===0&&<ExplainFr lesson={lesson} onNext={()=>next()}/>}
      {phase===1&&<FlashCards words={lesson.words} color={lesson.color} onNext={()=>next()}/>}
      {phase===2&&<MCQFr words={lesson.words} color={lesson.color} onNext={(s)=>next({mcq:s})}/>}
      {phase===3&&<WriteFr words={lesson.words} color={lesson.color} onNext={(s)=>next({wr:s})}/>}
    </div>
  );
}

/* ─── MATH FLOW: explain→mcq→write ─── */
function MathFlow({lesson,onBack,onComplete}){
  const[phase,setPhase]=useState(0);
  const[sc,setSc]=useState({mcq:0,wr:0});
  const next=(d={})=>{
    if(d.mcq!=null)setSc(s=({s,mcq:d.mcq}));
    if(d.wr!=null)setSc(s=({s,wr:d.wr}));
    setPhase(p=>p+1);
  };
  if(phase===3){
    const pts=sc.mcq*10+sc.wr*15;
    return<Done emoji="🏆" title="أحسنتِ!" sub={`${sc.mcq+sc.wr} إجابة صحيحة`} pts={pts} onContinue={()=>onComplete(pts)}/>;
  }
  return(
    <div style={S.root}>
      <style>{CSS}</style>
      <LH title={`${lesson.emoji} ${lesson.title}`} onBack={onBack} phase={phase} phases={["الشرح","اختيار","كتابة"]} color={lesson.color}/>
      {phase===0&&<ExplainMath lesson={lesson} onNext={()=>next()}/>}
      {phase===1&&<MCQMath lesson={lesson} onNext={(s)=>next({mcq:s})}/>}
      {phase===2&&<WriteMath lesson={lesson} onNext={(s)=>next({wr:s})}/>}
    </div>
  );
}

/* ─── EXPLAIN FR ─── */
function ExplainFr({lesson,onNext}){
  const{explanation:ex,words,color}=lesson;
  return(
    <div style={S.scroll}>
      <div style={{background:"#fff",borderRadius:16,padding:16,marginBottom:12,boxShadow:"0 2px 10px rgba(0,0,0,.06)",borderBottom:`4px solid ${color}`}}>
        <div style={{fontSize:12,color:"#64748b",fontWeight:700,marginBottom:4}}>📖 درس جديد</div>
        <div style={{fontSize:16,fontWeight:700,color:"#1e293b",lineHeight:1.7}}>{ex.intro}</div>
      </div>
      <div style={{background:"#fffbeb",borderRadius:14,padding:14,marginBottom:12,borderRight:`4px solid ${color}`}}>
        <div style={{fontSize:14,lineHeight:1.8,color:"#374151"}}>{ex.tip}</div>
      </div>
      <div style={{fontSize:15,fontWeight:700,color:"#374151",marginBottom:8}}>📝 قاعدة مهمة</div>
      <div style={{background:"#eff6ff",borderRadius:14,padding:14,marginBottom:12}}>
        {ex.grammar.split("\n").map((l,i)=>(
          <div key={i} style={{fontSize:14,lineHeight:2,color:"#1e3a5f",fontWeight:l.includes("=")||l.includes(":")?"700":"400"}}>{l}</div>
        ))}
      </div>
      <div style={{fontSize:15,fontWeight:700,color:"#374151",marginBottom:8}}>💬 أمثلة</div>
      {ex.examples.map((e,i)=>(
        <div key={i} style={{background:"#f0fdf4",borderRadius:12,padding:"10px 14px",marginBottom:8}}>
          <div style={{fontSize:14,color:"#064e3b",fontWeight:700,direction:"ltr",textAlign:"left"}}>🇫🇷 {e.fr}</div>
          <div style={{fontSize:14,color:"#92400e",marginTop:2}}>🇲🇦 {e.ar}</div>
        </div>
      ))}
      <div style={{fontSize:15,fontWeight:700,color:"#374151",margin:"12px 0 8px"}}>📚 الكلمات الكاملة ({words.length} كلمة)</div>
      {words.map((w,i)=>(
        <div key={i} style={{background:"#fff",borderRadius:14,padding:"12px 14px",display:"flex",gap:12,alignItems:"flex-start",marginBottom:8,boxShadow:"0 1px 6px rgba(0,0,0,.06)",borderRight:`3px solid ${color}`}}>
          <span style={{fontSize:28}}>{w.emoji}</span>
          <div style={{flex:1}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span style={{fontSize:18,fontWeight:800,color:"#1e293b"}}>{w.fr}</span>
              <span style={{fontSize:15,fontWeight:700,color:color,background:`${color}18`,padding:"2px 10px",borderRadius:20}}>{w.ar}</span>
            </div>
            <div style={{fontSize:12,color:"#64748b",marginTop:3,direction:"ltr",fontStyle:"italic"}}>{w.example}</div>
          </div>
        </div>
      ))}
      <button style={{...S.nxtBtn,background:color,marginTop:8}} onClick={onNext}>انتقلي للبطاقات ✨</button>
    </div>
  );
}

/* ─── EXPLAIN MATH ─── */
function ExplainMath({lesson,onNext}){
  const{explanation:ex,color}=lesson;
  return(
    <div style={S.scroll}>
      <div style={{background:"#fff",borderRadius:16,padding:16,marginBottom:12,boxShadow:"0 2px 10px rgba(0,0,0,.06)",borderBottom:`4px solid ${color}`}}>
        <div style={{fontSize:12,color:"#64748b",fontWeight:700,marginBottom:4}}>📖 درس جديد</div>
        <div style={{fontSize:16,fontWeight:700,color:"#1e293b",lineHeight:1.7}}>{ex.intro}</div>
      </div>
      <div style={{background:"#fffbeb",borderRadius:14,padding:14,marginBottom:12,borderRight:`4px solid ${color}`}}>
        <div style={{fontSize:14,lineHeight:1.8,color:"#374151"}}>{ex.tip}</div>
      </div>
      <div style={{fontSize:15,fontWeight:700,color:"#374151",marginBottom:8}}>🪜 خطوات الحل</div>
      {ex.steps.map((st,i)=>(
        <div key={i} style={{display:"flex",gap:10,alignItems:"flex-start",marginBottom:10}}>
          <div style={{minWidth:28,height:28,borderRadius:"50%",background:color,color:"#fff",fontWeight:800,fontSize:13,display:"flex",alignItems:"center",justifyContent:"center"}}>{i+1}</div>
          <div style={{fontSize:14,color:"#374151",lineHeight:1.7,paddingTop:4}}>{st}</div>
        </div>
      ))}
      <div style={{fontSize:15,fontWeight:700,color:"#374151",margin:"12px 0 8px"}}>✏️ أمثلة محلولة</div>
      {ex.worked.map((w,i)=>(
        <div key={i} style={{background:"#f8fafc",borderRadius:14,padding:14,marginBottom:12,border:"1px solid #e2e8f0"}}>
          <div style={{fontSize:16,fontWeight:800,color:"#1e293b",marginBottom:8,direction:"ltr",textAlign:"left"}}>{w.q}</div>
          {w.steps.map((st,j)=>(
            <div key={j} style={{fontSize:14,color:"#374151",lineHeight:1.8,paddingRight:8}}>← {st}</div>
          ))}
          <div style={{display:"inline-block",background:color,color:"#fff",fontWeight:800,fontSize:14,borderRadius:20,padding:"4px 14px",marginTop:8}}>الإجابة: {w.ans}</div>
        </div>
      ))}
      <button style={{...S.nxtBtn,background:color,marginTop:8}} onClick={onNext}>ابدئي التمارين 🚀</button>
    </div>
  );
}

/* ─── FLASHCARDS ─── */
function FlashCards({words,color,onNext}){
  const[idx,setIdx]=useState(0);
  const[flipped,setFlipped]=useState(false);
  const[seen,setSeen]=useState(new Set());
  const w=words[idx];
  const total=words.length;
  const markSeen=()=>{setSeen(s=>new Set([...s,idx]));};

  const flip=()=>{setFlipped(f=>!f);markSeen();};
  const prev=()=>{if(idx>0){setIdx(i=>i-1);setFlipped(false);}};
  const next=()=>{markSeen();if(idx<total-1){setIdx(i=>i+1);setFlipped(false);}};

  return(
    <div style={S.scroll}>
      <div style={{textAlign:"center",color:"#64748b",fontSize:13,marginBottom:10}}>بطاقة {idx+1} من {total} — اضغطي للقلب 👆</div>
      <div style={{background:"#e2e8f0",borderRadius:10,height:7,marginBottom:16,overflow:"hidden"}}>
        <div style={{background:color,height:"100%",borderRadius:10,width:`${((idx+1)/total)*100}%`,transition:"width .4s"}}/>
      </div>

      {/* card */}
      <div style={{perspective:800,marginBottom:20}} onClick={flip}>
        <div style={{position:"relative",height:200,transformStyle:"preserve-3d",transition:"transform .5s",transform:flipped?"rotateY(180deg)":"rotateY(0deg)",cursor:"pointer"}}>
          <div style={{position:"absolute",inset:0,borderRadius:20,backfaceVisibility:"hidden",background:`linear-gradient(135deg,${color}18,${color}35)`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:8,boxShadow:"0 6px 20px rgba(0,0,0,.1)"}}>
            <div style={{fontSize:50}}>{w.emoji}</div>
            <div style={{fontSize:26,fontWeight:800,color:"#1e293b"}}>{w.fr}</div>
            <div style={{fontSize:13,color:"#94a3b8"}}>اضغطي لترى المعنى بالعربية ←</div>
          </div>
          <div style={{position:"absolute",inset:0,borderRadius:20,backfaceVisibility:"hidden",transform:"rotateY(180deg)",background:`linear-gradient(135deg,${color}40,${color}60)`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:6,padding:16,boxShadow:"0 6px 20px rgba(0,0,0,.1)"}}>
            <div style={{fontSize:50}}>{w.emoji}</div>
            <div style={{fontSize:28,fontWeight:800,color:"#1e293b"}}>{w.ar}</div>
            <div style={{fontSize:15,color:"#374151",direction:"ltr",fontStyle:"italic"}}>{w.fr}</div>
            <div style={{fontSize:12,color:"#374151",textAlign:"center",marginTop:4,lineHeight:1.5}}>{w.example}</div>
          </div>
        </div>
      </div>

      <div style={{display:"flex",gap:10,marginBottom:16}}>
        <button style={{borderRadius:14,padding:"10px 18px",fontSize:14,fontWeight:700,background:"#f1f5f9",color:"#374151",opacity:idx===0?.4:1}} onClick={prev} disabled={idx===0}>← السابقة</button>
        {idx<total-1
          ?<button style={{...S.nxtBtn,background:color,flex:1}} onClick={next}>التالية →</button>
          :<button style={{...S.nxtBtn,background:color,flex:1}} onClick={onNext}>انتقلي للاختبار 🎯</button>
        }
      </div>

      <div style={{display:"flex",flexWrap:"wrap",gap:5,justifyContent:"center"}}>
        {words.map((_,i)=>(
          <div key={i} style={{width:26,height:26,borderRadius:"50%",background:seen.has(i)?color:"#e2e8f0",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,color:seen.has(i)?"#fff":"#94a3b8",fontWeight:700,transition:"background .3s"}} onClick={()=>{setIdx(i);setFlipped(false);}}>
            {i+1}
          </div>
        ))}
      </div>
      <div style={{textAlign:"center",fontSize:12,color:"#94a3b8",marginTop:8}}>{seen.size}/{total} بطاقة مشاهَدة</div>
    </div>
  );
}

/* ─── MCQ FRENCH (15 mixed questions) ─── */
function MCQFr({words,color,onNext}){
  const TOTAL=15;
  const[qs]=useState(()=>{
    const all=[];
    const extended=[...words,...words,...words].slice(0,TOTAL);
    for(let i=0;i<TOTAL;i++){
      const w=extended[i];
      const mode=i%2===0?"f2a":"a2f";
      const others=shuffle(words.filter(x=>x!==w)).slice(0,3);
      if(mode==="f2a"){
        all.push({prompt:w.fr,emoji:w.emoji,q:"ما معنى هذه الكلمة بالعربية؟",correct:w.ar,opts:shuffle([w.ar,...others.map(x=>x.ar)])});
      }else{
        all.push({prompt:w.ar,emoji:w.emoji,q:"كيف تُكتب بالفرنسية؟",correct:w.fr,opts:shuffle([w.fr,...others.map(x=>x.fr)])});
      }
    }
    return all;
  });
  return<QEngine qs={qs} color={color} onNext={onNext}/>;
}

/* ─── COLUMN DISPLAY (vertical arithmetic like a school worksheet) ─── */
function ColDisplay({top,bottom,op,answer,revealed,color}){
  const topS=String(top);
  const botS=String(bottom);
  const ansS=answer!=null?String(Math.abs(answer)):"";
  const cols=Math.max(topS.length,botS.length,ansS.length);
  const pad=(s)=>s.padStart(cols," ");
  const tP=pad(topS), bP=pad(botS), aP=revealed?pad(ansS):pad("");

  const cell=(ch,opts={})=>(
    <div style={{
      width:38,height:44,border:"1.5px solid #94a3b8",
      display:"flex",alignItems:"center",justifyContent:"center",
      fontSize:22,fontWeight:800,
      color:opts.ans?(revealed?"#15803d":"transparent"):opts.op?"#ef4444":"#1e293b",
      background:opts.ans?(revealed?"#dcfce7":"#f1f5f9"):"#fff",
      borderRadius:4,fontFamily:"'Courier New',monospace",
      ...opts.style
    }}>{ch===" "?"":ch}</div>
  );

  const opSym={"addition":"+","subtraction":"−","multiply":"×","division":"÷","fractions":"×","geometry":"=","problems":"+"}[op]||op;

  return(
    <div style={{display:"inline-flex",flexDirection:"column",gap:3,alignItems:"flex-end",direction:"ltr",background:"#f8fafc",borderRadius:16,padding:"18px 20px",boxShadow:"0 4px 16px rgba(0,0,0,.1)"}}>
      {/* top number */}
      <div style={{display:"flex",gap:3}}>
        <div style={{width:28,height:44}}/>
        {[...tP].map((ch,i)=>(<div key={i}>{cell(ch)}</div>))}
      </div>
      {/* operator + bottom number */}
      <div style={{display:"flex",gap:3,alignItems:"center"}}>
        <div style={{width:28,height:44,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,fontWeight:800,color:"#ef4444"}}>{opSym}</div>
        {[...bP].map((ch,i)=>(<div key={i}>{cell(ch)}</div>))}
      </div>
      {/* separator line */}
      <div style={{height:3,background:"#374151",borderRadius:2,width:"100%",margin:"2px 0"}}/>
      {/* answer row */}
      <div style={{display:"flex",gap:3}}>
        <div style={{width:28,height:44}}/>
        {[...aP].map((ch,i)=>(<div key={i}>{cell(ch,{ans:true,color})}</div>))}
      </div>
    </div>
  );
}

/* ─── MCQ MATH (15 questions) with vertical column display ─── */
function MCQMath({lesson,onNext}){
  const isColumn=["addition","subtraction","multiply","division"].includes(lesson.id);
  const[qs]=useState(()=>Array.from({length:15},()=>{
    const g=lesson.generate();
    // extract numbers from question string if column-style
    if(isColumn){
      const nums=g.question.match(/[\d]+/g)||[];
      return{...g,top:nums[0]?parseInt(nums[0]):null,bottom:nums[1]?parseInt(nums[1]):null,isCol:true};
    }
    return{...g,isCol:false};
  }));
  const[idx,setIdx]=useState(0);
  const[chosen,setChosen]=useState(null);
  const[ok,setOk]=useState(null);
  const[score,setScore]=useState(0);
  const scoreRef=useRef(0);
  const q=qs[idx];

  const pick=(opt)=>{
    if(chosen!=null)return;
    setChosen(opt);
    const correct=opt===q.answer;
    setOk(correct);
    if(correct){ scoreRef.current+=1; setScore(scoreRef.current); }
    const isLast=idx+1>=qs.length;
    setTimeout(()=>{
      if(isLast){ onNext(scoreRef.current); }
      else{ setIdx(i=>i+1); setChosen(null); setOk(null); }
    },1100);
  };

  return(
    <div style={S.scroll}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
        <span style={{fontSize:13,color:"#64748b"}}>سؤال {idx+1} من {qs.length}</span>
        <span style={{fontSize:13,color:lesson.color,fontWeight:700}}>✓ {score}</span>
      </div>
      <div style={{background:"#e2e8f0",borderRadius:10,height:7,marginBottom:14,overflow:"hidden"}}>
        <div style={{background:lesson.color,height:"100%",borderRadius:10,width:`${(idx/qs.length)*100}%`,transition:"width .4s"}}/>
      </div>

      <div style={{background:"#fff",borderRadius:18,padding:"20px 16px",boxShadow:"0 4px 16px rgba(0,0,0,.08)",borderTop:`4px solid ${lesson.color}`,marginBottom:14,display:"flex",flexDirection:"column",alignItems:"center",gap:10}}>
        {q.isCol&&q.top!=null
          ?<ColDisplay top={q.top} bottom={q.bottom} op={lesson.id} answer={chosen!=null?q.answer:null} revealed={chosen!=null} color={lesson.color}/>
          :<div style={{fontSize:26,fontWeight:800,color:"#1e293b",whiteSpace:"pre-line",direction:"ltr",textAlign:"center"}}>{q.question}</div>
        }
        <div style={{fontSize:14,color:"#64748b"}}>اختاري الإجابة الصحيحة 👇</div>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12}}>
        {q.options.map((opt,i)=>{
          let bg="#fff",border="2px solid #e2e8f0";
          if(chosen!=null){
            if(opt===q.answer){bg="#dcfce7";border="2px solid #22c55e";}
            else if(opt===chosen){bg="#fee2e2";border="2px solid #ef4444";}
          }
          return(
            <button key={i} style={{borderRadius:16,padding:"14px 8px",fontSize:20,fontWeight:800,background:bg,border,color:"#1e293b",minHeight:58,transition:"background .25s",boxShadow:"0 2px 8px rgba(0,0,0,.05)",fontFamily:"'Courier New',monospace"}} onClick={()=>pick(opt)} className="obtn">
              {opt}
            </button>
          );
        })}
      </div>
      {ok!==null&&(
        <div style={{borderRadius:14,padding:"12px 16px",textAlign:"center",fontWeight:700,fontSize:15,background:ok?"#dcfce7":"#fee2e2",color:ok?"#15803d":"#dc2626"}}>
          {ok?"🎉 صحيح! ممتاز!":`❌ الإجابة الصحيحة: ${q.answer}`}
        </div>
      )}
    </div>
  );
}

/* ─── QUIZ ENGINE ─── */
function QEngine({qs,color,onNext,isMath}){
  const[idx,setIdx]=useState(0);
  const[chosen,setChosen]=useState(null);
  const[ok,setOk]=useState(null);
  const[score,setScore]=useState(0);
  const scoreRef=useRef(0); // ref avoids stale closure on final onNext call
  const q=qs[idx];

  const pick=(opt)=>{
    if(chosen!==null)return;
    setChosen(opt);
    const correct=opt===q.correct;
    setOk(correct);
    if(correct){ scoreRef.current+=1; setScore(scoreRef.current); }
    const isLast=idx+1>=qs.length;
    setTimeout(()=>{
      if(isLast){ onNext(scoreRef.current); }
      else{ setIdx(i=>i+1); setChosen(null); setOk(null); }
    },1000);
  };

  return(
    <div style={S.scroll}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
        <span style={{fontSize:13,color:"#64748b"}}>سؤال {idx+1} من {qs.length}</span>
        <span style={{fontSize:13,color,fontWeight:700}}>✓ {score}</span>
      </div>
      <div style={{background:"#e2e8f0",borderRadius:10,height:7,marginBottom:14,overflow:"hidden"}}>
        <div style={{background:color,height:"100%",borderRadius:10,width:`${(idx/qs.length)*100}%`,transition:"width .4s"}}/>
      </div>
      <div style={{background:"#fff",borderRadius:18,padding:"22px 16px",textAlign:"center",boxShadow:"0 4px 16px rgba(0,0,0,.08)",borderTop:`4px solid ${color}`,marginBottom:14}}>
        {q.emoji&&<div style={{fontSize:50,marginBottom:8}}>{q.emoji}</div>}
        <div style={{fontSize:isMath?26:22,fontWeight:800,color:"#1e293b",whiteSpace:"pre-line",direction:isMath?"ltr":"rtl"}}>{q.prompt}</div>
        {q.q&&<div style={{fontSize:14,color:"#64748b",marginTop:8}}>{q.q}</div>}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12}}>
        {q.opts.map((opt,i)=>{
          let bg="#fff",border="2px solid #e2e8f0";
          if(chosen){
            if(opt===q.correct){bg="#dcfce7";border="2px solid #22c55e";}
            else if(opt===chosen){bg="#fee2e2";border="2px solid #ef4444";}
          }
          return(
            <button key={i} style={{borderRadius:16,padding:"14px 8px",fontSize:15,fontWeight:700,background:bg,border,color:"#1e293b",minHeight:54,transition:"background .25s",boxShadow:"0 2px 8px rgba(0,0,0,.05)"}} onClick={()=>pick(opt)} className="obtn">
              {opt}
            </button>
          );
        })}
      </div>
      {ok!==null&&(
        <div style={{borderRadius:14,padding:"12px 16px",textAlign:"center",fontWeight:700,fontSize:15,background:ok?"#dcfce7":"#fee2e2",color:ok?"#15803d":"#dc2626"}}>
          {ok?"🎉 صحيح! ممتاز!":`❌ الإجابة الصحيحة: ${q.correct}`}
        </div>
      )}
    </div>
  );
}

/* ─── WRITE FRENCH ─── */
function WriteFr({words,color,onNext}){
  const TOTAL=10;
  const[qs]=useState(()=>shuffle([...words,...words]).slice(0,TOTAL));
  const[idx,setIdx]=useState(0);
  const[inp,setInp]=useState("");
  const[res,setRes]=useState(null);
  const[score,setScore]=useState(0);
  const scoreRef=useRef(0);
  const ref=useRef();
  const w=qs[idx];

  const check=()=>{
    if(!inp.trim()||res)return;
    const correct=inp.trim().toLowerCase()===w.fr.toLowerCase();
    setRes(correct?"ok":"no");
    if(correct){ scoreRef.current+=1; setScore(scoreRef.current); }
  };
  const goNext=()=>{
    if(idx+1>=TOTAL){ onNext(scoreRef.current); return; }
    setIdx(i=>i+1); setInp(""); setRes(null);
    setTimeout(()=>ref.current?.focus(),100);
  };

  return(
    <div style={S.scroll}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
        <span style={{fontSize:13,color:"#64748b"}}>كتابة {idx+1} من {TOTAL}</span>
        <span style={{fontSize:13,color,fontWeight:700}}>✓ {score}</span>
      </div>
      <div style={{background:"#e2e8f0",borderRadius:10,height:7,marginBottom:14,overflow:"hidden"}}>
        <div style={{background:color,height:"100%",borderRadius:10,width:`${(idx/TOTAL)*100}%`,transition:"width .4s"}}/>
      </div>
      <div style={{background:"#fff",borderRadius:18,padding:"22px 16px",textAlign:"center",boxShadow:"0 4px 16px rgba(0,0,0,.08)",borderTop:`4px solid ${color}`,marginBottom:16}}>
        <div style={{fontSize:52}}>{w.emoji}</div>
        <div style={{fontSize:26,fontWeight:800,color:"#1e293b",marginTop:8}}>{w.ar}</div>
        <div style={{fontSize:14,color:"#94a3b8",marginTop:4}}>اكتبي هذه الكلمة بالفرنسية ✍️</div>
      </div>
      <input
        ref={ref}
        value={inp}
        onChange={e=>setInp(e.target.value)}
        onKeyDown={e=>e.key==="Enter"&&(res?goNext():check())}
        placeholder="اكتبي بالفرنسية..."
        disabled={!!res}
        autoComplete="off" autoCapitalize="off" spellCheck="false"
        style={{width:"100%",borderRadius:16,border:`2px solid ${res==="ok"?"#22c55e":res==="no"?"#ef4444":color}`,padding:"14px 16px",fontSize:18,fontWeight:700,direction:"ltr",textAlign:"center",outline:"none",background:"#fff",boxShadow:"0 2px 10px rgba(0,0,0,.06)",transition:"border-color .3s",marginBottom:10}}
      />
      {res&&(
        <>
          <div style={{borderRadius:14,padding:"12px 16px",textAlign:"center",fontWeight:700,fontSize:15,background:res==="ok"?"#dcfce7":"#fee2e2",color:res==="ok"?"#15803d":"#dc2626",marginBottom:8}}>
            {res==="ok"?`🎉 صحيح! "${w.fr}" = ${w.ar}`:`❌ الإجابة الصحيحة هي: ${w.fr}`}
          </div>
          <div style={{fontSize:13,color:"#64748b",background:"#f8fafc",borderRadius:12,padding:10,marginBottom:10,direction:"ltr",textAlign:"left"}}>
            📌 <i>{w.example}</i>
          </div>
        </>
      )}
      <div style={{display:"flex",gap:10}}>
        {!res
          ?<button style={{...S.nxtBtn,background:color,flex:1}} onClick={check}>✓ تحقق</button>
          :<button style={{...S.nxtBtn,background:color,flex:1}} onClick={goNext}>{idx+1>=TOTAL?"إنهاء 🏁":"التالية →"}</button>
        }
      </div>
      <div style={{textAlign:"center",fontSize:12,color:"#94a3b8",marginTop:8}}>💡 اضغطي Enter للتحقق أو الانتقال</div>
    </div>
  );
}

/* ─── WRITE MATH ─── */
function WriteMath({lesson,onNext}){
  const TOTAL=10;
  const isColumn=["addition","subtraction","multiply","division"].includes(lesson.id);
  const[qs]=useState(()=>Array.from({length:TOTAL},()=>{
    const g=lesson.generate();
    if(isColumn){
      const nums=g.question.match(/[\d]+/g)||[];
      return{...g,top:nums[0]?parseInt(nums[0]):null,bottom:nums[1]?parseInt(nums[1]):null};
    }
    return g;
  }));
  const[idx,setIdx]=useState(0);
  const[inp,setInp]=useState("");
  const[res,setRes]=useState(null);
  const[score,setScore]=useState(0);
  const scoreRef=useRef(0);
  const ref=useRef();
  const q=qs[idx];

  const check=()=>{
    if(!inp.trim()||res)return;
    const userVal=parseInt(inp.trim());
    const correct=userVal===q.answer;
    setRes(correct?"ok":"no");
    if(correct){ scoreRef.current+=1; setScore(scoreRef.current); }
  };
  const goNext=()=>{
    if(idx+1>=TOTAL){onNext(scoreRef.current);return;}
    setIdx(i=>i+1);setInp("");setRes(null);
    setTimeout(()=>ref.current?.focus(),100);
  };

  return(
    <div style={S.scroll}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
        <span style={{fontSize:13,color:"#64748b"}}>كتابة {idx+1} من {TOTAL}</span>
        <span style={{fontSize:13,color:lesson.color,fontWeight:700}}>✓ {score}</span>
      </div>
      <div style={{background:"#e2e8f0",borderRadius:10,height:7,marginBottom:14,overflow:"hidden"}}>
        <div style={{background:color,height:"100%",borderRadius:10,width:`${(idx/TOTAL)*100}%`,transition:"width .4s"}}/>
      </div>

      {/* Question display */}
      <div style={{background:"#fff",borderRadius:18,padding:"20px 16px",boxShadow:"0 4px 16px rgba(0,0,0,.08)",borderTop:`4px solid ${lesson.color}`,marginBottom:16,display:"flex",flexDirection:"column",alignItems:"center",gap:10}}>
        {isColumn&&q.top!=null
          ?<>
            <ColDisplay top={q.top} bottom={q.bottom} op={lesson.id} answer={res?q.answer:null} revealed={!!res} color={lesson.color}/>
            <div style={{fontSize:14,color:"#64748b"}}>اكتبي الإجابة في الخانة أدناه ✍️</div>
          </>
          :<>
            <div style={{fontSize:22,fontWeight:800,color:"#1e293b",whiteSpace:"pre-line",textAlign:"center",direction:"ltr"}}>{q.question}</div>
            <div style={{fontSize:14,color:"#64748b"}}>اكتبي الإجابة بالأرقام ✍️</div>
          </>
        }
      </div>

      {/* Answer input row — styled like worksheet cells */}
      {!res&&(
        <div style={{display:"flex",justifyContent:"center",marginBottom:12}}>
          <div style={{display:"flex",alignItems:"center",gap:8,direction:"ltr"}}>
            <span style={{fontSize:16,color:"#64748b",fontWeight:700}}>= </span>
            <input
              ref={ref}
              type="number"
              value={inp}
              onChange={e=>setInp(e.target.value)}
              onKeyDown={e=>e.key==="Enter"&&check()}
              placeholder="؟"
              autoComplete="off"
              style={{width:Math.max(80,inp.length*24+40),minWidth:80,maxWidth:200,borderRadius:8,border:`2.5px solid ${lesson.color}`,padding:"10px 12px",fontSize:26,fontWeight:800,direction:"ltr",textAlign:"center",outline:"none",background:"#fffbeb",boxShadow:"inset 0 2px 6px rgba(0,0,0,.06)",fontFamily:"'Courier New',monospace",transition:"border-color .3s"}}
            />
          </div>
        </div>
      )}

      {res&&(
        <div style={{borderRadius:14,padding:"12px 16px",textAlign:"center",fontWeight:700,fontSize:15,background:res==="ok"?"#dcfce7":"#fee2e2",color:res==="ok"?"#15803d":"#dc2626",marginBottom:10}}>
          {res==="ok"?`🎉 صحيح تماماً! الإجابة ${q.answer} ✅`:`❌ الإجابة الصحيحة هي: ${q.answer}`}
        </div>
      )}

      <div style={{display:"flex",gap:10}}>
        {!res
          ?<button style={{...S.nxtBtn,background:lesson.color,flex:1}} onClick={check}>✓ تحقق من الإجابة</button>
          :<button style={{...S.nxtBtn,background:lesson.color,flex:1}} onClick={goNext}>{idx+1>=TOTAL?"إنهاء الدرس 🏁":"السؤال التالي →"}</button>
        }
      </div>
      <div style={{textAlign:"center",fontSize:12,color:"#94a3b8",marginTop:8}}>💡 اضغطي Enter للتحقق</div>
    </div>
  );
}

/* ─── DONE ─── */
function Done({emoji,title,sub,pts,onContinue}){
  return(
    <div style={S.root}>
      <style>{CSS}</style>
      <div style={{minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:30,textAlign:"center",gap:10,background:"linear-gradient(135deg,#f0fdf4,#eff6ff)"}}>
        <div style={{fontSize:90,animation:"pop .5s ease"}}>{emoji}</div>
        <div style={{fontSize:34,fontWeight:800,color:"#1e293b"}}>{title}</div>
        <div style={{fontSize:18,color:"#374151"}}>{sub}</div>
        <div style={{fontSize:30,fontWeight:800,color:"#f59e0b",marginTop:4}}>+{pts} نقطة ⭐</div>
        <div style={{background:pts>=80?"linear-gradient(135deg,#fbbf24,#f59e0b)":pts>=40?"linear-gradient(135deg,#93c5fd,#3b82f6)":"linear-gradient(135deg,#6ee7b7,#10b981)",color:"#fff",fontWeight:800,fontSize:16,borderRadius:20,padding:"8px 20px",marginTop:4}}>
          {pts>=80?"🏆 ممتاز جداً!":pts>=40?"🌟 جيد، استمري!":"💪 حاولي مجدداً!"}
        </div>
        <button style={{background:"linear-gradient(135deg,#1d4ed8,#2563eb)",color:"#fff",fontSize:17,fontWeight:800,borderRadius:18,padding:"16px 40px",marginTop:14,boxShadow:"0 6px 18px rgba(37,99,235,.35)"}} onClick={onContinue}>
          العودة للدروس ←
        </button>
      </div>
    </div>
  );
}

/* ─── PROGRESS ─── */
function ProgressScreen({xp,streak,level,completed,weekXp}){
  const days=["أحد","اثن","ثلا","أرب","خمس","جمع","سبت"];
  const today=new Date();
  const week=Array.from({length:7},(_,i)=>{
    const d=new Date(today);d.setDate(today.getDate()-(6-i));
    return{label:days[d.getDay()],xp:weekXp[d.toDateString()]||0,isToday:i===6};
  });
  const maxXp=Math.max(...week.map(d=>d.xp),10);
  const total=FRENCH_LESSONS.length+MATH_LESSONS.length;

  return(
    <div style={{paddingBottom:40}}>
      <div style={{fontSize:22,fontWeight:800,color:"#1e293b",margin:"14px 0 14px"}}>📊 تقدّمي</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
        {[{n:level,l:"المستوى",c:"#2563eb"},{n:xp,l:"إجمالي النقاط ⭐",c:"#f59e0b"},{n:streak,l:"أيام متتالية 🔥",c:"#ef4444"},{n:`${completed.length}/${total}`,l:"دروس مكتملة ✅",c:"#16a34a"}].map((c,i)=>(
          <div key={i} style={{background:"#fff",borderRadius:16,padding:16,textAlign:"center",boxShadow:"0 2px 12px rgba(0,0,0,.07)"}}>
            <div style={{fontSize:26,fontWeight:800,color:c.c}}>{c.n}</div>
            <div style={{fontSize:12,color:"#64748b",marginTop:2}}>{c.l}</div>
          </div>
        ))}
      </div>

      <div style={{background:"#fff",borderRadius:18,padding:"18px 16px",marginBottom:14,boxShadow:"0 2px 12px rgba(0,0,0,.07)"}}>
        <div style={{fontSize:16,fontWeight:700,color:"#1e293b",marginBottom:14}}>نقاط هذا الأسبوع ⭐</div>
        <div style={{display:"flex",gap:5,alignItems:"flex-end",height:100}}>
          {week.map((d,i)=>(
            <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:3,height:"100%"}}>
              <div style={{flex:1,width:"100%",display:"flex",alignItems:"flex-end"}}>
                <div style={{width:"100%",borderRadius:"5px 5px 0 0",background:d.isToday?"#2563eb":d.xp>0?"#93c5fd":"#e2e8f0",height:`${Math.max(d.xp/maxXp*100,d.xp>0?6:3)}%`,transition:"height .5s"}}/>
              </div>
              <div style={{fontSize:9,color:"#94a3b8"}}>{d.label}</div>
              {d.xp>0&&<div style={{fontSize:9,color:"#2563eb",fontWeight:700}}>{d.xp}</div>}
            </div>
          ))}
        </div>
      </div>

      <div style={{background:"#fff",borderRadius:18,padding:"18px 16px",marginBottom:14,boxShadow:"0 2px 12px rgba(0,0,0,.07)"}}>
        <div style={{fontSize:16,fontWeight:700,color:"#1e293b",marginBottom:10}}>الدروس المكتملة ({completed.length}/{total})</div>
        <div style={{background:"#e2e8f0",borderRadius:10,height:14,overflow:"hidden",marginBottom:8}}>
          <div style={{background:"linear-gradient(90deg,#2563eb,#7c3aed)",height:"100%",borderRadius:10,width:`${(completed.length/total)*100}%`,transition:"width .5s"}}/>
        </div>
        <div style={{display:"flex",flexWrap:"wrap",gap:7,marginTop:12}}>
          {[{min:1,i:"🥉",l:"المبتدئة"},{min:3,i:"🥈",l:"المتحمسة"},{min:6,i:"🥇",l:"المجتهدة"},{min:9,i:"💎",l:"الماسة"},{min:12,i:"🏆",l:"البطلة"},{min:total,i:"👑",l:"الملكة"}].map((b,i)=>(
            <div key={i} style={{background:"linear-gradient(135deg,#fef3c7,#fde68a)",color:"#92400e",fontWeight:700,fontSize:13,borderRadius:20,padding:"5px 12px",opacity:completed.length>=b.min?1:.3,filter:completed.length>=b.min?"none":"grayscale(1)",transition:"opacity .3s"}}>
              {b.i} {b.l}
            </div>
          ))}
        </div>
      </div>

      <div style={{background:"#fff",borderRadius:18,padding:"18px 16px",boxShadow:"0 2px 12px rgba(0,0,0,.07)"}}>
        <div style={{fontSize:16,fontWeight:700,color:"#1e293b",marginBottom:12}}>حالة كل الدروس</div>
        {[{label:"🇫🇷 الفرنسية",items:FRENCH_LESSONS},{label:"🔢 الرياضيات",items:MATH_LESSONS}].map((sec,si)=>(
          <div key={si}>
            <div style={{fontSize:14,fontWeight:700,color:"#64748b",margin:"10px 0 6px"}}>{sec.label}</div>
            {sec.items.map(l=>(
              <div key={l.id} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom:"1px solid #f1f5f9"}}>
                <span style={{fontSize:20}}>{l.emoji}</span>
                <span style={{flex:1,fontSize:14,color:"#374151"}}>{l.title}</span>
                <span style={{fontSize:16}}>{completed.includes(l.id)?"✅":"⬜"}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════  STYLES  ═══════════════════════════════════════════════════════════ */
const CSS=`
  @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800&display=swap');
  *{box-sizing:border-box;margin:0;padding:0;}
  body{font-family:'Tajawal',sans-serif;direction:rtl;background:#f8fafc;}
  button{cursor:pointer;border:none;font-family:'Tajawal',sans-serif;}
  input{font-family:'Tajawal',sans-serif;}
  input[type=number]::-webkit-inner-spin-button{-webkit-appearance:none;}
  .lcrd{transition:transform .2s,box-shadow .2s!important;}
  .lcrd:hover{transform:translateY(-4px)!important;box-shadow:0 12px 28px rgba(0,0,0,.15)!important;}
  .bcrd{transition:transform .2s,box-shadow .2s!important;}
  .bcrd:hover{transform:translateY(-3px)!important;}
  .obtn:hover:not(:disabled){transform:scale(1.02);}
  @keyframes pop{0%{transform:scale(0.5);opacity:0;}100%{transform:scale(1);opacity:1;}}
`;

const S={
  root:{minHeight:"100vh",background:"#f8fafc",fontFamily:"'Tajawal',sans-serif",direction:"rtl",maxWidth:480,margin:"0 auto"},
  header:{background:"linear-gradient(135deg,#1e3a5f,#2563eb)",padding:"14px 18px 10px"},
  headerTop:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8},
  logo:{color:"#fff",fontSize:22,fontWeight:800},
  pill:{display:"flex",alignItems:"center",gap:4,background:"rgba(255,255,255,.18)",borderRadius:20,padding:"3px 10px"},
  pillN:{color:"#fff",fontWeight:700,fontSize:14},
  lvl:{background:"#f59e0b",color:"#fff",fontWeight:800,fontSize:13,borderRadius:20,padding:"3px 12px"},
  xpBar:{flex:1,background:"rgba(255,255,255,.2)",borderRadius:10,height:7,overflow:"hidden"},
  xpFill:{height:"100%",borderRadius:10,background:"linear-gradient(90deg,#fbbf24,#f59e0b)",transition:"width .5s"},
  nav:{display:"flex",background:"#fff",borderBottom:"2px solid #f1f5f9",position:"sticky",top:0,zIndex:10},
  navBtn:{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:2,padding:"9px 4px",background:"none",color:"#94a3b8",fontWeight:600},
  navAct:{color:"#2563eb",borderBottom:"3px solid #2563eb"},
  content:{padding:"0 14px"},
  hero:{background:"linear-gradient(135deg,#1d4ed8,#7c3aed)",borderRadius:20,padding:"24px 20px",margin:"14px 0",textAlign:"center"},
  bigCard:{flex:1,borderRadius:20,padding:"20px 10px",display:"flex",flexDirection:"column",alignItems:"center",gap:6,boxShadow:"0 6px 20px rgba(0,0,0,.15)"},
  lcard:{background:"#fff",borderRadius:18,padding:"18px 10px",display:"flex",flexDirection:"column",alignItems:"center",gap:6,boxShadow:"0 2px 12px rgba(0,0,0,.08)",position:"relative"},
  scroll:{padding:"16px 14px 80px",overflowY:"auto"},
  nxtBtn:{borderRadius:16,padding:"14px 20px",color:"#fff",fontSize:16,fontWeight:800,boxShadow:"0 4px 14px rgba(0,0,0,.15)",textAlign:"center",width:"100%",display:"block"},
};