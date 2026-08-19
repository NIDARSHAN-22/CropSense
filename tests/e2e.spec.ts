import { test, expect } from '@playwright/test';

test.describe('CropDoctor E2E Test Suite', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
  });

  test('1. Core Application Landing Page & Navigation', async ({ page }) => {
    // Verify document title
    await expect(page).toHaveTitle(/CropDoctor/i);

    // Hero title is visible
    const heroTitle = page.locator('h1').first();
    await expect(heroTitle).toBeVisible({ timeout: 10000 });

    // Verify key metrics
    await expect(page.getByText('38+').first()).toBeVisible();
    await expect(page.getByText('100%').first()).toBeVisible();
  });

  test('2. 1-Click Sample Leaf Diagnosis & 3-Tier Remedies', async ({ page }) => {
    // Click on the first sample scan card
    const sampleCard = page.locator('text=Early Blight').first();
    await sampleCard.click();

    // Verify scan page button
    const diagnoseBtn = page.locator('button:has-text("Start Instant AI Diagnosis")').or(page.locator('button:has-text("உடனடி")')).first();
    await expect(diagnoseBtn).toBeVisible({ timeout: 10000 });

    // Click diagnose button
    await diagnoseBtn.click();

    // Wait for result card to appear
    const resultHeading = page.locator('h2').first();
    await expect(resultHeading).toBeVisible({ timeout: 15000 });

    // Verify tab switching
    const organicTab = page.getByText(/Organic|இயற்கை|जैविक/i).first();
    await expect(organicTab).toBeVisible();

    const chemTab = page.getByText(/Chemical|ரசாயன|रासायनिक/i).first();
    await chemTab.click();
    await expect(page.getByText(/Mancozeb|மேன்கோசெப்|मैंकोजेब/i).first()).toBeVisible();
  });

  test('3. Multilingual Switcher (Language Switching)', async ({ page }) => {
    // Find language switcher button
    const langBtn = page.locator('header').locator('button').filter({ hasText: /English|தமிழ்|हिंदी|తెలుగు|ಕನ್ನಡ|मराठी|বাংলা/i }).first();
    await langBtn.click();

    // Select Tamil
    const tamilOption = page.locator('button:has-text("தமிழ்")').first();
    await tamilOption.click();

    // Verify Tamil banner text
    await expect(page.locator('text=பயிர்').first()).toBeVisible({ timeout: 5000 });

    // Switch back to English
    await langBtn.click();
    const englishOption = page.locator('button:has-text("English")').first();
    await englishOption.click();
  });

  test('4. Settings Menu: Theme Toggle & Export', async ({ page }) => {
    // Navigate to Settings
    const settingsBtn = page.locator('button').filter({ hasText: /Settings|அமைப்புகள்|सेटिंग्ज|సెట్టింగ్‌లు/i }).first();
    await settingsBtn.click();

    // Verify Settings heading
    await expect(page.locator('h1').first()).toBeVisible();

    // Toggle Dark Theme
    const darkBtn = page.locator('button').filter({ hasText: /Dark|இருள்|डार्क/i }).first();
    await darkBtn.click();
    const isDark = await page.evaluate(() => document.documentElement.classList.contains('dark'));
    expect(isDark).toBe(true);

    // Toggle Light Theme
    const lightBtn = page.locator('button').filter({ hasText: /Light|வெளிச்சம்|लाइट/i }).first();
    await lightBtn.click();
    const isLight = await page.evaluate(() => !document.documentElement.classList.contains('dark'));
    expect(isLight).toBe(true);
  });

  test('5. Weather & Outbreak Radar', async ({ page }) => {
    const advisoryNav = page.locator('button').filter({ hasText: /Weather|வானிலை|मौसम/i }).first();
    await advisoryNav.click();

    await expect(page.getByText('1800-180-1551').first()).toBeVisible();
  });
});
