export type Difficulty = "Foundational" | "Intermediate" | "Advanced";

export type Lab = {
  order: number;
  title: string;
  slug: string;
  category: string;
  sourcePath: string;
  summary: string;
  concepts: string[];
  estimatedMinutes: number;
  difficulty: Difficulty;
  format: "Reaction time" | "Memory task" | "Judgment task" | "Perception task" | "Language task";
};

export type Category = {
  name: string;
  blurb: string;
  color: string;
};

export const categories: Category[] = [
  { name: "Sensation", blurb: "Detecting faint signals and basic sensory events.", color: "#f26b4f" },
  { name: "Perception", blurb: "How the mind organizes visual patterns and scenes.", color: "#2f9c95" },
  { name: "Attention", blurb: "Selection, interference, spatial focus, and response control.", color: "#f4b942" },
  { name: "Neurocognition", blurb: "Brain organization and perceptual consequences.", color: "#5b6ee1" },
  { name: "Sensory Memory", blurb: "Brief traces that bridge perception and memory.", color: "#47a6d8" },
  { name: "Short-Term Memory", blurb: "Temporary storage, scanning, and rapid forgetting.", color: "#965fd4" },
  { name: "Working Memory", blurb: "Active maintenance under load, sound, and strategy demands.", color: "#00a66c" },
  { name: "Memory Processes", blurb: "Encoding, retrieval, distinctiveness, and serial order.", color: "#db4f86" },
  { name: "Metamemory", blurb: "Judgments, recollection, and the limits of confidence.", color: "#74614b" },
  { name: "Imagery", blurb: "Mental images as tools for memory and spatial thinking.", color: "#e4872c" },
  { name: "Speech", blurb: "Categorical perception of speech sounds.", color: "#3f7fbd" },
  { name: "Language", blurb: "Words, sentences, reading, and lexical access.", color: "#708238" },
  { name: "Concepts", blurb: "Category learning, prototypes, and pattern extraction.", color: "#c2514a" },
  { name: "Judgment", blurb: "Reasoning, probability, choice, and decision biases.", color: "#454545" }
];

const categoryFormats: Record<string, Lab["format"]> = {
  Sensation: "Perception task",
  Perception: "Perception task",
  Attention: "Reaction time",
  Neurocognition: "Perception task",
  "Sensory Memory": "Memory task",
  "Short-Term Memory": "Memory task",
  "Working Memory": "Memory task",
  "Memory Processes": "Memory task",
  Metamemory: "Memory task",
  Imagery: "Memory task",
  Speech: "Language task",
  Language: "Language task",
  Concepts: "Judgment task",
  Judgment: "Judgment task"
};

