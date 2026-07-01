// ── YT and Search IDs ──
const YT = {
  goblet_squat:'X6wzkNs0YiI', rdl:'QbbURJEUALw', bench_press:'mTaiQemkEpU',
  row:'h3gCuCs7pks', plank:'v3V6iyQfKzY', lunge:'_Zc5kyQ5S_A',
  sumo_squat:'bRCjBCtBGIo', glute_bridge:'KBEF9XsiJ-w', russian_twist:'t2Npojub3Es',
  calf_raise:'OscsK8RMelQ', shoulder_press:'k6tzKisR3NY', lateral_raise:'2pb0rbxV62U',
  bicep_curl:'0UnyLQ51F_c', tricep_ext:'nAFc9yPhigU', renegade_row:'jfZwJYLSjr8',
  dead_bug:'Aoipu_fl3HA', bicycle_crunch:'t2Npojub3Es', mountain_climber:'wrn1Cm_yfEU',
  hanging_leg_raise:'17hWbYIERj4',
};

const YT_SEARCH = {
  goblet_squat:'DeltaBolic goblet squat shorts', rdl:'DeltaBolic romanian deadlift shorts',
  bench_press:'DeltaBolic dumbbell chest press shorts', row:'DeltaBolic dumbbell row shorts',
  plank:'DeltaBolic plank shorts', lunge:'DeltaBolic lunges shorts',
  sumo_squat:'DeltaBolic sumo squat shorts', glute_bridge:'DeltaBolic glute bridge shorts',
  russian_twist:'DeltaBolic russian twist shorts', calf_raise:'DeltaBolic calf raise shorts',
  shoulder_press:'DeltaBolic shoulder press shorts', lateral_raise:'DeltaBolic lateral raise shorts',
  bicep_curl:'DeltaBolic bicep curl shorts', tricep_ext:'DeltaBolic tricep extension shorts',
  renegade_row:'DeltaBolic renegade row shorts', dead_bug:'DeltaBolic dead bug shorts',
  bicycle_crunch:'DeltaBolic bicycle crunch shorts', mountain_climber:'DeltaBolic mountain climber shorts',
  hanging_leg_raise:'DeltaBolic hanging leg raise shorts',
};

