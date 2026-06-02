import type {
  Course,
  CourseCategory,
  CourseModule,
  Difficulty,
  Lecture,
  PracticeProblem
} from "@/types";
import { slugify } from "@/lib/slug";
import { getOcwSourcesForCourse } from "@/data/ocwSources";

interface CourseDefinition {
  title: string;
  category: CourseCategory;
  difficulty: Difficulty;
  description?: string;
  prerequisites?: string[];
  outcomes?: string[];
}

interface ModuleBlueprint {
  title: string;
  lectures: string[];
}

export const categoryOrder: CourseCategory[] = [
  "Mathematics for Engineers",
  "Physics for Engineers",
  "Mechanical Engineering Core"
];

const catalogDefinitions: CourseDefinition[] = [
  {
    title: "Algebra and Trigonometry for Engineering",
    category: "Mathematics for Engineers",
    difficulty: "Beginner"
  },
  {
    title: "Precalculus",
    category: "Mathematics for Engineers",
    difficulty: "Beginner"
  },
  {
    title: "Calculus I: Limits, Derivatives, and Applications",
    category: "Mathematics for Engineers",
    difficulty: "Intermediate",
    description:
      "A rigorous first calculus course focused on rates, approximation, optimization, and engineering interpretation.",
    prerequisites: ["Algebra", "Trigonometry", "Precalculus functions"],
    outcomes: [
      "Evaluate limits and continuity for engineering models",
      "Differentiate functions that describe motion, loading, and change",
      "Use derivatives for optimization, related rates, and error estimates"
    ]
  },
  {
    title: "Calculus II: Integrals, Series, and Applications",
    category: "Mathematics for Engineers",
    difficulty: "Intermediate"
  },
  {
    title: "Calculus III: Multivariable Calculus",
    category: "Mathematics for Engineers",
    difficulty: "Advanced"
  },
  {
    title: "Linear Algebra for Engineers",
    category: "Mathematics for Engineers",
    difficulty: "Intermediate"
  },
  {
    title: "Differential Equations",
    category: "Mathematics for Engineers",
    difficulty: "Advanced"
  },
  {
    title: "Probability and Statistics for Engineers",
    category: "Mathematics for Engineers",
    difficulty: "Intermediate"
  },
  {
    title: "Numerical Methods",
    category: "Mathematics for Engineers",
    difficulty: "Advanced"
  },
  {
    title: "Engineering Data Analysis",
    category: "Mathematics for Engineers",
    difficulty: "Intermediate"
  },
  {
    title: "Classical Mechanics",
    category: "Physics for Engineers",
    difficulty: "Intermediate",
    description:
      "A mechanics course connecting Newton's laws, energy, momentum, and rotational motion to engineered systems.",
    prerequisites: ["Trigonometry", "Calculus I", "Vector components"],
    outcomes: [
      "Model particle and rigid-body motion",
      "Apply energy and momentum balances",
      "Interpret physical assumptions in mechanical systems"
    ]
  },
  {
    title: "AP Physics 1 Foundations",
    category: "Physics for Engineers",
    difficulty: "Beginner"
  },
  {
    title: "AP Physics C: Mechanics",
    category: "Physics for Engineers",
    difficulty: "Advanced"
  },
  {
    title: "Electricity and Magnetism",
    category: "Physics for Engineers",
    difficulty: "Advanced"
  },
  {
    title: "Waves and Oscillations",
    category: "Physics for Engineers",
    difficulty: "Intermediate"
  },
  {
    title: "Thermodynamics",
    category: "Physics for Engineers",
    difficulty: "Intermediate",
    description:
      "A physics-centered treatment of heat, work, energy, and property relations for real engineering systems.",
    prerequisites: ["Algebra", "Calculus I", "Classical Mechanics"],
    outcomes: [
      "Apply the first and second laws to simple systems",
      "Use property data to reason about heat and work",
      "Connect thermal physics to engines, refrigeration, and energy conversion"
    ]
  },
  {
    title: "Fluid Physics",
    category: "Physics for Engineers",
    difficulty: "Intermediate"
  },
  {
    title: "Modern Physics",
    category: "Physics for Engineers",
    difficulty: "Advanced"
  },
  {
    title: "Experimental Physics and Lab Methods",
    category: "Physics for Engineers",
    difficulty: "Intermediate"
  },
  {
    title: "Computational Physics",
    category: "Physics for Engineers",
    difficulty: "Advanced"
  },
  {
    title: "Introduction to Mechanical Engineering",
    category: "Mechanical Engineering Core",
    difficulty: "Beginner"
  },
  {
    title: "Engineering Graphics and CAD",
    category: "Mechanical Engineering Core",
    difficulty: "Beginner"
  },
  {
    title: "CAD for Engineers",
    category: "Mechanical Engineering Core",
    difficulty: "Beginner",
    description:
      "A design-focused CAD course covering parametric modeling, drawings, assemblies, tolerances, and design intent.",
    prerequisites: ["Engineering graphics", "Basic geometry", "Mechanical design curiosity"],
    outcomes: [
      "Create parametric parts with stable design intent",
      "Build assemblies with constraints and clear references",
      "Communicate manufacturable designs using drawings and tolerances"
    ]
  },
  {
    title: "Statics",
    category: "Mechanical Engineering Core",
    difficulty: "University Level",
    description:
      "A core mechanics course on forces, moments, equilibrium, supports, and the analysis of structures at rest.",
    prerequisites: ["Trigonometry", "Vector algebra", "Calculus I"],
    outcomes: [
      "Resolve forces and moments in two and three dimensions",
      "Draw useful free-body diagrams",
      "Solve particle and rigid-body equilibrium problems"
    ]
  },
  {
    title: "Dynamics",
    category: "Mechanical Engineering Core",
    difficulty: "University Level",
    description:
      "A mechanics course on motion, acceleration, kinetics, work-energy methods, impulse, and momentum.",
    prerequisites: ["Statics", "Calculus I", "Vector algebra"],
    outcomes: [
      "Relate kinematics to forces and accelerations",
      "Analyze particles and rigid bodies in motion",
      "Use energy and momentum methods for mechanical systems"
    ]
  },
  {
    title: "Mechanics of Materials",
    category: "Mechanical Engineering Core",
    difficulty: "University Level",
    description:
      "A design-oriented course on stress, strain, torsion, bending, deflection, and failure of engineering members.",
    prerequisites: ["Statics", "Calculus I", "Material properties"],
    outcomes: [
      "Compute stress and strain in loaded members",
      "Analyze shafts, beams, and columns",
      "Apply safety factors to mechanical design decisions"
    ]
  },
  {
    title: "Materials Science",
    category: "Mechanical Engineering Core",
    difficulty: "Intermediate"
  },
  {
    title: "Manufacturing Processes",
    category: "Mechanical Engineering Core",
    difficulty: "Intermediate"
  },
  {
    title: "Mechanical Design",
    category: "Mechanical Engineering Core",
    difficulty: "Advanced"
  },
  {
    title: "Machine Design",
    category: "Mechanical Engineering Core",
    difficulty: "Advanced",
    description:
      "A practical machine design course focused on loads, shafts, bearings, fasteners, power transmission, fatigue, and reliability.",
    prerequisites: ["Statics", "Mechanics of Materials", "Manufacturing basics"],
    outcomes: [
      "Translate functional requirements into machine element loads",
      "Size shafts, bearings, fasteners, and gears with safety factors",
      "Evaluate fatigue, manufacturability, and reliability tradeoffs"
    ]
  },
  {
    title: "Machine Elements",
    category: "Mechanical Engineering Core",
    difficulty: "Advanced"
  },
  {
    title: "Fluid Mechanics",
    category: "Mechanical Engineering Core",
    difficulty: "University Level",
    description:
      "A mechanical engineering course on fluid statics, conservation laws, pipe flow, pumps, and external flow.",
    prerequisites: ["Calculus I", "Physics mechanics", "Thermodynamics"],
    outcomes: [
      "Apply mass, momentum, and energy balances to fluids",
      "Estimate pressure losses and flow rates",
      "Connect fluid models to pumps, ducts, pipes, and vehicle systems"
    ]
  },
  {
    title: "Heat Transfer",
    category: "Mechanical Engineering Core",
    difficulty: "Advanced"
  },
  {
    title: "Thermodynamics for Mechanical Engineers",
    category: "Mechanical Engineering Core",
    difficulty: "University Level"
  },
  {
    title: "Internal Combustion Engines",
    category: "Mechanical Engineering Core",
    difficulty: "Advanced"
  },
  {
    title: "Combustion and Propulsion",
    category: "Mechanical Engineering Core",
    difficulty: "Advanced"
  },
  {
    title: "Robotics and Mechatronics",
    category: "Mechanical Engineering Core",
    difficulty: "Advanced"
  },
  {
    title: "Control Systems",
    category: "Mechanical Engineering Core",
    difficulty: "Advanced"
  },
  {
    title: "Vibrations",
    category: "Mechanical Engineering Core",
    difficulty: "Advanced"
  },
  {
    title: "Finite Element Analysis",
    category: "Mechanical Engineering Core",
    difficulty: "Advanced"
  },
  {
    title: "Computational Fluid Dynamics Introduction",
    category: "Mechanical Engineering Core",
    difficulty: "Advanced"
  },
  {
    title: "HVAC and Energy Systems",
    category: "Mechanical Engineering Core",
    difficulty: "Advanced"
  },
  {
    title: "Engineering Design Process",
    category: "Mechanical Engineering Core",
    difficulty: "Intermediate"
  },
  {
    title: "Senior Capstone Design Preparation",
    category: "Mechanical Engineering Core",
    difficulty: "Advanced"
  }
];