const summaries: Record<string, string> = {
  "signal-detection": "Separate true sensitivity from response bias while judging whether a faint signal is present.",
  "simple-detection": "Measure how quickly simple sensory events are noticed under changing presentation conditions.",
  "apparent-motion": "See how still images can produce a convincing impression of motion.",
  "garner-interference-integral-dimensions": "Compare speeded classification when stimulus dimensions are hard to separate.",
  "garner-interference-separable-dimensions": "Test whether separable dimensions create less interference during classification.",
  "muller-lyer-illusion": "Estimate line length in a classic illusion where context changes perceived size.",
  "visual-search": "Find targets among distractors and watch search efficiency change with display structure.",
  "attentional-blink": "Explore why a second target can disappear when it follows the first too quickly.",
  "change-detection": "Probe the limits of noticing changes across brief visual interruptions.",
  "inhibition-of-return": "Measure slower responses to locations attention has recently inspected.",
  "simon-effect": "Reveal conflict between stimulus location and the response a task requires.",
  "spatial-cueing": "Use cues to see how attention speeds or slows detection at different locations.",
  "stroop-effect": "Measure interference when word meaning competes with ink color naming.",
  "blind-spot": "Locate the visual blind spot and experience how the brain fills missing input.",
  "brain-asymmetry": "Compare performance across visual fields to explore hemispheric specialization.",
  "metacontrast-masking": "Test how a later mask can interrupt perception of a brief target.",
  "modality-effect": "Compare recall for auditory and visual presentation at the end of a list.",
  "partial-report": "Estimate iconic memory by reporting cued parts of a brief display.",
  "suffix-effect": "Observe how an irrelevant final sound disrupts auditory serial recall.",
  "brown-peterson-task": "Study rapid forgetting when rehearsal is blocked by a distractor task.",
  "position-error": "Track where remembered items migrate when order memory is imperfect.",
  "sternberg-search": "Measure memory scanning as set size increases.",
  "irrelevant-speech-effect": "See how unattended speech can disrupt serial working memory.",
  "memory-span": "Estimate short-term capacity with progressively longer sequences.",
  "operation-span": "Balance processing and storage to measure complex working memory span.",
  "phonological-similarity-effect": "Compare recall for sound-alike and distinct verbal items.",
  "word-length-effect": "Test whether longer words reduce immediate serial recall.",
  "encoding-specificity": "Show how retrieval cues work best when they match the encoding context.",
  "levels-of-processing": "Compare shallow and deep encoding strategies for later memory.",
  "production-effect": "Test whether saying items aloud boosts later recognition.",
  "serial-position": "Examine primacy and recency across list positions.",
  "von-restorff-effect": "See how a distinctive item stands out in memory.",
  "false-memory": "Experience how related words can create confident memory for unseen items.",
  "forgot-it-all-along": "Compare actual prior knowledge with later beliefs about forgetting.",
  "memory-judgment": "Measure how people predict and evaluate their own memory performance.",
  "remember-know": "Separate vivid recollection from familiarity-based recognition.",
  "link-word": "Use imagery links to learn and retrieve paired information.",
  "mental-rotation": "Measure how response time changes when shapes must be rotated mentally.",
  "categorical-perception-discrimination": "Discriminate speech sounds near and across category boundaries.",
  "categorical-perception-identification": "Label speech sounds along a continuum to reveal category boundaries.",
  "age-of-acquisition": "Test whether words learned earlier are processed more efficiently.",
  "garden-path-sentences": "Experience sentence parsing when early structure leads interpretation astray.",
  "lexical-decision": "Decide whether letter strings are words and reveal lexical access speed.",
  "neighborhood-size-effect": "Compare words with many or few lexical neighbors.",
  "word-superiority": "Test why letters are recognized better inside meaningful words.",
  "absolute-identification": "Identify stimuli on a single dimension and discover capacity limits.",
  "concept-formation": "Learn categories from feedback and infer the underlying rule.",
  "implicit-learning": "Detect patterns learned through exposure without explicit instruction.",
  "prototypes": "Classify examples around a central category prototype.",
  "statistical-learning": "Use distributional regularities to learn structure from sequences.",
  "decision-making": "Explore how choices shift with gains, losses, and framing.",
  "monty-hall": "Simulate the famous door-switching problem and inspect probability in action.",
  "risky-decisions": "Compare choices when outcomes are uncertain and payoffs vary.",
  "typical-reasoning": "Test reasoning with typicality, categories, and everyday inference.",
  "wason-selection": "Evaluate conditional reasoning with the classic card selection task."
};

