import { DiseaseInfo } from '../types';

export const PLANTVILLAGE_DISEASES: Record<string, DiseaseInfo> = {
  // --- TOMATO ---
  'Tomato___Early_blight': {
    id: 'Tomato___Early_blight',
    crop: 'Tomato',
    cropKey: 'tomato',
    disease: 'Early Blight',
    diseaseKey: 'early_blight',
    scientificName: 'Alternaria solani',
    pathogenType: 'fungal',
    defaultSeverity: 'moderate',
    isHealthy: false,
    symptoms: [
      'Dark brown to black spots with concentric rings (target-like pattern) on older leaves',
      'Yellow halo surrounding the leaf lesions',
      'Premature leaf drop starting from lower canopy moving upward',
      'Dark sunken leathery cankers on stems near soil line'
    ],
    organicRemedies: [
      'Remove and safely burn or bury infected lower leaves to reduce spore spread',
      'Spray 5ml/L cold-pressed Neem oil mixed with mild soap water every 7 days',
      'Apply organic Copper Octanoate or Trichoderma viride bio-fungicide to soil & foliage',
      'Mulch the soil bed with clean straw to prevent soil splashing onto bottom leaves',
      'Water only at the root base using drip irrigation; keep foliage dry'
    ],
    chemicalRemedies: [
      'Mancozeb 75% WP @ 2.5g/L water at first appearance of concentric spots',
      'Azoxystrobin 23% SC @ 1ml/L or Chlorothalonil 75% WP @ 2g/L for persistent infection',
      'Observe a mandatory 7-day pre-harvest interval (PHI) after spraying'
    ],
    preventionTips: [
      'Practice 3-year crop rotation with non-solanaceous crops (avoid potato, brinjal)',
      'Maintain 60cm plant-to-plant spacing for proper air circulation',
      'Choose resistant cultivars and stake plants off the ground'
    ]
  },

  'Tomato___Late_blight': {
    id: 'Tomato___Late_blight',
    crop: 'Tomato',
    cropKey: 'tomato',
    disease: 'Late Blight',
    diseaseKey: 'late_blight',
    scientificName: 'Phytophthora infestans',
    pathogenType: 'fungal',
    defaultSeverity: 'severe',
    isHealthy: false,
    symptoms: [
      'Irregular water-soaked greasy brown lesions on leaves and stems',
      'Delicate white fungal mold underneath the leaves during cool humid mornings',
      'Rapid wilting and blackening of entire foliage within 48-72 hours',
      'Large firm brown rot on green and ripe tomato fruits'
    ],
    organicRemedies: [
      'Immediately uproot and destroy severely infected plants to prevent field-wide devastation',
      'Apply Bordeaux mixture (1% copper sulfate + hydrated lime) as a protective wash',
      'Spray bio-control agent Bacillus subtilis @ 5g/L every 5 days during overcast weather',
      'Avoid overhead sprinkler irrigation at all costs'
    ],
    chemicalRemedies: [
      'Metalaxyl 8% + Mancozeb 64% WP (Ridomil MZ) @ 2.5g/L at onset of wet weather',
      'Cymoxanil 8% + Mancozeb 64% WP @ 2g/L or Dimethomorph 50% WP @ 1g/L',
      'Alternate chemical modes of action to prevent fungal resistance'
    ],
    preventionTips: [
      'Monitor weather alerts for humidity > 85% and temperatures between 15°C - 22°C',
      'Destroy volunteer potato and tomato plants around field perimeters',
      'Ensure well-drained soil ridges to avoid root saturation'
    ]
  },

  'Tomato___Bacterial_spot': {
    id: 'Tomato___Bacterial_spot',
    crop: 'Tomato',
    cropKey: 'tomato',
    disease: 'Bacterial Spot',
    diseaseKey: 'bacterial_spot',
    scientificName: 'Xanthomonas campestris pv. vesicatoria',
    pathogenType: 'bacterial',
    defaultSeverity: 'moderate',
    isHealthy: false,
    symptoms: [
      'Small (2-3mm), dark brown, water-soaked angular spots on foliage',
      'Lesions often appear greasy with a distinct yellow margin',
      'Scabby, raised rough black spots on green fruit surfaces',
      'Leaves turn brown, dry out, and drop prematurely'
    ],
    organicRemedies: [
      'Spray Copper Hydroxide @ 2g/L mixed with Bacillus amyloliquefaciens',
      'Avoid touching or cultivating fields when morning dew is present on foliage',
      'Sterilize pruning shears and garden stakes in 10% bleach solution between rows'
    ],
    chemicalRemedies: [
      'Streptomycin Sulphate + Tetracycline Hydrochloride (Streptocycline) @ 6g/50L + Copper Oxychloride @ 100g/50L',
      'Kasugamycin 3% SL @ 2ml/L water during warm rainy periods'
    ],
    preventionTips: [
      'Use certified pathogen-free treated seeds (hot water seed treatment at 50°C for 25 min)',
      'Rotate with cereals, pulses, or mustard crops for at least 2 seasons',
      'Erect windbreaks to reduce wind-driven rain transmission'
    ]
  },

  'Tomato___Leaf_Mold': {
    id: 'Tomato___Leaf_Mold',
    crop: 'Tomato',
    cropKey: 'tomato',
    disease: 'Leaf Mold',
    diseaseKey: 'leaf_mold',
    scientificName: 'Passalora fulva',
    pathogenType: 'fungal',
    defaultSeverity: 'mild',
    isHealthy: false,
    symptoms: [
      'Pale green or yellowish diffuse spots on the upper leaf surface',
      'Dense velvety olive-green to brown mold on the underside of corresponding spots',
      'Leaves curl, wither, and drop prematurely in high humidity conditions'
    ],
    organicRemedies: [
      'Prune lower leaves to improve air movement and reduce relative humidity (<85%)',
      'Spray compost tea or potassium bicarbonate (3g/L) to inhibit spore germination',
      'Apply Trichoderma harzianum as foliar biocontrol'
    ],
    chemicalRemedies: [
      'Difenoconazole 25% EC @ 1ml/L or Chlorothalonil 75% WP @ 2g/L',
      'Thiophanate-methyl 70% WP @ 1.5g/L applied at early flowering'
    ],
    preventionTips: [
      'Increase polyhouse ventilation and avoid condensation on leaves',
      'Use drip irrigation beneath plastic mulch',
      'Select tomato varieties with Cf resistance genes'
    ]
  },

  'Tomato___Septoria_leaf_spot': {
    id: 'Tomato___Septoria_leaf_spot',
    crop: 'Tomato',
    cropKey: 'tomato',
    disease: 'Septoria Leaf Spot',
    diseaseKey: 'septoria_leaf_spot',
    scientificName: 'Septoria lycopersici',
    pathogenType: 'fungal',
    defaultSeverity: 'moderate',
    isHealthy: false,
    symptoms: [
      'Numerous small circular spots (1-3mm) with dark brown borders and grayish-white centers',
      'Tiny black speckling (pycnidia fruiting bodies) inside spot centers',
      'Rapid yellowing and defoliation from ground level upwards'
    ],
    organicRemedies: [
      'Pick off infected lower leaves immediately at first sighting',
      'Apply liquid seaweed fertilizer to reinforce plant cell wall vigor',
      'Spray bio-fungicide Bacillus pumilus @ 4g/L'
    ],
    chemicalRemedies: [
      'Chlorothalonil 75% WP @ 2g/L or Mancozeb 75% WP @ 2.5g/L at 10-day intervals',
      'Tebuconazole 25.9% EC @ 1.5ml/L for severe infestations'
    ],
    preventionTips: [
      'Mulch heavily under plants to block soil-dwelling fungal spores',
      'Never work in wet fields; handle plants only when leaves are dry',
      'Control nightshade family weeds surrounding field edges'
    ]
  },

  'Tomato___Target_Spot': {
    id: 'Tomato___Target_Spot',
    crop: 'Tomato',
    cropKey: 'tomato',
    disease: 'Target Spot',
    diseaseKey: 'target_spot',
    scientificName: 'Corynespora cassiicola',
    pathogenType: 'fungal',
    defaultSeverity: 'moderate',
    isHealthy: false,
    symptoms: [
      'Brown lesions with light brown centers and distinct dark concentric circles',
      'Lesions coalesce causing large necrotic leaf patches',
      'Sunken lesions on green and mature fruits with velvety spore clusters'
    ],
    organicRemedies: [
      'Apply Copper Hydroxide @ 2.5g/L combined with organic adjuvant',
      'Maintain wide crop spacing to promote rapid morning foliage drying'
    ],
    chemicalRemedies: [
      'Pyraclostrobin 20% WG @ 1g/L or Azoxystrobin + Difenoconazole @ 1ml/L',
      'Boscalid 50% WG @ 1g/L'
    ],
    preventionTips: [
      'Ensure soil calcium and potassium levels are balanced',
      'Avoid high nitrogen fertilization which creates overly dense foliage'
    ]
  },

  'Tomato___Yellow_Leaf_Curl_Virus': {
    id: 'Tomato___Yellow_Leaf_Curl_Virus',
    crop: 'Tomato',
    cropKey: 'tomato',
    disease: 'Yellow Leaf Curl Virus',
    diseaseKey: 'yellow_leaf_curl_virus',
    scientificName: 'TYLCV (Begomovirus)',
    pathogenType: 'viral',
    defaultSeverity: 'severe',
    isHealthy: false,
    symptoms: [
      'Severe upward cupping and curling of leaf margins',
      'Interveinal chlorosis (yellowing) and stunted bushy upright growth',
      'Flowers drop before setting; fruit production drastically reduced'
    ],
    organicRemedies: [
      'Install yellow sticky traps (15-20 traps per acre) to trap vectoring whiteflies',
      'Spray 5ml/L Neem seed kernel extract (NSKE 5%) to repel Bemisia tabaci whiteflies',
      'Place silver reflective mulch to confuse and deter insect vectors'
    ],
    chemicalRemedies: [
      'Imidacloprid 17.8% SL @ 0.5ml/L or Acetamiprid 20% SP @ 0.5g/L for whitefly control',
      'Diafenthiuron 50% WP @ 1g/L for knockdown of heavy whitefly populations'
    ],
    preventionTips: [
      'Use 40-mesh insect-proof netting in nursery seedling beds',
      'Plant border barrier crops such as maize or sorghum around tomato plots',
      'Rogue out and destroy infected viral plants immediately upon detection'
    ]
  },

  'Tomato___healthy': {
    id: 'Tomato___healthy',
    crop: 'Tomato',
    cropKey: 'tomato',
    disease: 'Healthy Leaf',
    diseaseKey: 'healthy',
    pathogenType: 'healthy',
    defaultSeverity: 'none',
    isHealthy: true,
    symptoms: [
      'Deep green, vibrant, uniform leaf color without spots or chlorosis',
      'Erect sturdy stems with balanced node spacing',
      'Uniform blossom development without premature flower drop'
    ],
    organicRemedies: [
      'Maintain regular vermicompost or well-rotted FYM top dressing every 3 weeks',
      'Apply seaweed extract or Panchagavya foliar spray (30ml/L) to boost natural immunity'
    ],
    chemicalRemedies: [
      'No chemical fungicides or bactericides needed',
      'Ensure balanced NPK 19:19:19 fertigation at vegetative stage'
    ],
    preventionTips: [
      'Continue regular morning scouting for early pest or spot detection',
      'Maintain uniform drip irrigation schedules to avoid blossom end rot'
    ]
  },

  // --- POTATO ---
  'Potato___Early_blight': {
    id: 'Potato___Early_blight',
    crop: 'Potato',
    cropKey: 'potato',
    disease: 'Early Blight',
    diseaseKey: 'early_blight',
    scientificName: 'Alternaria solani',
    pathogenType: 'fungal',
    defaultSeverity: 'moderate',
    isHealthy: false,
    symptoms: [
      'Small, circular to angular dark brown target spots with concentric rings',
      'Older lower leaves turn yellow and dry up crisp while remaining attached',
      'Dark sunken corky rot on potato tubers'
    ],
    organicRemedies: [
      'Spray Pseudomonas fluorescens @ 5g/L mixed with jaggery water',
      'Foliar spray with Copper Oxychloride 50% WP @ 2.5g/L'
    ],
    chemicalRemedies: [
      'Mancozeb 75% WP @ 2.5g/L or Metiram 70% WG @ 2g/L',
      'Tebuconazole 50% + Trifloxystrobin 25% WG @ 0.7g/L'
    ],
    preventionTips: [
      'Plant certified healthy seed tubers with uniform sprouting',
      'Avoid moisture stress during tuber bulking phase'
    ]
  },

  'Potato___Late_blight': {
    id: 'Potato___Late_blight',
    crop: 'Potato',
    cropKey: 'potato',
    disease: 'Late Blight',
    diseaseKey: 'late_blight',
    scientificName: 'Phytophthora infestans',
    pathogenType: 'fungal',
    defaultSeverity: 'severe',
    isHealthy: false,
    symptoms: [
      'Water-soaked dark lesions rapidly expanding from leaf tips and margins',
      'White cottony downy fungal growth on underside of leaves under high humidity',
      'Stem rotting and total collapse of potato canopy in 3-5 days',
      'Granular dry reddish-brown rot spreading below tuber skin'
    ],
    organicRemedies: [
      'Apply protective 1% Bordeaux mixture before monsoon showers begin',
      'Destroy and burn cull piles and infected haulms immediately'
    ],
    chemicalRemedies: [
      'Cymoxanil 8% + Mancozeb 64% WP (Curzate) @ 2g/L or Dimethomorph @ 1.5g/L',
      'Mandipropamid 23.4% SC @ 1ml/L + Mancozeb for preventive systemic protection'
    ],
    preventionTips: [
      'Earth up well to provide a thick soil barrier preventing tuber spore wash',
      'De-haulm (cut top stems) 10-15 days before harvest if late blight is active'
    ]
  },

  'Potato___healthy': {
    id: 'Potato___healthy',
    crop: 'Potato',
    cropKey: 'potato',
    disease: 'Healthy Leaf',
    diseaseKey: 'healthy',
    pathogenType: 'healthy',
    defaultSeverity: 'none',
    isHealthy: true,
    symptoms: [
      'Lush emerald green leaves without necrotic margins or dark rings',
      'Vigorous vegetative growth and healthy flowering'
    ],
    organicRemedies: [
      'Maintain regular soil moisture during tuber initiation and bulking',
      'Apply composted manure and beneficial mycorrhizae at planting'
    ],
    chemicalRemedies: [
      'No chemical intervention required'
    ],
    preventionTips: [
      'Perform regular field scouting and maintain ridge earthing-up'
    ]
  },

  // --- CORN (MAIZE) ---
  'Corn_(maize)___Common_rust_': {
    id: 'Corn_(maize)___Common_rust_',
    crop: 'Corn (Maize)',
    cropKey: 'corn',
    disease: 'Common Rust',
    diseaseKey: 'common_rust',
    scientificName: 'Puccinia sorghi',
    pathogenType: 'fungal',
    defaultSeverity: 'moderate',
    isHealthy: false,
    symptoms: [
      'Small, circular to elongate golden-brown to cinnamon-brown powdery pustules',
      'Pustules appear abundantly on both upper and lower leaf surfaces',
      'Foliage turns chlorotic and dries prematurely when pustules coalesce'
    ],
    organicRemedies: [
      'Spray Wettable Sulphur 80% WP @ 3g/L to suppress rust spores',
      'Foliar spray of fermented butter milk + asafoetida solution (traditional bio-fungicide)'
    ],
    chemicalRemedies: [
      'Azoxystrobin 18.2% + Difenoconazole 11.4% SC @ 1ml/L',
      'Propiconazole 25% EC (Tilt) @ 1ml/L at first appearance of rust pustules'
    ],
    preventionTips: [
      'Plant rust-resistant maize hybrid cultivars',
      'Early sowing helps crop mature before peak cool, humid rust season'
    ]
  },

  'Corn_(maize)___Northern_Leaf_Blight': {
    id: 'Corn_(maize)___Northern_Leaf_Blight',
    crop: 'Corn (Maize)',
    cropKey: 'corn',
    disease: 'Northern Leaf Blight',
    diseaseKey: 'northern_leaf_blight',
    scientificName: 'Exserohilum turcicum',
    pathogenType: 'fungal',
    defaultSeverity: 'moderate',
    isHealthy: false,
    symptoms: [
      'Long, elliptical cigar-shaped grayish-green to tan lesions (2.5 to 15 cm long)',
      'Lesions develop dark olive-black velvety spore mats during wet weather',
      'Extensive leaf tissue death reduces photosynthesizing grain-filling capacity'
    ],
    organicRemedies: [
      'Spray Trichoderma viride @ 5g/L on foliage during seedling & knee-high stage',
      'Deep summer ploughing to bury infested maize stubble'
    ],
    chemicalRemedies: [
      'Mancozeb 75% WP @ 2.5g/L or Zineb 75% WP @ 2g/L',
      'Pyraclostrobin + Fluxapyroxad @ 1ml/L at tassel emergence'
    ],
    preventionTips: [
      'Rotate with legumes (soybean, green gram) or oilseeds',
      'Avoid high planting densities that trap moisture in the leaf canopy'
    ]
  },

  'Corn_(maize)___healthy': {
    id: 'Corn_(maize)___healthy',
    crop: 'Corn (Maize)',
    cropKey: 'corn',
    disease: 'Healthy Leaf',
    diseaseKey: 'healthy',
    pathogenType: 'healthy',
    defaultSeverity: 'none',
    isHealthy: true,
    symptoms: [
      'Sturdy dark green erect leaves with clean, intact margins',
      'Well-formed tassels and thick silk development'
    ],
    organicRemedies: [
      'Apply Zinc Sulphate @ 10kg/acre soil application to prevent white bud disorder',
      'Top dress with neem-coated urea or vermicompost at knee-high stage'
    ],
    chemicalRemedies: [
      'No chemical treatment needed'
    ],
    preventionTips: [
      'Keep field free of striga and grassy weeds during the first 45 days'
    ]
  },

  // --- APPLE ---
  'Apple___Apple_scab': {
    id: 'Apple___Apple_scab',
    crop: 'Apple',
    cropKey: 'apple',
    disease: 'Apple Scab',
    diseaseKey: 'apple_scab',
    scientificName: 'Venturia inaequalis',
    pathogenType: 'fungal',
    defaultSeverity: 'severe',
    isHealthy: false,
    symptoms: [
      'Olive-green to velvety dark brown circular lesions on upper leaf surfaces',
      'Leaves become puckered, distorted, and drop prematurely',
      'Rough, corky, dark scabby cracks on developing apple fruits'
    ],
    organicRemedies: [
      'Spray Lime Sulphur (2-3%) during dormant and bud-swell stages',
      'Apply potassium bicarbonate @ 4g/L as post-infection bio-fungicide',
      'Rake and compost or shred fallen orchard leaves with 5% urea spray in autumn'
    ],
    chemicalRemedies: [
      'Captan 50% WP @ 2.5g/L or Dodine 65% WP @ 1g/L at pink bud stage',
      'Myclobutanil 10% WP @ 0.5g/L or Difenoconazole 25% EC @ 0.5ml/L at petal fall'
    ],
    preventionTips: [
      'Ensure proper canopy pruning to maximize sunlight penetration and rapid drying',
      'Monitor spring rain duration and temperature (Mills infection period)'
    ]
  },

  'Apple___Cedar_apple_rust': {
    id: 'Apple___Cedar_apple_rust',
    crop: 'Apple',
    cropKey: 'apple',
    disease: 'Cedar Apple Rust',
    diseaseKey: 'cedar_apple_rust',
    scientificName: 'Gymnosporangium juniperi-virginianae',
    pathogenType: 'fungal',
    defaultSeverity: 'moderate',
    isHealthy: false,
    symptoms: [
      'Bright yellow-orange circular spots on upper surface of apple leaves',
      'Small black specks appear within orange spots',
      'Finger-like cup-shaped tubes (aecia) appear on the lower leaf surface'
    ],
    organicRemedies: [
      'Spray sulfur-based bio-fungicides @ 3g/L from tight cluster through bloom',
      'Eradicate nearby red cedar / juniper bushes within a 1km orchard radius'
    ],
    chemicalRemedies: [
      'Myclobutanil 10% WP @ 0.5g/L or Mancozeb 75% WP @ 2.5g/L',
      'Trifloxystrobin 50% WG @ 0.5g/L'
    ],
    preventionTips: [
      'Plant rust-resistant apple cultivars like Freedom, Liberty, or Enterprise'
    ]
  },

  'Apple___healthy': {
    id: 'Apple___healthy',
    crop: 'Apple',
    cropKey: 'apple',
    disease: 'Healthy Leaf',
    diseaseKey: 'healthy',
    pathogenType: 'healthy',
    defaultSeverity: 'none',
    isHealthy: true,
    symptoms: [
      'Glossy, deep green leaves with crisp saw-toothed edges and no spots',
      'Strong spur growth and healthy fruit set'
    ],
    organicRemedies: [
      'Apply balanced organic compost and dormant horticultural spray oils in winter'
    ],
    chemicalRemedies: [
      'No treatment required'
    ],
    preventionTips: [
      'Maintain annual winter pruning and balanced micro-nutrient foliar sprays'
    ]
  },

  // --- GRAPE ---
  'Grape___Black_rot': {
    id: 'Grape___Black_rot',
    crop: 'Grape',
    cropKey: 'grape',
    disease: 'Black Rot',
    diseaseKey: 'black_rot',
    scientificName: 'Guignardia bidwellii',
    pathogenType: 'fungal',
    defaultSeverity: 'severe',
    isHealthy: false,
    symptoms: [
      'Small, circular reddish-tan spots with dark brown margins on leaves',
      'Tiny black pycnidia pimples arranged in a ring inside lesions',
      'Berries turn brown, shrivel, and transform into hard, black, wrinkled mummies'
    ],
    organicRemedies: [
      'Prune and destroy all mummified grape clusters and infected canes during dormancy',
      'Spray Bordeaux mixture 1% before bud break and after bloom'
    ],
    chemicalRemedies: [
      'Mancozeb 75% WP @ 2.5g/L or Kresoxim-methyl 44.3% SC @ 0.6ml/L',
      'Tebuconazole 25.9% EC @ 1ml/L applied from pre-bloom to veraison'
    ],
    preventionTips: [
      'Open up grape canopy (trellising, shoot thinning) to speed drying of morning dew',
      'Cultivate vineyard floor to bury fallen diseased leaf debris'
    ]
  },

  'Grape___healthy': {
    id: 'Grape___healthy',
    crop: 'Grape',
    cropKey: 'grape',
    disease: 'Healthy Leaf',
    diseaseKey: 'healthy',
    pathogenType: 'healthy',
    defaultSeverity: 'none',
    isHealthy: true,
    symptoms: [
      'Broad, fan-shaped green leaves with intact veins and vibrant vigor',
      'Healthy grape cluster development without powdery or downy coatings'
    ],
    organicRemedies: [
      'Apply organic potassium silicate and fish hydrolysate during berry sizing'
    ],
    chemicalRemedies: [
      'No treatment needed'
    ],
    preventionTips: [
      'Maintain regular shoot positioning and bunch exposure to dappled sunlight'
    ]
  },

  // --- BELL PEPPER (CHILLI / CAPSICUM) ---
  'Pepper,_bell___Bacterial_spot': {
    id: 'Pepper,_bell___Bacterial_spot',
    crop: 'Pepper (Chilli)',
    cropKey: 'pepper',
    disease: 'Bacterial Spot',
    diseaseKey: 'bacterial_spot',
    scientificName: 'Xanthomonas campestris pv. vesicatoria',
    pathogenType: 'bacterial',
    defaultSeverity: 'moderate',
    isHealthy: false,
    symptoms: [
      'Small, circular, water-soaked dark spots on leaves turning brown and necrotic',
      'Leaves develop yellowing around spots and drop severely, exposing fruit to sunscald',
      'Warty, raised brown scab spots on pepper pods'
    ],
    organicRemedies: [
      'Spray Copper Oxychloride 50% WP @ 2.5g/L + Pseudomonas fluorescens @ 5g/L',
      'Ensure wide plant spacing and drip irrigation only'
    ],
    chemicalRemedies: [
      'Streptocycline @ 6g + Copper Hydroxide @ 100g in 50L water',
      'Kasugamycin 3% SL @ 2ml/L during cloudy rainy intervals'
    ],
    preventionTips: [
      'Treat seeds with 1.3% sodium hypochlorite solution before nursery sowing',
      'Rotate pepper fields with maize or sorghum'
    ]
  },

  'Pepper,_bell___healthy': {
    id: 'Pepper,_bell___healthy',
    crop: 'Pepper (Chilli)',
    cropKey: 'pepper',
    disease: 'Healthy Leaf',
    diseaseKey: 'healthy',
    pathogenType: 'healthy',
    defaultSeverity: 'none',
    isHealthy: true,
    symptoms: [
      'Glossy dark green leaves, straight stems, and prolific flowering/pod set'
    ],
    organicRemedies: [
      'Apply vermiwash and neem cake powder at base of plants'
    ],
    chemicalRemedies: [
      'No chemicals required'
    ],
    preventionTips: [
      'Scout for thrips and mites under leaf surfaces weekly'
    ]
  },

  // --- RICE / PADDY (Major Indian Staple) ---
  'Rice___Bacterial_leaf_blight': {
    id: 'Rice___Bacterial_leaf_blight',
    crop: 'Rice (Paddy)',
    cropKey: 'rice',
    disease: 'Bacterial Leaf Blight',
    diseaseKey: 'bacterial_leaf_blight',
    scientificName: 'Xanthomonas oryzae pv. oryzae',
    pathogenType: 'bacterial',
    defaultSeverity: 'severe',
    isHealthy: false,
    symptoms: [
      'Water-soaked to yellowish-green wavy stripes starting from leaf tips and margins',
      'Lesions turn straw-colored and dry up with milky bacterial ooze droplets in early morning',
      'Kresek phase: wilting and rolling of entire seedlings'
    ],
    organicRemedies: [
      'Spray fresh cow dung slurry extract (20%) + neem oil (3%)',
      'Drain excess standing water from paddy fields for 2-3 days'
    ],
    chemicalRemedies: [
      'Copper Oxychloride @ 500g + Streptocycline @ 30g per acre in 200L water',
      'Thifluzamide 24% SC @ 150ml/acre'
    ],
    preventionTips: [
      'Avoid excessive split nitrogen fertilizer; balance with potassium (MOP)',
      'Use resistant varieties like IR64, Swarna, or Improved Samba Mahsuri'
    ]
  },

  'Rice___Blast': {
    id: 'Rice___Blast',
    crop: 'Rice (Paddy)',
    cropKey: 'rice',
    disease: 'Rice Blast',
    diseaseKey: 'rice_blast',
    scientificName: 'Magnaporthe oryzae',
    pathogenType: 'fungal',
    defaultSeverity: 'severe',
    isHealthy: false,
    symptoms: [
      'Spindle-shaped (eye-shaped) lesions with ash-gray centers and dark brown margins on leaves',
      'Neck rot / node blast causing complete panicle lodging and empty chaffy grains'
    ],
    organicRemedies: [
      'Spray Pseudomonas fluorescens talc formulation @ 10g/L',
      'Avoid late transplanting and high seedling density'
    ],
    chemicalRemedies: [
      'Tricyclazole 75% WP (Beam) @ 0.6g/L or Isoprothiolane 40% EC (Fuji-One) @ 1.5ml/L',
      'Azoxystrobin 18.2% + Difenoconazole 11.4% SC @ 1ml/L'
    ],
    preventionTips: [
      'Seed treatment with Tricyclazole @ 2g/kg seed before nursery sowing',
      'Apply potassium in two splits to strengthen silicon leaf cuticle'
    ]
  },

  // --- COTTON ---
  'Cotton___Bacterial_blight': {
    id: 'Cotton___Bacterial_blight',
    crop: 'Cotton',
    cropKey: 'cotton',
    disease: 'Bacterial Blight (Blackarm)',
    diseaseKey: 'bacterial_blight',
    scientificName: 'Xanthomonas citri pv. malvacearum',
    pathogenType: 'bacterial',
    defaultSeverity: 'moderate',
    isHealthy: false,
    symptoms: [
      'Angular water-soaked spots bounded by leaf veins',
      'Black lesion girdling of stems (Blackarm phase) causing snapping in wind',
      'Water-soaked round spots on cotton bolls causing internal lint rot'
    ],
    organicRemedies: [
      'Spray Copper Oxychloride 50% WP @ 2.5g/L + NSKE 5%',
      'Destroy crop residue after final picking'
    ],
    chemicalRemedies: [
      'Streptocycline @ 6g + Copper Oxychloride @ 100g in 50L water at first symptom',
      'Plant seed acid-delinted and treated with Carboxin'
    ],
    preventionTips: [
      'Use acid-delinted certified seeds and avoid overhead flood irrigation'
    ]
  },

  // --- COFFEE ---
  'Coffee___Leaf_rust': {
    id: 'Coffee___Leaf_rust',
    crop: 'Coffee',
    cropKey: 'coffee',
    disease: 'Coffee Leaf Rust',
    diseaseKey: 'leaf_rust',
    scientificName: 'Hemileia vastatrix',
    pathogenType: 'fungal',
    defaultSeverity: 'severe',
    isHealthy: false,
    symptoms: [
      'Yellow-orange powdery spots on the undersides of coffee leaves',
      'Corresponding chlorotic yellow patches on the upper leaf surface',
      'Severe defoliation leading to dieback of coffee branches'
    ],
    organicRemedies: [
      'Spray copper hydroxide or Bordeaux mixture (0.5%) before monsoons',
      'Prune shade trees to improve canopy aeration and sun penetration',
      'Apply bio-fungicide Trichoderma harzianum to foliage'
    ],
    chemicalRemedies: [
      'Hexaconazole 5% EC @ 2ml/L or Triadimefon 25% WP @ 1g/L',
      'Propiconazole 25% EC @ 1ml/L at first sign of orange spots'
    ],
    preventionTips: [
      'Plant resistant Arabica varieties (e.g. Chandragiri, Selection 9)',
      'Maintain balanced soil N:K ratio to strengthen leaf resistance'
    ]
  },
  'Coffee___healthy': {
    id: 'Coffee___healthy',
    crop: 'Coffee',
    cropKey: 'coffee',
    disease: 'Healthy Coffee Leaf',
    diseaseKey: 'healthy',
    scientificName: 'Coffea arabica / canephora',
    pathogenType: 'healthy',
    defaultSeverity: 'none',
    isHealthy: true,
    symptoms: ['Lush dark green glossy foliage with no spots or lesions'],
    organicRemedies: ['Maintain regular organic composting and soil mulching'],
    chemicalRemedies: ['No chemical treatment required'],
    preventionTips: ['Ensure good field drainage and weed management']
  }
};

export const CROP_LIST = [
  { key: 'all', name: 'Auto-Detect (Any Crop)' },
  { key: 'tomato', name: 'Tomato (टमाटर / தக்காளி)' },
  { key: 'potato', name: 'Potato (आलू / உருளை)' },
  { key: 'corn', name: 'Corn / Maize (मक्का / மக்காச்சோளம்)' },
  { key: 'coffee', name: 'Coffee (कॉफी / காபி)' },
  { key: 'apple', name: 'Apple (सेब / ஆப்பிள்)' },
  { key: 'grape', name: 'Grape (अंगूर / திராட்சை)' },
  { key: 'pepper', name: 'Chilli / Pepper (मिर्च / மிளகாய்)' },
  { key: 'rice', name: 'Rice / Paddy (धान / நெல்)' },
  { key: 'cotton', name: 'Cotton (कपास / பருத்தி)' },
];