const customBlueprints: Record<string, ModuleBlueprint[]> = {
  "Calculus I: Limits, Derivatives, and Applications": [
    {
      title: "Limits and Continuity",
      lectures: [
        "Limits from Tables, Graphs, and Equations",
        "Continuity in Engineering Models",
        "Infinite Limits and Asymptotic Behavior"
      ]
    },
    {
      title: "Derivatives and Rates",
      lectures: [
        "Derivative Definition and Physical Meaning",
        "Product, Quotient, and Chain Rules",
        "Related Rates in Mechanisms"
      ]
    },
    {
      title: "Applications of Derivatives",
      lectures: [
        "Optimization for Design Constraints",
        "Curve Sketching and Stability",
        "Linearization and Error Estimates"
      ]
    }
  ],
  "Classical Mechanics": [
    {
      title: "Kinematics",
      lectures: [
        "Position, Velocity, and Acceleration",
        "Projectile Motion with Engineering Coordinates",
        "Relative Motion"
      ]
    },
    {
      title: "Newtonian Dynamics",
      lectures: [
        "Free-Body Models and Newton's Laws",
        "Friction, Normal Forces, and Constraints",
        "Circular Motion and Centripetal Acceleration"
      ]
    },
    {
      title: "Energy and Momentum",
      lectures: [
        "Work and Kinetic Energy",
        "Potential Energy and Conservation",
        "Linear Momentum and Impulse"
      ]
    }
  ],
  Statics: [
    {
      title: "Force Vectors",
      lectures: [
        "Scalars and Vectors",
        "Vector Components",
        "Dot Product and Cross Product",
        "Force Resultants"
      ]
    },
    {
      title: "Equilibrium of Particles",
      lectures: [
        "Free Body Diagrams",
        "2D Equilibrium",
        "3D Equilibrium"
      ]
    },
    {
      title: "Rigid Body Equilibrium",
      lectures: [
        "Moments",
        "Couples",
        "Supports and Reactions",
        "Distributed Loads"
      ]
    }
  ],
  Dynamics: [
    {
      title: "Particle Kinematics",
      lectures: [
        "Rectilinear Motion",
        "Curvilinear Coordinates",
        "Normal and Tangential Components"
      ]
    },
    {
      title: "Particle Kinetics",
      lectures: [
        "Force and Acceleration",
        "Work and Energy",
        "Impulse and Momentum"
      ]
    },
    {
      title: "Rigid Body Motion",
      lectures: [
        "Planar Rigid Body Kinematics",
        "Rotation About a Fixed Axis",
        "Rolling and General Plane Motion"
      ]
    }
  ],
  "Mechanics of Materials": [
    {
      title: "Stress and Strain",
      lectures: [
        "Normal Stress and Axial Loading",
        "Shear Stress and Connections",
        "Strain and Material Response"
      ]
    },
    {
      title: "Shafts and Beams",
      lectures: [
        "Torsion in Circular Shafts",
        "Beam Shear and Moment Diagrams",
        "Flexural Stress"
      ]
    },
    {
      title: "Deflection and Failure",
      lectures: [
        "Beam Deflection",
        "Combined Loading",
        "Failure Criteria and Safety Factors"
      ]
    }
  ],
  Thermodynamics: [
    {
      title: "Thermal Systems",
      lectures: [
        "Systems, Surroundings, and State",
        "Properties and Processes",
        "Pressure-Volume Work"
      ]
    },
    {
      title: "Energy Balance",
      lectures: [
        "First Law for Closed Systems",
        "Enthalpy and Flow Work",
        "Steady Flow Energy Equation"
      ]
    },
    {
      title: "Second Law",
      lectures: [
        "Heat Engines and Refrigerators",
        "Entropy and Irreversibility",
        "Thermal Efficiency"
      ]
    }
  ],
  "Fluid Mechanics": [
    {
      title: "Fluid Properties and Statics",
      lectures: [
        "Density, Viscosity, and Surface Effects",
        "Hydrostatic Pressure",
        "Buoyancy and Stability"
      ]
    },
    {
      title: "Control Volume Analysis",
      lectures: [
        "Conservation of Mass",
        "Momentum Equation",
        "Bernoulli Equation"
      ]
    },
    {
      title: "Internal Flow",
      lectures: [
        "Laminar and Turbulent Flow",
        "Pipe Losses",
        "Pumps and System Curves"
      ]
    }
  ],
  "Machine Elements": [
    {
      title: "Design Loads",
      lectures: [
        "Static and Fatigue Loading",
        "Stress Concentrations",
        "Design Factors"
      ]
    },
    {
      title: "Power Transmission",
      lectures: [
        "Shaft Design",
        "Bearings and Lubrication",
        "Gears and Gear Trains"
      ]
    },
    {
      title: "Fastening and Reliability",
      lectures: [
        "Threaded Fasteners",
        "Welded Joints",
        "Reliability in Mechanical Design"
      ]
    }
  ],
  "Machine Design": [
    {
      title: "Design Loads and Failure",
      lectures: [
        "Static and Fatigue Loading",
        "Stress Concentrations",
        "Design Factors"
      ]
    },
    {
      title: "Transmission Components",
      lectures: [
        "Shaft Design",
        "Bearings and Lubrication",
        "Gears and Gear Trains"
      ]
    },
    {
      title: "Assembly Reliability",
      lectures: [
        "Threaded Fasteners",
        "Welded Joints",
        "Reliability in Mechanical Design"
      ]
    }
  ],
  "CAD for Engineers": [
    {
      title: "Parametric Modeling",
      lectures: [
        "Sketch Constraints and Dimensions",
        "Feature Trees and Design Intent",
        "Part Modeling Strategy"
      ]
    },
    {
      title: "Assemblies and Drawings",
      lectures: [
        "Assembly Mates and Constraints",
        "Exploded Views and Bill of Materials",
        "Engineering Drawings"
      ]
    },
    {
      title: "Manufacturing Communication",
      lectures: [
        "Tolerances and Fits",
        "Design for Manufacturing",
        "CAD Review and Revision Control"
      ]
    }
  ]
};

