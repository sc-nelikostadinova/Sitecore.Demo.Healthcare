'use client';
import { faRotateBack, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect, useCallback } from 'react';
import { THEME_PRESETS, THEME_VARIABLES } from 'src/helpers/themeEditor';

export const ThemeEditor = () => {
  const [defaultVars, setDefaultVars] = useState<Record<string, string>>({});
  const [vars, setVars] = useState<Record<string, string>>({});
  const [customPresets, setCustomPresets] = useState<Record<string, Record<string, string>>>({});
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);

  useEffect(() => {
    // Only store defaults once
    if (!localStorage.getItem('theme-defaults')) {
      localStorage.setItem('theme-defaults', JSON.stringify(getThemeVariables()));
    }

    const defaults = JSON.parse(localStorage.getItem('theme-defaults') ?? '{}') as Record<
      string,
      string
    >;
    const saved = JSON.parse(localStorage.getItem('theme-vars') ?? '{}') as Record<string, string>;
    const savedCustomPresets = JSON.parse(localStorage.getItem('custom-presets') ?? '{}') as Record<
      string,
      Record<string, string>
    >;

    THEME_PRESETS.Default = defaults;

    setDefaultVars(defaults);
    const initialVars = { ...defaults, ...saved };
    setVars(initialVars);
    setCustomPresets(savedCustomPresets);

    Object.entries(saved).forEach(([name, value]) => {
      document.documentElement.style.setProperty(name, value);
    });
  }, []);

  const updateVar = (name: string, value: string) => {
    document.documentElement.style.setProperty(name, value);
    const updated = { ...vars, [name]: value };
    setVars(updated);
    localStorage.setItem('theme-vars', JSON.stringify(updated));
    detectPreset(updated);
  };

  const resetVar = (name: string) => {
    const defaultValue = defaultVars[name];
    document.documentElement.style.removeProperty(name);
    const updated = { ...vars, [name]: defaultValue };
    setVars(updated);
    localStorage.setItem('theme-vars', JSON.stringify(updated));
    detectPreset(updated);
  };

  const resetVars = () => {
    Object.keys(getThemeVariables()).forEach((name) => {
      document.documentElement.style.removeProperty(name);
    });
    localStorage.removeItem('theme-vars');
    setVars(defaultVars);
    detectPreset(defaultVars);
  };

  const applyPreset = (presetName: string, isCustom = false) => {
    const preset = isCustom ? customPresets[presetName] : THEME_PRESETS[presetName];
    Object.entries(preset).forEach(([name, value]) => {
      document.documentElement.style.setProperty(name, value);
    });
    setVars(preset);
    localStorage.setItem('theme-vars', JSON.stringify(preset));
    setSelectedPreset(presetName);
  };

  const saveCustomPreset = (name: string) => {
    if (!name) return;
    const updated = { ...customPresets, [name]: { ...vars } };
    setCustomPresets(updated);
    localStorage.setItem('custom-presets', JSON.stringify(updated));
  };

  const deleteCustomPreset = (name: string) => {
    const updated = { ...customPresets };
    delete updated[name];
    setCustomPresets(updated);
    localStorage.setItem('custom-presets', JSON.stringify(updated));
    if (selectedPreset === name) setSelectedPreset(null);
  };

  const hasChanges = Object.keys(defaultVars).some((key) => vars[key] !== defaultVars[key]);

  const findMatchingPreset = useCallback(
    (varsToCheck: Record<string, string>): string | null => {
      for (const [presetName, presetVars] of Object.entries(THEME_PRESETS)) {
        const isMatch = Object.keys(presetVars).every(
          (key) => varsToCheck[key] === presetVars[key]
        );
        if (isMatch) return presetName;
      }
      for (const [presetName, presetVars] of Object.entries(customPresets)) {
        const isMatch = Object.keys(presetVars).every(
          (key) => varsToCheck[key] === presetVars[key]
        );
        if (isMatch) return presetName;
      }
      return null;
    },
    [customPresets]
  );

  const detectPreset = useCallback(
    (updatedVars: Record<string, string>) => {
      const match = findMatchingPreset(updatedVars);
      setSelectedPreset(match);
    },
    [findMatchingPreset]
  );

  useEffect(() => {
    detectPreset(vars);
  }, [detectPreset, vars]);

  return (
    <section className="my-12">
      <div className="container">
        <div className="flex justify-between items-center gap-8 mb-12">
          <h2 className="text-4xl mb-0">Theme Editor</h2>
          <button onClick={resetVars} className="btn btn-icon" disabled={!hasChanges}>
            Reset All <FontAwesomeIcon icon={faRotateBack} />
          </button>
        </div>
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl">Predefined themes:</h3>
              <div className="flex gap-4 flex-wrap">
                {Object.keys(THEME_PRESETS).map((name) => (
                  <button
                    key={name}
                    onClick={() => applyPreset(name)}
                    className={`btn ${selectedPreset === name ? '' : 'btn-outline'}`}
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-2xl">Your custom themes:</h3>
              <div className="flex flex-col gap-4 flex-wrap">
                {Object.keys(customPresets).map((name) => (
                  <div key={name} className="flex items-stretch gap-2">
                    <button
                      onClick={() => applyPreset(name, true)}
                      className={`btn ${selectedPreset === name ? '' : 'btn-outline'}`}
                    >
                      {name}
                    </button>
                    <button
                      onClick={() => deleteCustomPreset(name)}
                      className="btn btn-icon btn-outline"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-2xl">Save current theme as a new preset:</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Preset name"
                  id="new-preset-name"
                  className="form-input border shadow-none"
                />
                <button
                  className="btn btn-outline shrink-0"
                  onClick={() => {
                    const input = document.getElementById('new-preset-name') as HTMLInputElement;
                    saveCustomPreset(input.value);
                    input.value = '';
                  }}
                >
                  Save Preset
                </button>
              </div>
            </div>
          </div>
          <div className="justify-self-end">
            <div className="space-y-4 mb-8">
              {Object.entries(vars).map(([name, value]) => {
                const defaultValue = defaultVars[name];
                const isChanged = value !== defaultValue;

                return (
                  <div key={name} className="flex items-center gap-4">
                    <label className="w-64 text-sm font-medium">{name}</label>
                    <input
                      type={isColor(value) ? 'color' : 'text'}
                      value={formatForInput(value)}
                      onChange={(e) => updateVar(name, e.target.value)}
                      className="border rounded px-2 py-1 w-32"
                    />
                    <button
                      onClick={() => resetVar(name)}
                      className="btn btn-icon"
                      disabled={!isChanged}
                    >
                      <FontAwesomeIcon icon={faRotateBack} />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

function getThemeVariables() {
  return THEME_VARIABLES.reduce((acc, name) => {
    acc[name] = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    return acc;
  }, {} as Record<string, string>);
}

function isColor(value: string) {
  return /^#([0-9A-F]{3}){1,2}$/i.test(value);
}

function formatForInput(value: string) {
  return value.startsWith('#') ? value : value;
}
