/* 锦绣陕西 · 全站数据
   字段命名：name/desc 为中文，nameEn/descEn 为英文，二者由 SX_APP.field() 按语言切换。 */
window.SX_DATA = (function () {
  'use strict';
  const D = {};

  /* ============ 城市索引：10 市 + 城固县 ============ */
  D.cities = [
    {
      id: 'yulin', name: '榆林', nameEn: 'Yulin', region: '陕北', regionEn: 'Northern Shaanxi',
      coord: '38.29° N · 109.74° E', img: './image/scenic1.jpg',
      intro: '陕北最北，长城与毛乌素沙地在此相遇。镇北台的青砖、波浪谷的赤岩、红碱淖的湖水，把边塞的苍茫与水的柔软并置在同一片高原上。',
      introEn: 'At Shaanxi’s northern edge, where the Great Wall meets the Mu Us Desert. Brick forts, red sandstone waves and a desert lake hold the frontier’s austerity and its unexpected softness.'
    },
    {
      id: 'yanan', name: '延安', nameEn: 'Yan’an', region: '陕北', regionEn: 'Northern Shaanxi',
      coord: '36.59° N · 109.49° E', img: './image/scenic4.jpg',
      intro: '黄土高原的褶皱里，宝塔山与延河守着这座山城。黄帝陵在桥山，壶口瀑布在宜川，文明的开端与黄河的咆哮相距不过百里。',
      introEn: 'In the folds of the loess plateau, the pagoda hill and the Yan River hold this mountain city. The Yellow Emperor’s mausoleum and the Hukou waterfall lie within a hundred kilometres of each other.'
    },
    {
      id: 'tongchuan', name: '铜川', nameEn: 'Tongchuan', region: '关中', regionEn: 'Guanzhong',
      coord: '34.90° N · 108.95° E', side: 'left', img: './image/scenic8.jpg',
      intro: '关中平原向陕北过渡的地带。耀州窑的炉火曾烧了千年，玉华宫里玄奘译经四载，陈炉古镇的瓷片至今还铺在脚下。',
      introEn: 'Where the Guanzhong plain climbs toward the north. The Yaozhou kilns burned for a thousand years, Xuanzang translated sutras at Yuhua Palace, and Chenlu’s alleys are still paved with shards.'
    },
    {
      id: 'xianyang', name: '咸阳', nameEn: 'Xianyang', region: '关中', regionEn: 'Guanzhong',
      coord: '34.33° N · 108.71° E', side: 'top', img: './image/scenic7.jpg',
      intro: '秦都故地，渭水北岸。汉唐帝陵一字排开如大地的标点，乾陵的无字碑在梁山上沉默了一千三百年。',
      introEn: 'The old capital of Qin on the north bank of the Wei. Imperial tombs line the plain like punctuation marks; the wordless stele of Qianling has kept silent for thirteen centuries.'
    },
    {
      id: 'weinan', name: '渭南', nameEn: 'Weinan', region: '关中', regionEn: 'Guanzhong',
      coord: '34.50° N · 109.51° E', side: 'top', img: './image/scenic9.jpg',
      intro: '华山在此拔地而起，黄河、渭河、洛河在此交汇。潼关扼守关中门户，韩城的司马迁祠望向黄河。',
      introEn: 'Mount Hua rises sheer here, and three rivers meet. Tongguan guards the gate to Guanzhong; Sima Qian’s shrine at Hancheng looks out over the Yellow River.'
    },
    {
      id: 'baoji', name: '宝鸡', nameEn: 'Baoji', region: '关中', regionEn: 'Guanzhong',
      coord: '34.36° N · 107.24° E', side: 'left', img: './image/scenic10.jpg',
      intro: '关中平原的西端，周秦文明从这里出发，素有“青铜器之乡”之称。法门寺与太白山一北一南，把信仰与海拔同时推到高处。',
      introEn: 'At the western end of the Guanzhong plain, where Zhou and Qin civilisation began — a land of bronzes, with Famen Temple and Mount Taibai rising to south and north.'
    },
    {
      id: 'xian', name: '西安', nameEn: 'Xi’an', region: '关中', regionEn: 'Guanzhong', major: true,
      coord: '34.34° N · 108.94° E', img: './image/scenic11.jpg',
      intro: '十三朝古都。城墙围住的是明城的轮廓，地下叠着周秦汉唐。钟楼的晨钟、大雁塔的塔影、回坊的烟火，让几个世纪在这座城市里同时进行。',
      introEn: 'Capital of thirteen dynasties. The Ming wall rings a ground layered with Zhou, Qin, Han and Tang. Bell tower, pagoda and the Muslim quarter keep several centuries running at once.'
    },
    {
      id: 'shangluo', name: '商洛', nameEn: 'Shangluo', region: '陕南', regionEn: 'Southern Shaanxi',
      coord: '33.87° N · 109.94° E', img: './image/scenic12.jpg',
      intro: '秦岭东段南麓，商山洛水之间。仓颉造字、商山四皓的传说在此流传，秦风楚韵交汇共生，世人誉之：秦岭最美是商洛。',
      introEn: 'On the southern slopes of the eastern Qinling, between Mount Shang and the Luo River. Legends of Cangjie and the Four White-Haired Sages endure here, where Qin and Chu traditions meet.'
    },
    {
      id: 'hanzhong', name: '汉中', nameEn: 'Hanzhong', region: '陕南', regionEn: 'Southern Shaanxi',
      coord: '33.07° N · 107.02° E', side: 'left', img: './image/scenic14.jpg',
      intro: '北依秦岭，南屏巴山，汉江横贯全境。汉家发祥地，张骞桑梓、蔡伦封邑，秦腔、皮影等乡土非遗薪火绵延，山水与人文共生。',
      introEn: 'Held between the Qinling to the north and the Ba mountains to the south, with the Han River running through. Birthplace of the Han, home of Zhang Qian and fief of Cai Lun.'
    },
    {
      id: 'ankang', name: '安康', nameEn: 'Ankang', region: '陕南', regionEn: 'Southern Shaanxi',
      coord: '32.68° N · 109.03° E', img: './image/scenic15.jpg',
      intro: '陕南秦巴腹地，汉江自西向东穿过。瀛湖散在群山之间，紫阳的茶山常年浮在雾里，蚕桑与漆树在此生长了两千年。',
      introEn: 'In the Qinba heartland of southern Shaanxi, the Han River crosses from west to east. Ying Lake lies scattered among mountains; Ziyang’s tea hills float in mist.'
    },
    {
      id: 'chenggu', name: '城固', nameEn: 'Chenggu', region: '陕南 · 汉中', regionEn: 'Hanzhong, Southern Shaanxi', county: true,
      coord: '33.16° N · 107.33° E', img: './image/scenic16.jpg',
      intro: '汉中盆地中部，湑水与汉江之间。张骞故里、桔乡，五门堰灌溉两千余年仍在流水；商代青铜器在此出土，把这片土地的时间又往前推了一千年。',
      introEn: 'In the middle of the Hanzhong basin, between the Xu and Han rivers. Home of Zhang Qian and of citrus groves; the Wumen weir has irrigated these fields for two thousand years, and Shang bronzes push its story back another millennium.'
    }
  ];

  /* ============ 特色风景：scenic1—24 ============ */
  D.spots = [
    {
      id: 'scenic-1', n: 1, name: '镇北台', nameEn: 'Zhenbeitai Fort', city: '榆林', cityId: 'yulin', location: '榆阳区', locationEn: 'Yuyang',
      img: './image/scenic1.jpg',
      desc: '红山之巅，方形高台四层叠起，外砌青砖、内夯黄土，是明长城沿线现存体量最大的军事塞台，素有“万里长城第一台”之称，与山海关、嘉峪关并称长城三大奇观。登台四望，南是榆林城与榆溪河，北是毛乌素沙地边缘的残墙绿洲。台东款贡城、台西南易马城，一官一民，把刀兵与商旅、对峙与互市叠压在同一片黄土上。四百年风从垛口穿过，金戈铁马与茶马驼铃俱散，唯青砖方台仍立于红山之上。',
      descEn: 'A four-tiered brick-and-earth fort on Red Hill, the largest surviving military platform along the Ming Great Wall — the “first terrace of the ten-thousand-li wall”. From the top, the city of Yulin and the Yuxi River lie south; the broken walls and green patches at the edge of the Mu Us Desert lie north.'
    },
    {
      id: 'scenic-2', n: 2, name: '波浪谷', nameEn: 'Wave Valley', city: '榆林', cityId: 'yulin', location: '靖边县', locationEn: 'Jingbian',
      img: './image/scenic2.jpg',
      desc: '黄土高原与毛乌素沙地交接处，红色砂岩被亿万年风与水刻出一道道弧线，一圈套着一圈，像大地凝固的波纹，也像时光按下的指纹。这里的丹霞形成于约 9600 万年前的白垩纪，沙丘沉积成岩，再经地壳抬升与流水切割，露出今日的线谷、巷谷与赤壁，分布有世界级地貌景观 7 处。景区分火焰丹霞、赤壁丹霞、地心丹霞，晴天里岩层红得发烫，谷底一汪碧水又把赤壁倒映成另一重天地。当地人形容它“无风却起浪，无水也形波”。',
      descEn: 'Where the loess plateau meets the Mu Us Desert, wind and water have carved red sandstone into nested arcs — frozen ripples, or fingerprints pressed by time. Formed some 96 million years ago, the Danxia landforms here split into flame, cliff and canyon sections, with a pool at the valley floor doubling the red walls.'
    },
    {
      id: 'scenic-3', n: 3, name: '红碱淖', nameEn: 'Hongjiannao Lake', city: '榆林', cityId: 'yulin', location: '神木市', locationEn: 'Shenmu',
      img: './image/scenic3.jpg',
      desc: '毛乌素沙地边缘，一片约 37 平方公里的淡水湖摊开在黄沙之间，湖岸是沙，湖中是水，沙漠与湖泊直接相接。它是中国最大的沙漠淡水湖，也是全球最大的遗鸥繁殖与栖息地——全球约 70% 的遗鸥种群在此繁育，湖心岛上每年春夏有数千巢遗鸥育雏。一半是毛乌素的旱，一半是湖水的满，红碱淖的独一份，在于它把最不该并存的两样东西，放在了一起。',
      descEn: 'A 37-square-kilometre freshwater lake lying directly against the sand of the Mu Us Desert — China’s largest desert lake and the world’s main breeding ground for the relict gull, where roughly 70% of the global population nests each spring.'
    },
    {
      id: 'scenic-4', n: 4, name: '宝塔山', nameEn: 'Baota Hill', city: '延安', cityId: 'yanan', location: '宝塔区', locationEn: 'Baota',
      img: './image/scenic4.jpg',
      desc: '延河之畔，青砖古塔雄踞山巅，是延安城的标志。春有山花覆阶，夏有浓荫绕塔，秋来红叶点染，冬雪压檐愈显沉静。晨雾漫城时，塔影与延河波光相映，山间摩崖石刻、烽火残迹与古塔共同守着这座山城的岁月。古塔始建于唐，现存塔身为明代修葺，八角九级，登临可俯瞰延河穿城、窑洞错落。自 1937 年后，它更成为无数人心中延安的灯火。',
      descEn: 'A brick pagoda on the hill above the Yan River, the emblem of Yan’an. First built in the Tang and repaired in the Ming, its nine octagonal storeys look down on cave dwellings and a river cutting through the city.'
    },
    {
      id: 'scenic-5', n: 5, name: '黄帝陵', nameEn: 'Mausoleum of the Yellow Emperor', city: '延安', cityId: 'yanan', location: '黄陵县', locationEn: 'Huangling',
      img: './image/scenic5.jpg',
      desc: '桥山如长桥横卧，沮水三面环流，山巅陵冢古朴，山麓轩辕庙静立。庙中那株黄帝手植柏相传为轩辕黄帝亲栽，树龄约五千年，高近二十米，下围逾十一米，苍干虬枝，被誉为“世界柏树之冠”。桥山之上八万余株古柏森然成林，千年以上者三万余株，整座山透出沉穆的肃静。自汉武帝祭黄于桥山，清明公祭绵延至今，这里早已不只是一座陵，而是海内外炎黄子孙回望文明来处时，那一道共同的目光所向。',
      descEn: 'On Qiao Hill, ringed on three sides by the Ju River. The cypress said to have been planted by the Yellow Emperor himself is around five thousand years old; more than 80,000 ancient cypresses cover the hill, over 30,000 of them aged a millennium or more.'
    },
    {
      id: 'scenic-6', n: 6, name: '壶口瀑布', nameEn: 'Hukou Waterfall', city: '延安', cityId: 'yanan', location: '宜川县', locationEn: 'Yichuan',
      img: './image/scenic6.jpg',
      desc: '黄河自北而来，在晋陕峡谷的咽喉处骤然收束——上游三百米宽的河面，不到五百米内被压缩至二三十米，从二十多米高的陡崖倾泻而下，形成“千里黄河一壶收”的奇观。春回大地时，冰岸消融，桃花汛起，副瀑万壑千流；秋汛水盛，晴日里水雾腾起，彩虹横跨两岸；到了冬季，冰凌挂满崖壁，整座瀑布凝成一片“冰瀑玉壶”。站在岸边，闷雷般的轰鸣从脚底往骨头里钻。',
      descEn: 'Where the Yellow River squeezes from 300 metres wide into a channel of twenty or thirty, then drops over a cliff of more than twenty metres — “a thousand li of river gathered into one pot”. In spring the ice breaks and peach-blossom floods arrive; in winter the whole fall freezes into a jade pot.'
    },
    {
      id: 'scenic-7', n: 7, name: '乾陵', nameEn: 'Qianling Mausoleum', city: '咸阳', cityId: 'xianyang', location: '乾县', locationEn: 'Qianxian',
      img: './image/scenic7.jpg',
      desc: '坐落于咸阳乾县梁山，是唐高宗李治与女皇武则天的合葬陵，为唐十八陵中保存最完整、唯一未被盗掘的帝王陵。它采用“因山为陵”形制，陵园仿唐长安城布局。神道两侧矗立无字碑、六十一蕃臣石像、石狮等大批盛唐石刻，被誉为露天唐代石刻艺术博物馆。陵区还分布永泰公主等陪葬墓，出土大量唐代壁画与陶俑，见证大唐盛世气度。',
      descEn: 'The joint tomb of Emperor Gaozong and Empress Wu Zetian, built into Mount Liang and the only one of the eighteen Tang imperial tombs never looted. Its spirit road is lined with the wordless stele, sixty-one foreign envoys, lions and horses — an open-air museum of Tang stone carving.'
    },
    {
      id: 'scenic-8', n: 8, name: '玉华宫', nameEn: 'Yuhua Palace', city: '铜川', cityId: 'tongchuan', location: '印台区', locationEn: 'Yintai',
      img: './image/scenic8.jpg',
      desc: '坐落于陕西铜川玉华山，原为唐代皇家避暑行宫，由唐太宗扩建而成，后唐高宗下诏改宫为玉华寺。玄奘法师晚年移居此处潜心译经，历时四载，最终圆寂于此，这里也成为重要的佛教文化圣地。景区植被茂密，山林清幽，兼具盛唐历史遗存与秀美的自然生态，是全国重点文物保护单位与国家 4A 级景区。',
      descEn: 'A Tang imperial summer palace on Yuhua Mountain, later converted into a temple by decree of Emperor Gaozong. Xuanzang spent his last four years translating sutras here and died within its walls.'
    },
    {
      id: 'scenic-9', n: 9, name: '华山', nameEn: 'Mount Hua', city: '渭南', cityId: 'weinan', location: '华阴市', locationEn: 'Huayin',
      img: './image/scenic9.jpg',
      desc: '华山古称西岳、太华山，位列五岳，坐落于陕西渭南华阴市，南接秦岭，北瞰黄渭，享有“奇险天下第一山”的美誉。山体由巨型花岗岩构成，五峰对峙，南峰落雁峰为五岳最高峰。长空栈道、苍龙岭等险景闻名天下，它同时是知名道教圣地，留存大量道观与石刻遗存。相传“华夏”之名源于华山，这里也被称作华夏之根。',
      descEn: 'The Western Marchmount, a mass of granite rising south of the Wei plain. Five peaks face one another, the southernmost the highest of the five sacred mountains; the plank walk and Azure Dragon Ridge are among the most exposed paths in China.'
    },
    {
      id: 'scenic-10', n: 10, name: '关山草原', nameEn: 'Guanshan Grassland', city: '宝鸡', cityId: 'baoji', location: '陇县', locationEn: 'Longxian',
      img: './image/scenic10.jpg',
      desc: '缓坡铺展着连片青碧草甸，孤树错落散落在山野之间，山谷间薄雾缓缓流淌。远处山峦叠翠，风车伫立山巅，牛羊悠游于绿茵之上，林草相间，云色温柔，勾勒出属于西北的悠然牧歌图景。',
      descEn: 'Rolling meadows spread across gentle slopes, single trees scattered among them, mist drifting slowly along the valleys. Wind turbines stand on distant ridges while cattle and sheep graze — a pastoral idyll in the north-west.'
    },
    {
      id: 'scenic-11', n: 11, name: '钟楼', nameEn: 'Bell Tower', city: '西安', cityId: 'xian', location: '碑林区', locationEn: 'Beilin',
      img: './image/scenic11.jpg',
      desc: '西安钟楼坐落于古城中心，是东西南北四条大街的交汇点，也是西安城市地标。它始建于明洪武十七年（1384 年），万历十年迁建现址，清乾隆年间重修，距今已有六百余年历史，是国内现存形制最大、保存最为完整的钟楼。楼为砖木结构，重檐三滴水、四角攒尖顶，通高 36 米。方形青砖基座四面开设十字券洞，连通四方街道。古时楼上悬挂景云钟，以敲钟报时，维系古城时序。',
      descEn: 'At the exact centre of the old city, where four great streets meet. Built in 1384, moved to this site in 1582 and repaired under the Qianlong emperor, it is the largest and best-preserved bell tower in China: 36 metres of brick and timber with a triple-eaved pyramidal roof.'
    },
    {
      id: 'scenic-12', n: 12, name: '商洛', nameEn: 'Shangluo', city: '商洛', cityId: 'shangluo', location: '秦岭东段南麓', locationEn: 'Eastern Qinling',
      img: './image/scenic12.jpg',
      desc: '商洛，得名于商山洛水，雄踞秦岭东段南麓，地处陕东南鄂豫陕交界之地，是南水北调中线工程的重要水源涵养地。古为商於古道通衢，仓颉造字、商山四皓的千古传说在此流传。秦风楚韵在此交融共生，孕育出商洛花鼓、洛南静板书、柞水渔鼓等珍贵非遗；棣花古镇、塔云山揽山水人文之胜，洋芋糍粑、商芝肉承载乡土滋味。这里兼得秦岭山川灵秀，素有“戏剧之乡”美名。',
      descEn: 'Named for Mount Shang and the Luo River, Shangluo sits on the southern flank of the eastern Qinling at the meeting point of Shaanxi, Hubei and Henan. An old highway of the Shangyu road, it is where Qin and Chu cultures blend — home of flower-drum opera, static-board storytelling and Zhashui fishing-drum ballads.'
    },
    {
      id: 'scenic-13', n: 13, name: '塔云山', nameEn: 'Tayun Mountain', city: '商洛', cityId: 'shangluo', location: '镇安县', locationEn: 'Zhen’an',
      img: './image/scenic13.jpg',
      desc: '塔云山位于镇安县柴坪镇，是秦岭闻名的道教圣地，因孤峰悬崖之上的金顶观音殿名扬四方，始建于明万历年间。殿宇三面凌空、矗立于孤石之巅，云海漫卷之时，恍若云端仙阙。古建精巧奇险，将道教文脉与秦岭雄奇山水相融，是秦楚交界极具代表性的人文胜境，为陕西省省级风景名胜区、省级文物保护单位。',
      descEn: 'A Taoist mountain famous for the Guanyin hall poised on a lone rock pinnacle, three sides open to the air, founded in the Wanli era of the Ming. When cloud fills the valley the shrine appears to float.'
    },
    {
      id: 'scenic-14', n: 14, name: '汉中', nameEn: 'Hanzhong', city: '汉中', cityId: 'hanzhong', location: '汉中盆地', locationEn: 'Hanzhong Basin',
      img: './image/scenic14.jpg',
      desc: '汉中，坐落于陕西西南，北依巍巍秦岭，南屏莽莽巴山，汉江奔流横贯全境，素有“汉家发祥地，中华聚宝盆”之誉，是国家历史文化名城。此地是汉王刘邦肇基兴汉之所，为张骞桑梓、蔡伦封邑，沉淀着源远流长的汉韵与三国风骨；作为南水北调中线水源涵养地，秦巴谷地生态葱郁，朱鹮、大熊猫等珍禽异兽栖于山林之间。',
      descEn: 'In south-western Shaanxi, held between the Qinling and the Ba mountains with the Han River crossing the plain. Where Liu Bang founded the Han, and the homeland of Zhang Qian — a national historic city, and a source catchment for the south-to-north water transfer.'
    },
    {
      id: 'scenic-15', n: 15, name: '凤堰古梯田', nameEn: 'Fengyan Ancient Terraces', city: '安康', cityId: 'ankang', location: '汉阴县', locationEn: 'Hanyin',
      img: './image/scenic15.jpg',
      desc: '顺着秦巴山起伏延展的层层梯田，随山势蜿蜒错落，云雾时常漫上山坡。春有漫坡金花铺叠，秋有稻浪染遍山野，水田澄澈如镜，映着云天与山林，老屋隐于田垄之间，是藏在陕南山地的田园画卷。',
      descEn: 'Terraces following the rise and fall of the Qinba mountains, mist often drifting up the slopes. Rape flowers in spring, rice waves in autumn, paddies like mirrors, old houses hidden between the ridges.'
    },
    {
      id: 'scenic-16', n: 16, name: '张骞纪念馆', nameEn: 'Zhang Qian Memorial', city: '城固', cityId: 'chenggu', location: '博望街道饶家营村', locationEn: 'Bowang, Chenggu',
      img: './image/scenic16.jpg',
      desc: '张骞纪念馆坐落于城固博望街道饶家营村，依托西汉丝绸之路开拓者张骞的墓冢修建，整体建筑为仿汉风格。张骞两次出使西域，打通东西方交流通道，张骞墓于 2014 年作为丝绸之路遗产点入选世界文化遗产。馆区内保存有汉代石虎等珍贵文物，展厅借助沙盘、图片与史料，完整展现张骞出使西域的故事，是研学、感悟丝路开拓精神的重要阵地。',
      descEn: 'Built around the tomb of Zhang Qian, the Han envoy who opened the road west. In 2014 the tomb was inscribed as a World Heritage site on the Silk Road listing. Han stone tigers survive in the grounds, and the galleries retell both journeys to the Western Regions.'
    },
    {
      id: 'scenic-17', n: 17, name: '桔园景区', nameEn: 'Citrus Garden', city: '城固', cityId: 'chenggu', location: '桔园镇', locationEn: 'Juyuan',
      img: './image/scenic17.jpg',
      desc: '桔园景区是国家 AAA 级旅游景区，被誉为中国柑桔生态观光第一园，地处城固桔园镇，是国内地理北缘规模最大的柑橘生产基地，也是成语“一人得道，鸡犬升天”传说的发源地。整片山地分布着二十余万亩桔林，春季桔花盛开漫山雪白，秋季金果挂满枝头，景区设置升仙台、揽胜台、桔颂长廊等点位。',
      descEn: 'China’s northernmost large citrus belt, with more than 130 square kilometres of groves across the hills. White blossom covers the slopes in spring, golden fruit in autumn; the site is also the origin of the legend behind “one man attains the Way and his dog and chickens rise with him”.'
    },
    {
      id: 'scenic-18', n: 18, name: '五门堰', nameEn: 'Wumen Weir', city: '城固', cityId: 'chenggu', location: '湑水河畔', locationEn: 'Xu River',
      img: './image/scenic18.jpg',
      desc: '五门堰是汉中三堰之一，世界灌溉工程遗产，修建于西汉居摄二年，距今已有两千余年历史。古堰选址于湑水河畔，因为渠首横向并列五个进水洞口而得名，巧妙利用河道弯道进行引水，拥有完善的水量调控体系，工程设计精妙。历经漫长岁月，五门堰至今依旧持续灌溉周边农田，是仍然发挥实际功用、鲜活留存下来的古代水利工程。',
      descEn: 'One of the three weirs of Hanzhong and a World Heritage irrigation structure, begun in 7 AD. Named for the five intake openings set side by side, it uses the bend of the Xu River to divert water and still irrigates the surrounding fields today.'
    },
    {
      id: 'scenic-19', n: 19, name: '上元观古镇', nameEn: 'Shangyuanguan Old Town', city: '城固', cityId: 'chenggu', location: '上元观镇', locationEn: 'Shangyuanguan',
      img: './image/scenic19.jpg',
      desc: '上元观古镇又称龟城，为国家 AAA 级旅游景区，始建于明代天启年间，距今近四百年。古镇整体布局形似伏龟，街巷为两纵六横的独特格局，古时修筑城墙、护城河，属于防御型汉水商堡。古镇保留大量明清古建筑，兼具商贸历史、红色革命遗迹，上元观红豆腐、城固面皮等本土非遗美食皆发源于此地。',
      descEn: 'Also called Turtle City, laid out in the shape of a crouching turtle with two north–south and six east–west lanes. Founded in the 1620s as a fortified trading town on the Han River, it keeps a dense fabric of Ming and Qing houses.'
    },
    {
      id: 'scenic-20', n: 20, name: '南沙湖风景区', nameEn: 'Nansha Lake', city: '城固', cityId: 'chenggu', location: '巴山北麓', locationEn: 'Northern Ba Mountains',
      img: './image/scenic20.jpg',
      desc: '南沙湖风景区是国家水利风景区、国家 AAA 级景区，距离城固县城 15 公里，藏于巴山北麓山谷之间。湖区群山环抱，湖水澄澈，拥有湖心孤岛、成片湿地与茂密林地，优良生态吸引大量水鸟常年栖息。景区融合自然山水风光与地母庙等人文古迹，可以泛舟游湖、林间漫步，是城固代表性的生态休闲景观。',
      descEn: 'Fifteen kilometres from the county town, hidden in the northern foothills of the Ba mountains. Wooded hills surround clear water, with an island, wetlands and resident waterbirds; a local Earth Mother temple stands among the trees.'
    },
    {
      id: 'scenic-21', n: 21, name: '城固钟楼', nameEn: 'Chenggu Bell Tower', city: '城固', cityId: 'chenggu', location: '老城十字街口', locationEn: 'Old Town Centre',
      img: './image/scenic21.jpg',
      desc: '城固钟楼是省级文物保护单位，始建于清嘉庆年间，后遭焚毁，现存建筑于光绪年间重建，是陕南保存不多的古钟楼，砖木结构三层楼阁，方形石砌基座开设十字券洞，飞檐翘角，坐落于老城十字街口，是城固老城最具代表性的历史地标，见证县城数百年变迁。',
      descEn: 'A provincial protected site first built under the Jiaqing emperor and rebuilt after a fire in the Guangxu era. Three storeys of brick and timber on a square stone base pierced by four arched passages, it stands at the crossing of the old town’s main streets.'
    },
    {
      id: 'scenic-22', n: 22, name: '龙头宝鼎', nameEn: 'Longtou Tripod', city: '城固', cityId: 'chenggu', location: '汉江桥头', locationEn: 'Han River Bridge',
      img: './image/scenic22.jpg',
      desc: '龙头宝鼎矗立在城固汉江桥头，以城固龙头镇出土商代青铜鼎为原型放大 25 倍铸造而成，宝鼎重达 36 吨，高 10.9 米，作为城固南大门标志性景观，彰显城固深厚的商代青铜文化底蕴，是现代与古代历史交融的城市符号。',
      descEn: 'A 36-tonne, 10.9-metre bronze tripod at the head of the Han River bridge, cast at twenty-five times the size of a Shang dynasty original unearthed at Longtou town — the emblem of the county’s bronze age.'
    },
    {
      id: 'scenic-23', n: 23, name: '城固县博物馆', nameEn: 'Chenggu County Museum', city: '城固', cityId: 'chenggu', location: '张骞墓旁', locationEn: 'Beside Zhang Qian’s Tomb',
      img: './image/scenic23.jpg',
      desc: '城固县博物馆紧邻张骞墓，是国家二级博物馆，馆藏文物四千余件，馆藏最具特色的就是大量商代青铜器，展厅系统展示城固从史前、商周、两汉直至西北联大办学等完整历史脉络，是了解城固千年历史文化的核心窗口。',
      descEn: 'A national second-grade museum beside Zhang Qian’s tomb, holding more than four thousand objects — above all a remarkable group of Shang bronzes. The galleries run from prehistory through Shang, Zhou and Han to the wartime Northwest Associated University.'
    },
    {
      id: 'scenic-24', n: 24, name: '城关影剧院旧址', nameEn: 'Chengguan Cinema Site', city: '城固', cityId: 'chenggu', location: '老城', locationEn: 'Old Town',
      img: './image/scenic24.jpg',
      desc: '城关影剧院始建于上世纪 70 年代末，曾经是城固规模最大的观影与文艺演出场所，承载几代城固人的集体记忆，停业之后原址改造为电影主题口袋公园，保留原有建筑主体结构，将老城记忆与城市休闲空间融为一体。',
      descEn: 'Built in the late 1970s as the county’s largest cinema and performance hall, it holds the collective memory of several generations. Closed, it has been turned into a film-themed pocket park that keeps the original structure.'
    }
  ];

  /* ============ 民俗文化：culture1—31 ============ */
  D.cultures = [
    {
      id: 'culture-1', n: 1, name: '绥米唢呐', nameEn: 'Sui-Mi Suona', city: '榆林', cityId: 'yulin', location: '绥德县 · 米脂县', locationEn: 'Suide · Mizhi',
      img: './image/culture1.jpg',
      desc: '别处的唢呐是乐器，绥米唢呐是陕北人日子的开关。红白喜事、过年闹秧歌，没有它，事就不算“过”了。它的独一份首先写在形制上：杆比别处更长，碗更大，哨片由薄片改成布袋状，声音被放大得高亢洪亮，能穿透沟峁，传到对面山梁。米脂常石畔村的“常氏唢呐世家”八代相传，2008 年绥米唢呐入选第一批国家级非物质文化遗产扩展项目名录。它不婉转，不收敛，是把黄土地上人对生的热烈、对死的悲恸，一口气吹到天上。',
      descEn: 'Elsewhere the suona is an instrument; here it is the switch that starts and ends a life. Longer shafts, larger bells and a bag-shaped reed give it a sound that carries across the gullies to the next ridge. The Chang family of Mizhi has played it for eight generations.'
    },
    {
      id: 'culture-2', n: 2, name: '横山老腰鼓', nameEn: 'Hengshan Old Waist Drum', city: '榆林', cityId: 'yulin', location: '横山区', locationEn: 'Hengshan',
      img: './image/culture2.jpg',
      desc: '横山老腰鼓的“独一份”，在于它把黄土地本身当成了鼓面。横山地处毛乌素沙地与黄土高原之间，人是听着腰鼓声长大的，鼓点早已嵌进川梁沟峁里。它的动作里没有轻盈，全是“二起脚”“鹞子翻身”“三脚不落地”这类腾空、劈叉、高抬腿的硬功夫，讲究快而不断、狂而不乱，带一股“不服输的劲儿”。2008 年入选第二批国家级非物质文化遗产名录。传承人说，过去这是“苦的艺术”——在黄土地上讨生活的人，用腰鼓忘情呐喊、向天而歌。',
      descEn: 'Between the Mu Us Desert and the loess plateau, the drumbeat is part of the landscape. No lightness here: leaps, splits and airborne kicks, fast but unbroken, wild but never chaotic — “the art of hardship”, people singing at the sky.'
    },
    {
      id: 'culture-3', n: 3, name: '绥德转九曲', nameEn: 'Suide Nine-Bend Lantern Maze', city: '榆林', cityId: 'yulin', location: '绥德县', locationEn: 'Suide',
      img: './image/culture3.jpg',
      desc: '转九曲（又名转灯）是榆林年节里最安静也最震撼的习俗。人们用 367 根高粱秆在空地上布设一座九曲黄河阵，阵内设九道星宿门，点亮 365 盏灯，象征全年天数。入夜后，秧歌队引路，人们持香走入灯阵，缓缓穿行，把这一年的路“走顺”。阵中还藏着一样别处少见的细节：“偷灯”——想添丁的年轻媳妇悄悄取走一盏灯，绿灯寓女，红灯寓子，守灯人不但不拦，反而高声喊着“偷灯养小子哩”。走完一圈，才算把日子走进了亮处。',
      descEn: 'On New Year nights a maze of 367 sorghum stalks is laid out with nine star gates and 365 lamps, one for each day of the year. Guided by a yangge troupe, villagers walk it with incense to “set the year straight” — and young wives quietly steal a lamp, green for a girl, red for a boy.'
    },
    {
      id: 'culture-4', n: 4, name: '陕北说书', nameEn: 'Northern Shaanxi Storytelling', city: '延安', cityId: 'yanan', location: '陕北地区', locationEn: 'Northern Shaanxi',
      img: './image/culture4.jpg',
      desc: '陕北说书的独一份，在于它最初是穷苦盲人用来谋生的口传艺术，用民歌小调说唱传说故事，后来才吸收眉户、秦腔、道情与信天游的曲调，长成了一门独立的曲艺。艺人手弹三弦或琵琶，腿缚甩板，说唱相间。20 世纪三四十年代，韩起祥等人把它推到极致：一人同时操用大三弦、梆子、耍板、“麻喳喳”和小锣五种乐器，手脚口并用，满台声响皆出一人。素有“九腔十八调”之称，2006 年列入第一批国家级非物质文化遗产名录。',
      descEn: 'Born as a trade for blind storytellers, it grew into a full art form drawing on folk song, Meihu, Qinqiang and Xintianyou. One performer works a sanxian, clappers, shuaiban board, pellet drum and gong at once — an entire orchestra from a single body.'
    },
    {
      id: 'culture-5', n: 5, name: '安塞腰鼓', nameEn: 'Ansai Waist Drum', city: '延安', cityId: 'yanan', location: '安塞区', locationEn: 'Ansai',
      img: './image/culture5.jpg',
      desc: '安塞腰鼓的独一份，是把黄土地上的性格直接擂进了鼓点里。它分文鼓与武鼓：文鼓以扭为主，重扭轻打；武鼓以打为主，重打轻扭，踢打腾跃，动作威猛刚烈。表演讲究“六劲”——摇头晃脑有股能劲，挥槌有股狠劲，踢腿有股蛮劲，转身有股猛劲，跳跃有股虎劲，全身使出一股牛劲。它把舞蹈、武术、体操、打击乐于一炉，快放快收，刚柔并济，2006 年列入第一批国家级非物质文化遗产名录。',
      descEn: 'The character of the loess plateau drummed straight into rhythm: civil and martial styles, the martial one all kicks, leaps and swings. Six kinds of force — a twisting neck, a fierce mallet, a wild leg, a sudden turn, a tiger’s jump, an ox’s whole body.'
    },
    {
      id: 'culture-6', n: 6, name: '弦板腔', nameEn: 'Xianban Qiang Opera', city: '咸阳', cityId: 'xianyang', location: '乾县 · 礼泉 · 兴平', locationEn: 'Qianxian · Liquan · Xingping',
      img: './image/culture6.jpg',
      desc: '弦板腔是国家级非物质文化遗产，又称板板腔，流行于咸阳乾县、礼泉、兴平等关中地区，脱胎于西路皮影说唱。据《乾县县志》记载，该剧种起源于宋代，由民间“隔帘说书”发展而来，源头可追溯至宋代。它因以二弦、三弦等弦乐与蚱板、二板伴奏而得名，唱腔刚柔兼具，既高亢悲壮，又婉转清丽，乡土韵味浓厚。早期多依托皮影演出，1957 年乾县首次以真人登台取代皮影，此后搬上大戏舞台，剧目多取材历史演义与民间故事。2006 年列入第一批国家级非物质文化遗产名录。',
      descEn: 'A national intangible heritage genre from the western Guanzhong plain, descended from shadow-puppet narrative singing of the Song. Named for its two- and three-string fiddles with clapper boards, it moved from behind the screen onto a live stage in the 1950s.'
    },
    {
      id: 'culture-7', n: 7, name: '咸阳茯茶制作技艺', nameEn: 'Fu Brick Tea Making', city: '咸阳', cityId: 'xianyang', location: '泾阳县', locationEn: 'Jingyang',
      img: './image/culture7.jpg',
      desc: '咸阳茯茶制作技艺是国家级非物质文化遗产，也是人类非物质文化遗产“中国传统制茶技艺及其相关习俗”子项目，流传于咸阳泾阳等地，兴起于明代，是古丝绸之路上重要的制茶技艺。茯茶属于紧压黑茶，核心特色是经发酵后自然长出“金花”，即冠突散囊菌。整套技艺包含渥堆、炒茶、筑茶、锥封、自然发花等多道工序。古时作为官茶沿丝路流通，是中原与西北物资文化交流的载体。',
      descEn: 'A national heritage craft and part of UNESCO’s listing of Chinese tea traditions. This compressed dark tea is defined by the golden “flowers” — Eurotium cristatum — that grow inside it during fermentation, a process of piling, panning, pressing, sealing and natural blooming that dates to the Ming.'
    },
    {
      id: 'culture-8', n: 8, name: '同官奇石艺术', nameEn: 'Tongguan Scholar’s Stones', city: '铜川', cityId: 'tongchuan', location: '印台区', locationEn: 'Yintai',
      img: './image/culture8.jpg',
      desc: '同官奇石艺术的主要载体是产自现印台区及其周边地区的奇石，现称为陈炉石。质地坚硬，形态多变，具备天然浮雕效果或丰富的纹理层次。在立足奇石本来面貌的基础上，在采集、加工、置景、赏析等各个环节，充分发挥人的主观能动性，使其成为一种具有深沉寄托，能够陶冶情操、净化心灵的文化载体。',
      descEn: 'Built on the scholar’s stones of Yintai and its surroundings, now called Chenlu stone: hard, varied in form, naturally relief-like or richly veined. Collecting, working, setting and reading them turns stone into a quiet discipline of the mind.'
    },
    {
      id: 'culture-9', n: 9, name: '八大院葫芦', nameEn: 'Badayuan Gourd Carving', city: '铜川', cityId: 'tongchuan', location: '印台区', locationEn: 'Yintai',
      img: './image/culture9.jpg',
      desc: '八大院葫芦采用烙绘、雕刻、镂空、镶嵌相结合的方式，制作出造型丰富、寓意祥瑞的葫芦作品。雕绘采用烙笔、刻刀、锉刀、锯、钻、镊子、掏勾、砂纸等十多种工具。烙绘分勾线和晕化两种技法；雕刻分浅雕和深雕两种，有针刻、切刻、冲刻、铲刻等不同技法；镂空用刻刀和钻头雕透、用锉刀打磨细节，是一项特色鲜明的民间技艺。',
      descEn: 'Gourds worked with pyrography, carving, openwork and inlay using a dozen or more tools. Burning splits into outlining and shading, carving into shallow and deep with needle, cut, punch and scoop strokes — small objects holding a whole vocabulary of technique.'
    },
    {
      id: 'culture-10', n: 10, name: '华州皮影', nameEn: 'Huazhou Shadow Puppetry', city: '渭南', cityId: 'weinan', location: '华州区', locationEn: 'Huazhou',
      img: './image/culture10.jpg',
      desc: '华州皮影是国家级非遗，也是世界人类非物质文化遗产，起源久远，兴盛于唐宋。皮影制作包含选皮制皮、画稿雕刻、染色熨烫等二十余道工序，雕刻工艺极其精细，发丝般纤细的纹路也能够清晰呈现。表演时借灯光投射影人剪影来演绎故事，“一口诉说天下事，双手对舞百万兵”，造型优美、色彩厚重，享有“中华一绝”的美誉，是陕西极具代表性的光影戏曲艺术，被视作世界电影艺术的源头之一。',
      descEn: 'A national and world intangible heritage, flourishing in the Tang and Song. More than twenty processes — selecting and curing hide, drawing, carving, dyeing, pressing — produce lines as fine as hair. Lit from behind, one voice narrates the world while two hands command a million soldiers.'
    },
    {
      id: 'culture-11', n: 11, name: '合阳提线木偶', nameEn: 'Heyang Marionette', city: '渭南', cityId: 'weinan', location: '合阳县', locationEn: 'Heyang',
      img: './image/culture11.jpg',
      desc: '合阳提线木偶戏俗称线戏、线胡，是国家级非遗，也是我国北方地区独有的提线木偶剧种，相传起于汉、兴于唐、盛于明清。偶头造型带有鲜明唐俑风格，是该技艺的核心特色。木偶依靠多根提线操控，艺人运用提、拨、勾、挑等丰富手法，赋予木偶灵动的动作，演绎完整戏曲故事。作为北方傀儡戏的珍贵遗存，它保存着古老的唱腔与剧目。',
      descEn: 'The only string-puppet theatre of its kind in northern China, said to begin in the Han and peak in the Tang and Ming–Qing. Its puppet heads carry the look of Tang figurines; dozens of strings, worked by lift, pluck, hook and flick, give them a startling liveliness.'
    },
    {
      id: 'culture-12', n: 12, name: '凤翔泥塑', nameEn: 'Fengxiang Clay Sculpture', city: '宝鸡', cityId: 'baoji', location: '凤翔区六营村', locationEn: 'Liuying, Fengxiang',
      img: './image/culture12.jpg',
      desc: '凤翔泥塑是国家级非物质文化遗产，产自凤翔六营村。匠人就地取材，以泥土捏塑成型，再施以浓艳饱满的彩绘，造型稚拙夸张、生动鲜活。猛虎是最经典的形象，纹饰繁复热烈，色彩对比鲜明，承载着关中百姓驱邪纳福的美好祈愿。如今这门古老手艺不断创新，衍生出摆件、冰箱贴等多样文创。',
      descEn: 'From Liuying village, shaped from local clay and painted in saturated colour. The tiger is the classic figure: complex patterns, sharp contrasts, made to drive off harm and invite good fortune. Today the craft extends into ornaments and magnets.'
    },
    {
      id: 'culture-13', n: 13, name: '西秦刺绣', nameEn: 'Xiqin Embroidery', city: '宝鸡', cityId: 'baoji', location: '千阳县', locationEn: 'Qianyang',
      img: './image/culture13.jpg',
      desc: '西秦刺绣是宝鸡国家级非物质文化遗产，根植于西府大地，渊源可追溯至先秦。绣品多以平绣为主，针脚细密扎实，配色浓郁鲜活，题材常取瑞兽花鸟、五毒虎头，寄托祈福平安的美好心愿。一针一线饱含关中妇女的巧思，古朴热烈又充满生命力。如今这项指尖技艺不断创新，衍生香包、布艺挂件、刺绣配饰等文创。',
      descEn: 'Rooted in the western Guanzhong plain since before the Qin. Mostly flat stitch — dense, firm, vividly coloured — with auspicious beasts, birds and flowers, and the five-poisons tiger head for protection. Now it reappears as sachets, hangings and accessories.'
    },
    {
      id: 'culture-14', n: 14, name: '宝鸡民间社火', nameEn: 'Baoji Shehuo Festival', city: '宝鸡', cityId: 'baoji', location: '陇州一带', locationEn: 'Longzhou',
      img: './image/culture14.jpg',
      desc: '宝鸡民间社火是国家级非物质文化遗产，是西府地区流传千年的节庆游演民俗，尤以陇州社火最为出名。每逢新春佳节，高芯、背社火、脸谱巡游轮番上演，装扮者身着艳丽戏服，凭借精巧的造型装置凌空而立，场面恢弘热烈。社火脸谱是它最鲜明的符号，红表忠勇、黑显刚直，色彩浓烈夸张，一笔一画勾勒出神话与戏曲人物。',
      descEn: 'A thousand-year-old New Year procession, most famous at Longzhou. Costumed performers are lifted into the air on hidden frames; the painted faces are its signature — red for loyalty and courage, black for integrity, drawn in bold strokes.'
    },
    {
      id: 'culture-15', n: 15, name: '西安鼓乐', nameEn: 'Xi’an Drum Music', city: '西安', cityId: 'xian', location: '西安市及周边', locationEn: 'Xi’an and around',
      img: './image/culture15.jpg',
      desc: '西安鼓乐，又称“长安古乐”，是流传于西安及周边地区的大型民间吹打乐种。其历史可追溯至唐代，源于唐代宫廷燕乐，后随宫廷乐师流落民间而逐渐演变为民间音乐，保留了唐代大曲的结构特征，被誉为“中国古代音乐的活化石”。结构庞大、曲目丰富，分“坐乐”和“行乐”两种演奏形式，有僧、道、俗三派之分。乐谱沿用古老的工尺谱（俗字谱），2006 年列入第一批国家级非物质文化遗产名录，2009 年列入人类非物质文化遗产代表作名录。',
      descEn: 'Court banquet music of the Tang that survived in the hands of musicians outside the palace, keeping the structure of Tang “great suites”. Performed seated or in procession by Buddhist, Taoist and lay schools, notated in old gongche tablature — a living fossil of Chinese music.'
    },
    {
      id: 'culture-16', n: 16, name: '秦腔', nameEn: 'Qinqiang Opera', city: '西安', cityId: 'xian', location: '关中地区', locationEn: 'Guanzhong',
      img: './image/culture16.jpg',
      desc: '秦腔是国家级非物质文化遗产，是我国梆子腔剧种的鼻祖，因发源于陕西关中古秦地而得名，主要流行于陕、甘、宁、青、新等西北区域。秦腔历史悠久，雏形可追溯至先秦，成熟于明代，清代广为流传，直接催生了京剧、豫剧等诸多地方剧种。唱腔以高亢激越、慷慨悲壮为特色，分欢音、苦音两种声腔，苦音凄婉深沉，欢音明快爽朗。文场以板胡为主奏乐器。',
      descEn: 'The ancestor of all clapper opera in China, maturing in the Ming and giving rise to Peking and Henan opera. Its voice is high and vehement, divided into joyful and bitter modes; the banhu fiddle leads the ensemble. Xi’an’s Yisu and Sanyi troupes remain its strongholds.'
    },
    {
      id: 'culture-17', n: 17, name: '洛南静板书', nameEn: 'Luonan Static-Board Storytelling', city: '商洛', cityId: 'shangluo', location: '洛南县', locationEn: 'Luonan',
      img: './image/culture17.jpg',
      desc: '洛南静板书是国家级非物质文化遗产，至迟在清道光年间（约 1821 年）即在洛南乡野盛行，民间俗称洛南说书。艺人一身兼数艺，怀抱三弦，手脚协同操控锣、镲、梆子诸般乐器，一人便可自成一台说唱，素有“一人顶七人”之说。书目多取材于历史演义、乡土逸闻，语言质朴通俗，旧时多由盲艺人踏遍乡陌、走村传唱。2010 年列入第三批国家级非物质文化遗产代表性项目名录（Ⅴ-111）。',
      descEn: 'Since the Daoguang era, storytellers here have carried a sanxian and worked gongs, cymbals and clappers with hands and feet at once — one person as a whole stage. The repertoire comes from historical romance and village anecdote, once carried from hamlet to hamlet by blind performers.'
    },
    {
      id: 'culture-18', n: 18, name: '商洛花鼓', nameEn: 'Shangluo Flower-Drum Opera', city: '商洛', cityId: 'shangluo', location: '商州区', locationEn: 'Shangzhou',
      img: './image/culture18.jpg',
      desc: '商洛花鼓，民间亦称花鼓子、地蹦子，属国家级非物质文化遗产。清光绪三年（1877）湖北郧阳遭水灾，大批灾民进入商洛，把当地流行的花鼓戏一并带来，后改用商洛方言演唱，又吸收本地民歌小调，才渐渐定型。它分商丹、镇柞两大流派，表演载歌载舞，曲调轻快婉转，乡土意韵浓郁；剧目多诉说市井民间的悲欢故事，常在庙会佳节登台献艺，见证秦楚交界多元文脉的交融共生。2006 年列入第一批国家级非物质文化遗产代表性项目名录。',
      descEn: 'Brought by migrants from Huguang in the Qing and blended with local mountain songs. Two schools, Shangdan and Zhenzha; sung and danced, light and lilting, its plays tell of ordinary joys and sorrows at temple fairs and festivals.'
    },
    {
      id: 'culture-19', n: 19, name: '柞水渔鼓', nameEn: 'Zhashui Fishing-Drum', city: '商洛', cityId: 'shangluo', location: '柞水县', locationEn: 'Zhashui',
      img: './image/culture19.jpg',
      desc: '柞水渔鼓，亦名渔鼓道情，为陕西省省级非物质文化遗产。明末清初，它随湖广移民辗转迁入柞水，融汇本土乡音与山间民歌，慢慢衍化而成。演奏以竹渔鼓筒、简板、小镲伴和，唱腔舒缓悠远，兼有楚地婉转风韵与秦岭山野清旷气息。传统曲目多取材于道情典故、乡野传说，往昔常于乡间红白礼俗、庙会盛会传唱，2011 年列入陕西省第三批省级非物质文化遗产名录。',
      descEn: 'Also called fishing-drum daoqing, arriving with Huguang migrants in the late Ming and early Qing. A bamboo drum, clappers and small cymbals accompany a slow, far-carrying voice that holds both Chu sweetness and Qinling openness.'
    },
    {
      id: 'culture-20', n: 20, name: '宁强羌绣', nameEn: 'Ningqiang Qiang Embroidery', city: '汉中', cityId: 'hanzhong', location: '宁强县', locationEn: 'Ningqiang',
      img: './image/culture20.jpg',
      desc: '宁强羌绣为陕西省省级非物质文化遗产，源自宁强羌族世代赓续的刺绣技艺，深深植根于秦巴山地的羌族民俗沃土。绣娘多不循底稿、随心运针，将山川灵趣、珍禽瑞兽与吉祥纹样凝于丝线之间，配色明艳热烈、生机盎然。羌绣常饰于民族衣装、婚嫁佩饰，融入羌族大大小小的民俗仪典，一针一线，寄寓着羌族民众敬畏自然、祈愿安康美好的质朴心愿。',
      descEn: 'The embroidery of the Qiang community in Ningqiang, worked without a drawn pattern, straight from the needle. Birds, beasts and auspicious motifs in bright, living colour, worn on festival dress and wedding pieces.'
    },
    {
      id: 'culture-21', n: 21, name: '西乡藤编', nameEn: 'Xixiang Rattan Weaving', city: '汉中', cityId: 'hanzhong', location: '西乡县 · 南郑区', locationEn: 'Xixiang · Nanzheng',
      img: './image/culture21.jpg',
      desc: '汉中藤编为国家级非物质文化遗产，文脉可溯至三国，在西乡、南郑的乡野间代代传续。匠人采撷深山原生青藤，历经选藤、浸藤、削藤、编结、打磨等二十余道工序，织就日用器物与雅致摆件。成品柔韧通透、形制古雅，融实用之利与自然之美于一体，承载着秦巴先民积淀已久的农耕智慧，是陕南草木手工艺的典范，2021 年入选第五批国家级非物质文化遗产代表性项目名录。',
      descEn: 'Traced back to the Three Kingdoms period and carried on in Xixiang and Nanzheng. Wild green rattan is cut, soaked, split, woven and polished through more than twenty steps into vessels and objects — flexible, translucent, quietly elegant.'
    },
    {
      id: 'culture-22', n: 22, name: '汉调桄桄', nameEn: 'Handiao Guangguang Opera', city: '汉中', cityId: 'hanzhong', location: '南郑区', locationEn: 'Nanzheng',
      img: './image/culture22.jpg',
      desc: '汉调桄桄，民间亦称南路秦腔，为国家级非物质文化遗产。明末秦腔循古道传入汉中，融汇汉水方言与山野山歌小调，慢慢演化成这一曲种。艺人以梆子定拍起韵，行当完备，唱腔高亢苍劲、沉郁苍凉，剧目浩繁；往昔戏台星罗于汉中乡城，声韵远播川北、鄂西。它常献演于庙会佳节，承载着陕南乡土独有的审美意趣与民俗记忆，被誉为汉水流域的戏曲活化石。',
      descEn: 'Southern-road Qinqiang: brought along the old roads in the late Ming and reshaped by Han River dialect and mountain song. A wooden clapper sets the beat, the voice is high, gaunt and desolate, and its stages once spread as far as northern Sichuan and western Hubei.'
    },
    {
      id: 'culture-23', n: 23, name: '鎏金铜蚕', nameEn: 'Gilt Bronze Silkworm', city: '安康', cityId: 'ankang', location: '石泉县', locationEn: 'Shiquan',
      img: './image/culture23.jpg',
      desc: '鎏金铜蚕为汉代国家一级文物，1984 年出土于安康石泉池河镇谭家湾，当地村民谭福全在河滩淘金时偶然发现，他拒绝高价收购，无偿将这件国宝上交，现收藏于陕西历史博物馆。器物通体鎏金，体态呈昂首吐丝之姿，九道腹节清晰分明，胸、腹、尾足俱全，造型栩栩如生。石泉自古便是陕南蚕桑重地，这件文物印证了早在汉代秦巴山区的养蚕缫丝产业已十分兴盛。如今以它为 IP 衍生出铜蚕摆件、丝绸配饰等文创。',
      descEn: 'A first-class Han relic found in 1984 by a villager panning for gold at Chihe, who refused buyers and gave it to the state. Gilt all over, head raised as if spinning silk, nine segments clearly cut — proof that sericulture thrived in the Qinba mountains two thousand years ago.'
    },
    {
      id: 'culture-24', n: 24, name: '汉调二黄', nameEn: 'Handiao Erhuang Opera', city: '安康', cityId: 'ankang', location: '汉水流域', locationEn: 'Han River Valley',
      img: './image/culture24.jpg',
      desc: '汉调二黄，又称陕二黄、山二黄，是根植于陕南汉水流域的古老地方戏曲，也是陕西第二大剧种、京剧声腔重要源头之一。它起源于汉江两岸的山野民歌、田间小调与劳动号子，历经百年演变，融合秦腔高亢、昆曲婉转的唱腔特色，结合陕南方言自成一派。因旧时戏班以双竹笛配簧伴奏，故称“二黄”。其唱腔分为西皮、二黄两大声腔，曲调刚柔并济，既可高亢苍劲、诉说家国大义，亦可婉转轻柔、演绎市井人情。',
      descEn: 'The second major opera of Shaanxi and one of the sources of Peking opera’s vocal style. Grown from riverbank work songs and field tunes, it blends Qinqiang force with Kunqu smoothness, and divides into xipi and erhuang modes.'
    },
    {
      id: 'culture-25', n: 25, name: '平利生漆', nameEn: 'Pingli Raw Lacquer', city: '安康', cityId: 'ankang', location: '平利县', locationEn: 'Pingli',
      img: './image/culture25.jpg',
      desc: '平利被誉为“中国漆树之乡”，出产的牛王生漆古时被《本草纲目》称作金州金漆，技艺传承已有五百年之久。秦巴深山之中流传着“百里千刀一斤漆”的说法，漆树生长八年方可采割，漆农进山一刀一刀收取漆液，得来极为不易。匠人取天然生漆，经过炼漆、刮灰、多层髹涂、反复打磨推光等数十道工序，辅以变涂、描金、堆漆、螺钿等技法，最终得到温润透亮的漆器。',
      descEn: 'Known as China’s home of the lacquer tree. “A hundred li and a thousand cuts for one catty of lacquer”: trees must grow eight years before tapping. Refining, layering, burnishing and inlay turn the sap into vessels that glow like water.'
    },
    {
      id: 'culture-26', n: 26, name: '张骞传说', nameEn: 'The Legend of Zhang Qian', city: '城固', cityId: 'chenggu', location: '博望街道', locationEn: 'Bowang',
      img: './image/culture26.jpg',
      desc: '张骞是城固博望村人，西汉丝绸之路开拓者。张骞传说世代口耳相传，承载丝路开拓的精神内核，对应的张骞墓是陕南唯一世界文化遗产。民间文学类别的张骞传说，把两次出使西域的艰险、十三年羁留与持节不失的气节，讲成了这片土地上最持久的故事。',
      descEn: 'Zhang Qian, born at Bowang in Chenggu, opened the road west for the Han. His story — two missions, thirteen years in exile, never surrendering his envoy’s staff — has been told here from mouth to mouth for two thousand years. His tomb is southern Shaanxi’s only World Heritage site.'
    },
    {
      id: 'culture-27', n: 27, name: '城固架花', nameEn: 'Chenggu Cross-Stitch', city: '城固', cityId: 'chenggu', location: '湑水 · 汉江两岸', locationEn: 'Xu and Han Rivers',
      img: './image/culture27.jpg',
      desc: '城固架花，又称挑花，是流传两千余年的陕西省非物质文化遗产，盛传于湑水与汉江两岸，自古便有“城固有女皆架花”的民间美谈。它与普通刺绣不同，刺绣重刺，架花重架，以本土家织土布为底，取天然染料染制的棉线丝线，顺着布料经纬网格挑绣而成，精品更能做到正反两面纹样完全一致，错一针便会破坏整幅构图。构图擅长花中套花、叠加对称的“花包花”手法。',
      descEn: 'Also called picked-flower work: not stitching onto cloth but building pattern along the warp and weft of homespun. Counted so strictly that one wrong stitch ruins the whole design, the finest pieces are identical front and back — “in Chenggu every daughter works flowers.”'
    },
    {
      id: 'culture-28', n: 28, name: '城固泥塑', nameEn: 'Chenggu Clay Sculpture', city: '城固', cityId: 'chenggu', location: '城固县', locationEn: 'Chenggu',
      img: './image/culture28.jpg',
      desc: '城固泥塑历史久远，题材包含民俗、神话人物，造型质朴粗粝，保留民间手工塑造的质感。取本地细腻黏土为原料，经揉泥、塑型、修坯、彩绘多道工序手工成型。不同于其他地域泥塑的浓烈夸张，城固泥塑自带陕南温润气质，造型朴拙饱满、色彩柔和明快，既有财神、福娃、瑞兽，也有戏曲人物与乡野农事。',
      descEn: 'Local fine clay kneaded, shaped, trimmed and painted by hand. Compared with the loud exaggeration of other regions, Chenggu clay keeps a southern Shaanxi softness: round, plain forms and gentle, bright colour.'
    },
    {
      id: 'culture-29', n: 29, name: '二鬼打架', nameEn: 'Two Ghosts Wrestling', city: '城固', cityId: 'chenggu', location: '城固县', locationEn: 'Chenggu',
      img: './image/culture29.jpg',
      desc: '二鬼打架是城固极具趣味性的传统民俗舞蹈，单人操控两个假人模拟摔跤打斗，构思巧妙。表演者藏身于两个偶人之间，以腰、臂、腿同时操纵，两个“鬼”便缠抱、翻滚、推搡，难分难解，观者常以为真有两人相搏。旧时多在庙会、年节街头演出，是陕南民间偶戏中颇为独特的一支。',
      descEn: 'One performer, two puppets, a wrestling match. Hidden between the figures, the player works waist, arms and legs at once so the two “ghosts” grapple, roll and shove until onlookers forget there is only one person inside.'
    },
    {
      id: 'culture-30', n: 30, name: '城固木雕技艺', nameEn: 'Chenggu Woodcarving', city: '城固', cityId: 'chenggu', location: '城固县', locationEn: 'Chenggu',
      img: './image/culture30.jpg',
      desc: '城固传统木雕，多用于民居、家具构件雕刻，纹样多取自民俗吉祥图案。旧时用于门窗、梁枋、神龛、床榻与箱柜，刀法以浅浮雕与透雕为主，讲究层次与光影。图案常见缠枝花卉、瑞兽、戏曲人物与“福寿”字样，既承实用之责，也是旧时人家身份与审美的标记。',
      descEn: 'Traditional carving for houses and furniture — doors, beams, shrines, beds and chests — mostly shallow relief and openwork. Vine scrolls, auspicious beasts, opera scenes and characters for fortune and long life mark both use and status.'
    },
    {
      id: 'culture-31', n: 31, name: '城固喜馍', nameEn: 'Chenggu Wedding Buns', city: '城固', cityId: 'chenggu', location: '城固县', locationEn: 'Chenggu',
      img: './image/culture31.jpg',
      desc: '城固喜馍是手工塑形的面点，制作成寿桃、石榴、生肖等吉祥造型，多用于婚嫁、贺寿、祭祀等民俗活动。以发面塑形、点彩装饰，蒸熟后饱满挺立，色彩明艳。寿桃寓长寿，石榴寓多子，生肖应年份，一套喜馍往往就是一场仪式的说明书，也是陕南面食民俗中最热闹的一页。',
      descEn: 'Hand-shaped steamed buns for weddings, birthdays and offerings: peaches for long life, pomegranates for many children, zodiac animals for the year. Raised, modelled, painted and steamed, a set of them is a script for the ceremony itself.'
    }
  ];

  /* ============ 特色美食：food1—34（27/30/32/34 为视频，挂在对应菜品上） ============ */
  D.foods = [
    {
      id: 'food-1', n: 1, name: '拼三鲜', nameEn: 'Pinsanxian Assorted Bowl', city: '榆林', cityId: 'yulin', location: '榆林市', locationEn: 'Yulin',
      img: './image/food1.jpg',
      desc: '名字叫“三鲜”，阵仗远不止三样。猪肉拆成烧肉、炸丸子、酥肉，配羊肉、鸡肉，再加炸土豆片、粉皮、黄花、木耳等十余种辅料，煮烧炸蒸烩轮番上阵，二十多道工序才成一锅。高汤用猪羊鸡同锅慢熬，汤色温润了才汇入各路食材，杂而不乱，厚而不重。它最早见于清军西征的军营筵席，后落回榆林红白喜事的席面，成了雷打不动的压轴大菜。2012 年，制作技艺列入陕西省非物质文化遗产名录。',
      descEn: '“Three fresh” is a modest name for a dish that can hold a dozen ingredients: pork in three forms, lamb, chicken, fried potato, sheets of bean starch, lily buds and wood ear, through twenty-odd steps. It began in Qing army banquets and ended up the fixed finale of every Yulin wedding or funeral feast.'
    },
    {
      id: 'food-2', n: 2, name: '羊肉面', nameEn: 'Mutton Noodles', city: '榆林', cityId: 'yulin', location: '绥德县', locationEn: 'Suide',
      img: './image/food2.jpg',
      desc: '“米脂的婆姨绥德的汉，清涧的石板瓦窑堡的炭，四十里铺的羊肉面。”一句民谣，把这碗面唱进了榆林人的骨子里。绥德羊肉面以手工面配炖煮羊肉汤为底，面型有揪面片，也有饸饹，厚薄均匀，筋道爽滑。羊肉选本地山地山羊，慢火熬到酥烂，汤色乳白，鲜而不膻，出锅前撒一把新鲜红葱与香菜，是整碗面的魂。在榆林，它不止是一碗面，是游子归家最先想起的那口味道。',
      descEn: 'A local rhyme sings it into the bones: “Mizhi wives, Suide men, Qingjian slate, Wayaoopu coal — and the lamb noodles of Sishilipu.” Hand-pulled or pressed noodles under a milky broth of slow-stewed mountain goat, finished with red scallion and coriander.'
    },
    {
      id: 'food-3', n: 3, name: '羊杂碎', nameEn: 'Sheep Offal Soup', city: '榆林', cityId: 'yulin', location: '榆林市', locationEn: 'Yulin',
      img: './image/food3.jpg',
      desc: '榆林人的一天，从一碗滚烫的羊杂碎开始。凌晨三点开熬的“头锅汤”，羊头、脊骨与心肝肺肚肠冷水下锅，文火炖足四小时，汤色乳白。碗里一勺杂、两勺汤，抓把焦脆土豆丝和粉条，淋辣油撒香菜，酸辣鲜香直冲鼻腔。羊杂碎制作技艺已列入陕西省非物质文化遗产名录。榆林人说得直白：“一碗羊杂碎，半世还魂汤。”',
      descEn: 'A Yulin day starts with a scalding bowl of it. The first pot goes on at three in the morning — head, spine, heart, liver, lungs and tripe simmered four hours to a milky broth, then potato threads, vermicelli, chilli oil and coriander. “One bowl of offal soup, half a lifetime of resurrection.”'
    },
    {
      id: 'food-4', n: 4, name: '子长煎饼', nameEn: 'Zichang Pancake', city: '延安', cityId: 'yanan', location: '子长市', locationEn: 'Zichang',
      img: './image/food4.jpg',
      desc: '荞麦磨糁、泉水泡揉成糊，一勺浇上铁鏊，不到三秒便揭起一张薄如蝉翼、色白透亮的煎饼。小煎饼不过手掌大，卷入卤水豆腐干，浇上米醋、蒜汁、辣油调和的汤汁，酸辣开胃；再配一碗泉水蒜泥米醋调的“子长啤酒”，清凉解腻。这张饼始于元末明初，原是行军干粮，清代传入民间，如今已是省级非遗。',
      descEn: 'Buckwheat batter spread on a hot iron plate and lifted in three seconds: thin as a cicada’s wing, no bigger than a palm. Rolled around brined tofu and dressed with vinegar, garlic and chilli, with a bowl of garlicky “Zichang beer” alongside. Once army rations, now a provincial heritage snack.'
    },
    {
      id: 'food-5', n: 5, name: '延安沾沾', nameEn: 'Yan’an Dipping Skewers', city: '延安', cityId: 'yanan', location: '延安市', locationEn: 'Yan’an',
      img: './image/food5.jpg',
      desc: '延安沾沾被食客叫作“无油小火锅”——锅底不放一滴油，只用孜然、辣椒面、小茴香等香料粉加清水熬开，咕嘟冒泡，老远就闻到一股张扬的孜然香。吃法分热沾沾和凉沾沾：热沾沾围着小铁锅边煮边吃，近百种荤素小串随涮随蘸；凉沾沾则是菜品提前卤熟，直接往凉汤里一“沾”一“提”，酸香清爽。蘸料是灵魂，标配三碗——醋泡蒜解腻，酸辣凉汤开胃，芝麻酱醇厚。',
      descEn: 'An “oil-free hotpot”: cumin, chilli powder and fennel boiled in water, no fat at all. Either hot — dozens of skewers cooked and dipped at the table — or cold, where pre-braised items are dunked in a cool sour broth. Three dipping bowls are standard: vinegar garlic, sour-chilli broth and sesame paste.'
    },
    {
      id: 'food-6', n: 6, name: '洋芋擦擦', nameEn: 'Grated Potato Steamed', city: '延安', cityId: 'yanan', location: '延安市', locationEn: 'Yan’an',
      img: './image/food6.jpg',
      desc: '土豆去皮，用陕北人家特制的“擦子”擦成宽窄均匀的细条，清水淘去表面淀粉，裹上一层面粉，上笼蒸透。出锅时松散不粘，土豆的沙糯被面粉轻轻兜住，绵软里还带着一点嚼头。吃法就两条路：凉拌，蒜末、辣椒面、现炒的西红柿酱一浇，酸辣直冲；爆炒，配鸡蛋、青椒、肉末回锅，油香裹着薯香。它原本是粮食短缺年代拿土豆顶粮的“救命饭”，如今却成了延安人一年四季离不开的日常主食。',
      descEn: 'Potatoes grated into even strands, rinsed, tossed with flour and steamed loose. Eaten cold with garlic, chilli and fresh tomato sauce, or stir-fried with egg, pepper and minced pork. Once famine food when grain ran short, now an everyday staple.'
    },
    {
      id: 'food-7', n: 7, name: '咸阳琥珀糖', nameEn: 'Xianyang Amber Candy', city: '咸阳', cityId: 'xianyang', location: '咸阳市', locationEn: 'Xianyang',
      img: './image/food7.jpg',
      desc: '咸阳琥珀糖原名虎皮糖，是陕西省非物质文化遗产，相传起源于明末清初。它以小米饴糖为主料，搭配核桃仁、陈皮、生姜等辅料熬制而成，色泽金黄通透，状如琥珀，故而得名。传说慈禧途经咸阳时食用后称赞其佳，琥珀糖由此声名远扬。琥珀糖香甜酥脆，兼具润喉化痰的食疗作用，承载着关中传统食养文化。',
      descEn: 'Formerly “tiger-skin candy”, made from millet malt syrup with walnut, dried orange peel and ginger. Golden and translucent as amber, crisp and sweet, and traditionally taken to soothe the throat.'
    },
    {
      id: 'food-8', n: 8, name: '倪家大锅盔', nameEn: 'Ni Family Great Guokui', city: '咸阳', cityId: 'xianyang', location: '武功县', locationEn: 'Wugong',
      img: './image/food8.jpg',
      desc: '倪家大锅盔是咸阳武功特色非遗美食，扎根关中农耕文化，有着数百年传承历史。它选用优质小麦面粉，经起面、压面、文火慢烤等多道古法工序制作，形如圆盖，表皮布满自然裂纹，层次分明。大锅盔麦香浓郁、干香耐嚼，存放时间久，古时是远行与劳作的便携主食，吃法丰富，可干吃、泡汤。',
      descEn: 'A centuries-old craft from Wugong: good wheat flour raised, pressed and baked slowly over a low fire into a dome the size of a cartwheel, cracked on the surface and layered inside. Keeps for days — travel bread, eaten dry or broken into soup.'
    },
    {
      id: 'food-9', n: 9, name: '乾县豆腐脑', nameEn: 'Qianxian Tofu Pudding', city: '咸阳', cityId: 'xianyang', location: '乾县', locationEn: 'Qianxian',
      img: './image/food9.jpg',
      desc: '乾县豆腐脑为咸阳乾县经典风味，位列“乾县四宝”，流传百年。成品洁白细嫩、筋而不散，区别于其他豆腐脑，调味讲究醋香、油香与辣子香融合，汤汁醇厚，酸辣适口。相传清代便远近闻名，曾获慈禧品尝赞誉。它依托乾陵文旅与地方民俗传承，是渭北地区市井早餐的代表。',
      descEn: 'One of the “four treasures of Qianxian”: white, tender, holding together on the spoon. What sets it apart is the dressing — vinegar, chilli oil and sesame fragrance in balance, sour and hot at once.'
    },
    {
      id: 'food-10', n: 10, name: '陈炉八大碗', nameEn: 'Chenlu Eight Bowls', city: '铜川', cityId: 'tongchuan', location: '印台区', locationEn: 'Yintai',
      img: './image/food10.jpg',
      desc: '陈炉八大碗为干蒸碗，菜品五荤三素。包含条子肉、蒸排骨、黄焖鸡、小酥肉、蒸丸子、蒸带鱼、蒸红苕、蒸甜米等八种，搭配特色素菜，经过祖传秘制调料配制，过油后放入陈炉黑泥碗，摆在蒸笼里大火蒸制，出锅后肉多汤少，色泽红润、香味浓郁。口感讲究肉软醇香、肥而不腻，入口即化，是当地百姓逢年过节必备的待客美食。',
      descEn: 'Eight dry-steamed bowls, five meat and three vegetarian: sliced pork, ribs, braised chicken, crisp pork, meatballs, hairtail, sweet potato and sweet rice. Seasoned, fried, packed into Chenlu black-clay bowls and steamed hard — the festival table of the kiln town.'
    },
    {
      id: 'food-11', n: 11, name: '曹阿婆糕点', nameEn: 'Cao Apo Pastries', city: '铜川', cityId: 'tongchuan', location: '印台区', locationEn: 'Yintai',
      img: './image/food11.jpg',
      desc: '曹阿婆糕点以面粉为主料，配以白糖、玉米油、菜籽油、红小豆等，再加入五仁、桂花、青红丝、玫瑰等辅料酿制为馅，用纯手工烘烤而成。馅为红白糖、冰糖渣子、青红丝子加豆油掺和一起放入大瓮内，经过一年三伏腌成。皮面用上好白麦面加大油，经木模压成圆形饼，放入烘烤炉内烤熟后，出炉晾凉。以“金面银帮，起皮飞酥，凉舌渗齿，清香爽口”闻名乡里。',
      descEn: 'Handmade pastries with a filling of sugars, candied peel, five nuts, osmanthus and rose, cured in a crock through a year of three summer heats. Pressed in wooden moulds and baked — “golden face, silver rim, flaking crust, cool on the tongue.”'
    },
    {
      id: 'food-12', n: 12, name: '韩城羊肉臊子饸饹', nameEn: 'Hancheng Mutton Hele Noodles', city: '渭南', cityId: 'weinan', location: '韩城市', locationEn: 'Hancheng',
      img: './image/food12.jpg',
      desc: '韩城羊肉臊子饸饹，羊油辣子是灵魂，现压现吃，麻辣鲜香。荞麦面或麦面在饸饹床子上现压入锅，煮熟捞出，浇上用羊肉丁、羊油辣子、豆腐、木耳、黄花熬成的臊子汤。面体粗圆筋道，汤色红亮，麻辣直冲，是韩城人清早与待客都离不开的一碗。',
      descEn: 'Pressed through a hele press straight into the pot, then covered with a mutton dice stew in which the soul is chilli oil rendered from mutton fat. Round, chewy noodles under a bright red, numbing-hot broth.'
    },
    {
      id: 'food-13', n: 13, name: '富平太后饼', nameEn: 'Fuping Taihou Cake', city: '渭南', cityId: 'weinan', location: '富平县', locationEn: 'Fuping',
      img: './image/food13.jpg',
      desc: '富平太后饼外皮金黄酥脆、内里软和，油香但不腻。以面粉、猪油分层起酥，包入核桃仁、芝麻与盐糖调成的馅心，压成圆饼后入炉烘烤，出炉层层起酥、满手掉渣。相传因汉代薄太后喜食而得名，是富平街头最常见也最耐吃的一味。',
      descEn: 'Laminated with lard into layers that shatter at a touch, filled with walnut, sesame, salt and sugar. Named, legend says, for Empress Dowager Bo of the Han, who favoured it.'
    },
    {
      id: 'food-14', n: 14, name: '凤翔豆花泡馍', nameEn: 'Fengxiang Tofu Pudding with Bread', city: '宝鸡', cityId: 'baoji', location: '凤翔区', locationEn: 'Fengxiang',
      img: './image/food14.jpg',
      desc: '凤翔豆花泡馍是宝鸡凤翔独有的传统特色美食，是西府地区极具代表性的晨间风味。不同于各地肉汤泡馍，豆花泡馍以醇香豆浆为底汤，搭配细嫩爽滑的卤水豆花，佐以酥脆筋道的凤翔锅盔馍片，淋上秘制油泼辣子与调味酱汁。馍片充分吸收豆汤鲜香，豆花温润绵软，汤底清甜醇厚，辣香而不燥、醇厚而不腻。',
      descEn: 'Unlike mutton paomo, this one is built on sweet soya milk: silken brine tofu, crisp slices of Fengxiang guokui soaked in the bean broth, chilli oil and sauce over the top. The signature breakfast of the western plain.'
    },
    {
      id: 'food-15', n: 15, name: '岐山醋粉', nameEn: 'Qishan Vinegar Noodles', city: '宝鸡', cityId: 'baoji', location: '岐山县', locationEn: 'Qishan',
      img: './image/food15.jpg',
      desc: '醋粉是宝鸡岐山独有的风味小吃，诞生于当地酿醋工艺，是粮食发酵制醋之后剩下的醋糟，经过沉淀、蒸制而成。色泽深褐，质地软糯筋滑，自带柔和自然的发酵酸香。食用时切成宽条，拌上油泼辣子、香醋等调料，入口酸辣爽口、风味独特。这道菜是西府劳动人民物尽其用的饮食智慧，外地极少见到。',
      descEn: 'A by-product turned delicacy: the residue left after grain is fermented for vinegar, settled and steamed into dark, springy sheets. Cut into ribbons and dressed with chilli oil and vinegar — nothing wasted, nothing else quite like it.'
    },
    {
      id: 'food-16', n: 16, name: '牛羊肉泡馍', nameEn: 'Mutton Paomo', city: '西安', cityId: 'xian', location: '西安市', locationEn: 'Xi’an',
      img: './image/food16.jpg',
      desc: '源于唐代长安，是丝路文化交融的产物。讲究食客亲手把馍掰成黄豆大小，交由后厨用牛羊老汤烹煮，配糖蒜食用。它不只是吃食，更带有社交仪式感，是西安回民饮食文化的标志，体现古都兼容并蓄的城市气质。',
      descEn: 'From Tang Chang’an, a product of the Silk Road. You tear the bread yourself into pieces the size of soya beans, hand it to the kitchen to be cooked in an old mutton broth, and eat it with sweet pickled garlic. More ritual than meal.'
    },
    {
      id: 'food-17', n: 17, name: '腊汁肉夹馍', nameEn: 'Roujiamo', city: '西安', cityId: 'xian', location: '西安市', locationEn: 'Xi’an',
      img: './image/food17.jpg',
      desc: '“肉夹馍”是古汉语“肉夹于馍”的简称。白吉馍烤得外皮酥脆、内里绵软，夹上文火久炖、肥而不腻的腊汁肉，肉汁浸透馍芯。历史可追溯至秦汉祭祀肉食，千百年来扎根市井，是老陕最具代表性的平民美食。',
      descEn: 'A contraction of the classical “meat sandwiched in bread”. A baiji bun, crisp outside and soft within, filled with pork long-braised in its own seasoned broth until the juice soaks through the crumb.'
    },
    {
      id: 'food-18', n: 18, name: '𰻝𰻝面', nameEn: 'Biangbiang Noodles', city: '西安', cityId: 'xian', location: '西安市', locationEn: 'Xi’an',
      img: './image/food18.jpg',
      desc: '名字来自摔打面团时“biang-biang”的声响，面条宽如裤带、筋道厚实，淋上滚烫油泼辣子，红亮鲜香。扎根关中农耕文化，体现老陕“大碗实在”的饮食性格，是关中面食文化的缩影。那字写法极繁，民间还编了顺口溜来记。',
      descEn: 'Named for the sound the dough makes as it is slapped against the counter. Ribbons as wide as a belt, thick and chewy, doused with sizzling chilli oil. Its character is one of the most complicated in Chinese — there is a rhyme to remember how to write it.'
    },
    {
      id: 'food-19', n: 19, name: '柞水洋芋糍粑', nameEn: 'Zhashui Potato Ciba', city: '商洛', cityId: 'shangluo', location: '柞水县', locationEn: 'Zhashui',
      img: './image/food19.jpg',
      desc: '柞水洋芋糍粑制作技艺，是陕西省省级非物质文化遗产。取高山洋芋蒸至绵熟，纳于石槽之中，以木槌反复捶捣，直至凝作柔韧绵密的糍粑团。既可蘸蜜甜食，亦可佐酸菜辣子汤咸品，口感软糯弹滑，裹挟洋芋本真清甜，2016 年列入陕西省第五批省级非物质文化遗产名录。',
      descEn: 'Highland potatoes steamed soft, then pounded with a wooden mallet in a stone trough until they turn into a supple, dense mass. Eaten with honey, or in a sour-pickle and chilli broth.'
    },
    {
      id: 'food-20', n: 20, name: '商芝肉', nameEn: 'Shangzhi Pork', city: '商洛', cityId: 'shangluo', location: '丹凤县', locationEn: 'Danfeng',
      img: './image/food20.jpg',
      desc: '商芝肉制作技艺，为陕西省省级非物质文化遗产，在丹凤大地代代相传，其源流与“商山四皓”的古老传说相伴相生。商芝，便是山野间的野生紫蕨，泡发铺于碗底，其上码放炸得色泽金黄的五花肉，经久蒸慢焖方成佳肴。成品红亮诱人，肉质酥烂而不腻口，蕨菜的清芬缓缓浸润肉香。',
      descEn: 'Shangzhi is wild purple fern, soaked and laid in the bowl, with golden-fried pork belly stacked above and steamed long and slow. The fern’s clean fragrance works its way into the meat — a dish tied to the legend of the Four White-Haired Sages of Mount Shang.'
    },
    {
      id: 'food-21', n: 21, name: '汉中热面皮', nameEn: 'Hanzhong Hot Rice Noodles', city: '汉中', cityId: 'hanzhong', location: '汉台区', locationEn: 'Hantai',
      img: './image/food21.jpg',
      desc: '汉中热面皮制作技艺为陕西省省级非物质文化遗产，相传起源于秦汉时期，依托汉江流域水稻农耕文化发展而来。选用本地大米浸泡磨浆，旺火蒸制成皮，趁热切条，搭配配菜，淋上秘制红油、醋蒜料汁，常与菜豆腐搭配食用。面皮软糯筋道、香辣醇厚，是汉中人经典早餐，2016 年列入陕西省第五批省级非物质文化遗产名录。',
      descEn: 'Local rice soaked and ground, steamed into a sheet, cut while hot and dressed with chilli oil, vinegar and garlic. Soft yet springy, and almost always eaten with vegetable tofu — the classic Hanzhong breakfast.'
    },
    {
      id: 'food-22', n: 22, name: '宁强麻辣鸡', nameEn: 'Ningqiang Spicy Chicken', city: '汉中', cityId: 'hanzhong', location: '宁强县', locationEn: 'Ningqiang',
      img: './image/food22.jpg',
      desc: '宁强麻辣鸡是宁强本土特色风味美食，技艺传承扎根秦巴山地，形成于上世纪五十年代，融合川陕两地调味特色。选用本地散养土鸡，配以多种天然香料文火焖煮，放凉撕块后拌入自制麻辣红油。鸡肉紧实弹牙，鸡皮脆爽，麻香悠长、辣而不燥，是当地节庆待客必备佳肴。',
      descEn: 'Free-range chicken simmered with mountain spices, cooled, torn into pieces and tossed in a house-made numbing chilli oil. Firm flesh, crisp skin, a long mala finish that stops short of burning — where Sichuan and Shaanxi seasoning meet.'
    },
    {
      id: 'food-23', n: 23, name: '紫阳蒸盆子', nameEn: 'Ziyang Steamed Basin', city: '安康', cityId: 'ankang', location: '紫阳县', locationEn: 'Ziyang',
      img: './image/food23.jpg',
      desc: '紫阳蒸盆子是陕南宴席上的压轴名菜，入选陕西省非物质文化遗产，相传最早源于汉江船工的聚餐食俗，慢慢演变为紫阳除夕团圆必不可少的家宴大菜。整道菜不加水，依靠隔水蒸馏焖出原汁，层层码放土鸡、猪蹄、手工蛋饺、莲藕、花生、木耳等食材，慢蒸数小时。蒸好之后汤汁清亮醇厚，肉质软糯入味，蛋饺鲜润饱满。',
      descEn: 'The finale of a southern Shaanxi banquet, said to begin with Han River boatmen eating together and now essential to Ziyang’s New Year’s Eve. No water is added: chicken, pork trotters, handmade egg dumplings, lotus root, peanuts and wood ear are layered and steamed for hours in their own juice.'
    },
    {
      id: 'food-24', n: 24, name: '安康蒸面', nameEn: 'Ankang Steamed Noodles', city: '安康', cityId: 'ankang', location: '汉滨区', locationEn: 'Hanbin',
      img: './image/food24.jpg',
      desc: '安康蒸面以米浆蒸出薄韧透亮的面皮，配上脆嫩豆芽，浇上醋汤、芝麻酱与油泼辣子。面皮爽滑筋道，酸辣鲜香，是萦绕在汉水江畔、藏于街巷烟火里的安康专属味道。',
      descEn: 'Rice batter steamed into a thin, translucent, resilient sheet, served with crisp bean sprouts and dressed with vinegar broth, sesame paste and chilli oil — sour, hot, fresh, and unmistakably Ankang.'
    },
    {
      id: 'food-25', n: 25, name: '汉阴炕炕馍', nameEn: 'Hanyin Griddle Sesame Cake', city: '安康', cityId: 'ankang', location: '汉阴县', locationEn: 'Hanyin',
      img: './image/food25.jpg',
      desc: '炕炕馍是汉阴传承百年的特色面点，也叫芝麻馍，相传最早是古时赶路之人便携的干粮。面团经反复揉擀，撒满饱满芝麻，放在鏊子上以炭火慢慢烘炕，两面烘烤至金黄。入口酥脆掉渣，麦香与芝麻香交融，分咸香、甜香两种口味，耐放不易坏。',
      descEn: 'A century-old travel bread, also called sesame cake. Dough rolled again and again, covered in sesame and baked slowly on a griddle over charcoal until golden on both sides — shatteringly crisp, in savoury and sweet versions, and it keeps.'
    },
    {
      id: 'food-26', n: 26, name: '汉中面皮（城固）', nameEn: 'Hanzhong Rice Noodles, Chenggu Style', city: '城固', cityId: 'chenggu', location: '城固县', locationEn: 'Chenggu',
      img: './image/food26.jpg', video: './video/vedio-food27.mp4',
      desc: '汉中面皮起源城固，米浆蒸制，搭配红油调料，软糯筋道，是城固最具代表性小吃。本地大米浸泡磨浆，上笼旺火蒸成薄皮，趁热切条，铺上豆芽与配菜，淋红油、醋蒜汁，一碗下去从早到晚都合适。',
      descEn: 'Chenggu is where Hanzhong rice noodles began. Rice ground and steamed into thin sheets, cut hot, topped with sprouts and dressed with chilli oil and garlic vinegar — the county’s defining snack.'
    },
    {
      id: 'food-28', n: 28, name: '上元观红豆腐', nameEn: 'Shangyuanguan Red Tofu', city: '城固', cityId: 'chenggu', location: '上元观镇', locationEn: 'Shangyuanguan',
      img: './image/food28.jpg',
      desc: '上元观红豆腐是六百余年古法发酵腐乳，咸香醇厚，是当地经典佐餐小菜。豆腐切块接种毛霉，长霜后加盐、辣椒与香料入坛，经数月后熟，出坛时通体艳红、内里绵软，一小块就能下一碗饭。旧时是古镇商旅随身的下饭之物，如今仍是城固人餐桌上少不了的一碟。',
      descEn: 'Six hundred years of the same method: tofu inoculated with mould, salted with chilli and spices, and left in jars for months. Brilliant red outside, silken within — a single cube is enough for a bowl of rice.'
    },
    {
      id: 'food-29', n: 29, name: '原公土席杂烩', nameEn: 'Yuangong Banquet Casserole', city: '城固', cityId: 'chenggu', location: '原公镇', locationEn: 'Yuangong',
      img: './image/food29.jpg', video: './video/vedio-food30.mp4',
      desc: '原公土席杂烩又称全家福，是城固原公镇宴席首菜，荤素食材分层蒸制，风味独特，是城固宴席文化的代表。肉丸、酥肉、蛋饺、粉条、木耳、黄花按序码入碗中，浇高汤上笼久蒸，出笼后汤清味厚，一层一层吃下去，是一桌席面的开场白。',
      descEn: 'Also called “family reunion”, the opening dish of a Yuangong banquet. Meatballs, crisp pork, egg dumplings, vermicelli, wood ear and lily buds layered in a bowl, steamed in stock — each layer a slightly different flavour.'
    },
    {
      id: 'food-31', n: 31, name: '城固窝儿酒', nameEn: 'Chenggu Wo’er Wine', city: '城固', cityId: 'chenggu', location: '城固县', locationEn: 'Chenggu',
      img: './image/food31.jpg', video: './video/vedio-food32.mp4',
      desc: '城固窝儿酒是本土糯米甜酒，清甜柔和，节庆待客饮用。糯米蒸熟拌曲，入窝发酵数日，出窝时酒液清亮微浊，米粒浮沉其间，入口甜而不腻、酒意极轻。旧时年节家家自酿，一碗窝儿酒配一碟红豆腐，是城固人待客最朴素也最实在的礼数。',
      descEn: 'A gentle fermented glutinous rice wine, clear but faintly cloudy, grains drifting in it. Sweet without cloying, barely alcoholic — once brewed in every household at New Year, served with a dish of red tofu.'
    },
    {
      id: 'food-33', n: 33, name: '城固喜馍', nameEn: 'Chenggu Wedding Buns', city: '城固', cityId: 'chenggu', location: '城固县', locationEn: 'Chenggu',
      img: './image/food33.jpg', video: './video/vedio-food34.mp4',
      desc: '城固喜馍是民俗节庆吉祥面点，造型丰富寓意美好。手工塑成寿桃、石榴、生肖等形状，点彩装饰后上笼蒸制，出笼饱满挺立、色彩明艳。婚嫁、贺寿、祭祀各有对应的一套，既是吃食，也是仪式的说明书。',
      descEn: 'Festival buns shaped by hand into peaches, pomegranates and zodiac animals, painted and steamed. Weddings, birthdays and offerings each have their own set — food that also explains the ceremony.'
    }
  ];

  /* ============ 条目定位点 [经度, 纬度] ============
     地图上点到某一条目时，会飞到这里的坐标。
     具体景点取真实点位；非遗与美食按所属县城 / 乡镇驻地定位（近似点）。 */
  D.geo = {
    /* 风景 24 处 */
    'scenic-1': [109.73, 38.34],   /* 镇北台 · 榆林城北 */
    'scenic-2': [108.80, 37.56],   /* 波浪谷 · 靖边龙洲 */
    'scenic-3': [109.88, 39.10],   /* 红碱淖 · 神木 */
    'scenic-4': [109.49, 36.60],   /* 宝塔山 · 延安 */
    'scenic-5': [109.26, 35.58],   /* 黄帝陵 · 黄陵 */
    'scenic-6': [110.43, 36.15],   /* 壶口瀑布 · 宜川（黄河岸边） */
    'scenic-7': [108.22, 34.57],   /* 乾陵 · 乾县 */
    'scenic-8': [108.95, 35.28],   /* 玉华宫 · 铜川 */
    'scenic-9': [110.09, 34.48],   /* 华山 · 华阴 */
    'scenic-10': [106.75, 34.72],  /* 关山草原 · 陇县 */
    'scenic-11': [108.95, 34.26],  /* 钟楼 · 西安 */
    'scenic-12': [109.94, 33.87],  /* 商洛 · 市区 */
    'scenic-13': [109.03, 33.37],  /* 塔云山 · 镇安 */
    'scenic-14': [107.03, 33.07],  /* 汉中 · 市区 */
    'scenic-15': [108.36, 32.85],  /* 凤堰古梯田 · 汉阴 */
    'scenic-16': [107.33, 33.16],  /* 张骞纪念馆 · 城固 */
    'scenic-17': [107.15, 33.20],  /* 桔园 · 城固 */
    'scenic-18': [107.26, 33.20],  /* 五门堰 · 城固 */
    'scenic-19': [107.19, 33.06],  /* 上元观古镇 · 城固 */
    'scenic-20': [107.16, 33.02],  /* 南沙湖 · 城固 */
    'scenic-21': [107.33, 33.15],  /* 城固钟楼 */
    'scenic-22': [107.34, 33.14],  /* 龙头宝鼎 · 汉江桥头 */
    'scenic-23': [107.33, 33.17],  /* 城固县博物馆 */
    'scenic-24': [107.33, 33.15],  /* 城关影剧院旧址 */

    /* 非遗 31 项 */
    'culture-1': [110.26, 37.51],  /* 绥米唢呐 · 绥德 */
    'culture-2': [109.29, 37.96],  /* 横山老腰鼓 */
    'culture-3': [110.26, 37.51],  /* 绥德转九曲 */
    'culture-4': [109.49, 36.59],  /* 陕北说书 · 延安 */
    'culture-5': [109.33, 36.86],  /* 安塞腰鼓 */
    'culture-6': [108.24, 34.53],  /* 弦板腔 · 乾县 */
    'culture-7': [108.84, 34.53],  /* 咸阳茯茶 · 泾阳 */
    'culture-8': [109.10, 35.11],  /* 同官奇石 · 印台 */
    'culture-9': [109.10, 35.11],  /* 八大院葫芦 · 印台 */
    'culture-10': [109.76, 34.51], /* 华州皮影 */
    'culture-11': [110.15, 35.24], /* 合阳提线木偶 */
    'culture-12': [107.39, 34.52], /* 凤翔泥塑 */
    'culture-13': [107.13, 34.64], /* 西秦刺绣 · 千阳 */
    'culture-14': [106.86, 34.89], /* 宝鸡社火 · 陇县 */
    'culture-15': [108.94, 34.26], /* 西安鼓乐 */
    'culture-16': [108.94, 34.34], /* 秦腔 · 关中 */
    'culture-17': [110.15, 34.09], /* 洛南静板书 */
    'culture-18': [109.94, 33.87], /* 商洛花鼓 · 商州 */
    'culture-19': [109.11, 33.69], /* 柞水渔鼓 */
    'culture-20': [106.26, 32.83], /* 宁强羌绣 */
    'culture-21': [107.77, 32.99], /* 西乡藤编 */
    'culture-22': [106.94, 33.00], /* 汉调桄桄 · 南郑 */
    'culture-23': [108.25, 33.04], /* 鎏金铜蚕 · 石泉 */
    'culture-24': [109.03, 32.69], /* 汉调二黄 · 安康 */
    'culture-25': [109.36, 32.39], /* 平利生漆 */
    'culture-26': [107.33, 33.16], /* 张骞传说 · 城固 */
    'culture-27': [107.33, 33.15], /* 城固架花 */
    'culture-28': [107.33, 33.15], /* 城固泥塑 */
    'culture-29': [107.33, 33.15], /* 二鬼打架 · 城固 */
    'culture-30': [107.33, 33.15], /* 城固木雕 */
    'culture-31': [107.33, 33.15], /* 城固喜馍 */

    /* 美食 30 道 */
    'food-1': [109.74, 38.29],     /* 拼三鲜 · 榆林 */
    'food-2': [110.26, 37.51],     /* 羊肉面 · 绥德 */
    'food-3': [109.74, 38.29],     /* 羊杂碎 · 榆林 */
    'food-4': [109.68, 37.14],     /* 子长煎饼 */
    'food-5': [109.49, 36.59],     /* 延安沾沾 */
    'food-6': [109.49, 36.59],     /* 洋芋擦擦 · 延安 */
    'food-7': [108.71, 34.33],     /* 咸阳琥珀糖 */
    'food-8': [108.21, 34.26],     /* 倪家大锅盔 · 武功 */
    'food-9': [108.24, 34.53],     /* 乾县豆腐脑 */
    'food-10': [109.10, 35.11],    /* 陈炉八大碗 · 印台 */
    'food-11': [109.10, 35.11],    /* 曹阿婆糕点 · 印台 */
    'food-12': [110.44, 35.48],    /* 韩城饸饹 */
    'food-13': [109.18, 34.75],    /* 富平太后饼 */
    'food-14': [107.39, 34.52],    /* 凤翔豆花泡馍 */
    'food-15': [107.62, 34.44],    /* 岐山醋粉 */
    'food-16': [108.94, 34.26],    /* 牛羊肉泡馍 · 西安 */
    'food-17': [108.94, 34.26],    /* 腊汁肉夹馍 · 西安 */
    'food-18': [108.94, 34.26],    /* 𰻝𰻝面 · 西安 */
    'food-19': [109.11, 33.69],    /* 柞水洋芋糍粑 */
    'food-20': [110.33, 33.72],    /* 商芝肉 · 丹凤 */
    'food-21': [107.03, 33.07],    /* 汉中热面皮 */
    'food-22': [106.26, 32.83],    /* 宁强麻辣鸡 */
    'food-23': [108.54, 32.52],    /* 紫阳蒸盆子 */
    'food-24': [109.03, 32.69],    /* 安康蒸面 */
    'food-25': [108.51, 32.89],    /* 汉阴炕炕馍 */
    'food-26': [107.33, 33.15],    /* 汉中面皮 · 城固 */
    'food-28': [107.19, 33.06],    /* 上元观红豆腐 */
    'food-29': [107.36, 33.17],    /* 原公土席杂烩 */
    'food-31': [107.33, 33.15],    /* 城固窝儿酒 */
    'food-33': [107.33, 33.15]     /* 城固喜馍 */
  };

  /* ============ 非遗时光轴：从汉到今 ============ */
  D.heritage = [
    {
      era: '汉', eraEn: 'Han', year: '公元前 2 世纪', yearEn: '2nd c. BC', name: '张骞传说', nameEn: 'The Legend of Zhang Qian',
      city: '城固', img: './image/culture26.jpg', ref: 'culture-26',
      desc: '凿空西域的十三年，被城固人讲成了两千年的故事。持节不失的气节，是这片土地最早的叙事母题。',
      descEn: 'Thirteen years beyond the frontier, retold in Chenggu for two thousand — the earliest narrative theme of this land.'
    },
    {
      era: '汉', eraEn: 'Han', year: '公元前 2 世纪', yearEn: '2nd c. BC', name: '城固架花', nameEn: 'Chenggu Cross-Stitch',
      city: '城固', img: './image/culture27.jpg', ref: 'culture-27',
      desc: '顺着土布经纬数针而绣，错一针便毁一幅。两千余年过去，仍是“城固有女皆架花”。',
      descEn: 'Counted along the warp and weft of homespun; one wrong stitch and the piece is lost. Two thousand years on, every daughter in Chenggu still works flowers.'
    },
    {
      era: '汉', eraEn: 'Han', year: '公元前 2 — 前 1 世纪', yearEn: '2nd–1st c. BC', name: '鎏金铜蚕', nameEn: 'Gilt Bronze Silkworm',
      city: '安康 · 石泉', img: './image/culture23.jpg', ref: 'culture-23',
      desc: '西汉遗物，1984 年从池河河滩淘出，昂首吐丝，九节分明。它证明汉代秦巴山区的蚕丝，已顺古道运往长安。',
      descEn: 'A Western Han piece, found in the Chihe riverbed in 1984 — head raised, nine segments clear: proof that Han-era silk from these mountains travelled the old road to Chang’an.'
    },
    {
      era: '唐', eraEn: 'Tang', year: '7—9 世纪', yearEn: '7th–9th c.', name: '西安鼓乐', nameEn: 'Xi’an Drum Music',
      city: '西安', img: './image/culture15.jpg', ref: 'culture-15',
      desc: '唐代宫廷燕乐散入民间，一套大曲的结构被完整保存下来，被称为“中国古代音乐的活化石”。',
      descEn: 'Tang court banquet music dispersed among the people, its suite structure kept intact — a living fossil of Chinese music.'
    },
    {
      era: '唐', eraEn: 'Tang', year: '7—9 世纪', yearEn: '7th–9th c.', name: '合阳提线木偶', nameEn: 'Heyang Marionette',
      city: '渭南 · 合阳', img: './image/culture11.jpg', ref: 'culture-11',
      desc: '起于汉，兴于唐，盛于明清。唐代已入宫廷，偶头至今留着唐俑的面孔，几十根提线由一人调度。北方傀儡戏里，几乎没有第二支这样的血脉。',
      descEn: 'Rooted in the Han, risen under the Tang, peaking in the Ming and Qing. Already a court entertainment by the Tang — and the puppet heads still keep Tang figurine faces.'
    },
    {
      era: '宋', eraEn: 'Song', year: '10—13 世纪', yearEn: '10th–13th c.', name: '华州皮影', nameEn: 'Huazhou Shadow Puppetry',
      city: '渭南 · 华州', img: './image/culture10.jpg', ref: 'culture-10',
      desc: '兴盛于唐宋，二十余道工序刻出比发丝更细的纹路。一口诉说天下事，双手对舞百万兵。',
      descEn: 'Flourishing under the Tang and Song, more than twenty processes cut lines finer than hair. One voice narrates the world; two hands command an army.'
    },
    {
      era: '宋', eraEn: 'Song', year: '10—13 世纪', yearEn: '10th–13th c.', name: '弦板腔', nameEn: 'Xianban Qiang',
      city: '咸阳 · 乾县', img: './image/culture6.jpg', ref: 'culture-6',
      desc: '源头可追至宋代“隔帘说书”与西路皮影，一直躲在纱帘后面唱；1957 年乾县才让真人替下皮影，走到台前。',
      descEn: 'Rooted in Song-era “storytelling behind a screen” and western shadow puppetry; not until 1957 in Qianxian did live actors replace the puppets.'
    },
    {
      era: '明', eraEn: 'Ming', year: '14—17 世纪', yearEn: '14th–17th c.', name: '咸阳茯茶', nameEn: 'Fu Brick Tea',
      city: '咸阳 · 泾阳', img: './image/culture7.jpg', ref: 'culture-7',
      desc: '紧压黑茶在发酵中自然长出“金花”。作为官茶沿丝路西行，是中原与西北之间最实在的一种交流。',
      descEn: 'Compressed dark tea that grows golden “flowers” as it ferments. Sent west as official tea along the Silk Road — the most concrete exchange between the plains and the north-west.'
    },
    {
      era: '清', eraEn: 'Qing', year: '19 世纪', yearEn: '19th c.', name: '洛南静板书', nameEn: 'Luonan Storytelling',
      city: '商洛 · 洛南', img: './image/culture17.jpg', ref: 'culture-17',
      desc: '道光年间起在洛南乡野流传。一人怀抱三弦，手脚并用敲锣打镲，独自撑起一台说唱。',
      descEn: 'Current in the Luonan countryside since the Daoguang era. One performer with a sanxian, working gongs and cymbals with hands and feet — a whole stage in one body.'
    },
    {
      era: '清', eraEn: 'Qing', year: '19 世纪', yearEn: '19th c.', name: '商洛花鼓', nameEn: 'Shangluo Flower-Drum',
      city: '商洛 · 商州', img: './image/culture18.jpg', ref: 'culture-18',
      desc: '光绪三年（1877）郧阳水灾，灾民把湖北的花鼓戏带进商洛，改用本地方言唱，又掺进秦巴山歌，才成了它。',
      descEn: 'In 1877 floods drove refugees from Yunyang in Hubei into Shangluo, bringing their flower-drum opera — which then took on the local dialect and Qinba mountain song.'
    },
    {
      era: '今', eraEn: 'Today', year: '当代', yearEn: 'Present', name: '非遗新生', nameEn: 'Heritage, Re-made',
      city: '陕西全省', img: './image/culture12.jpg', ref: 'culture-12',
      desc: '凤翔泥塑做成冰箱贴，皮影变成灯，生漆做成扇与首饰。老手艺没有停在展柜里，而是重新回到日常。',
      descEn: 'Fengxiang clay becomes magnets, shadow puppets become lamps, raw lacquer becomes fans and jewellery. The crafts have not stopped in a display case — they have returned to daily use.'
    }
  ];

  /* ============ 宣传海报 poster1—7 ============ */
  D.posters = [
    {
      n: 1, name: '城固剪纸', nameEn: 'Chenggu Paper-Cutting', img: './image/poster1.jpg',
      desc: '一把剪刀、一张红纸，裁刻出属于城固的烟火诗意。题材既有凤凰戏牡丹、狮子滚绣球这类吉祥纹样，也衍生出张骞出使西域、丹橘飘香等本土创作，将丝路渊源与桔乡风物凝于一纸之间。风格刚柔并济，既有南方剪纸的秀雅，又带着秦地民间的质朴大气。',
      descEn: 'One pair of scissors, one sheet of red paper. Auspicious patterns alongside local subjects — Zhang Qian’s journey west, the scent of citrus — holding both the Silk Road and the orange groves in a single sheet.'
    },
    {
      n: 2, name: '城固泥塑', nameEn: 'Chenggu Clay Sculpture', img: './image/poster2.jpg',
      desc: '取本地细腻黏土，经揉泥、塑型、修坯、彩绘多道工序手工成型。不同于其他地域泥塑的浓烈夸张，城固泥塑自带陕南温润气质，造型朴拙饱满、色彩柔和明快，题材从财神福娃到张骞、桔乡风物，把丝路底蕴揉进泥土。',
      descEn: 'Local clay kneaded, shaped, trimmed and painted. Where other regions exaggerate, Chenggu stays soft and round, its subjects running from household gods to Zhang Qian and the citrus hills.'
    },
    {
      n: 3, name: '汉中秦腔', nameEn: 'Hanzhong Qinqiang', img: './image/poster3.jpg',
      desc: '秦腔流传至陕南孕育出的地方戏曲，融合关中秦腔的高亢雄浑与陕南山水的温润婉转。保留经典板式与梆子击节，唱腔慷慨激昂，又吸纳本地语音与民俗审美，少了几分凛冽，多了一丝柔和细腻。',
      descEn: 'Qinqiang as it grew in the south: the same clapper and metre, the same vehemence, but softened by local speech and southern Shaanxi manners — less biting, more pliant.'
    },
    {
      n: 4, name: '汉中刺绣', nameEn: 'Hanzhong Embroidery', img: './image/poster4.jpg',
      desc: '依托陕南温润风土而生，兼具楚蜀灵秀与秦地质朴。针法丰富多变，平绣、锁绣、打籽绣灵活运用，配色柔和雅致。题材既有花鸟瑞草、吉祥团花，也常绣汉江风光、桔乡风物、戏曲人物，部分作品融入张骞丝路元素。',
      descEn: 'Born of a mild climate, carrying both Chu and Shu grace and Qin plainness. Flat, chain and seed stitches in soft colour; birds and flowers, river views, opera figures, and sometimes Silk Road motifs.'
    },
    {
      n: 5, name: '城固皮影', nameEn: 'Chenggu Shadow Puppetry', img: './image/poster5.jpg',
      desc: '以柔韧牛皮为材，经绘图、雕镂、敷彩、缀接数十道古法工序精雕细琢而成。相较于关中皮影的凌厉张扬，城固皮影更具陕南灵秀雅致，线条纤细流畅、镂空精巧细腻，配色清雅温润。依托碗碗腔与地方戏曲传唱民间，夜幕落幕布张，灯影流转。',
      descEn: 'Cut from supple ox hide through dozens of traditional steps. Beside the sharper Guanzhong style, Chenggu’s is finer and more restrained: slender lines, delicate openwork, gentle colour.'
    },
    {
      n: 6, name: '城固架花', nameEn: 'Chenggu Cross-Stitch', img: './image/poster6.jpg',
      desc: '又称挑花，流传两千余年，自古便有“城固有女皆架花”的美谈。以家织土布为底，顺经纬网格挑绣而成，十字针法、一字纤花、编织针法灵活变换，精品正反两面纹样完全一致，错一针便破坏整幅构图，被誉为“立体水墨画”。',
      descEn: 'Two thousand years of counted work on homespun cloth. The finest pieces are identical front and back, one wrong stitch ruins the whole design — a kind of three-dimensional ink painting in thread.'
    }
  ];

  /* ============ 视频索引 ============ */
  D.videos = {
    hero: './video/index.mp4',
    cartoons: [
      { title: 'AI 漫剧', titleEn: 'AI Comic Drama', subtitle: '陕西非遗 · 漫剧演绎', subtitleEn: 'Heritage told as comic drama', src: './video/carton1.mp4', poster: './image/poster2.jpg' },
      { title: 'AI 动画', titleEn: 'AI Animation', subtitle: '城固故事 · 动画短片', subtitleEn: 'Chenggu stories in animation', src: './video/carton2.mp4', poster: './image/poster5.jpg' }
    ],
    film: { title: '锦绣陕西 · 形象片', titleEn: 'Splendid Shaanxi · Film', src: './video/poster7.mp4', poster: './image/poster3.jpg' }
  };

  return D;
})();