const thirdProblemTypes = [
  "free-body",
  "design-scenario",
  "challenge"
] as const;

function defaultDescription(course: CourseDefinition) {
  const domain =
    course.category === "Mathematics for Engineers"
      ? "mathematical modeling"
      : course.category === "Physics for Engineers"
        ? "physical reasoning"
        : "mechanical engineering analysis";

  return `${course.title} builds the ${domain} skills needed to make reliable engineering decisions, check assumptions, and communicate technical work clearly.`;
}

function defaultPrerequisites(course: CourseDefinition) {
  if (course.category === "Mathematics for Engineers") {
    return ["Algebra", "Functions", "Engineering problem solving mindset"];
  }

  if (course.category === "Physics for Engineers") {
    return ["Algebra", "Trigonometry", "Basic vectors"];
  }

  return ["Calculus I", "Physics mechanics", "Technical drawing basics"];
}

function defaultOutcomes(course: CourseDefinition) {
  return [
    `Use core ${course.title.toLowerCase()} vocabulary accurately`,
    "Build a model from assumptions, variables, and units",
    "Solve engineering-style problems and interpret the result"
  ];
}

function defaultBlueprint(course: CourseDefinition): ModuleBlueprint[] {
  const title = course.title.replace(/:.*/, "");
  return [
    {
      title: `${title} Foundations`,
      lectures: [
        `Core Variables in ${title}`,
        `Units, Assumptions, and Model Boundaries`,
        `Engineering Representation of ${title}`
      ]
    },
    {
      title: `${title} Analysis Methods`,
      lectures: [
        `Governing Relationships in ${title}`,
        `Problem Setup and Constraints`,
        `Interpreting Results and Sensitivity`
      ]
    },
    {
      title: `${title} Engineering Applications`,
      lectures: [
        `Design Case Studies in ${title}`,
        `Failure Modes and Common Checks`,
        `Project-Ready Problem Solving`
      ]
    }
  ];
}

