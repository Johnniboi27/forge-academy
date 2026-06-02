import type { Formula } from "@/types";
import { slugify } from "@/lib/slug";

const formulasWithoutIds: Omit<Formula, "id">[] = [
  {
    name: "Quadratic Formula",
    category: "Algebra",
    equation: "x = (-b +/- sqrt(b^2 - 4ac)) / 2a",
    variables: ["a, b, c: polynomial coefficients", "x: roots of the equation"],
    unitNotes: "Coefficients must be in compatible units for the modeled quantity.",
    exampleUseCase: "Solving a parabolic trajectory or design constraint."
  },
  {
    name: "Sine and Cosine Components",
    category: "Trigonometry",
    equation: "Fx = F cos(theta), Fy = F sin(theta)",
    variables: ["F: vector magnitude", "theta: angle from positive x-axis"],
    unitNotes: "Components have the same units as the original vector.",
    exampleUseCase: "Resolving a cable force into horizontal and vertical components."
  },
  {
    name: "Derivative Definition",
    category: "Calculus",
    equation: "f'(x) = lim(h -> 0) [f(x + h) - f(x)] / h",
    variables: ["f(x): function", "h: small change in input"],
    unitNotes: "Derivative units are output units divided by input units.",
    exampleUseCase: "Finding velocity from displacement or heat rate from energy."
  },
  {
    name: "Definite Integral",
    category: "Calculus",
    equation: "Integral from a to b of f(x) dx",
    variables: ["f(x): rate or density", "a, b: interval limits"],
    unitNotes: "Integral units combine the function units and input units.",
    exampleUseCase: "Accumulating distributed load into total force."
  },
  {
    name: "Newton's Second Law",
    category: "Physics Mechanics",
    equation: "Sum F = m a",
    variables: ["Sum F: net force", "m: mass", "a: acceleration"],
    unitNotes: "Use newtons, kilograms, and meters per second squared.",
    exampleUseCase: "Predicting acceleration of a moving machine carriage."
  },
  {
    name: "Work and Kinetic Energy",
    category: "Physics Mechanics",
    equation: "U = Delta T = 1/2 m v2^2 - 1/2 m v1^2",
    variables: ["U: work", "m: mass", "v1, v2: speeds"],
    unitNotes: "Work and kinetic energy are measured in joules.",
    exampleUseCase: "Estimating required actuator work."
  },
  {
    name: "Moment of a Force",
    category: "Statics",
    equation: "M = r x F",
    variables: ["r: position vector", "F: force vector", "M: moment vector"],
    unitNotes: "Moment is commonly reported in N m.",
    exampleUseCase: "Calculating support reactions for a loaded beam."
  },
  {
    name: "Planar Equilibrium",
    category: "Statics",
    equation: "Sum Fx = 0, Sum Fy = 0, Sum M = 0",
    variables: ["Fx, Fy: force components", "M: moments about a point"],
    unitNotes: "Use consistent force and length units.",
    exampleUseCase: "Solving reactions at a pin and roller support."
  },
  {
    name: "Impulse and Momentum",
    category: "Dynamics",
    equation: "Integral F dt = m v2 - m v1",
    variables: ["F: force", "t: time", "m: mass", "v: velocity"],
    unitNotes: "Impulse units are N s, equivalent to kg m/s.",
    exampleUseCase: "Sizing a stopper for a moving cart."
  },
  {
    name: "Axial Stress",
    category: "Mechanics of Materials",
    equation: "sigma = P / A",
    variables: ["sigma: normal stress", "P: axial load", "A: cross-sectional area"],
    unitNotes: "Stress is force per area, commonly Pa or MPa.",
    exampleUseCase: "Checking if a tie rod is below allowable stress."
  },
  {
    name: "Beam Flexure Formula",
    category: "Mechanics of Materials",
    equation: "sigma = M y / I",
    variables: ["M: bending moment", "y: distance from neutral axis", "I: area moment of inertia"],
    unitNotes: "Keep force, length, and area moment units consistent.",
    exampleUseCase: "Estimating maximum stress in a loaded beam."
  },
  {
    name: "First Law of Thermodynamics",
    category: "Thermodynamics",
    equation: "Delta U = Q - W",
    variables: ["Delta U: change in internal energy", "Q: heat added", "W: work done by system"],
    unitNotes: "Energy terms are measured in joules or kilojoules.",
    exampleUseCase: "Analyzing piston-cylinder compression."
  },
  {
    name: "Continuity Equation",
    category: "Fluid Mechanics",
    equation: "rho A V = constant",
    variables: ["rho: density", "A: flow area", "V: average velocity"],
    unitNotes: "For incompressible flow, A1 V1 = A2 V2.",
    exampleUseCase: "Finding velocity change through a nozzle."
  },
  {
    name: "Bernoulli Equation",
    category: "Fluid Mechanics",
    equation: "p/rho g + V^2/2g + z = constant",
    variables: ["p: pressure", "rho: density", "V: velocity", "z: elevation"],
    unitNotes: "Each term has units of length when using SI head form.",
    exampleUseCase: "Estimating pressure differences in a pipe or duct."
  },
  {
    name: "Conduction Heat Transfer",
    category: "Heat Transfer",
    equation: "q = -k A dT/dx",
    variables: ["q: heat transfer rate", "k: conductivity", "A: area", "dT/dx: temperature gradient"],
    unitNotes: "Heat transfer rate is watts.",
    exampleUseCase: "Estimating heat loss through a wall."
  },
  {
    name: "Gear Speed Ratio",
    category: "Machine Design",
    equation: "omega_out / omega_in = N_in / N_out",
    variables: ["omega: angular speed", "N: gear teeth count"],
    unitNotes: "Speed ratio is dimensionless.",
    exampleUseCase: "Selecting gears to reduce motor speed."
  }
];

export const formulas: Formula[] = formulasWithoutIds.map((formula) => ({
  ...formula,
  id: slugify(`${formula.category}-${formula.name}`)
}));

export const formulaCategories = Array.from(
  new Set(formulas.map((formula) => formula.category))
);
