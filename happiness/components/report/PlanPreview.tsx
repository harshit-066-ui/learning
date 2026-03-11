import React from "react";
import { generatePlan } from "../../lib/utils/planGenerator";

interface Props {
  weakestCategory: string;
}

const PlanPreview: React.FC<Props> = ({ weakestCategory }) => {

  const plan = generatePlan(weakestCategory);

  return (
    <div className="bg-green-50 border border-green-200 p-6 rounded-lg w-full max-w-4xl">

      <h3 className="text-xl font-semibold text-green-700 mb-4">
        7-Day Improvement Plan
      </h3>

      <ul className="space-y-2">

        {plan.map((task, i) => (

          <li key={i} className="text-gray-700">
            <b>Day {i + 1}:</b> {task}
          </li>

        ))}

      </ul>

    </div>
  );
};

export default PlanPreview;