import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import { mkdir } from 'node:fs/promises'
import { setTimeout as delay } from 'node:timers/promises'
import { chromium } from 'playwright'

const origin = 'http://127.0.0.1:4178'
const server = spawn(
  process.execPath,
  [
    'node_modules/vite/bin/vite.js',
    '--host',
    '127.0.0.1',
    '--port',
    '4178',
    '--strictPort',
  ],
  { stdio: ['ignore', 'pipe', 'pipe'] },
)
let serverOutput = ''
server.stdout.on('data', (data) => {
  serverOutput += data.toString()
})
server.stderr.on('data', (data) => {
  serverOutput += data.toString()
})
let browser
const failures = []
const artifacts = 'test-results'

async function check(name, run) {
  try {
    await run()
    console.log(`PASS ${name}`)
  } catch (error) {
    failures.push(name)
    console.error(`FAIL ${name}: ${error.message}`)
  }
}

try {
  let ready = false
  for (let count = 0; count < 50; count++) {
    try {
      const response = await fetch(origin)
      if (response.ok) {
        ready = true
        break
      }
    } catch {
      /* Wait for Vite. */
    }
    await delay(200)
  }
  assert.ok(ready, `Vite failed to start: ${serverOutput}`)
  await mkdir(artifacts, { recursive: true })
  browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({ reducedMotion: 'reduce' })
  const page = await context.newPage()
  const runtimeErrors = []
  page.on('pageerror', (error) => runtimeErrors.push(error.message))
  await context.route('https://wa.me/**', (route) =>
    route.fulfill({
      contentType: 'text/html',
      body: '<!doctype html><title>WhatsApp test destination</title>',
    }),
  )

  await check(
    'Arabic default, correct direction, six services, and semantic page',
    async () => {
      await page.goto(origin)
      await page.locator('h1').waitFor()
      assert.equal(await page.locator('html').getAttribute('lang'), 'ar')
      assert.equal(await page.locator('html').getAttribute('dir'), 'rtl')
      assert.equal(await page.locator('h1').count(), 1)
      assert.equal(await page.locator('.service-card').count(), 6)
      assert.equal(await page.locator('iframe').getAttribute('loading'), 'lazy')
      assert.ok(await page.locator('iframe').getAttribute('title'))
      assert.equal(await page.locator('main').count(), 1)
    },
  )

  for (const language of ['ar', 'en']) {
    await page.evaluate(
      (lang) => localStorage.setItem('nawa-language', lang),
      language,
    )
    await page.reload()
    await page.locator('h1').waitFor()
    for (const width of [360, 375, 390, 768, 1024, 1440]) {
      await check(
        `${language} layout at ${width}px: no horizontal overflow, readable content, mirrored controls`,
        async () => {
          await page.setViewportSize({ width, height: 950 })
          await page.evaluate(() => window.scrollTo(0, 0))
          await page.evaluate(() => document.fonts.ready)
          await delay(100)
          const layout = await page.evaluate(() => ({
            viewport: innerWidth,
            scroll: document.documentElement.scrollWidth,
            direction: document.documentElement.dir,
            floating: document
              .querySelector('.floating-whatsapp')
              .getBoundingClientRect()
              .toJSON(),
            headerHeight: document
              .querySelector('.site-header')
              .getBoundingClientRect().height,
            font: getComputedStyle(document.body).fontFamily,
          }))
          assert.ok(
            layout.scroll <= layout.viewport,
            `${layout.scroll} exceeds ${layout.viewport}`,
          )
          assert.equal(layout.direction, language === 'ar' ? 'rtl' : 'ltr')
          assert.ok(layout.headerHeight <= 110)
          assert.ok(
            language === 'ar'
              ? layout.font.includes('Cairo')
              : layout.font.includes('Jakarta'),
          )
          assert.ok(
            language === 'ar'
              ? layout.floating.x < width / 2
              : layout.floating.x > width / 2,
          )
          const overlaps = await page.evaluate(() => {
            const panel = document.querySelector('.illustration-panel').getBoundingClientRect()
            return [...document.querySelectorAll('.hero-visual .floating-card')].some((card) => {
              const rect = card.getBoundingClientRect()
              return rect.top < panel.bottom && rect.bottom > panel.top && rect.left < panel.right && rect.right > panel.left
            })
          })
          assert.equal(overlaps, false, 'Hero badges obscure the illustration or its copy')
          await page.screenshot({
            path: `${artifacts}/${language}-${width}.png`,
            fullPage: true,
          })
        },
      )
    }
  }

  await check(
    'Language switching updates content, metadata, and saved preference',
    async () => {
      await page.getByRole('button', { name: 'التبديل إلى العربية' }).click()
      assert.equal(await page.locator('html').getAttribute('lang'), 'ar')
      assert.match(await page.locator('h1').innerText(), /رعاية/)
      await page.reload()
      assert.equal(await page.locator('html').getAttribute('dir'), 'rtl')
      assert.match(await page.title(), /نواة/)
      await page.getByRole('button', { name: 'Switch to English' }).click()
      assert.match(await page.locator('h1').innerText(), /A little more care/)
      assert.match(await page.title(), /Nawa/)
      assert.equal(await page.locator('meta[property="og:title"]').getAttribute('content'), await page.title())
      assert.equal(await page.locator('meta[name="twitter:description"]').getAttribute('content'), await page.locator('meta[name="description"]').getAttribute('content'))
      assert.equal(
        await page.evaluate(() => localStorage.getItem('nawa-language')),
        'en',
      )
    },
  )

  await check(
    'Mobile menu closes on Escape and link selection; hidden links are inert',
    async () => {
      await page.setViewportSize({ width: 390, height: 844 })
      const toggle = page.getByRole('button', { name: 'Open navigation' })
      await toggle.click()
      assert.equal(
        await page.locator('.menu-toggle').getAttribute('aria-expanded'),
        'true',
      )
      await page.keyboard.press('Escape')
      assert.equal(
        await page.locator('.menu-toggle').getAttribute('aria-expanded'),
        'false',
      )
      assert.equal(
        await page.evaluate(() => document.activeElement.className),
        'menu-toggle',
      )
      assert.equal(
        await page.locator('#mobile-navigation').getAttribute('inert'),
        '',
      )
      await toggle.click()
      await page.locator('#mobile-navigation a[href="#services"]').click()
      assert.equal(
        await page.locator('.menu-toggle').getAttribute('aria-expanded'),
        'false',
      )
      assert.equal(new URL(page.url()).hash, '#services')
      await delay(100)
      assert.ok(
        await page.evaluate(
          () =>
            document.querySelector('#services').getBoundingClientRect().top >=
            78,
        ),
      )
    },
  )

  await check(
    'Form validates all fields, focuses the first error, and translates errors',
    async () => {
      await page.locator('form button[type="submit"]').click()
      assert.equal(await page.locator('.field-error').count(), 3)
      assert.equal(
        await page.locator('#contact-name').getAttribute('aria-invalid'),
        'true',
      )
      assert.equal(
        await page.evaluate(() => document.activeElement.id),
        'contact-name',
      )
      assert.match(await page.locator('#name-error').innerText(), /Please/)
      await page.getByRole('button', { name: 'التبديل إلى العربية' }).click()
      assert.match(await page.locator('#name-error').innerText(), /يرجى/)
      await page.locator('#contact-name').fill('أحمد علي')
      await page.locator('#contact-phone').fill('123abc4567')
      await page
        .locator('#contact-message')
        .fill('أرغب في الاستفسار عن موعد للاستشارة.')
      await page.locator('form button[type="submit"]').click()
      assert.equal(await page.locator('.field-error').count(), 1)
      assert.equal(
        await page.evaluate(() => document.activeElement.id),
        'contact-phone',
      )
    },
  )

  await check(
    'Valid Arabic form opens encoded WhatsApp message with Arabic digits normalized',
    async () => {
      await page.locator('#contact-phone').fill('+٩٦٢ ٧٩ ٠٠٠ ٠٠٠٠')
      const popupPromise = page.waitForEvent('popup')
      await page.locator('form button[type="submit"]').click()
      const popup = await popupPromise
      await popup.waitForLoadState()
      const url = new URL(popup.url())
      assert.equal(url.hostname, 'wa.me')
      assert.equal(url.pathname, '/962791802742')
      const text = url.searchParams.get('text')
      assert.match(text, /أحمد علي/)
      assert.match(text, /\+962 79 000 0000/)
      assert.match(text, /أرغب في الاستفسار/)
      assert.equal(await popup.evaluate(() => window.opener === null), true)
      assert.equal(await page.locator('.field-error').count(), 0)
      assert.equal(await page.locator('.form-success').count(), 1)
      const fallback = page.locator('.form-success a')
      assert.equal(await fallback.getAttribute('target'), '_blank')
      assert.equal(await fallback.getAttribute('rel'), 'noopener noreferrer')
      await popup.close()
    },
  )

  await check(
    'English form handoff, service messages, and floating button avoid mobile form',
    async () => {
      await page.getByRole('button', { name: 'Switch to English' }).click()
      await page.locator('#contact-name').fill('Alex Example')
      await page.locator('#contact-phone').fill('+962 79 000 0000')
      await page
        .locator('#contact-message')
        .fill('I would like to book a consultation.')
      const popupPromise = page.waitForEvent('popup')
      await page.locator('form button[type="submit"]').click()
      const popup = await popupPromise
      await popup.waitForLoadState()
      assert.match(
        new URL(popup.url()).searchParams.get('text'),
        /Your name: Alex Example/,
      )
      await popup.close()
      assert.equal(await page.locator('.floating-whatsapp').isVisible(), false)
      const service = new URL(
        await page.locator('.service-link').first().getAttribute('href'),
      )
      assert.match(service.searchParams.get('text'), /Medical consultations/)
      const links = await page
        .locator('a[target="_blank"]')
        .evaluateAll((items) => items.map((item) => item.rel))
      assert.ok(
        links.every(
          (rel) => rel.includes('noopener') && rel.includes('noreferrer'),
        ),
      )
    },
  )

  await check(
    'Reduced motion disables reveals and pulse; keyboard focus is visible',
    async () => {
      assert.equal(
        await page
          .locator('.floating-whatsapp')
          .evaluate(
            (element) => getComputedStyle(element, '::before').animationName,
          ),
        'none',
      )
      const opacity = await page
        .locator('.contact-form-wrap')
        .evaluate((element) => getComputedStyle(element).opacity)
      assert.equal(opacity, '1')
      await page.locator('#contact-name').focus()
      const focus = await page
        .locator('#contact-name')
        .evaluate((element) => getComputedStyle(element).boxShadow)
      assert.notEqual(focus, 'none')
    },
  )

  await check('Page works with localStorage unavailable', async () => {
    const restricted = await browser.newContext()
    await restricted.addInitScript(() => {
      Storage.prototype.getItem = () => {
        throw new DOMException('Storage unavailable', 'SecurityError')
      }
      Storage.prototype.setItem = () => {
        throw new DOMException('Storage unavailable', 'SecurityError')
      }
    })
    const noStorage = await restricted.newPage()
    await noStorage.goto(origin)
    await noStorage.locator('h1').waitFor()
    assert.equal(await noStorage.locator('html').getAttribute('lang'), 'ar')
    await noStorage.getByRole('button', { name: 'Switch to English' }).click()
    assert.equal(await noStorage.locator('html').getAttribute('lang'), 'en')
    await restricted.close()
  })

  await check(
    'Scroll reveals finish without reduced motion and header blurs on scroll',
    async () => {
      await page.emulateMedia({ reducedMotion: 'no-preference' })
      await page.reload()
      await page.locator('#about').scrollIntoViewIfNeeded()
      await delay(900)
      const visible = await page
        .locator('.about-copy')
        .evaluate((element) => getComputedStyle(element).opacity)
      assert.equal(visible, '1')
      assert.equal(
        await page
          .locator('.site-header')
          .evaluate((element) => element.classList.contains('is-scrolled')),
        true,
      )
    },
  )

  await check(
    'Core text, placeholders, and primary actions meet AA contrast',
    async () => {
      const ratios = await page.evaluate(() => {
        const luminance = (color) => {
          const rgb = color
            .match(/[\d.]+/g)
            .slice(0, 3)
            .map(Number)
          const linear = rgb.map((value) => {
            const channel = value / 255
            return channel <= 0.04045
              ? channel / 12.92
              : ((channel + 0.055) / 1.055) ** 2.4
          })
          return linear.reduce(
            (sum, value, i) => sum + value * [0.2126, 0.7152, 0.0722][i],
            0,
          )
        }
        const contrast = (foreground, background) => {
          const values = [luminance(foreground), luminance(background)].sort(
            (a, b) => b - a,
          )
          return (values[0] + 0.05) / (values[1] + 0.05)
        }
        const samples = [
          ['.hero-description', 'html'],
          ['.body-copy', 'html'],
          ['.service-card > p', '.service-card'],
          ['.section-intro', '.services-section'],
          ['.footer-brand > p', '.site-footer'],
          ['.button-primary', '.button-primary'],
          ['.floating-whatsapp', '.floating-whatsapp'],
          ['.about-art-caption p:last-child', '.about-art'],
        ]
        const output = samples.map(([text, surface]) => ({
          text,
          ratio: contrast(
            getComputedStyle(document.querySelector(text)).color,
            getComputedStyle(document.querySelector(surface)).backgroundColor,
          ),
        }))
        const input = document.querySelector('#contact-name')
        output.push({
          text: 'input placeholder',
          ratio: contrast(
            getComputedStyle(input, '::placeholder').color,
            getComputedStyle(input).backgroundColor,
          ),
        })
        return output
      })
      for (const { text, ratio } of ratios)
        assert.ok(
          ratio >= 4.5,
          `${text}: contrast ${ratio.toFixed(2)} is below 4.5`,
        )
    },
  )

  await check(
    'Map has usable directions and reserves its space while loading',
    async () => {
      await page.locator('#location').scrollIntoViewIfNeeded()
      await delay(1500)
      const frame = page.locator('iframe')
      assert.match(
        await frame.getAttribute('src'),
        /maps\.google\.com\/maps\?q=31\.9539,35\.9106/,
      )
      assert.ok((await frame.boundingBox()).height >= 300)
      const directions = new URL(
        await page.locator('.location-header a').getAttribute('href'),
      )
      assert.equal(
        directions.searchParams.get('destination'),
        '31.9539,35.9106',
      )
      await page
        .locator('.map-wrap')
        .screenshot({ path: `${artifacts}/location-map.png` })
      console.log(
        'Map iframe document:',
        await frame
          .contentFrame()
          .locator('body')
          .innerText({ timeout: 5000 })
          .then((text) => text.slice(0, 100))
          .catch(() => 'External embed unavailable to automation'),
      )
    },
  )

  await check('Navigation works without IntersectionObserver', async () => {
    const fallback = await browser.newContext({ reducedMotion: 'reduce' })
    await fallback.addInitScript(() => { delete window.IntersectionObserver })
    const fallbackPage = await fallback.newPage()
    const errors = []
    fallbackPage.on('pageerror', (error) => errors.push(error.message))
    await fallbackPage.goto(origin)
    await fallbackPage.locator('h1').waitFor()
    await fallbackPage.setViewportSize({ width: 375, height: 320 })
    await fallbackPage.locator('.menu-toggle').click()
    assert.equal(await fallbackPage.locator('.menu-toggle').getAttribute('aria-expanded'), 'true')
    assert.deepEqual(errors, [])
    await fallback.close()
  })

  await check('Short-screen menu remains scrollable and transfers focus to its destination', async () => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.setViewportSize({ width: 768, height: 320 })
    await page.goto(origin)
    await page.locator('.menu-toggle').click()
    const menu = page.locator('#mobile-navigation')
    assert.ok((await menu.boundingBox()).y + (await menu.boundingBox()).height <= 320)
    await menu.locator('a[href="#contact"]').click()
    assert.equal(await page.evaluate(() => document.activeElement.id), 'contact')
    assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'), 'false')
  })

  await check('No browser runtime errors', async () =>
    assert.deepEqual(runtimeErrors, []),
  )
  await context.close()
  if (failures.length)
    throw new Error(`${failures.length} failed checks: ${failures.join(', ')}`)
  console.log(`Browser checks complete. Screenshots: ${artifacts}/`)
} finally {
  await browser?.close()
  server.kill('SIGTERM')
}