function equationSet(course: CourseDefinition, lectureTitle: string) {
  const lower = `${course.title} ${lectureTitle}`.toLowerCase();

  if (lower.includes("vector") || lower.includes("force") || lower.includes("static")) {
    return [
      "Fx = F cos(theta)",
      "Fy = F sin(theta)",
      "Sum Fx = 0, Sum Fy = 0",
      "M = r x F"
    ];
  }

  if (lower.includes("dynamic") || lower.includes("mechanics") || lower.includes("motion")) {
    return ["v = dx/dt", "a = dv/dt", "Sum F = m a", "T1 + V1 = T2 + V2"];
  }

  if (lower.includes("thermo") || lower.includes("heat")) {
    return ["Delta U = Q - W", "h = u + pv", "eta = W_net / Q_in", "q = m c Delta T"];
  }

  if (lower.includes("fluid")) {
    return [
      "rho A V = constant",
      "p/rho g + V^2/2g + z = constant",
      "Re = rho V D / mu",
      "hL = f (L/D) V^2/2g"
    ];
  }

  if (lower.includes("cad") || lower.includes("design") || lower.includes("machine")) {
    return [
      "Clearance = hole size - shaft size",
      "n = strength / working stress",
      "tau = T r / J",
      "Power = torque x angular speed"
    ];
  }

  return [
    "dy/dx = lim(h -> 0) [f(x + h) - f(x)] / h",
    "Delta y approx f'(x) Delta x",
    "Integral f(x) dx represents accumulated change",
    "error = measured value - accepted value"
  ];
}

