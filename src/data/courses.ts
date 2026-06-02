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

interface TopicProfile {
  key: string;
  label: string;
  system: string;
  equations: string[];
  conceptCorrect: string;
  conceptDistractors: string[];
  designCorrect: string;
  designDistractors: string[];
  commonCheck: string;
}

function getTopicProfile(
  course: CourseDefinition,
  moduleTitle: string,
  lectureTitle: string
): TopicProfile {
  const lower = `${course.title} ${moduleTitle} ${lectureTitle}`.toLowerCase();

  if (lower.includes("linear algebra")) {
    return {
      key: "linear-algebra",
      label: "matrix model",
      system: "coupled engineering equations",
      equations: [
        "A x = b",
        "det(A) != 0 for a unique solution",
        "A v = lambda v",
        "||x|| = sqrt(x1^2 + x2^2 + ... + xn^2)"
      ],
      conceptCorrect: "Check matrix dimensions and whether the unknown vector matches the physical variables.",
      conceptDistractors: [
        "Multiply matrices in any order because the same numbers appear.",
        "Ignore units once the equations are placed in matrix form.",
        "Assume every square matrix has a stable inverse."
      ],
      designCorrect: "Use the matrix form to expose coupling, rank, and sensitivity before trusting a solver result.",
      designDistractors: [
        "Invert every matrix manually without checking conditioning.",
        "Drop small coefficients without explaining the modeling effect.",
        "Treat eigenvalues as labels instead of system behavior indicators."
      ],
      commonCheck: "Dimensions, rank, conditioning, and unit consistency"
    };
  }

  if (lower.includes("probability") || lower.includes("statistics") || lower.includes("data analysis")) {
    return {
      key: "statistics",
      label: "uncertainty model",
      system: "engineering data set",
      equations: [
        "z = (x - mu) / sigma",
        "SE = s / sqrt(n)",
        "CI = estimate +/- critical value x SE",
        "P(A and B) = P(A | B) P(B)"
      ],
      conceptCorrect: "Identify the population, sample, uncertainty source, and assumptions behind the distribution.",
      conceptDistractors: [
        "Use the largest sample value as the expected design value.",
        "Report a mean without variability because the average is enough.",
        "Assume correlation proves a mechanical cause."
      ],
      designCorrect: "Use uncertainty bounds to decide whether the data supports the engineering claim.",
      designDistractors: [
        "Hide outliers without a measurement reason.",
        "Use more decimal places as a substitute for confidence.",
        "Compare test groups without checking sample size or variance."
      ],
      commonCheck: "Sample size, variance, confidence level, and measurement bias"
    };
  }

  if (lower.includes("differential")) {
    return {
      key: "differential-equations",
      label: "dynamic model",
      system: "time-varying mechanical system",
      equations: [
        "dy/dt = f(t, y)",
        "m x'' + c x' + k x = F(t)",
        "Y(s) = L{y(t)}",
        "steady state + transient response = total response"
      ],
      conceptCorrect: "Connect each derivative to a physical rate, storage term, or forcing effect.",
      conceptDistractors: [
        "Solve the equation before defining the initial condition.",
        "Treat every transient as measurement noise.",
        "Remove damping because it makes the algebra shorter."
      ],
      designCorrect: "Use the solution behavior to predict stability, settling, and sensitivity to inputs.",
      designDistractors: [
        "Choose constants only to make the graph look smooth.",
        "Ignore initial conditions once the equation is written.",
        "Assume linear behavior outside the modeled range."
      ],
      commonCheck: "Initial conditions, forcing function, stability, and units of each derivative"
    };
  }

  if (lower.includes("numerical") || lower.includes("finite element") || lower.includes("computational fluid")) {
    return {
      key: "numerical-methods",
      label: "discretized model",
      system: "computational engineering model",
      equations: [
        "residual = A x - b",
        "error approx C h^p",
        "x_{k+1} = x_k - f(x_k) / f'(x_k)",
        "CFL = u Delta t / Delta x"
      ],
      conceptCorrect: "Check convergence, discretization error, boundary conditions, and solver residuals.",
      conceptDistractors: [
        "Trust the mesh because the plot looks detailed.",
        "Use the default time step without a stability check.",
        "Treat a small residual as proof that the model is physically correct."
      ],
      designCorrect: "Compare mesh or time-step refinement before using the result in a design decision.",
      designDistractors: [
        "Use the finest mesh once and skip verification.",
        "Change geometry and mesh at the same time during validation.",
        "Ignore boundary-condition sensitivity."
      ],
      commonCheck: "Residuals, convergence rate, mesh independence, and boundary conditions"
    };
  }

  if (lower.includes("calculus") || lower.includes("precalculus") || lower.includes("algebra") || lower.includes("trigonometry")) {
    return {
      key: "calculus",
      label: "mathematical function model",
      system: "engineering relationship between variables",
      equations: [
        "f'(x) = lim(h -> 0) [f(x + h) - f(x)] / h",
        "Delta y approx f'(x) Delta x",
        "Integral_a^b f(x) dx = accumulated change",
        "sin^2(theta) + cos^2(theta) = 1"
      ],
      conceptCorrect: "Identify the input, output, units, and whether the problem asks for rate or accumulation.",
      conceptDistractors: [
        "Differentiate or integrate first and assign units later.",
        "Assume every graph is linear near the design point.",
        "Use degrees and radians interchangeably."
      ],
      designCorrect: "Use the function behavior to locate rates, extrema, and accumulated physical quantities.",
      designDistractors: [
        "Optimize a formula outside its valid domain.",
        "Ignore discontinuities because the equation is convenient.",
        "Treat symbolic simplification as engineering validation."
      ],
      commonCheck: "Domain, units, rate versus accumulation, and angle convention"
    };
  }

  if (lower.includes("electricity") || lower.includes("magnetism")) {
    return {
      key: "electricity-magnetism",
      label: "electromechanical circuit model",
      system: "sensor, actuator, or circuit",
      equations: [
        "V = I R",
        "P = V I",
        "F = q(E + v x B)",
        "tau = N I A B sin(theta)"
      ],
      conceptCorrect: "Define the field, current path, polarity, and energy conversion direction.",
      conceptDistractors: [
        "Choose current direction after calculating the answer.",
        "Ignore sign conventions because voltage is scalar.",
        "Treat magnetic force as always parallel to velocity."
      ],
      designCorrect: "Check power, polarity, heat generation, and actuator force before selecting components.",
      designDistractors: [
        "Size the circuit only by nominal voltage.",
        "Ignore sensor loading on the measured signal.",
        "Use magnetic equations without a geometry check."
      ],
      commonCheck: "Polarity, reference direction, power, and component limits"
    };
  }

  if (lower.includes("waves") || lower.includes("oscillation") || lower.includes("vibrations")) {
    return {
      key: "vibrations",
      label: "oscillating system",
      system: "spring-mass, wave, or vibration mode",
      equations: [
        "omega_n = sqrt(k / m)",
        "f = 1 / T",
        "c_c = 2 sqrt(k m)",
        "zeta = c / c_c"
      ],
      conceptCorrect: "Separate frequency, amplitude, damping, and phase before interpreting the response.",
      conceptDistractors: [
        "Treat high amplitude and high frequency as the same issue.",
        "Ignore damping because it is hard to measure.",
        "Use static stiffness to describe every dynamic response."
      ],
      designCorrect: "Compare natural frequency to excitation frequency and add damping or stiffness when needed.",
      designDistractors: [
        "Increase mass without checking the new resonance.",
        "Tune stiffness from one data point only.",
        "Ignore mode shape because the scalar frequency is known."
      ],
      commonCheck: "Natural frequency, damping ratio, excitation frequency, and mode shape"
    };
  }

  if (lower.includes("modern") || lower.includes("quantum")) {
    return {
      key: "modern-physics",
      label: "modern physics model",
      system: "microscale material or energy interaction",
      equations: [
        "E = h f",
        "p = h / lambda",
        "E_k = h f - phi",
        "Delta E = E_final - E_initial"
      ],
      conceptCorrect: "Identify the scale, energy level, and measurement limit before applying a classical analogy.",
      conceptDistractors: [
        "Use Newtonian particle intuition for every microscale result.",
        "Ignore quantization when energy levels are discrete.",
        "Treat wavelength as a visual-only property."
      ],
      designCorrect: "Connect the model to material behavior, sensors, radiation, or measurement resolution.",
      designDistractors: [
        "Assume macroscale formulas stay valid at all scales.",
        "Use frequency without checking photon energy.",
        "Ignore uncertainty introduced by the measurement method."
      ],
      commonCheck: "Scale, energy, wavelength, and measurement assumptions"
    };
  }

  if (lower.includes("experimental") || lower.includes("lab")) {
    return {
      key: "experimental-methods",
      label: "measurement system",
      system: "engineering experiment",
      equations: [
        "percent error = |measured - accepted| / accepted x 100",
        "uncertainty_total = sqrt(u1^2 + u2^2 + ...)",
        "SNR = signal / noise",
        "calibrated value = slope x reading + offset"
      ],
      conceptCorrect: "Define calibration, uncertainty, repeatability, and the measurement chain.",
      conceptDistractors: [
        "Use a single trial because the equipment is digital.",
        "Report precision without calibration.",
        "Average readings before checking bias."
      ],
      designCorrect: "Use uncertainty and repeatability to decide whether the experiment can validate the model.",
      designDistractors: [
        "Treat the cleanest run as the true result.",
        "Ignore sensor placement because the sensor is calibrated.",
        "Change the procedure after seeing the result."
      ],
      commonCheck: "Calibration, uncertainty, repeatability, and bias"
    };
  }

  if (lower.includes("thermo") || lower.includes("engine") || lower.includes("combustion") || lower.includes("propulsion")) {
    return {
      key: "thermodynamics",
      label: "thermal energy system",
      system: "engine, heat pump, or control volume",
      equations: [
        "Delta U = Q - W",
        "h = u + p v",
        "eta = W_net / Q_in",
        "q = m c_p Delta T"
      ],
      conceptCorrect: "Define the system boundary, heat/work sign convention, state properties, and process path.",
      conceptDistractors: [
        "Use temperature change alone as the complete energy balance.",
        "Mix closed-system and control-volume equations.",
        "Ignore losses because efficiency is reported separately."
      ],
      designCorrect: "Check energy balance, efficiency, heat rejection, and property states before sizing hardware.",
      designDistractors: [
        "Maximize work output without heat-rejection limits.",
        "Compare cycles without specifying the same boundary.",
        "Use ideal-gas assumptions without checking the state."
      ],
      commonCheck: "System boundary, property state, process path, and sign convention"
    };
  }

  if (lower.includes("fluid") || lower.includes("hvac")) {
    return {
      key: "fluid-mechanics",
      label: "flow system",
      system: "pipe, duct, pump, or external-flow body",
      equations: [
        "rho A V = constant",
        "p/(rho g) + V^2/(2g) + z = constant",
        "Re = rho V D / mu",
        "h_L = f (L/D) V^2/(2g)"
      ],
      conceptCorrect: "Identify compressibility, control volume, flow regime, and pressure-loss assumptions.",
      conceptDistractors: [
        "Apply Bernoulli across a pump without adding pump head.",
        "Ignore viscosity whenever the pipe is short.",
        "Use laminar formulas after the Reynolds number is turbulent."
      ],
      designCorrect: "Use flow rate, pressure loss, pump/duct limits, and Reynolds number to size the system.",
      designDistractors: [
        "Select a pump from flow rate alone.",
        "Ignore fittings and entrance losses.",
        "Use one velocity value for every section without area checks."
      ],
      commonCheck: "Continuity, pressure losses, Reynolds number, and control-volume boundary"
    };
  }

  if (lower.includes("heat transfer")) {
    return {
      key: "heat-transfer",
      label: "heat-transfer path",
      system: "wall, fin, heat exchanger, or cooled component",
      equations: [
        "q_cond = k A Delta T / L",
        "q_conv = h A (T_s - T_inf)",
        "q_rad = epsilon sigma A (T_s^4 - T_sur^4)",
        "R_total = R_cond + R_conv + R_contact"
      ],
      conceptCorrect: "Identify the heat-transfer mode, area, temperature difference, and thermal resistance path.",
      conceptDistractors: [
        "Add conduction and convection coefficients directly.",
        "Use Celsius temperatures in radiation terms.",
        "Ignore contact resistance in assembled parts."
      ],
      designCorrect: "Compare thermal resistance paths and surface conditions before selecting a cooling strategy.",
      designDistractors: [
        "Increase area without checking pressure drop or packaging.",
        "Use a heat sink rating without boundary conditions.",
        "Treat radiation as negligible without a temperature check."
      ],
      commonCheck: "Heat-transfer mode, area, temperature scale, and resistance network"
    };
  }

  if (lower.includes("materials science") || lower.includes("mechanics of materials")) {
    return {
      key: "mechanics-materials",
      label: "stress and material response",
      system: "loaded member or material specimen",
      equations: [
        "sigma = P / A",
        "epsilon = Delta L / L",
        "tau = T r / J",
        "sigma_b = M y / I"
      ],
      conceptCorrect: "Identify load type, section geometry, stress location, and material limit.",
      conceptDistractors: [
        "Use tensile strength for every loading mode.",
        "Ignore stress concentration because nominal stress is lower.",
        "Compare stress values without the same area definition."
      ],
      designCorrect: "Check stress, strain, deflection, and safety factor against the material behavior.",
      designDistractors: [
        "Use yield strength without considering fatigue.",
        "Reduce thickness before checking deflection.",
        "Ignore manufacturing defects in a brittle material."
      ],
      commonCheck: "Load path, section property, failure mode, and safety factor"
    };
  }

  if (lower.includes("control")) {
    return {
      key: "control-systems",
      label: "feedback system",
      system: "controlled mechanical plant",
      equations: [
        "G_cl(s) = G(s) / (1 + G(s)H(s))",
        "e(t) = r(t) - y(t)",
        "percent overshoot = exp(-zeta pi / sqrt(1 - zeta^2)) x 100",
        "tau = 1 / bandwidth"
      ],
      conceptCorrect: "Define the plant, sensor, actuator, feedback sign, and performance requirement.",
      conceptDistractors: [
        "Add gain until the response looks fast.",
        "Ignore sensor noise because feedback will correct it.",
        "Use open-loop behavior to claim closed-loop stability."
      ],
      designCorrect: "Balance stability margin, rise time, overshoot, actuator limits, and sensor noise.",
      designDistractors: [
        "Tune for speed without checking saturation.",
        "Remove filtering because it adds phase lag.",
        "Ignore disturbance rejection."
      ],
      commonCheck: "Feedback sign, stability margin, bandwidth, and actuator saturation"
    };
  }

  if (lower.includes("robotics") || lower.includes("mechatronics")) {
    return {
      key: "robotics-mechatronics",
      label: "mechatronic subsystem",
      system: "robot joint, sensor, or actuator",
      equations: [
        "tau = r x F",
        "P = tau omega",
        "theta_dot = J(q) q_dot",
        "resolution = range / counts"
      ],
      conceptCorrect: "Connect mechanical load, actuator capacity, sensor resolution, and control timing.",
      conceptDistractors: [
        "Choose a motor from speed rating alone.",
        "Ignore backlash because the controller can compensate perfectly.",
        "Use sensor range without checking resolution."
      ],
      designCorrect: "Check torque, speed, sensing, wiring, and controller bandwidth as one integrated system.",
      designDistractors: [
        "Oversize the actuator without thermal analysis.",
        "Place sensors wherever packaging is easiest.",
        "Tune software before validating the mechanism."
      ],
      commonCheck: "Torque, speed, sensor resolution, backlash, and timing"
    };
  }

  if (lower.includes("cad") || lower.includes("graphics")) {
    return {
      key: "cad",
      label: "CAD design intent",
      system: "parametric part, drawing, or assembly",
      equations: [
        "clearance = hole size - shaft size",
        "tolerance stack = sqrt(t1^2 + t2^2 + ...)",
        "scale factor = drawing length / actual length",
        "mass = density x volume"
      ],
      conceptCorrect: "Preserve design intent with stable references, constraints, dimensions, and tolerances.",
      conceptDistractors: [
        "Fully define sketches by eye because the model looks correct.",
        "Reference temporary edges that may disappear after edits.",
        "Leave tolerances until manufacturing asks for them."
      ],
      designCorrect: "Use constraints, datum choices, assembly references, and tolerances to make the model editable.",
      designDistractors: [
        "Model every fillet first because it improves appearance.",
        "Use decorative dimensions as manufacturing dimensions.",
        "Suppress failed features without understanding dependencies."
      ],
      commonCheck: "Constraints, datums, references, tolerances, and manufacturability"
    };
  }

  if (lower.includes("manufacturing") || lower.includes("machine") || lower.includes("mechanical design") || lower.includes("design process") || lower.includes("capstone")) {
    return {
      key: "machine-design",
      label: "machine design decision",
      system: "mechanical component or assembly",
      equations: [
        "n = allowable stress / working stress",
        "P = tau omega",
        "L_10 = (C / P)^p x 10^6 rev",
        "tau = T r / J"
      ],
      conceptCorrect: "Translate function into loads, failure modes, manufacturability, and verification tests.",
      conceptDistractors: [
        "Choose the lightest component before checking fatigue.",
        "Use catalog ratings without matching duty cycle.",
        "Treat manufacturability as separate from design."
      ],
      designCorrect: "Select geometry, material, process, and safety factor around the critical failure mode.",
      designDistractors: [
        "Optimize one part while ignoring assembly constraints.",
        "Increase safety factor without diagnosing uncertainty.",
        "Skip tolerance review until the prototype fails."
      ],
      commonCheck: "Load case, failure mode, process constraint, and verification plan"
    };
  }

  if (lower.includes("statics") || lower.includes("force") || lower.includes("equilibrium") || lower.includes("moment")) {
    return {
      key: "statics",
      label: "equilibrium model",
      system: "rigid body or particle at rest",
      equations: [
        "Sum F_x = 0",
        "Sum F_y = 0",
        "Sum M_O = 0",
        "M = r x F"
      ],
      conceptCorrect: "Draw the isolated body, external forces, support reactions, dimensions, and moment point.",
      conceptDistractors: [
        "Include internal forces from inside the isolated body.",
        "Use the same sign convention only after solving.",
        "Choose a moment point without considering unknown reactions."
      ],
      designCorrect: "Use equilibrium to find reactions and load paths before sizing members or joints.",
      designDistractors: [
        "Size the part from the largest applied force only.",
        "Ignore support type because the body is not moving.",
        "Assume symmetry without checking geometry and loading."
      ],
      commonCheck: "Free-body boundary, reaction directions, dimensions, and moment balance"
    };
  }

  if (lower.includes("dynamic") || lower.includes("mechanics") || lower.includes("motion")) {
    return {
      key: "dynamics",
      label: "motion and force model",
      system: "moving particle or rigid body",
      equations: [
        "v = dx/dt",
        "a = dv/dt",
        "Sum F = m a",
        "T_1 + V_1 + U_12 = T_2 + V_2"
      ],
      conceptCorrect: "Define the coordinate system, acceleration components, constraints, and inertial frame.",
      conceptDistractors: [
        "Use speed as acceleration because both describe motion.",
        "Ignore constraint directions once the path is known.",
        "Apply energy methods without checking nonconservative work."
      ],
      designCorrect: "Use kinematics and kinetics together to predict loads, speeds, impacts, and actuator demand.",
      designDistractors: [
        "Design from static load when acceleration is significant.",
        "Ignore rotational inertia in a fast mechanism.",
        "Use final speed without checking the motion path."
      ],
      commonCheck: "Coordinate system, acceleration, constraints, and inertial assumptions"
    };
  }

  return {
    key: "engineering-modeling",
    label: "engineering model",
    system: "mechanical engineering problem",
    equations: [
      "model output = f(inputs, assumptions)",
      "safety factor = capacity / demand",
      "error = measured value - predicted value",
      "percent change = Delta value / reference value x 100"
    ],
    conceptCorrect: "State the objective, assumptions, variables, units, and validation check.",
    conceptDistractors: [
      "Substitute values before defining the system.",
      "Use the most familiar equation regardless of assumptions.",
      "Report a result without comparing it to a requirement."
    ],
    designCorrect: "Connect the calculation to a requirement, verification method, and engineering decision.",
    designDistractors: [
      "Optimize a number without understanding its constraint.",
      "Skip validation because the equation is standard.",
      "Use visual plausibility as the only design check."
    ],
    commonCheck: "Objective, assumptions, units, constraints, and validation"
  };
}

