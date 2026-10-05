import { useEffect, useMemo, useRef, useState } from "react";
import portraitUrl from "@/assets/portrait.webp";
import { useT } from "./i18n";
import { Wrap } from "./lab";
import { AiryDisk } from "./retro";

type Degradation = "Blur" | "Noise" | "Compression" | "Lighting";
type Training = "No augmentation" | "Mixed augmentation";

const TYPES: Degradation[] = ["Blur", "Noise", "Compression", "Lighting"];

function sigmoid(x: number) {
  return 1 / (1 + Math.exp(-x));
}

function confidenceFor(deg: Degradation, severity: number, training: Training) {
  const s = severity;
  if (training === "Mixed augmentation") {
    const top = 92.09;
    const floor = deg === "Blur" ? 60 : 63;
    return floor + (top - floor) * Math.pow(1 - s / 100, 1.4);
  }
  // No augmentation (baseline): floors are the measured severity-3 ResNet-18 results from the thesis
  const top = 95.09;
  const bottom =
    deg === "Blur" ? 17.48 : deg === "Noise" ? 24.97 : deg === "Compression" ? 39.82 : 89.83;
  const mid = deg === "Blur" ? 45 : 65;
  return bottom + (top - bottom) * (1 - sigmoid((s - mid) / 9));
}

function useImage(src: string) {
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  useEffect(() => {
    const i = new Image();
    i.crossOrigin = "anonymous";
    i.src = src;
    i.onload = () => setImg(i);
  }, [src]);
  return img;
}

/* Horizontal meter: 0–100 with ticks, filled in signal ink. */
function Meter({ value }: { value: number }) {
  return (
    <svg viewBox="0 0 300 30" className="block w-full" aria-hidden="true">
      <rect x="0" y="4" width="300" height="12" fill="none" stroke="var(--ink)" strokeWidth="1.5" />
      <rect
        x="0"
        y="4"
        width={(value / 100) * 300}
        height="12"
        fill="var(--signal)"
        style={{ transition: "width 320ms ease-out" }}
      />
      <g stroke="var(--ink)" strokeWidth="1">
        {Array.from({ length: 21 }, (_, i) => (
          <line key={i} x1={i * 15} y1="18" x2={i * 15} y2={i % 5 === 0 ? 28 : 23} />
        ))}
      </g>
    </svg>
  );
}