function makeWorkedExamples(course: CourseDefinition, moduleTitle: string, lectureTitle: string, seed: number) {
  const load = 80 + seed * 5;
  const arm = 0.25 + seed * 0.02;

  return [
    {
      title: "Model and Unit Check",
      problem: `A lab component is described by the topic ${lectureTitle}. Identify the governing relationship and verify that the result has engineering units.`,
      steps: [
        `List the known quantities from the ${moduleTitle.toLowerCase()} situation.`,
        "Choose the equation that connects the desired output to the known values.",
        "Substitute values with units shown at every step.",
        "Check whether the magnitude is physically reasonable for the component."
      ],
      conclusion:
        "A correct engineering calculation is not only numerically right; it is consistent with units, assumptions, and scale."
    },
    {
      title: "Component Decision",
      problem: `A bracket carries ${load} N at a lever arm of ${arm.toFixed(2)} m. Estimate the design effect that must be checked before release.`,
      steps: [
        `Compute the primary effect as ${load} x ${arm.toFixed(2)}.`,
        "Compare the result with allowable limits or a selected safety factor.",
        "Record the assumption that the load is static and applied at the stated arm.",
        "State what additional information would be needed for a final design."
      ],
      conclusion:
        "The method turns a simplified lecture model into a disciplined engineering design check."
    }
  ];
}

