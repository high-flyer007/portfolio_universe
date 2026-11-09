import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";
import { PNG } from "pngjs";
import { writeFileSync } from "node:fs";

const URL = "http://localhost:5173/";
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function watch(page, errors) {
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(String(error)));
}

async function launch({ width, height, mobile = false, reduced = false }) {
  const browser = await puppeteer.launch({
    args: [
      ...chromium.args,
      "--enable-unsafe-swiftshader",
      "--use-gl=angle",
      "--disable-dev-shm-usage",
    ],
    defaultViewport: { width, height, isMobile: mobile, hasTouch: mobile },
    executablePath: await chromium.executablePath(),
    headless: true,
  });
  const page = await browser.newPage();
  if (reduced) {
    await page.emulateMediaFeatures([
      { name: "prefers-reduced-motion", value: "reduce" },
    ]);
  }
  const errors = [];
  watch(page, errors);
  await page.goto(URL, { waitUntil: "domcontentloaded", timeout: 90000 });
  await wait(4000);
  return { browser, page, errors };
}

const readHero = () =>
  (() => {
    const h1 = document.querySelector("h1");
    const section = document.getElementById("awakening");
    const buttons = [...section.querySelectorAll("button")].map((button) => {
      const rect = button.getBoundingClientRect();
      const node = document.elementFromPoint(
        rect.left + rect.width / 2,
        rect.top + rect.height / 2,
      );
      return {
        text: button.innerText.trim(),
        top: Math.round(rect.top),
        bottom: Math.round(rect.bottom),
        left: Math.round(rect.left),
        right: Math.round(rect.right),
        visibleInViewport: rect.top >= 0 && rect.bottom <= window.innerHeight,
        covered: !(node === button || button.contains(node)),
      };
    });
    const paragraph = section.querySelector("p.max-w-xl");
    const canvas = document.querySelector("canvas");
    return {
      h1: h1?.getAttribute("aria-label"),
      h1Text: h1?.innerText.replace(/\s+/g, " ").trim(),
      tagline: section.querySelector(".label-mono.text-\\[9px\\].text-emerald\\/90")
        ?.textContent?.trim(),
      role: section.querySelector("p.font-serif")?.textContent?.trim(),
      statement: paragraph?.textContent?.replace(/\s+/g, " ").trim(),
      buttons,
      canvas: canvas
        ? `${canvas.clientWidth}x${canvas.clientHeight}`
        : null,
      overflow: {
        docWidth: document.documentElement.scrollWidth,
        innerWidth: window.innerWidth,
      },
      scrollY: Math.round(window.scrollY),
    };
  })();

async function analyzePixels(path) {
  const png = PNG.sync.read(
    await (await import("node:fs/promises")).readFile(path),
  );
  const { width, height, data } = png;
  let emerald = 0;
  let lit = 0;
  let rightEmerald = 0;
  const startX = Math.floor(width * 0.5);
  for (let y = 0; y < height; y += 2) {
    for (let x = 0; x < width; x += 2) {
      const i = (width * y + x) * 4;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      if (g > 55 && g > r * 1.18 && g > b * 1.05) {
        emerald += 1;
        if (x >= startX) rightEmerald += 1;
      }
      if (r + g + b > 150) lit += 1;
    }
  }
  const total = (width / 2) * Math.ceil(height / 2);
  return {
    emeraldPct: Number(((emerald / total) * 100).toFixed(2)),
    rightEmeraldPctOfRight: Number(
      ((rightEmerald / (total / 2)) * 100).toFixed(2),
    ),
    litPct: Number(((lit / total) * 100).toFixed(2)),
  };
}

const results = {};

// A — desktop layout, project CTA, portal pixels
{
  const { browser, page, errors } = await launch({ width: 1440, height: 900 });
  results.desktop = await page.evaluate(readHero);
  const shot = await page.screenshot({
    path: "preview-hero-desktop.png",
    type: "png",
  });
  writeFileSync("preview-hero-desktop.png", shot);
  results.desktop.pixels = await analyzePixels("preview-hero-desktop.png");

  await page.evaluate(() => {
    const button = [...document.querySelectorAll("#awakening button")].find(
      (item) => item.innerText.includes("View projects"),
    );
    button?.click();
  });
  await wait(2200);
  results.viewProjects = await page.evaluate(() => {
    const projects = document.getElementById("projects");
    return {
      scrollY: Math.round(window.scrollY),
      projectsTop: projects
        ? Math.round(projects.getBoundingClientRect().top)
        : null,
      activeSceneLabel: document.querySelector(
        '[aria-label="Current scene"]',
      )?.innerText.replace(/\s+/g, " ").trim(),
    };
  });
  results.desktop.errors = errors;
  await browser.close();
}

// B — enter transition in a fresh renderer
{
  const { browser, page, errors } = await launch({ width: 1440, height: 900 });
  await page.evaluate(() => {
    const button = [...document.querySelectorAll("#awakening button")].find(
      (item) => item.innerText.includes("Enter the universe"),
    );
    button?.click();
  });
  await wait(380);
  results.enter = {
    overlayShown: await page.evaluate(() =>
      document.body.innerText.includes("Entering the universe"),
    ),
  };
  await wait(2100);
  Object.assign(
    results.enter,
    await page.evaluate(() => ({
      overlayGone: !document.body.innerText.includes("Entering the universe"),
      scrollY: Math.round(window.scrollY),
      originTop: Math.round(
        document.getElementById("origin")?.getBoundingClientRect().top ?? -1,
      ),
      originInView:
        (document.getElementById("origin")?.getBoundingClientRect().top ?? 9999) <
        window.innerHeight * 0.4,
    })),
  );
  results.enter.errors = errors;
  await browser.close();
}

// C — mobile
{
  const { browser, page, errors } = await launch({
    width: 390,
    height: 844,
    mobile: true,
  });
  results.mobile = await page.evaluate(readHero);
  results.mobile.overflow.ok =
    results.mobile.overflow.docWidth <= results.mobile.overflow.innerWidth + 1;
  const shot = await page.screenshot({
    path: "preview-hero-mobile.png",
    type: "png",
  });
  writeFileSync("preview-hero-mobile.png", shot);
  results.mobile.pixels = await analyzePixels("preview-hero-mobile.png");

  await page.evaluate(() => {
    const button = [...document.querySelectorAll("#awakening button")].find(
      (item) => item.innerText.includes("View projects"),
    );
    button?.click();
  });
  await wait(2200);
  results.mobile.viewProjects = await page.evaluate(() => ({
    scrollY: Math.round(window.scrollY),
    projectsTop: Math.round(
      document.getElementById("projects")?.getBoundingClientRect().top ?? -1,
    ),
  }));
  results.mobile.errors = errors;
  await browser.close();
}

// D — reduced motion
{
  const { browser, page, errors } = await launch({
    width: 1280,
    height: 800,
    reduced: true,
  });
  await page.evaluate(() => {
    const button = [...document.querySelectorAll("#awakening button")].find(
      (item) => item.innerText.includes("Enter the universe"),
    );
    button?.click();
  });
  await wait(400);
  results.reduced = await page.evaluate(() => ({
    overlayShown: document.body.innerText.includes("Entering the universe"),
    scrollY: Math.round(window.scrollY),
  }));
  results.reduced.errors = errors;
  await browser.close();
}

console.log(JSON.stringify(results, null, 2));