// ── DAYS ──
const DAYS = {
  mon:{label:'จันทร์',focus:'Full Body',sum:'เวทเทรนนิ่งทั้งตัว · <b>5 ท่า · 3 เซ็ต/ท่า</b> · พักเซ็ต 60–90 วิ. · เวลาจริง ~45 นาที',
    ex:[
      {k:'goblet_squat',n:'Goblet Squat',th:'สควอตถือดัมเบลแนบอก',sets:3,reps:'12 ครั้ง',work:40,rest:75,dur:'~5 นาที',w:'6–8 กก.(ลูกเดียว)',cue:'ถือดัมเบลแนบอก ย่อจนต้นขาขนานพื้น หลังตรง'},
      {k:'rdl',n:'Romanian Deadlift',th:'ดาวน์โหลดแบบโรมาเนียน',sets:3,reps:'12 ครั้ง',work:40,rest:75,dur:'~5 นาที',w:'8–10 กก./ข้าง',cue:'ดันสะโพกไปด้านหลัง ลดดัมเบลตามขา หลังตรงเสมอ'},
      {k:'bench_press',n:'Floor / Bench Press',th:'ดันดัมเบลจากพื้น',sets:3,reps:'10–12 ครั้ง',work:40,rest:75,dur:'~5 นาที',w:'6–8 กก./ข้าง',cue:'นอนหงาย ดันขึ้นเหนืออก คุมจังหวะลง'},
      {k:'row',n:'Bent-over Row',th:'ก้มดึงดัมเบล',sets:3,reps:'12 ครั้ง',work:40,rest:75,dur:'~5 นาที',w:'7–9 กก./ข้าง',cue:'โน้มตัว 45° ดึงศอกชิดลำตัว'},
      {k:'plank',n:'Plank',th:'แพลงก์',sets:3,reps:'30–45 วิ.',work:40,rest:45,dur:'~3 นาที',w:'น้ำหนักตัว',cue:'ลำตัวเป็นเส้นตรง เกร็งหน้าท้อง ค้างไว้'},
    ]},
  wed:{label:'พุธ',focus:'Lower + Core',sum:'เวทเน้นขา/สะโพก/แกนกลาง · <b>5 ท่า · 3 เซ็ต/ท่า</b> · เวลาจริง ~45 นาที',
    ex:[
      {k:'lunge',n:'Dumbbell Lunges',th:'ลันจ์สลับขา',sets:3,reps:'10 ครั้ง/ข้าง',work:50,rest:75,dur:'~6 นาที',w:'5–7 กก./ข้าง',cue:'ก้าวขายาว ย่อเข่าหลังลง สลับขา'},
      {k:'sumo_squat',n:'Sumo Squat',th:'สควอตขากว้าง',sets:3,reps:'15 ครั้ง',work:45,rest:75,dur:'~5 นาที',w:'8–10 กก.(ลูกเดียว)',cue:'ยืนกว้าง ปลายเท้าชี้ออก ย่อตรงลง'},
      {k:'glute_bridge',n:'Glute Bridge',th:'ยกสะโพก',sets:3,reps:'15 ครั้ง',work:45,rest:60,dur:'~5 นาที',w:'8–12 กก.(บนสะโพก)',cue:'ยกสะโพกขึ้น บีบก้นค้าง 1 วินาที'},
      {k:'calf_raise',n:'Dumbbell Calf Raise',th:'เขย่งน่องถือดัมเบล',sets:3,reps:'20 ครั้ง',work:40,rest:45,dur:'~4 นาที',w:'6–8 กก./ข้าง',cue:'ถือดัมเบลสองข้างลำตัว เขย่งสุด ลงช้าๆ'},
      {k:'russian_twist',n:'Russian Twist',th:'บิดลำตัว',sets:3,reps:'20 ครั้ง',work:45,rest:45,dur:'~6 นาที',w:'4–6 กก.(ลูกเดียว)',cue:'นั่งเอนหลัง ยกเท้า บิดลำตัวซ้าย-ขวา'},
    ]},
  thu:{label:'พฤหัส',focus:'Upper + Interval',sum:'เวทเน้นช่วงบน · <b>5 ท่า · 3 เซ็ต/ท่า</b> · + interval ลู่วิ่ง 15 นาที · เวลาจริง ~45 นาที',
    ex:[
      {k:'shoulder_press',n:'Shoulder Press',th:'ดันไหล่เหนือศีรษะ',sets:3,reps:'10–12 ครั้ง',work:40,rest:75,dur:'~5 นาที',w:'4–6 กก./ข้าง',cue:'ดันดัมเบลขึ้นเหนือศีรษะ ไม่แอ่นหลัง'},
      {k:'lateral_raise',n:'Lateral Raise',th:'ยกแขนข้าง',sets:3,reps:'15 ครั้ง',work:40,rest:60,dur:'~4 นาที',w:'2–4 กก./ข้าง',cue:'ยกแขนออกข้างถึงระดับไหล่ ใช้น้ำหนักเบา'},
      {k:'bicep_curl',n:'Bicep Curl',th:'งอแขนหน้า',sets:3,reps:'12 ครั้ง',work:40,rest:60,dur:'~5 นาที',w:'5–7 กก./ข้าง',cue:'ศอกแนบลำตัว ยกขึ้นเข้าหาไหล่ ไม่เหวี่ยง'},
      {k:'tricep_ext',n:'Tricep Extension',th:'เหยียดหลังแขน',sets:3,reps:'12 ครั้ง',work:40,rest:60,dur:'~5 นาที',w:'4–6 กก./ข้าง',cue:'ถือดัมเบลเหนือศีรษะ งอ-เหยียดศอก'},
      {k:'renegade_row',n:'Renegade Row',th:'แพลงก์ดึงดัมเบล',sets:3,reps:'8 ครั้ง/ข้าง',work:45,rest:75,dur:'~5 นาที',w:'5–7 กก./ข้าง',cue:'อยู่ท่าแพลงก์ ดึงดัมเบลขึ้นทีละข้าง ลำตัวนิ่ง'},
    ]},
  core:{label:'Core',focus:'หน้าท้อง/แกนกลาง',sum:'วันเสริมหน้าท้อง — ทำเพิ่ม 2 วัน/สัปดาห์ (เช่น อังคาร+ศุกร์ หลังคาร์ดิโอ) · <b>4 ท่า · 3 รอบ</b> · เน้นให้กล้ามท้องหนาขึ้น',
    ex:[
      {k:'dead_bug',n:'Dead Bug',th:'เดดบัก',sets:3,reps:'12 ครั้ง/ข้าง',work:45,rest:40,dur:'~4 นาที',w:'น้ำหนักตัว',cue:'นอนหงาย ยกแขนขาตรงข้ามลง-ขึ้นสลับ หลังแนบพื้นเสมอ'},
      {k:'bicycle_crunch',n:'Bicycle Crunch',th:'ปั่นจักรยานอากาศ',sets:3,reps:'20 ครั้ง',work:40,rest:40,dur:'~4 นาที',w:'น้ำหนักตัว',cue:'ศอกแตะเข่าตรงข้าม บิดเอวสลับ ช้าๆ คุมจังหวะ'},
      {k:'mountain_climber',n:'Mountain Climber',th:'ปีนเขา',sets:3,reps:'30 วินาที',work:35,rest:40,dur:'~4 นาที',w:'น้ำหนักตัว',cue:'ท่าแพลงก์ ดึงเข่าเข้าอกสลับเร็ว ลำตัวนิ่ง'},
      {k:'hanging_leg_raise',n:'Hanging Leg Raise',th:'ห้อยตัวยกขา',sets:3,reps:'10–12 ครั้ง',work:40,rest:60,dur:'~5 นาที',w:'น้ำหนักตัว',cue:'ห้อยตัวจากราว ยกขาขึ้น เกร็งหน้าท้อง ไม่แกว่ง · เริ่มงอเข่าก่อนถ้ายาก'},
    ]},
};