function makePracticeProblems(
  course: CourseDefinition,
  moduleTitle: string,
  lectureTitle: string,
  courseId: string,
  moduleIndex: number,
  lectureIndex: number
): PracticeProblem[] {
  const topic = `${course.title} / ${moduleTitle}`;
  const baseId = `${courseId}-${slugify(moduleTitle)}-${slugify(lectureTitle)}`;
  const numericValue = 24 + moduleIndex * 6 + lectureIndex * 3;
  const isStaticsForce =
    course.title === "Statics" && moduleTitle === "Force Vectors" && lectureTitle === "Scalars and Vectors";
  const thirdType = thirdProblemTypes[(moduleIndex + lectureIndex) % thirdProblemTypes.length];

  const concept: PracticeProblem = {
    id: `${baseId}-concept`,
    type: "concept",
    question: `When studying ${lectureTitle}, what is the strongest first check before trusting a calculation?`,
    response: {
      kind: "multiple-choice",
      options: [
        "The assumptions, units, and direction conventions are consistent.",
        "The final number has many decimal places.",
        "The diagram looks visually symmetric.",
        "The same formula was used in the previous lecture."
      ],
      correctOption: "The assumptions, units, and direction conventions are consistent."
    },
    hint: "Engineering calculations fail early when the model is unclear.",
    solution:
      "A calculation should begin with assumptions, units, coordinate directions, and known quantities. Precision does not fix a wrong model.",
    explanation:
      "This concept check reinforces disciplined setup before substitution.",
    topic
  };

  const calculation: PracticeProblem = isStaticsForce
    ? {
        id: "statics-force-001",
        type: "calculation",
        question:
          "A 200 N force acts at 30 degrees above the horizontal. Find the x and y components.",
        response: {
          kind: "vector",
          values: {
            Fx: 173.2,
            Fy: 100
          },
          tolerance: 0.5,
          unit: "N"
        },
        hint: "Use Fx = F cos(theta) and Fy = F sin(theta).",
        solution: "Fx = 200cos(30) = 173.2 N. Fy = 200sin(30) = 100 N.",
        explanation:
          "Resolving force vectors is the foundation for equilibrium, reactions, and member force calculations.",
        topic
      }
    : {
        id: `${baseId}-calculation`,
        type: (lectureIndex + moduleIndex) % 3 === 0 ? "unit-conversion" : "calculation",
        question:
          (lectureIndex + moduleIndex) % 3 === 0
            ? `Convert ${numericValue * 10} mm to meters for a ${lectureTitle.toLowerCase()} calculation.`
            : `A simplified ${lectureTitle.toLowerCase()} model uses a value of ${numericValue} and a factor of 2.5. Compute the design estimate.`,
        response:
          (lectureIndex + moduleIndex) % 3 === 0
            ? {
                kind: "numeric",
                value: (numericValue * 10) / 1000,
                tolerance: 0.001,
                unit: "m"
              }
            : {
                kind: "numeric",
                value: numericValue * 2.5,
                tolerance: 0.1
              },
        hint:
          (lectureIndex + moduleIndex) % 3 === 0
            ? "There are 1000 mm in 1 m."
            : "Multiply the base value by the engineering factor.",
        solution:
          (lectureIndex + moduleIndex) % 3 === 0
            ? `${numericValue * 10} mm x (1 m / 1000 mm) = ${((numericValue * 10) / 1000).toFixed(3)} m.`
            : `${numericValue} x 2.5 = ${(numericValue * 2.5).toFixed(1)}.`,
        explanation:
          "Numerical fluency matters because unit errors and scale errors can invalidate otherwise correct reasoning.",
        topic
      };

  const scenario: PracticeProblem = {
    id: `${baseId}-${thirdType}`,
    type: thirdType,
    question:
      thirdType === "free-body"
        ? `For a ${lectureTitle.toLowerCase()} problem, which item belongs on the free-body or system diagram?`
        : thirdType === "challenge"
          ? `A prototype result from ${lectureTitle.toLowerCase()} is outside the expected range. What is the best next engineering action?`
          : `Which design decision best reflects the lesson from ${lectureTitle}?`,
    response: {
      kind: "multiple-choice",
      options:
        thirdType === "free-body"
          ? [
              "All external interactions acting on the isolated body or system.",
              "Only forces that point to the right.",
              "Only dimensions that make the drawing look balanced.",
              "Internal forces that cancel inside the isolated part."
            ]
          : thirdType === "challenge"
            ? [
                "Audit assumptions, boundary conditions, units, and measurement quality before redesigning.",
                "Delete the largest data point and report the average.",
                "Increase every safety factor without diagnosing the model.",
                "Switch to a more complex equation immediately."
              ]
            : [
                "Select the option that satisfies function, safety, manufacturability, and verification.",
                "Choose the lightest part regardless of stress.",
                "Avoid documenting assumptions until the final report.",
                "Optimize one variable while ignoring constraints."
              ],
      correctOption:
        thirdType === "free-body"
          ? "All external interactions acting on the isolated body or system."
          : thirdType === "challenge"
            ? "Audit assumptions, boundary conditions, units, and measurement quality before redesigning."
            : "Select the option that satisfies function, safety, manufacturability, and verification."
    },
    hint:
      "A good engineering answer respects the model boundary and the design objective.",
    solution:
      "The best choice is the one that keeps the model physically honest and connects the calculation to verification.",
    explanation:
      "This scenario links lecture knowledge to the judgment required in mechanical engineering work.",
    topic
  };

  return [concept, calculation, scenario];
}

