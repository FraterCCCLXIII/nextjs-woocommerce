"use client";

import { useState, useEffect } from "react";

export default function PeptideCalculator() {
  const [peptideAmount, setPeptideAmount] = useState("5");
  const [peptideCustom, setPeptideCustom] = useState("");
  const [solventVolume, setSolventVolume] = useState("2");
  const [solventCustom, setSolventCustom] = useState("");
  const [desiredDose, setDesiredDose] = useState("0.1");
  const [doseCustomValue, setDoseCustomValue] = useState("");
  const [doseCustomUnit, setDoseCustomUnit] = useState("mg");
  const [syringeSize, setSyringeSize] = useState("0.5");
  const [result, setResult] = useState("");
  const [syringeBarWidth, setSyringeBarWidth] = useState(0);
  const [syringeText, setSyringeText] = useState("");
  const [syringeMarks, setSyringeMarks] = useState<Array<{ position: number; label?: number }>>([]);

  useEffect(() => {
    updateSyringeMeasurements();
  }, [syringeSize]);

  const updateSyringeMeasurements = () => {
    const size = parseFloat(syringeSize);
    let numMarks: number;

    switch (size) {
      case 0.3:
        numMarks = 30;
        break;
      case 0.5:
        numMarks = 50;
        break;
      case 1:
        numMarks = 100;
        break;
      default:
        numMarks = size * 100;
        break;
    }

    const marks: Array<{ position: number; label?: number }> = [];
    for (let i = 0; i <= numMarks; i += 1) {
      const position = (i / numMarks) * 100;
      if (i % 10 === 0) {
        marks.push({ position, label: i });
      } else {
        marks.push({ position });
      }
    }
    setSyringeMarks(marks);
  };

  const getValue = (selectValue: string, customValue: string): number => {
    if (selectValue === "Other") {
      return parseFloat(customValue) || 0;
    }
    return parseFloat(selectValue) || 0;
  };

  const getDoseValue = (): number => {
    if (desiredDose === "Other") {
      const value = parseFloat(doseCustomValue) || 0;
      if (doseCustomUnit === "mcg") {
        return value / 1000; // Convert mcg to mg
      }
      return value;
    }
    return parseFloat(desiredDose) || 0;
  };

  const calculate = () => {
    const peptide = getValue(peptideAmount, peptideCustom);
    const solvent = getValue(solventVolume, solventCustom);
    const dose = getDoseValue();
    const syringe = parseFloat(syringeSize);

    if (isNaN(peptide) || isNaN(solvent) || isNaN(dose) || isNaN(syringe)) {
      setResult("Please enter valid numbers.");
      setSyringeBarWidth(0);
      setSyringeText("");
      return;
    }

    if (peptide <= 0 || solvent <= 0 || dose <= 0 || syringe <= 0) {
      setResult("Please enter values greater than zero.");
      setSyringeBarWidth(0);
      setSyringeText("");
      return;
    }

    const concentration = peptide / solvent; // mg/mL
    const volumeToInject = dose / concentration; // mL

    if (volumeToInject > syringe) {
      setResult(
        `Error: Volume to inject (${volumeToInject.toFixed(2)} mL) exceeds syringe size (${syringe} mL).`
      );
      setSyringeBarWidth(0);
      setSyringeText("");
      return;
    }

    setResult(
      `You need to inject ${volumeToInject.toFixed(2)} mL to achieve ${dose} mg.`
    );
    const barWidth = (volumeToInject / syringe) * 100;
    setSyringeBarWidth(barWidth);

    const unit = Math.round(volumeToInject * 100);
    setSyringeText(`${unit}`);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-8 shadow-sm">
      {/* Peptide Mass */}
      <div className="mb-6">
        <label
          htmlFor="peptide-amount"
          className="block text-sm font-semibold text-gray-900 mb-2"
        >
          Peptide Mass (mg):
        </label>
        <div className="relative">
          <select
            id="peptide-amount"
            value={peptideAmount}
            onChange={(e) => {
              setPeptideAmount(e.target.value);
              setPeptideCustom("");
            }}
            className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900 focus:border-transparent appearance-none bg-white"
          >
            <option value="2">2 mg</option>
            <option value="3">3 mg</option>
            <option value="5">5 mg</option>
            <option value="10">10 mg</option>
            <option value="15">15 mg</option>
            <option value="Other">Other</option>
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        {peptideAmount === "Other" && (
          <input
            type="number"
            id="peptide-custom"
            value={peptideCustom}
            onChange={(e) => setPeptideCustom(e.target.value)}
            placeholder="Enter custom amount (mg)"
            className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          />
        )}
      </div>

      {/* Diluent Volume */}
      <div className="mb-6">
        <label
          htmlFor="solvent-volume"
          className="block text-sm font-semibold text-gray-900 mb-2"
        >
          Diluent Volume (mL):
        </label>
        <div className="relative">
          <select
            id="solvent-volume"
            value={solventVolume}
            onChange={(e) => {
              setSolventVolume(e.target.value);
              setSolventCustom("");
            }}
            className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900 focus:border-transparent appearance-none bg-white"
          >
            <option value="1">1 mL</option>
            <option value="2">2 mL</option>
            <option value="3">3 mL</option>
            <option value="5">5 mL</option>
            <option value="Other">Other</option>
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        {solventVolume === "Other" && (
          <input
            type="number"
            id="solvent-custom"
            value={solventCustom}
            onChange={(e) => setSolventCustom(e.target.value)}
            placeholder="Enter custom amount (mL)"
            className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          />
        )}
      </div>

      {/* Target Concentration */}
      <div className="mb-6">
        <label
          htmlFor="desired-dose"
          className="block text-sm font-semibold text-gray-900 mb-2"
        >
          Target Concentration (mg):
        </label>
        <div className="relative">
          <select
            id="desired-dose"
            value={desiredDose}
            onChange={(e) => {
              setDesiredDose(e.target.value);
              setDoseCustomValue("");
            }}
            className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900 focus:border-transparent appearance-none bg-white"
          >
            <option value="0.05">50 mcg</option>
            <option value="0.1">100 mcg</option>
            <option value="0.25">250 mcg</option>
            <option value="0.5">500 mcg</option>
            <option value="1">1 mg</option>
            <option value="2.5">2.5 mg</option>
            <option value="5">5 mg</option>
            <option value="10">10 mg</option>
            <option value="Other">Other</option>
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        {desiredDose === "Other" && (
          <div className="mt-2 flex gap-2">
            <input
              type="number"
              id="dose-custom-value"
              value={doseCustomValue}
              onChange={(e) => setDoseCustomValue(e.target.value)}
              placeholder="Enter custom dose"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
            <div className="relative">
              <select
                id="dose-custom-unit"
                value={doseCustomUnit}
                onChange={(e) => setDoseCustomUnit(e.target.value)}
                className="w-28 pl-4 pr-10 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900 focus:border-transparent appearance-none bg-white"
              >
                <option value="mg">mg</option>
                <option value="mcg">mcg</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Aliquot Volume */}
      <div className="mb-6">
        <label
          htmlFor="syringe-size"
          className="block text-sm font-semibold text-gray-900 mb-2"
        >
          Aliquot Volume (mL):
        </label>
        <div className="relative">
          <select
            id="syringe-size"
            value={syringeSize}
            onChange={(e) => setSyringeSize(e.target.value)}
            className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900 focus:border-transparent appearance-none bg-white"
          >
            <option value="0.3">0.3 mL</option>
            <option value="0.5">0.5 mL</option>
            <option value="1">1 mL</option>
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      <button
        onClick={calculate}
        className="w-full py-3 px-6 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
      >
        Calculate Concentration
      </button>

      {result && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Concentration Result:
          </h3>
          <p className="text-gray-700">{result}</p>
        </div>
      )}

      {/* Syringe Visualization */}
      <div className="mt-8">
        <div className="relative w-full h-8 bg-gray-100 border border-gray-300 overflow-hidden">
          <div
            className="absolute left-0 top-0 h-full bg-gray-900 transition-all duration-300"
            style={{ width: `${syringeBarWidth}%` }}
          />
          <div className="absolute inset-0 flex items-end">
            {syringeMarks.map((mark, index) => (
              <div
                key={index}
                className="absolute bottom-0 w-px h-2 bg-gray-600"
                style={{ left: `${mark.position}%`, transform: "translateX(-50%)" }}
              />
            ))}
          </div>
        </div>
        <div className="relative w-full h-6 mt-1">
          {syringeMarks
            .filter((mark) => mark.label !== undefined)
            .map((mark, index) => (
              <div
                key={index}
                className="absolute text-xs text-gray-600"
                style={{
                  left: `${mark.position}%`,
                  transform:
                    mark.position === 100
                      ? "translateX(-100%)"
                      : "translateX(-50%)",
                }}
              >
                {mark.label}
              </div>
            ))}
        </div>
        {syringeText && (
          <p className="mt-4 text-center font-semibold text-gray-900">
            Units: {syringeText}
          </p>
        )}
      </div>
    </div>
  );
}