// ── MEAL PLANS (5-day rotating) ──
const MEAL_PLANS = {
  mon: {
    label:'จ', sub:'คลาสสิก',
    meals:[
      {time:'07.00–08.00',kcal:450,pro:28,name:'ไข่ต้ม/ไข่คน 3 ฟอง + ข้าวโอ๊ต 40 ก. + กล้วย 1 ลูก',alt:''},
      {time:'10.30',kcal:200,pro:17,name:'กรีกโยเกิร์ตไม่หวาน 1 ถ้วย + อัลมอนด์ 15–20 เม็ด',alt:''},
      {time:'12.00–13.00',kcal:520,pro:45,name:'ข้าวกล้อง 1 ทัพพี + อกไก่ย่าง 180 ก. + ผักนึ่ง',alt:'ราดน้ำจิ้มแจ่วหรือน้ำปลามะนาวได้'},
      {time:'18.30 (ก่อนเล่น)',kcal:120,pro:2,name:'กล้วย 1 ลูก + กาแฟดำ/อเมริกาโน่',alt:'ให้พลังงานก่อนออกกำลังกาย'},
      {time:'20.15 (หลังเล่น)',kcal:480,pro:48,name:'อกไก่ต้ม 200 ก. + ผักนึ่ง + ข้าวกล้องครึ่งทัพพี',alt:'เน้นโปรตีน+ผัก ลดแป้ง'},
      {time:'ก่อนนอน (ถ้าหิว)',kcal:120,pro:20,name:'นมจืดพร่องมันเนย 1 แก้ว หรือเวย์โปรตีน 1 สกู๊ป',alt:''},
    ],
  },
  tue: {
    label:'อ', sub:'ไทยต้นตำรับ',
    meals:[
      {time:'07.00–08.00',kcal:420,pro:28,name:'ข้าวต้มปลา/ไก่ 1 ถ้วย + ไข่ต้ม 2 ฟอง',alt:'อบอุ่น ย่อยง่าย เหมาะวันออกกำลังกาย'},
      {time:'10.30',kcal:200,pro:12,name:'นมอัลมอนด์ไม่หวาน 1 กล่อง + ถั่วผสม 30 ก.',alt:''},
      {time:'12.00–13.00',kcal:510,pro:44,name:'ต้มยำปลาน้ำใส + ข้าวกล้อง 1 ทัพพี + ผักเยอะๆ',alt:'ปลาช่อน/ปลากะพง/ปลาทู อุดมโปรตีน'},
      {time:'18.30 (ก่อนเล่น)',kcal:100,pro:1,name:'แอปเปิล 1 ลูก + กาแฟดำ',alt:''},
      {time:'20.15 (หลังเล่น)',kcal:510,pro:50,name:'เวย์โปรตีน 1 สกู๊ป + อกไก่อบ 150 ก. + สลัดผัก',alt:'ผสมเวย์น้ำเย็นดื่มทันที แล้วตามด้วยมื้ออาหาร'},
      {time:'ก่อนนอน (ถ้าหิว)',kcal:130,pro:15,name:'กรีกโยเกิร์ตไม่หวาน 150 ก.',alt:''},
    ],
  },
  wed: {
    label:'พ', sub:'ผักเยอะ',
    meals:[
      {time:'07.00–08.00',kcal:430,pro:22,name:'ไข่คนผัก 2 ฟอง + ขนมปังโฮลวีต 2 แผ่น + แอปเปิล 1 ลูก',alt:''},
      {time:'10.30',kcal:165,pro:4,name:'กล้วย 1 ลูก + อัลมอนด์ 10 เม็ด',alt:''},
      {time:'12.00–13.00',kcal:480,pro:47,name:'สลัดอกไก่ต้ม 200 ก. + ไข่ต้ม 2 ฟอง + น้ำสลัดใส',alt:'ใส่มะเขือเทศ แตงกวา กระหล่ำปลี เพิ่มไฟเบอร์'},
      {time:'15.00',kcal:160,pro:13,name:'กรีกโยเกิร์ต 150 ก. + บลูเบอร์รี/สตรอว์เบอร์รี',alt:''},
      {time:'19.00–20.00',kcal:540,pro:42,name:'ต้มข่าไก่ (ลดกะทิ) + ผักดอกแค/เห็ด + ข้าวกล้อง 1 ทัพพี',alt:'วันพักก็กินอิ่มได้ เน้นผักเยอะ'},
      {time:'ก่อนนอน (ถ้าหิว)',kcal:120,pro:24,name:'เวย์โปรตีน 1 สกู๊ป ผสมน้ำ',alt:''},
    ],
  },
  thu: {
    label:'พฤ', sub:'โปรตีนสูง',
    meals:[
      {time:'07.00–08.00',kcal:460,pro:34,name:'โจ๊กหมู/ไก่ 1 ถ้วย + ไข่ต้ม 2 ฟอง + ขิงสด',alt:''},
      {time:'10.30',kcal:220,pro:25,name:'เวย์โปรตีน 1 สกู๊ป + กล้วย 1 ลูก',alt:'เพิ่มโปรตีนให้ครบ 160+ ก./วัน'},
      {time:'12.00–13.00',kcal:490,pro:40,name:'ส้มตำไทย (ขอไม่หวาน) + ไก่ย่าง 2 ชิ้น + ข้าวเหนียว 1 ก้อน',alt:'อาหารไทยต้นตำรับ โปรตีนสูง'},
      {time:'18.30 (ก่อนเล่น)',kcal:100,pro:1,name:'ฝรั่ง/แอปเปิล + กาแฟดำ',alt:''},
      {time:'20.15 (หลังเล่น)',kcal:480,pro:45,name:'ปลาอบสมุนไพร 200 ก. + ผักลวก + ข้าวกล้องครึ่งทัพพี',alt:'ปลาได้โอเมก้า 3 เปลี่ยนจากไก่บ้าง'},
      {time:'ก่อนนอน (ถ้าหิว)',kcal:120,pro:20,name:'นมจืดพร่องมันเนย 1 แก้ว',alt:''},
    ],
  },
  fri: {
    label:'ศ', sub:'พิเศษ',
    meals:[
      {time:'07.00–08.00',kcal:400,pro:35,name:'สมูทตี้โปรตีน: เวย์ 1 สกู๊ป + กล้วย + นมพร่องมันเนย + ผงโกโก้',alt:'ปั่นรวมกัน ดื่มสะดวกวันยุ่ง'},
      {time:'10.30',kcal:200,pro:13,name:'ไข่ต้ม 2 ฟอง + แอปเปิล 1 ลูก',alt:''},
      {time:'12.00–13.00',kcal:480,pro:38,name:'ก๋วยเตี๋ยวต้มยำน้ำใส ใส่ไก่/กุ้ง + ผักเยอะ ลดเส้น',alt:'สั่งแบบน้ำใส น้ำซุปเข้มข้นน้อย'},
      {time:'15.00',kcal:160,pro:13,name:'กรีกโยเกิร์ต + เบอร์รีรวม',alt:''},
      {time:'18.30–19.30',kcal:530,pro:48,name:'สเต็กปลาแซลมอน 180 ก. + ผักอบ + ข้าวกล้องครึ่งทัพพี',alt:'วันศุกร์ฉลองตัวเองด้วยเมนูพิเศษ'},
      {time:'ก่อนนอน (ถ้าหิว)',kcal:120,pro:4,name:'อัลมอนด์ 20 เม็ด + นมอัลมอนด์ไม่หวาน',alt:''},
    ],
  },
};