const rawLabs: Array<[number, string, string, string]> = [
  [1, "Sensation", "Signal Detection", "signal_detection.shtml"],
  [2, "Sensation", "Simple Detection", "simple_detection.shtml"],
  [3, "Perception", "Apparent Motion", "apparent_motion.shtml"],
  [4, "Perception", "Garner Interference: Integral Dimensions", "garner_interference_integral.shtml"],
  [5, "Perception", "Garner Interference: Separable Dimensions", "garner_interference_separable.shtml"],
  [6, "Perception", "Müller-Lyer Illusion", "muller_lyer_illusion.shtml"],
  [7, "Perception", "Visual Search", "visual_search.shtml"],
  [8, "Attention", "Attentional Blink", "attentional_blink.shtml"],
  [9, "Attention", "Change Detection", "change_detection.shtml"],
  [10, "Attention", "Inhibition of Return", "inhibition_of_return.shtml"],
  [11, "Attention", "Simon Effect", "simon_effect.shtml"],
  [12, "Attention", "Spatial Cueing", "spatial_cueing.shtml"],
  [13, "Attention", "Stroop Effect", "stroop_effect.shtml"],
  [14, "Neurocognition", "Blind Spot", "blind_spot.shtml"],
  [15, "Neurocognition", "Brain Asymmetry", "brain_asymmetry.shtml"],
  [16, "Sensory Memory", "Metacontrast Masking", "metacontrast_masking.shtml"],
  [17, "Sensory Memory", "Modality Effect", "modality_effect.shtml"],
  [18, "Sensory Memory", "Partial Report", "partial_report.shtml"],
  [19, "Sensory Memory", "Suffix Effect", "suffix_effect.shtml"],
  [20, "Short-Term Memory", "Brown-Peterson Task", "brown_peterson_task.shtml"],
  [21, "Short-Term Memory", "Position Error", "position_error.shtml"],
  [22, "Short-Term Memory", "Sternberg Search", "sternberg_search.shtml"],
  [23, "Working Memory", "Irrelevant Speech Effect", "irrelevant_speech.shtml"],
  [24, "Working Memory", "Memory Span", "memory_span.shtml"],
  [25, "Working Memory", "Operation Span", "operation_span.shtml"],
  [26, "Working Memory", "Phonological Similarity Effect", "phonological_similarity.shtml"],
  [27, "Working Memory", "Word Length Effect", "word_length_effect.shtml"],
  [28, "Memory Processes", "Encoding Specificity", "encoding_specificity.shtml"],
  [29, "Memory Processes", "Levels of Processing", "levels_of_processing.shtml"],
  [30, "Memory Processes", "Production Effect", "production_effect.shtml"],
  [31, "Memory Processes", "Serial Position", "serial_position.shtml"],
  [32, "Memory Processes", "Von Restorff Effect", "von_restorff.shtml"],
  [33, "Metamemory", "False Memory", "false_memory.shtml"],
  [34, "Metamemory", "Forgot It All Along", "forgot_it_all_along.shtml"],
  [35, "Metamemory", "Memory Judgment", "memory_judgment.shtml"],
  [36, "Metamemory", "Remember-Know", "remember_know.shtml"],
  [37, "Imagery", "Link Word", "link_word.shtml"],
  [38, "Imagery", "Mental Rotation", "mental_rotation.shtml"],
  [39, "Speech", "Categorical Perception: Discrimination", "categorical_perception_discrimination.shtml"],
  [40, "Speech", "Categorical Perception: Identification", "categorical_perception_identification.shtml"],
  [41, "Language", "Age of Acquisition", "age_of_acquisition.shtml"],
  [42, "Language", "Garden Path Sentences", "garden_path_sentences.shtml"],
  [43, "Language", "Lexical Decision", "lexical_decision.shtml"],
  [44, "Language", "Neighborhood Size Effect", "neighborhood_size.shtml"],
  [45, "Language", "Word Superiority", "word_superiority.shtml"],
  [46, "Concepts", "Absolute Identification", "absolute_identification.shtml"],
  [47, "Concepts", "Concept Formation", "concept_formation.shtml"],
  [48, "Concepts", "Implicit Learning", "implicit_learning.shtml"],
  [49, "Concepts", "Prototypes", "prototypes.shtml"],
  [50, "Concepts", "Statistical Learning", "statistical_learning.shtml"],
  [51, "Judgment", "Decision Making", "decision_making.shtml"],
  [52, "Judgment", "Monty Hall", "monty_hall.shtml"],
  [53, "Judgment", "Risky Decisions", "risky_decisions.shtml"],
  [54, "Judgment", "Typical Reasoning", "typical_reasoning.shtml"],
  [55, "Judgment", "Wason Selection", "wason_selection.shtml"]
];

const slugify = (title: string) =>
  title
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const conceptWords = (title: string, category: string) =>
  Array.from(
    new Set(
      `${category} ${title}`
        .replace(/[:\-]/g, " ")
        .split(/\s+/)
        .filter((word) => word.length > 3)
    )
  ).slice(0, 4);

export const labs: Lab[] = rawLabs.map(([order, category, title, sourceFile]) => {
  const slug = slugify(title);
  const difficulty: Difficulty = order % 7 === 0 ? "Advanced" : order % 3 === 0 ? "Intermediate" : "Foundational";

  return {
    order,
    title,
    slug,
    category,
    sourcePath: `https://coglab.cengage.com/labs/${sourceFile}`,
    summary: summaries[slug] ?? `Explore ${title.toLowerCase()} in the context of ${category.toLowerCase()}.`,
    concepts: conceptWords(title, category),
    estimatedMinutes: 8 + ((order * 3) % 18),
    difficulty,
    format: categoryFormats[category]
  };
});

export const getLabBySlug = (slug: string) => labs.find((lab) => lab.slug === slug);