function makeLecture(
  course: CourseDefinition,
  courseId: string,
  moduleTitle: string,
  moduleId: string,
  lectureTitle: string,
  moduleIndex: number,
  lectureIndex: number,
  globalSeed: number
): Lecture {
  return {
    id: `${courseId}-${moduleIndex + 1}-${lectureIndex + 1}-${slugify(lectureTitle)}`,
    title: lectureTitle,
    courseId,
    courseTitle: course.title,
    category: course.category,
    moduleId,
    moduleTitle,
    estimatedMinutes: 18 + ((moduleIndex + lectureIndex) % 4) * 4,
    writtenExplanation: [
      `${lectureTitle} develops the model-building discipline needed for ${moduleTitle.toLowerCase()} in ${course.title}. The goal is to connect symbols, physical meaning, units, and assumptions before committing to computation.`,
      "In mechanical engineering, a correct result must be traceable. Each step should reveal what was isolated, what was assumed, which relationship was applied, and whether the magnitude could exist in a real component or system."
    ],
    keyEquations: equationSet(course, lectureTitle),
    applications: [
      "Checking design calculations before prototype release",
      "Explaining model assumptions in technical reports",
      "Building confidence in simulations, experiments, and hand calculations"
    ],
    workedExamples: makeWorkedExamples(course, moduleTitle, lectureTitle, globalSeed),
    diagramPrompt: `Diagram placeholder: ${lectureTitle} with labeled variables, coordinate axes, known quantities, and an engineering component boundary.`,
    importantConcept:
      "A model is useful only when the body or system boundary, sign convention, units, and assumptions are stated clearly.",
    commonMistake:
      "Students often substitute values before deciding what the system is. That hides sign errors, unit errors, and missing interactions.",
    engineersNote:
      "Practicing this topic builds the habit of checking whether a calculation can support a design decision, not just whether it produces a number.",
    practice: makePracticeProblems(
      course,
      moduleTitle,
      lectureTitle,
      courseId,
      moduleIndex,
      lectureIndex
    )
  };
}