// ── 3-MONTH PLAN ──
const MONTHS = {
  1: {
    label:'เดือน 1 — ปรับตัว (Adaptation)',
    badge:'mb1', badgeText:'ก.ค. 2026',
    goal:'ลด ~1.5–2 กก. · จับฟอร์มทุกท่าให้ถูกต้อง',
    focus:'สร้างนิสัย ฟอร์มก่อนน้ำหนัก',
    desc:'สัปดาห์แรกร่างกายจะเมื่อย — เป็นเรื่องปกติ เน้นทำครบทุกวัน ไม่ขาด มากกว่าเพิ่มน้ำหนัก',
    weeks:[
      {w:'สัปดาห์ 1–2',label:'เริ่มต้น',desc:'น้ำหนักเบา จับฟอร์ม · เล่นครบ 4–5 วัน'},
      {w:'สัปดาห์ 3–4',label:'สม่ำเสมอ',desc:'เพิ่มจำนวนครั้ง 1–2 ครั้ง/เซ็ต ถ้าท่าง่ายขึ้น'},
    ],
    intensity:'⭐⭐☆☆☆',
    cardio:'Incline Walk 8% · 35 นาที',
    db_lower:'Goblet/Sumo 6–8 กก. · RDL 8–10 กก./ข้าง',
    db_upper:'Press 4–5 กก. · Curl 5–6 กก. · Lateral 2–3 กก.',
    diet:'ลดแคลอรี่เพียง −300 ก่อน เดือนแรกร่างกายต้องปรับตัว',
    target_kg:88.0,
    goals:[
      'เล่นครบ 4 วัน/สัปดาห์ ทุกสัปดาห์',
      'ชั่งน้ำหนักทุกวันจันทร์เช้า',
      'ดื่มน้ำ 2.5 ลิตร/วัน ทุกวัน',
      'กินโปรตีน ≥150 ก./วัน',
      'นอน ≥7 ชม./คืน อย่างน้อย 5 วัน/สัปดาห์',
    ]
  },
  2: {
    label:'เดือน 2 — เพิ่มความเข้มข้น (Progressive)',
    badge:'mb2', badgeText:'ส.ค. 2026',
    goal:'ลด ~2–2.5 กก. · เพิ่มน้ำหนักดัมเบลได้',
    focus:'Progressive Overload · เพิ่มน้ำหนักทีละขั้น',
    desc:'ร่างกายปรับตัวแล้ว ถึงเวลาเพิ่มแรงกดดัน ท่าไหนทำครบง่ายเกิน 2 สัปดาห์ให้เพิ่มน้ำหนักเลย',
    weeks:[
      {w:'สัปดาห์ 5–6',label:'เพิ่มน้ำหนัก',desc:'เพิ่มดัมเบล +1–2 กก./ข้าง ในท่าที่ง่ายขึ้น'},
      {w:'สัปดาห์ 7–8',label:'Supersets',desc:'จับคู่ 2 ท่าทำต่อกันไม่พัก ลดเวลา เพิ่มเผาผลาญ'},
    ],
    intensity:'⭐⭐⭐☆☆',
    cardio:'Incline Walk 10% · 40 นาที · หรือ interval วิ่ง 20 นาที',
    db_lower:'Goblet/Sumo 10–12 กก. · RDL 12–14 กก./ข้าง',
    db_upper:'Press 6–8 กก. · Curl 7–9 กก. · Lateral 3–4 กก.',
    diet:'ลดแคลอรี่ −450–500 เต็มที่ · เพิ่มโปรตีน 160–170 ก./วัน',
    target_kg:86.0,
    goals:[
      'เพิ่มน้ำหนักดัมเบลได้อย่างน้อย 1 ท่า',
      'ทำ Supersets ได้ไม่น้อยกว่า 2 คู่',
      'เดินบนลู่วิ่งชัน 10% ได้ครบ 40 นาที',
      'ลดน้ำหนักได้อย่างน้อย 1 กก. จากต้นเดือน',
      'ไม่กินของว่างต้องห้าม >2 ครั้ง/สัปดาห์',
    ]
  },
  3: {
    label:'เดือน 3 — เร่งผล (Peak)',
    badge:'mb3', badgeText:'ก.ย. 2026',
    goal:'ลด ~2–2.5 กก. · เห็นการเปลี่ยนแปลงชัดเจน',
    focus:'Metabolic Training · คาร์ดิโอหนักขึ้น',
    desc:'เดือนสุดท้าย ผลลัพธ์จะชัดที่สุด กล้ามเนื้อเริ่มมีรูปร่าง ไขมันลดลงเห็นได้ ให้แรงที่สุด',
    weeks:[
      {w:'สัปดาห์ 9–10',label:'Drop Set',desc:'เซ็ตสุดท้ายของแต่ละท่า ลดน้ำหนัก 20% ทำต่อจนหมดแรง'},
      {w:'สัปดาห์ 11–12',label:'Deload + ประเมินผล',desc:'สัปดาห์ 11 ลดน้ำหนัก 40% พักฟื้น · สัปดาห์ 12 ประเมินผลครบ 3 เดือน'},
    ],
    intensity:'⭐⭐⭐⭐☆',
    cardio:'Interval วิ่ง 25 นาที · หรือ Incline 12% 40 นาที',
    db_lower:'Goblet/Sumo 12–16 กก. · RDL 14–18 กก./ข้าง',
    db_upper:'Press 8–10 กก. · Curl 9–11 กก. · Lateral 4–6 กก.',
    diet:'Carb cycling ถ้าน้ำหนักนิ่ง: วันเล่นเวทกินแป้งได้มากขึ้น วันพักลดแป้งลง',
    target_kg:84.0,
    goals:[
      'Drop Set ได้ทุกท่าในเซ็ตสุดท้าย',
      'น้ำหนักลดรวม ≥5 กก. จากเริ่มต้น',
      'Deload สัปดาห์ที่ 11 เต็ม 1 สัปดาห์',
      'ถ่ายรูปเปรียบเทียบ Before/After',
      'วางแผนต่อเนื่องหลังจบ 3 เดือน',
    ]
  }
};

