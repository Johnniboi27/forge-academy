import type { SourceMaterial, SourceMaterialWithCourses } from "@/types";
import { slugify } from "@/lib/slug";

const license = "CC BY-NC-SA 4.0 unless otherwise indicated on the linked OCW page";

const source = (
  courseNumber: string,
  title: string,
  url: string,
  resourceTypes: string[],
  note: string
): SourceMaterial => ({
  id: slugify(`${courseNumber}-${title}`),
  provider: "MIT OpenCourseWare",
  courseNumber,
  title,
  url,
  license,
  resourceTypes,
  note
});

export const generalOcwSource = source(
  "MIT OCW",
  "MIT OpenCourseWare",
  "https://ocw.mit.edu/",
  ["Course materials", "Lecture notes", "Assignments", "Exams"],
  "General MIT OpenCourseWare catalog reference for selecting rigorous course pathways."
);

export const ocwLicenseSource = source(
  "MIT OCW Terms",
  "Privacy and Terms of Use",
  "https://ocw.mit.edu/pages/privacy-and-terms-of-use/",
  ["License terms"],
  "MIT OCW states its general license terms, including attribution, noncommercial use, share-alike, and MIT name/logo restrictions."
);

export const ocwSourceByCourseTitle: Record<string, SourceMaterial[]> = {
  "Algebra and Trigonometry for Engineering": [
    source(
      "18.01SC",
      "Single Variable Calculus",
      "https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/",
      ["Lecture videos", "Lecture notes", "Problem sets", "Exams"],
      "Used as a downstream calculus reference for prerequisite algebra, trigonometry, and function fluency."
    )
  ],
  Precalculus: [
    source(
      "18.01SC",
      "Single Variable Calculus",
      "https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/",
      ["Lecture videos", "Lecture notes", "Problem sets", "Exams"],
      "Used to align prerequisite function, graph, limit, and trigonometric skills with MIT calculus expectations."
    )
  ],
  "Calculus I: Limits, Derivatives, and Applications": [
    source(
      "18.01SC",
      "Single Variable Calculus",
      "https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/",
      ["Lecture videos", "Lecture notes", "Worked examples", "Problem sets", "Exams"],
      "Primary OCW source for single-variable calculus sequencing, differentiation, applications, integration, and series context."
    ),
    source(
      "18.01",
      "Calculus I: Single Variable Calculus",
      "https://ocw.mit.edu/courses/18-01-calculus-i-single-variable-calculus-fall-2020/",
      ["Lecture videos", "Problem sets", "Exams"],
      "Modern MIT calculus reference used for additional topic alignment."
    )
  ],
  "Calculus II: Integrals, Series, and Applications": [
    source(
      "18.01SC",
      "Single Variable Calculus",
      "https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/",
      ["Lecture videos", "Lecture notes", "Worked examples", "Problem sets", "Exams"],
      "Reference for integration techniques, applications of the definite integral, and introductory series."
    )
  ],
  "Calculus III: Multivariable Calculus": [
    source(
      "18.02SC",
      "Multivariable Calculus",
      "https://ocw.mit.edu/courses/18-02sc-multivariable-calculus-fall-2010/",
      ["Lecture videos", "Lecture notes", "Problem sets", "Exams"],
      "Reference for vectors, partial derivatives, multiple integrals, and vector calculus."
    )
  ],
  "Linear Algebra for Engineers": [
    source(
      "18.06",
      "Linear Algebra",
      "https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/",
      ["Lecture videos", "Lecture notes", "Problem sets", "Exams"],
      "Reference for matrices, vector spaces, eigenvalues, and engineering computation."
    )
  ],
  "Differential Equations": [
    source(
      "18.03SC",
      "Differential Equations",
      "https://ocw.mit.edu/courses/18-03sc-differential-equations-fall-2011/",
      ["Lecture videos", "Lecture notes", "Problem sets", "Exams"],
      "Reference for ODE modeling, linear systems, Laplace transforms, and engineering dynamics."
    )
  ],
  "Probability and Statistics for Engineers": [
    source(
      "18.05",
      "Introduction to Probability and Statistics",
      "https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/",
      ["Lecture notes", "Problem sets", "Exams"],
      "Reference for uncertainty, distributions, estimation, and statistical reasoning."
    )
  ],
  "Numerical Methods": [
    source(
      "2.086",
      "Numerical Computation for Mechanical Engineers",
      "https://ocw.mit.edu/courses/2-086-numerical-computation-for-mechanical-engineers-fall-2012/",
      ["Lecture notes", "Assignments", "Projects"],
      "Mechanical-engineering numerical methods reference for computation and approximation."
    )
  ],
  "Engineering Data Analysis": [
    source(
      "18.05",
      "Introduction to Probability and Statistics",
      "https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/",
      ["Lecture notes", "Problem sets", "Exams"],
      "Reference for inference, probability models, and engineering data interpretation."
    )
  ],
  "Classical Mechanics": [
    source(
      "8.01SC",
      "Classical Mechanics",
      "https://ocw.mit.edu/courses/8-01sc-classical-mechanics-fall-2016/",
      ["Lecture videos", "Open textbook", "Problem sets"],
      "Primary OCW reference for Newtonian mechanics, conservation laws, rotation, and system modeling."
    )
  ],
  "AP Physics 1 Foundations": [
    source(
      "8.01L",
      "Physics I: Classical Mechanics",
      "https://ocw.mit.edu/courses/8-01l-physics-i-classical-mechanics-fall-2005/",
      ["Lecture notes", "Problem sets", "Exams"],
      "Reference for foundational mechanics at an introductory undergraduate level."
    )
  ],
  "AP Physics C: Mechanics": [
    source(
      "8.01SC",
      "Classical Mechanics",
      "https://ocw.mit.edu/courses/8-01sc-classical-mechanics-fall-2016/",
      ["Lecture videos", "Open textbook", "Problem sets"],
      "Reference for calculus-based mechanics preparation."
    )
  ],
  "Electricity and Magnetism": [
    source(
      "8.02",
      "Physics II: Electricity and Magnetism",
      "https://ocw.mit.edu/courses/8-02-physics-ii-electricity-and-magnetism-spring-2019/",
      ["Lecture videos", "Lecture notes", "Problem sets", "Exams"],
      "Reference for fields, circuits, electromagnetism, and physics problem solving."
    )
  ],
  "Waves and Oscillations": [
    source(
      "8.03SC",
      "Physics III: Vibrations and Waves",
      "https://ocw.mit.edu/courses/8-03sc-physics-iii-vibrations-and-waves-fall-2016/",
      ["Lecture videos", "Lecture notes", "Problem sets"],
      "Reference for oscillation, wave motion, resonance, and vibration fundamentals."
    )
  ],
  Thermodynamics: [
    source(
      "5.60",
      "Thermodynamics & Kinetics",
      "https://ocw.mit.edu/courses/5-60-thermodynamics-kinetics-spring-2008/",
      ["Lecture notes", "Lecture videos", "Exams"],
      "Reference for equilibrium thermodynamics, energy, entropy, and chemical/thermal systems."
    )
  ],
  "Fluid Physics": [
    source(
      "2.06",
      "Fluid Dynamics",
      "https://ocw.mit.edu/courses/2-06-fluid-dynamics-spring-2013/",
      ["Readings", "Assignments", "Exams"],
      "Reference for pressure, hydrostatics, control volumes, pipe flow, boundary layers, lift, and drag."
    )
  ],
  "Modern Physics": [
    source(
      "8.04",
      "Quantum Physics I",
      "https://ocw.mit.edu/courses/8-04-quantum-physics-i-spring-2016/",
      ["Lecture videos", "Lecture notes", "Assignments", "Exams"],
      "Reference for modern physics ideas that extend beyond classical mechanics."
    )
  ],
  "Experimental Physics and Lab Methods": [
    source(
      "8.13",
      "Experimental Physics I",
      "https://ocw.mit.edu/courses/8-13-14-experimental-physics-i-ii-junior-lab-fall-2016-spring-2017/",
      ["Labs", "Lecture notes", "Assignments"],
      "Reference for measurement, experimental design, and lab reporting."
    )
  ],
  "Computational Physics": [
    source(
      "8.01SC",
      "Classical Mechanics",
      "https://ocw.mit.edu/courses/8-01sc-classical-mechanics-fall-2016/",
      ["Lecture videos", "Open textbook", "Problem sets"],
      "Physics modeling reference paired with Forge Academy numerical practice."
    )
  ],
  "Introduction to Mechanical Engineering": [
    source(
      "2.000",
      "How and Why Machines Work",
      "https://ocw.mit.edu/courses/2-000-how-and-why-machines-work-spring-2002/",
      ["Lecture notes", "Labs", "Written assignments"],
      "Reference for machine thinking, sketching, CAD exposure, and hands-on mechanical reasoning."
    )
  ],
  "Engineering Graphics and CAD": [
    source(
      "RES.16-002",
      "How to CAD Almost Anything",
      "https://ocw.mit.edu/courses/res-16-002-how-to-cad-almost-anything-january-iap-2024/",
      ["Lecture notes", "Lecture videos", "Instructor insights"],
      "Reference for CAD strategy, reverse engineering, and multi-tool CAD workflows."
    )
  ],
  "CAD for Engineers": [
    source(
      "RES.16-002",
      "How to CAD Almost Anything",
      "https://ocw.mit.edu/courses/res-16-002-how-to-cad-almost-anything-january-iap-2024/",
      ["Lecture notes", "Lecture videos", "Instructor insights"],
      "Primary OCW source for CAD workflow and reverse-engineering practice."
    )
  ],
  Statics: [
    source(
      "2.001",
      "Mechanics & Materials I",
      "https://ocw.mit.edu/courses/2-001-mechanics-materials-i-fall-2006/",
      ["Lecture notes", "Problem sets"],
      "Reference for mechanics analysis: geometry, forces, material behavior, and structural equilibrium."
    ),
    source(
      "1.050",
      "Solid Mechanics",
      "https://ocw.mit.edu/courses/1-050-solid-mechanics-fall-2004/",
      ["Lecture notes", "Problem sets", "Exams"],
      "Additional statics and strength-of-materials reference."
    )
  ],
  Dynamics: [
    source(
      "2.003SC",
      "Engineering Dynamics",
      "https://ocw.mit.edu/courses/2-003sc-engineering-dynamics-fall-2011/",
      ["Lecture videos", "Lecture notes", "Problem sets", "Exams"],
      "Primary OCW source for kinematics, force-momentum methods, work-energy, and rigid body motion."
    ),
    source(
      "2.003J",
      "Dynamics and Control I",
      "https://ocw.mit.edu/courses/2-003j-dynamics-and-control-i-fall-2007/",
      ["Lecture videos", "Problem sets", "Programming assignments"],
      "Reference for dynamics, vibrations, linearization, and MATLAB-based modeling."
    )
  ],
  "Mechanics of Materials": [
    source(
      "2.001",
      "Mechanics & Materials I",
      "https://ocw.mit.edu/courses/2-001-mechanics-materials-i-fall-2006/",
      ["Lecture notes", "Problem sets"],
      "Primary reference for stress, strain, structures, and material behavior."
    ),
    source(
      "3.11",
      "Mechanics of Materials",
      "https://ocw.mit.edu/courses/3-11-mechanics-of-materials-fall-1999/",
      ["Open textbook", "Problem sets"],
      "Additional reference for continuum stress, strain, torsion, bending, and materials."
    )
  ],
  "Materials Science": [
    source(
      "3.032",
      "Mechanical Behavior of Materials",
      "https://ocw.mit.edu/courses/3-032-mechanical-behavior-of-materials-fall-2007/",
      ["Lecture notes", "Problem sets", "Exams"],
      "Reference for elastic/plastic deformation, creep, fracture, and materials behavior."
    )
  ],
  "Manufacturing Processes": [
    source(
      "2.008",
      "Design and Manufacturing II",
      "https://ocw.mit.edu/courses/2-008-design-and-manufacturing-ii-spring-2025/",
      ["Assignments", "Projects", "Manufacturing content"],
      "Reference for modern manufacturing processes, equipment, systems, and design for manufacturing."
    )
  ],
  "Mechanical Design": [
    source(
      "2.007",
      "Design and Manufacturing I",
      "https://ocw.mit.edu/courses/2-007-design-and-manufacturing-i-spring-2009/",
      ["Lecture notes", "Design assignments", "Projects"],
      "Reference for generating, analyzing, and refining electromechanical device designs."
    ),
    source(
      "2.75",
      "Precision Machine Design",
      "https://ocw.mit.edu/courses/2-75-precision-machine-design-fall-2001/",
      ["Lecture notes", "Design assignments", "Projects"],
      "Reference for precision engineering, error budgeting, sensors, actuators, bearings, and system design."
    )
  ],
  "Machine Design": [
    source(
      "2.72",
      "Elements of Mechanical Design",
      "https://ocw.mit.edu/courses/2-72-elements-of-mechanical-design-spring-2009/",
      ["Lecture notes", "Labs", "Problem sets", "Projects"],
      "Primary OCW source for machine elements, bearings, springs, gears, cams, mechanisms, and fabrication constraints."
    )
  ],
  "Machine Elements": [
    source(
      "2.72",
      "Elements of Mechanical Design",
      "https://ocw.mit.edu/courses/2-72-elements-of-mechanical-design-spring-2009/",
      ["Lecture notes", "Labs", "Problem sets", "Projects"],
      "Reference for machine elements and hands-on mechanical design synthesis."
    )
  ],
  "Fluid Mechanics": [
    source(
      "2.06",
      "Fluid Dynamics",
      "https://ocw.mit.edu/courses/2-06-fluid-dynamics-spring-2013/",
      ["Readings", "Assignments", "Exams"],
      "Primary undergraduate reference for fluid statics, control volumes, internal flow, boundary layers, lift, and drag."
    ),
    source(
      "2.25",
      "Advanced Fluid Mechanics",
      "https://ocw.mit.edu/courses/2-25-advanced-fluid-mechanics-fall-2013/",
      ["Problem sets", "Problem set solutions", "Exams"],
      "Advanced reference for continuum equations, Navier-Stokes, dimensional analysis, vorticity, and boundary layers."
    )
  ],
  "Heat Transfer": [
    source(
      "2.51",
      "Intermediate Heat and Mass Transfer",
      "https://ocw.mit.edu/courses/2-51-intermediate-heat-and-mass-transfer-fall-2008/",
      ["Lecture notes", "Assignments", "Exams"],
      "Reference for conduction, convection, boiling/condensation, mass transfer, and radiation."
    )
  ],
  "Thermodynamics for Mechanical Engineers": [
    source(
      "2.43",
      "Advanced Thermodynamics",
      "https://ocw.mit.edu/courses/2-43-advanced-thermodynamics-spring-2024/",
      ["Lecture slides", "Lecture videos", "Homework", "Exams"],
      "Advanced thermodynamics reference for phase equilibria, transport, and energy systems."
    ),
    source(
      "5.60",
      "Thermodynamics & Kinetics",
      "https://ocw.mit.edu/courses/5-60-thermodynamics-kinetics-spring-2008/",
      ["Lecture notes", "Lecture videos", "Exams"],
      "Foundational thermodynamics reference."
    )
  ],
  "Internal Combustion Engines": [
    source(
      "2.61",
      "Internal Combustion Engines",
      "https://ocw.mit.edu/courses/2-61-internal-combustion-engines-spring-2017/",
      ["Lecture notes", "Problem sets", "Problem set solutions", "Exams"],
      "Reference for engine cycles, combustion, performance, and emissions."
    )
  ],
  "Combustion and Propulsion": [
    source(
      "16.01",
      "Unified Engineering: Thermodynamics and Propulsion",
      "https://ocw.mit.edu/courses/16-01-unified-engineering-i-ii-iii-iv-fall-2005-spring-2006/",
      ["Lecture notes", "Assignments", "Exams"],
      "Reference for propulsion and thermo-mechanical energy conversion."
    )
  ],
  "Robotics and Mechatronics": [
    source(
      "2.737",
      "Mechatronics",
      "https://ocw.mit.edu/courses/2-737-mechatronics-fall-2014/",
      ["Lecture notes", "Labs", "Projects"],
      "Reference for integrated mechanical, electrical, sensor, and actuator systems."
    )
  ],
  "Control Systems": [
    source(
      "2.004",
      "Modeling Dynamics and Control II",
      "https://ocw.mit.edu/courses/2-004-modeling-dynamics-and-control-ii-spring-2003/",
      ["Problem sets", "Problem set solutions"],
      "Reference for sensors, actuators, feedback, root-locus, frequency response, and case studies."
    )
  ],
  Vibrations: [
    source(
      "2.003J",
      "Dynamics and Control I",
      "https://ocw.mit.edu/courses/2-003j-dynamics-and-control-i-fall-2007/",
      ["Lecture videos", "Problem sets", "Programming assignments"],
      "Reference for free and forced vibration of lumped-parameter mechanical systems."
    )
  ],
  "Finite Element Analysis": [
    source(
      "2.092",
      "Finite Element Analysis of Solids and Fluids I",
      "https://ocw.mit.edu/courses/2-092-finite-element-analysis-of-solids-and-fluids-i-fall-2009/",
      ["Lecture notes", "Assignments", "Projects"],
      "Reference for finite element modeling and numerical analysis of engineering systems."
    )
  ],
  "Computational Fluid Dynamics Introduction": [
    source(
      "2.29",
      "Numerical Fluid Mechanics",
      "https://ocw.mit.edu/courses/2-29-numerical-fluid-mechanics-spring-2015/",
      ["Lecture notes", "Assignments", "Projects"],
      "Reference for computational fluid modeling and numerical fluid mechanics."
    )
  ],
  "HVAC and Energy Systems": [
    source(
      "2.51",
      "Intermediate Heat and Mass Transfer",
      "https://ocw.mit.edu/courses/2-51-intermediate-heat-and-mass-transfer-fall-2008/",
      ["Lecture notes", "Assignments", "Exams"],
      "Heat and mass transfer reference for building energy and thermal systems."
    )
  ],
  "Engineering Design Process": [
    source(
      "2.007",
      "Design and Manufacturing I",
      "https://ocw.mit.edu/courses/2-007-design-and-manufacturing-i-spring-2009/",
      ["Lecture notes", "Design assignments", "Projects"],
      "Reference for iterative design, electromechanical devices, and project-centered engineering."
    )
  ],
  "Senior Capstone Design Preparation": [
    source(
      "2.009",
      "Product Engineering Processes",
      "https://ocw.mit.edu/courses/2-009-product-engineering-process-fall-2021/",
      ["Lecture videos", "Projects", "Instructor insights"],
      "Reference for team-based product engineering, process, design reviews, and final presentations."
    )
  ]
};

export const allOcwSources: SourceMaterialWithCourses[] = Object.entries(
  ocwSourceByCourseTitle
).reduce<SourceMaterialWithCourses[]>((sources, [forgeCourse, courseSources]) => {
  courseSources.forEach((courseSource) => {
    const existing = sources.find((sourceItem) => sourceItem.url === courseSource.url);

    if (existing) {
      if (!existing.forgeCourses.includes(forgeCourse)) {
        existing.forgeCourses.push(forgeCourse);
      }
      return;
    }

    sources.push({
      ...courseSource,
      forgeCourses: [forgeCourse]
    });
  });

  return sources;
}, []);

export const ocwResourceTypes = Array.from(
  new Set(allOcwSources.flatMap((sourceItem) => sourceItem.resourceTypes))
).sort((a, b) => a.localeCompare(b));

export function getOcwSourcesForCourse(title: string) {
  return ocwSourceByCourseTitle[title] ?? [generalOcwSource];
}