function equationSet(course: CourseDefinition, moduleTitle: string, lectureTitle: string) {
  const profile = getTopicProfile(course, moduleTitle, lectureTitle);
  return [
    ...profile.equations.slice(0, 3),
    `${course.title} / ${moduleTitle} / ${lectureTitle}: ${profile.commonCheck}`
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
  const profile = getTopicProfile(course, moduleTitle, lectureTitle);
  const thirdType = thirdProblemTypes[(moduleIndex + lectureIndex) % thirdProblemTypes.length];
  const seed = 18 + moduleIndex * 7 + lectureIndex * 5 + course.title.length;

  const concept: PracticeProblem = {
    id: `${baseId}-concept`,
    type: "concept",
    question: `In ${course.title}, ${lectureTitle} focuses on a ${profile.label}. What should be checked first?`,
    response: {
      kind: "multiple-choice",
      options: [profile.conceptCorrect, ...profile.conceptDistractors],
      correctOption: profile.conceptCorrect
    },
    hint: `Focus on the ${profile.system} and the assumptions that make the model valid.`,
    solution: `${profile.conceptCorrect} This keeps the ${profile.label} tied to the actual engineering situation before any arithmetic begins.`,
    explanation:
      `This concept check is specific to ${moduleTitle}: the strongest setup step is not generic precision, but the correct model boundary for ${profile.system}.`,
    topic
  };

  const calculation = makeCalculationProblem(
    profile,
    course,
    moduleTitle,
    lectureTitle,
    baseId,
    seed,
    topic
  );

  const scenario: PracticeProblem = {
    id: `${baseId}-${thirdType}`,
    type: thirdType,
    question:
      thirdType === "free-body"
          ? `For ${course.title} / ${lectureTitle}, what belongs on the diagram or system sketch for the ${profile.system}?`
        : thirdType === "challenge"
          ? `In ${course.title} / ${moduleTitle}, a result from ${lectureTitle} conflicts with the expected ${profile.label}. What is the best next engineering action?`
          : `Which ${course.title} design decision best reflects ${moduleTitle} / ${lectureTitle} for the ${profile.system}?`,
    response: {
      kind: "multiple-choice",
      options:
        thirdType === "free-body"
          ? [
              `${profile.conceptCorrect}`,
              "Only the values that make the sketch visually balanced.",
              "Only interactions that point in the positive coordinate direction.",
              "Internal details that are outside the chosen system boundary."
            ]
          : thirdType === "challenge"
            ? [
                `Audit ${profile.commonCheck.toLowerCase()} before changing the design.`,
                "Delete the most inconvenient data point and recalculate.",
                "Use a more complex equation before checking assumptions.",
                "Increase every safety factor without identifying the uncertainty."
              ]
            : [
                profile.designCorrect,
                ...profile.designDistractors
              ],
      correctOption:
        thirdType === "free-body"
          ? profile.conceptCorrect
          : thirdType === "challenge"
            ? `Audit ${profile.commonCheck.toLowerCase()} before changing the design.`
            : profile.designCorrect
    },
    hint: `Tie the decision to ${profile.commonCheck.toLowerCase()}.`,
    solution: `The best choice is the one that preserves ${profile.commonCheck.toLowerCase()} for the ${profile.system}.`,
    explanation:
      `This scenario is intentionally tied to ${course.title}; overlapping courses may share physics, but the engineering check differs by topic and system.`,
    topic
  };

  return [concept, calculation, scenario];
}

function makeCalculationProblem(
  profile: TopicProfile,
  course: CourseDefinition,
  moduleTitle: string,
  lectureTitle: string,
  baseId: string,
  seed: number,
  topic: string
): PracticeProblem {
  const context = `${course.title} / ${moduleTitle} / ${lectureTitle}`;

  if (profile.key === "statics") {
    const force = 120 + seed * 3;
    const angle = 30 + (seed % 4) * 5;
    const radians = (angle * Math.PI) / 180;
    return {
      id: `${baseId}-force-components`,
      type: "calculation",
      question: `${context}: A ${force} N force acts ${angle} degrees above the positive x-axis. Find Fx and Fy.`,
      response: {
        kind: "vector",
        values: {
          Fx: Number((force * Math.cos(radians)).toFixed(1)),
          Fy: Number((force * Math.sin(radians)).toFixed(1))
        },
        tolerance: 0.6,
        unit: "N"
      },
      hint: "Resolve the force with Fx = F cos(theta) and Fy = F sin(theta).",
      solution: `Fx = ${force}cos(${angle}) and Fy = ${force}sin(${angle}). Keep the sign convention tied to the chosen axes.`,
      explanation: "Statics practice needs force components and directions before equilibrium equations can be trusted.",
      topic
    };
  }

  if (profile.key === "dynamics") {
    const mass = 4 + (seed % 6);
    const force = 30 + seed;
    return {
      id: `${baseId}-acceleration`,
      type: "calculation",
      question: `${context}: A ${mass} kg carriage is pulled by a net force of ${force} N. Find the acceleration.`,
      response: {
        kind: "numeric",
        value: Number((force / mass).toFixed(2)),
        tolerance: 0.05,
        unit: "m/s^2"
      },
      hint: "Use Sum F = m a after confirming the force is net force.",
      solution: `a = F / m = ${force} / ${mass} = ${(force / mass).toFixed(2)} m/s^2.`,
      explanation: "Dynamics calculations must distinguish applied force from net force after constraints and friction.",
      topic
    };
  }

  if (profile.key === "mechanics-materials") {
    const load = 20 + seed;
    const area = 80 + seed * 2;
    const stress = (load * 1000) / area;
    return {
      id: `${baseId}-stress`,
      type: "calculation",
      question: `${context}: A member carries ${load} kN over ${area} mm^2. Estimate the average normal stress in MPa.`,
      response: {
        kind: "numeric",
        value: Number(stress.toFixed(1)),
        tolerance: 0.5,
        unit: "MPa"
      },
      hint: "In N/mm^2, sigma = P/A and 1 N/mm^2 = 1 MPa.",
      solution: `sigma = (${load} x 1000 N) / ${area} mm^2 = ${stress.toFixed(1)} MPa.`,
      explanation: "Mechanics of materials questions must track area definition and load path.",
      topic
    };
  }

  if (profile.key === "thermodynamics") {
    const mass = 2 + (seed % 4);
    const cp = 1.0;
    const deltaT = 25 + seed;
    const heat = mass * cp * deltaT;
    return {
      id: `${baseId}-energy-balance`,
      type: "calculation",
      question: `${context}: ${mass} kg of air is heated by ${deltaT} K. Using cp = 1.0 kJ/(kg K), estimate heat input.`,
      response: {
        kind: "numeric",
        value: Number(heat.toFixed(1)),
        tolerance: 0.2,
        unit: "kJ"
      },
      hint: "Use q = m cp Delta T for this simplified constant-pressure heating model.",
      solution: `q = ${mass} x ${cp.toFixed(1)} x ${deltaT} = ${heat.toFixed(1)} kJ.`,
      explanation: "Thermodynamics practice starts by defining the boundary and process model.",
      topic
    };
  }

  if (profile.key === "fluid-mechanics") {
    const area = Number((0.015 + (seed % 5) * 0.004).toFixed(3));
    const velocity = 2 + (seed % 7);
    const flow = area * velocity;
    return {
      id: `${baseId}-flow-rate`,
      type: "calculation",
      question: `${context}: Water flows through an area of ${area} m^2 at ${velocity} m/s. Find the volume flow rate.`,
      response: {
        kind: "numeric",
        value: Number(flow.toFixed(3)),
        tolerance: 0.002,
        unit: "m^3/s"
      },
      hint: "For incompressible flow, Q = A V.",
      solution: `Q = ${area} x ${velocity} = ${flow.toFixed(3)} m^3/s.`,
      explanation: "Fluid mechanics questions require matching flow area, velocity, and control-volume assumptions.",
      topic
    };
  }

  if (profile.key === "heat-transfer") {
    const k = 12 + (seed % 8);
    const area = Number((0.4 + (seed % 4) * 0.1).toFixed(1));
    const deltaT = 30 + seed;
    const length = Number((0.08 + (seed % 3) * 0.02).toFixed(2));
    const heatRate = (k * area * deltaT) / length;
    return {
      id: `${baseId}-conduction`,
      type: "calculation",
      question: `${context}: A wall has k = ${k} W/(m K), A = ${area} m^2, Delta T = ${deltaT} K, and L = ${length} m. Estimate conduction heat rate.`,
      response: {
        kind: "numeric",
        value: Number(heatRate.toFixed(0)),
        tolerance: 2,
        unit: "W"
      },
      hint: "Use q = k A Delta T / L.",
      solution: `q = ${k} x ${area} x ${deltaT} / ${length} = ${heatRate.toFixed(0)} W.`,
      explanation: "Heat-transfer calculations must identify the mode and thermal path before combining resistances.",
      topic
    };
  }

  if (profile.key === "machine-design" || profile.key === "robotics-mechatronics") {
    const torque = 8 + seed;
    const speed = 12 + (seed % 8);
    const power = torque * speed;
    return {
      id: `${baseId}-power`,
      type: "calculation",
      question: `${context}: A shaft transmits ${torque} N m at ${speed} rad/s. Estimate mechanical power.`,
      response: {
        kind: "numeric",
        value: Number(power.toFixed(1)),
        tolerance: 0.2,
        unit: "W"
      },
      hint: "Use P = torque x angular speed.",
      solution: `P = ${torque} x ${speed} = ${power.toFixed(1)} W.`,
      explanation: "Machine design practice connects loads and motion to component selection.",
      topic
    };
  }

  if (profile.key === "cad") {
    const hole = Number((10 + (seed % 5) * 0.2).toFixed(1));
    const shaft = Number((hole - 0.3).toFixed(1));
    return {
      id: `${baseId}-clearance`,
      type: "calculation",
      question: `${context}: A hole is ${hole} mm and a shaft is ${shaft} mm. Find the clearance.`,
      response: {
        kind: "numeric",
        value: Number((hole - shaft).toFixed(2)),
        tolerance: 0.01,
        unit: "mm"
      },
      hint: "Clearance is hole size minus shaft size.",
      solution: `clearance = ${hole} - ${shaft} = ${(hole - shaft).toFixed(2)} mm.`,
      explanation: "CAD and drawings need dimensions that communicate fit, not just geometry.",
      topic
    };
  }

  if (profile.key === "control-systems" || profile.key === "vibrations") {
    const stiffness = 1200 + seed * 20;
    const mass = 6 + (seed % 5);
    const omega = Math.sqrt(stiffness / mass);
    return {
      id: `${baseId}-natural-frequency`,
      type: "calculation",
      question: `${context}: A mass-spring approximation has k = ${stiffness} N/m and m = ${mass} kg. Estimate natural angular frequency.`,
      response: {
        kind: "numeric",
        value: Number(omega.toFixed(2)),
        tolerance: 0.05,
        unit: "rad/s"
      },
      hint: "Use omega_n = sqrt(k/m).",
      solution: `omega_n = sqrt(${stiffness}/${mass}) = ${omega.toFixed(2)} rad/s.`,
      explanation: "Vibration and control design must compare natural response with excitation and bandwidth.",
      topic
    };
  }

  if (profile.key === "electricity-magnetism") {
    const current = 2 + (seed % 5);
    const resistance = 12 + seed;
    const voltage = current * resistance;
    return {
      id: `${baseId}-ohms-law`,
      type: "calculation",
      question: `${context}: A sensor circuit carries ${current} A through ${resistance} ohms. Find voltage drop.`,
      response: {
        kind: "numeric",
        value: voltage,
        tolerance: 0.1,
        unit: "V"
      },
      hint: "Use V = I R.",
      solution: `V = ${current} x ${resistance} = ${voltage} V.`,
      explanation: "Electrical calculations in mechatronics still need polarity, power, and component limits.",
      topic
    };
  }

  if (profile.key === "statistics") {
    const sample = 40 + seed;
    const mean = 35 + (seed % 8);
    const deviation = 5 + (seed % 3);
    const z = (sample - mean) / deviation;
    return {
      id: `${baseId}-z-score`,
      type: "calculation",
      question: `${context}: A test value is ${sample}, with mean ${mean} and standard deviation ${deviation}. Find the z-score.`,
      response: {
        kind: "numeric",
        value: Number(z.toFixed(2)),
        tolerance: 0.03
      },
      hint: "Use z = (x - mu) / sigma.",
      solution: `z = (${sample} - ${mean}) / ${deviation} = ${z.toFixed(2)}.`,
      explanation: "Data analysis practice should keep uncertainty and comparison scale visible.",
      topic
    };
  }

  if (profile.key === "linear-algebra") {
    const a = 2 + (seed % 4);
    const b = 1 + (seed % 3);
    const c = 3 + (seed % 5);
    const d = 4 + (seed % 6);
    const determinant = a * d - b * c;
    return {
      id: `${baseId}-determinant`,
      type: "calculation",
      question: `${context}: For matrix [[${a}, ${b}], [${c}, ${d}]], find the determinant.`,
      response: {
        kind: "numeric",
        value: determinant,
        tolerance: 0.01
      },
      hint: "For a 2 by 2 matrix, det(A) = ad - bc.",
      solution: `det(A) = ${a} x ${d} - ${b} x ${c} = ${determinant}.`,
      explanation: "The determinant check helps decide whether a two-equation engineering system has a unique solution.",
      topic
    };
  }

  if (profile.key === "calculus" || profile.key === "differential-equations") {
    const a = 2 + (seed % 4);
    const b = 3 + (seed % 5);
    const x = 1 + (seed % 6);
    const slope = 2 * a * x + b;
    return {
      id: `${baseId}-slope`,
      type: "calculation",
      question: `${context}: For f(x) = ${a}x^2 + ${b}x, find f'(${x}).`,
      response: {
        kind: "numeric",
        value: slope,
        tolerance: 0.01
      },
      hint: "Differentiate first: f'(x) = 2ax + b.",
      solution: `f'(x) = ${2 * a}x + ${b}; f'(${x}) = ${slope}.`,
      explanation: "Calculus practice should distinguish a rate at a point from accumulated change over an interval.",
      topic
    };
  }

  if (profile.key === "experimental-methods") {
    const accepted = 100 + seed;
    const measured = accepted + 3 + (seed % 4);
    const percentError = (Math.abs(measured - accepted) / accepted) * 100;
    return {
      id: `${baseId}-percent-error`,
      type: "calculation",
      question: `${context}: A calibrated value is ${accepted} and a measured value is ${measured}. Find percent error.`,
      response: {
        kind: "numeric",
        value: Number(percentError.toFixed(2)),
        tolerance: 0.03,
        unit: "%"
      },
      hint: "Use percent error = |measured - accepted| / accepted x 100.",
      solution: `percent error = |${measured} - ${accepted}| / ${accepted} x 100 = ${percentError.toFixed(2)}%.`,
      explanation: "Experimental methods require uncertainty and calibration checks, not just a single measured value.",
      topic
    };
  }

  const value = 20 + seed;
  const factor = 1.5 + (seed % 5) * 0.2;
  const estimate = value * factor;

  return {
    id: `${baseId}-topic-estimate`,
    type: (seed + moduleTitle.length) % 3 === 0 ? "unit-conversion" : "calculation",
    question: `${context}: A ${profile.label} uses ${value} as the baseline and ${factor.toFixed(1)} as the topic factor. Compute the estimate.`,
    response: {
      kind: "numeric",
      value: Number(estimate.toFixed(1)),
      tolerance: 0.1
    },
    hint: `Use the ${profile.label} relationship and keep the ${profile.commonCheck.toLowerCase()} visible.`,
    solution: `${value} x ${factor.toFixed(1)} = ${estimate.toFixed(1)}.`,
    explanation: `The arithmetic is simple, but the topic-specific check is ${profile.commonCheck.toLowerCase()}.`,
    topic
  };
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
    keyEquations: equationSet(course, moduleTitle, lectureTitle),
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

function normalizePrerequisite(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

const prerequisiteAliases: Record<string, string> = {
  algebra: "algebra-and-trigonometry-for-engineering",
  trigonometry: "algebra-and-trigonometry-for-engineering",
  functions: "precalculus",
  "precalculus functions": "precalculus",
  "calculus i": "calculus-i-limits-derivatives-and-applications",
  "calculus 1": "calculus-i-limits-derivatives-and-applications",
  "calculus ii": "calculus-ii-integrals-series-and-applications",
  "calculus 2": "calculus-ii-integrals-series-and-applications",
  "calculus iii": "calculus-iii-multivariable-calculus",
  "calculus 3": "calculus-iii-multivariable-calculus",
  "basic vectors": "linear-algebra-for-engineers",
  "vector components": "linear-algebra-for-engineers",
  "vector algebra": "linear-algebra-for-engineers",
  "physics mechanics": "classical-mechanics",
  "engineering graphics": "engineering-graphics-and-cad",
  "technical drawing basics": "engineering-graphics-and-cad",
  "basic geometry": "engineering-graphics-and-cad",
  "material properties": "materials-science",
  "manufacturing basics": "manufacturing-processes",
  "mechanical design curiosity": "introduction-to-mechanical-engineering",
  "engineering problem solving mindset": "engineering-design-process"
};

export function getCourseForPrerequisite(prerequisite: string, currentCourseId?: string) {
  const normalized = normalizePrerequisite(prerequisite);
  const aliasId = prerequisiteAliases[normalized];
  const aliasCourse = aliasId ? getCourseById(aliasId) : undefined;

  if (aliasCourse && aliasCourse.id !== currentCourseId) {
    return aliasCourse;
  }

  const exactCourse = courses.find(
    (course) => normalizePrerequisite(course.title) === normalized
  );

  if (exactCourse && exactCourse.id !== currentCourseId) {
    return exactCourse;
  }

  const prefixCourse = courses.find((course) =>
    normalizePrerequisite(course.title).startsWith(normalized)
  );

  if (prefixCourse && prefixCourse.id !== currentCourseId) {
    return prefixCourse;
  }

  return undefined;
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