// ── PHYSIQUE GOAL ──
const BF_SCALE = [
  {pct:'28%',label:'ตอนนี้',color:'#ef4444',cur:true},
  {pct:'24%',label:'เดือน 1',color:'#f97316',cur:false},
  {pct:'20%',label:'เดือน 2',color:'#fbbf24',cur:false},
  {pct:'16%',label:'เดือน 3',color:'#a3e635',cur:false},
  {pct:'12%',label:'เป้าหมาย',color:'#22c55e',cur:false},
];

const ROADMAP = [
  {month:'เดือน 1 — ก.ค.',badge:'mb1',bf:'~26–24%',look:'เริ่มกระชับขึ้น',
   detail:'น้ำหนักลดเร็วช่วงแรก (ส่วนใหญ่เป็นน้ำ+ไขมัน) หน้าท้องเริ่มแบนลง เสื้อผ้าหลวมขึ้น',
   milestone:'ลด ~2 กก. · พุงเริ่มยุบ'},
  {month:'เดือน 2 — ส.ค.',badge:'mb2',bf:'~22–20%',look:'กล้ามเริ่มโผล่',
   detail:'ไหล่/แขนเริ่มเห็นมัดกล้าม หน้าท้องส่วนบนเริ่มเห็นเส้น (2 ก้อนบน) เอวเล็กลงชัด',
   milestone:'ลดรวม ~4 กก. · เห็นกล้ามแขน/ไหล่'},
  {month:'เดือน 3 — ก.ย.',badge:'mb3',bf:'~18–16%',look:'ฟิตแอนด์เฟิร์ม',
   detail:'หน้าท้องเห็นเส้นชัด 4 ก้อนบน กล้ามอก/หลังมีรูปร่าง แววหุ่นแอธเลติกเริ่มมา',
   milestone:'ลดรวม ~6 กก. · เห็น 4 แพ็คบน'},
];