function buildCourse(course: CourseDefinition, courseIndex: number): Course {
  const courseId = slugify(course.title);
  const blueprints = customBlueprints[course.title] ?? defaultBlueprint(course);
  const modules: CourseModule[] = blueprints.map((moduleBlueprint, moduleIndex) => {
    const moduleId = `${courseId}-module-${moduleIndex + 1}`;
    return {
      id: moduleId,
      title: moduleBlueprint.title,
      lectures: moduleBlueprint.lectures.map((lectureTitle, lectureIndex) =>
        makeLecture(
          course,
          courseId,
          moduleBlueprint.title,
          moduleId,
          lectureTitle,
          moduleIndex,
          lectureIndex,
          courseIndex + moduleIndex + lectureIndex + 1
        )
      )
    };
  });

  return {
    id: courseId,
    title: course.title,
    category: course.category,
    difficulty: course.difficulty,
    description: course.description ?? defaultDescription(course),
    prerequisites: course.prerequisites ?? defaultPrerequisites(course),
    outcomes: course.outcomes ?? defaultOutcomes(course),
    modules,
    sourceMaterials: getOcwSourcesForCourse(course.title)
  };
}

export const courses: Course[] = catalogDefinitions.map(buildCourse);

export const allLectures: Lecture[] = courses.flatMap((course) =>
  course.modules.flatMap((module) => module.lectures)
);

export const allPracticeProblems: PracticeProblem[] = allLectures.flatMap(
  (lecture) => lecture.practice
);

export function getCourseById(courseId: string) {
  return courses.find((course) => course.id === courseId);
}

export function getLectureById(lectureId: string) {
  return allLectures.find((lecture) => lecture.id === lectureId);
}

export function getLectureNeighbors(lectureId: string) {
  const index = allLectures.findIndex((lecture) => lecture.id === lectureId);
  return {
    previous: index > 0 ? allLectures[index - 1] : undefined,
    next: index >= 0 && index < allLectures.length - 1 ? allLectures[index + 1] : undefined
  };
}

export function getCourseLectureCount(course: Course) {
  return course.modules.reduce((total, module) => total + module.lectures.length, 0);
}

export function getNextIncompleteLecture(course: Course, completedLectures: string[]) {
  return course.modules
    .flatMap((module) => module.lectures)
    .find((lecture) => !completedLectures.includes(lecture.id));
}

export const featuredCourseIds = [
  "calculus-i-limits-derivatives-and-applications",
  "classical-mechanics",
  "statics",
  "dynamics",
  "mechanics-of-materials",
  "thermodynamics",
  "fluid-mechanics",
  "machine-design",
  "cad-for-engineers"
];