export function ResearchPanel() {
  const t = useT();
  const DEG_LABEL: Record<Degradation, string> = {
    Blur: t("panel.deg.blur"),
    Noise: t("panel.deg.noise"),
    Compression: t("panel.deg.compression"),
    Lighting: t("panel.deg.lighting"),
  };
  const TRAIN_LABEL: Record<Training, string> = {
    "No augmentation": t("panel.training.single"),
    "Mixed augmentation": t("panel.training.mixed"),
  };
  const [degradation, setDegradation] = useState<Degradation>("Blur");
  const [severity, setSeverity] = useState(0);
  const [training, setTraining] = useState<Training>("No augmentation");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const img = useImage(portraitUrl);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c || !img) return;
    const W = 480;
    const H = 480;
    c.width = W;
    c.height = H;
    const ctx = c.getContext("2d");
    if (!ctx) return;

    const s = severity / 100;

    ctx.save();
    ctx.clearRect(0, 0, W, H);

    // Compression: draw small then scale up
    if (degradation === "Compression") {
      const minScale = 1;
      const maxScale = 28;
      const k = Math.max(1, Math.round(minScale + s * (maxScale - minScale)));
      const lw = Math.max(4, Math.round(W / k));
      const lh = Math.max(4, Math.round(H / k));
      ctx.imageSmoothingEnabled = true;
      ctx.drawImage(img, 0, 0, lw, lh);
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(c, 0, 0, lw, lh, 0, 0, W, H);
    } else {
      // Apply blur / lighting via canvas filter
      let filter = "none";
      if (degradation === "Blur") {
        filter = `blur(${(s * 14).toFixed(2)}px)`;
      } else if (degradation === "Lighting") {
        const b = 1 - s * 0.7;
        const con = 1 - s * 0.55;
        filter = `brightness(${b.toFixed(2)}) contrast(${con.toFixed(2)})`;
      }
      ctx.filter = filter;
      ctx.drawImage(img, 0, 0, W, H);
      ctx.filter = "none";
    }

    // Noise overlay
    if (degradation === "Noise" && s > 0) {
      const id = ctx.getImageData(0, 0, W, H);
      const data = id.data;
      const amp = 110 * s;
      for (let i = 0; i < data.length; i += 4) {
        const n = (Math.random() - 0.5) * amp;
        data[i] = Math.max(0, Math.min(255, data[i] + n));
        data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + (Math.random() - 0.5) * amp));
        data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + (Math.random() - 0.5) * amp));
      }
      ctx.putImageData(id, 0, 0);
    }

    ctx.restore();
  }, [img, degradation, severity, training]);

  const confidence = useMemo(
    () => confidenceFor(degradation, severity, training),
    [degradation, severity, training]
  );

  const conf = confidence.toFixed(1);
  const low = confidence < 50;
  const status = low ? t("panel.collapse") : confidence > 80 ? t("panel.stable") : t("panel.degraded");

  return (
    <section className="border-b-2 border-ink" aria-labelledby="panel-heading">
      <Wrap className="py-14 sm:py-20">
        <h2 id="panel-heading" className="sr-only">
          Interactive thesis demo
        </h2>

        <div className="grid min-w-0 grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-12">
          {/* heading column */}
          <div className="min-w-0 lg:col-span-4">
            <span aria-hidden="true" className="numeral block text-[4.5rem] sm:text-[6rem]">
              01
            </span>
            <p className="label-md mt-4">{t("panel.plate")}</p>
            <p className="mt-6 max-w-[30ch] text-[1.375rem] leading-[1.35] italic">{t("panel.lede")}</p>
            <p className="mt-6 max-w-[38ch] text-base leading-snug text-muted-ink">{t("panel.note")}</p>
            <AiryDisk className="mt-8 w-32 lg:mt-12 lg:w-40" />
          </div>

          {/* sample plate */}
          <div className="min-w-0 lg:col-span-4">
            <div className="plate min-w-0">
              <canvas
                ref={canvasRef}
                className="block aspect-square w-full max-w-full"
                aria-label="Sample image with the selected degradation applied"
              />
            </div>
            <div className="mt-5 flex items-baseline justify-between gap-3">
              <p className="text-base italic text-muted-ink">
                {t("panel.caption")}. {t("panel.thisisme")}
              </p>
              <p className="label text-ink">
                {DEG_LABEL[degradation]} · S={severity.toString().padStart(3, "0")}
              </p>
            </div>
          </div>

          {/* instrument panel */}
          <div className="min-w-0 lg:col-span-4">
            <div className="border-2 border-ink">
              <fieldset className="border-b border-ink p-4">
                <legend className="label-md float-left mb-3 w-full text-muted-ink">{t("panel.degradation")}</legend>
                <div className="clear-both grid grid-cols-2 gap-2">
                  {TYPES.map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setDegradation(d)}
                      aria-pressed={d === degradation}
                      className="key"
                    >
                      {DEG_LABEL[d]}
                    </button>
                  ))}
                </div>
              </fieldset>

              <div className="border-b border-ink p-4">
                <label htmlFor="severity" className="label-md flex items-center justify-between text-muted-ink">
                  <span>{t("panel.severity")}</span>
                  <span className="font-display text-[1.25rem] text-ink">{severity}</span>
                </label>
                <input
                  id="severity"
                  type="range"
                  min={0}
                  max={100}
                  value={severity}
                  onChange={(e) => setSeverity(Number(e.target.value))}
                  className="ruler-range mt-2"
                />
              </div>

              <fieldset className="border-b border-ink p-4">
                <legend className="label-md float-left mb-3 w-full text-muted-ink">{t("panel.training")}</legend>
                <div className="clear-both grid grid-cols-2 gap-2">
                  {(["No augmentation", "Mixed augmentation"] as Training[]).map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setTraining(opt)}
                      aria-pressed={opt === training}
                      className="key"
                    >
                      {TRAIN_LABEL[opt]}
                    </button>
                  ))}
                </div>
              </fieldset>

              {/* readout */}
              <div className="p-4">
                <div className="flex items-baseline justify-between">
                  <span className="label-md text-muted-ink">
                    {t("panel.predicted")} {t("panel.confidence")}
                  </span>
                  <span className="label text-signal">{t("panel.live")}</span>
                </div>
                <p className="mt-3 flex items-baseline gap-3">
                  <span className="font-display text-[3.25rem] leading-none" style={{ color: low ? "var(--signal)" : "var(--ink)" }}>
                    {conf}
                  </span>
                  <span className="label-md text-muted-ink">{t("panel.percent")}</span>
                  <span className="label-md ml-auto text-ink">{status}</span>
                </p>
                <div className="mt-2">
                  <Meter value={confidence} />
                </div>
                <dl className="ruled mt-4 border-t border-rule text-base">
                  {[
                    [t("panel.field.model"), "ResNet-18"],
                    [t("panel.field.degradation"), DEG_LABEL[degradation]],
                    [t("panel.field.severity"), String(severity)],
                    [t("panel.field.training"), TRAIN_LABEL[training]],
                  ].map(([k, v]) => (
                    <div key={k} className="flex items-baseline justify-between py-1.5">
                      <dt className="label text-muted-ink">{k}</dt>
                      <dd className="text-ink">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </Wrap>
    </section>
  );
}