// ── Weekly overview ──
const WEEK = [
  {d:'จ.',cls:'wd-train',title:'Full Body Strength',sub:'เวททั้งตัว 5 ท่า + เดินชัน 10 นาที',go:'mon'},
  {d:'อ.',cls:'wd-cardio',title:'คาร์ดิโอ — Incline Walk',sub:'เดินชัน 8–12% · 35–40 นาที + Core 2 ท่า',go:'core'},
  {d:'พ.',cls:'wd-train',title:'Lower Body + Core',sub:'เวทขา/สะโพก/แกนกลาง 5 ท่า',go:'wed'},
  {d:'พฤ.',cls:'wd-train',title:'Upper Body + Interval',sub:'เวทช่วงบน 5 ท่า + interval ลู่วิ่ง 15 นาที',go:'thu'},
  {d:'ศ.',cls:'wd-cardio',title:'คาร์ดิโอ + Core',sub:'เดิน/interval 30 นาที + Core ครบ 4 ท่า',go:'core'},
  {d:'ส.',cls:'wd-active',title:'Active Recovery',sub:'เดินเล่น/ปั่นจักรยาน/ว่ายน้ำ เบาๆ 30–45 นาที',go:null},
  {d:'อา.',cls:'wd-rest',title:'พักเต็มที่',sub:'วันพักฟื้นกล้ามเนื้อ · โยคะยืดเหยียดได้ถ้าอยากขยับ',go:null},
];
